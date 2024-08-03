package server

import (
	"log"
	"mw-chat-websocket/internal/config"
	"net/http"

	// _ "mwchat/docs"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
)

type Server struct {
	GinServer *gin.Engine
}

func NewServer(cfg *config.Config) *Server {
	server := gin.Default()

	// Apply CORS middleware with custom options
	server.Use(cors.New(cors.Config{
		// AllowOrigins: []string{"*"},
		AllowOrigins:     []string{cfg.WebappBaseUrl},
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	server.GET("/healthcheck", func(ctx *gin.Context) {
		ctx.JSON(http.StatusOK, gin.H{"message": "The way APi is working fine"})
	})

	// if cfg.EnvType != "prod" {
	// 	server.GET("/docs/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))
	// }

	return &Server{
		GinServer: server,
	}
}

// @title     Masters way chat API
// @version 1.0
// @BasePath  /chat-websocket
func (server *Server) SetRoutes() {
	server.GinServer.GET("/ws", func(ctx *gin.Context) {
		conn, err := upgrader.Upgrade(ctx.Writer, ctx.Request, nil)
		if err != nil {
			log.Println(err)
			return
		}
		defer conn.Close()

		newMessage := MakeMessageReceived("Hello!")
		err = conn.WriteJSON(newMessage)
		if err != nil {
			log.Println("WriteMessage error:", err)
			return
		}

		// for {
		// 	messageType, message, err := conn.ReadMessage()
		// 	if err != nil {
		// 		log.Println(err)
		// 		return
		// 	}

		// 	fmt.Println("Received message:", string(message))

		// 	err = conn.WriteMessage(messageType, message)
		// 	if err != nil {
		// 		log.Println(err)
		// 		return
		// 	}
		// }
	})

}

type BaseMessage struct {
	Name    string      `json:"name" validate:"required"`
	Payload interface{} `json:"payload" validate:"required"`
}

type MessageReceived struct {
	Name    string                 `json:"name" validate:"required"`
	Payload MessageReceivedPayload `json:"payload" validate:"required"`
}

type MessageReceivedPayload struct {
	Text string `json:"text" validate:"required"`
}

func MakeMessageReceived(text string) *MessageReceived {
	return &MessageReceived{
		Name: "mw-chat-websocket:message-received",
		Payload: MessageReceivedPayload{
			Text: text,
		},
	}
}

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}
