package controllers

import (
	"fmt"
	"log"
	"mw-chat-websocket/internal/auth"
	"mw-chat-websocket/internal/schemas"
	"mw-chat-websocket/internal/services"
	"mw-chat-websocket/pkg/utils"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
)

type SocketController struct {
	SocketService services.SocketService
}

func NewSocketController(socketService services.SocketService) *SocketController {
	return &SocketController{SocketService: socketService}
}

type User struct {
	ID       string
	Username string
}

var users = make(map[string]*User)

// @Summary Connect to socket
// @Description
// @Tags socket
// @ID connect-socket
// @Accept  json
// @Produce  json
// @Success 200 {object} schemas.GetChatPreviewResponse
// @Router /rooms/preview [get]
// func (cc *SocketController) ConnectSocket(ctx *gin.Context) {
// 	server := socketio.NewServer(nil)

// 	server.OnConnect("/", func(s socketio.Conn) error {
// 		log.Println("connected:", s.ID())
// 		return nil
// 	})

// 	server.OnEvent("/", "join", func(s socketio.Conn, username string) {
// 		users[s.ID()] = &User{
// 			ID:       s.ID(),
// 			Username: username,
// 		}
// 		log.Printf("user %s joined as %s", s.ID(), username)
// 		s.Emit("join", username)
// 	})

// 	server.OnEvent("/", "message", func(s socketio.Conn, msg string) {
// 		user := users[s.ID()]
// 		if user != nil {
// 			log.Printf("message from %s: %s", user.Username, msg)
// 			server.BroadcastToNamespace("/", "message", user.Username, msg)
// 		}
// 	})

// 	server.OnDisconnect("/", func(s socketio.Conn, reason string) {
// 		user := users[s.ID()]
// 		if user != nil {
// 			log.Printf("user %s disconnected: %s", user.Username, reason)
// 			delete(users, s.ID())
// 		}
// 	})

// 	go server.Serve()
// 	defer server.Close()

// 	mux := http.NewServeMux()
// 	mux.Handle("/socket.io/", server)
// 	mux.Handle("/", http.FileServer(http.Dir("./public")))

// 	corsHandler := cors.New(cors.Options{
// 		AllowedOrigins:   []string{"http://localhost:5500"}, // Update this with your client origin
// 		AllowCredentials: true,
// 		// Optionally configure other CORS options here
// 	}).Handler(mux)
// 	http.Handle("/socket.io/", corsHandler)
// 	http.Handle("/", http.FileServer(http.Dir("./public")))

// 	log.Println("Serving at localhost:8080...")
// 	log.Fatal(http.ListenAndServe(":8080", nil))
// }

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

type CurrentSocketConnection struct {
	Connection *websocket.Conn
}

// key: userID
// val: session and user details
// var users = make(map[string]*User)
var sessionPool = make(map[string]*CurrentSocketConnection)

// @Summary Connect to socket
// @Description
// @Tags socket
// @ID connect-socket
// @Accept  json
// @Produce  json
// @Success 204
// @Param token path string true "token"
// @Router /ws [get]
func (cc *SocketController) ConnectSocket(ctx *gin.Context) {
	token := ctx.Query("token")

	claims, err := auth.ValidateJWT(token)
	if err != nil {
		ctx.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Invalid token"})
		return
	}
	userID := claims.UserID

	conn, err := upgrader.Upgrade(ctx.Writer, ctx.Request, nil)
	if err != nil {
		log.Println(err)
		return
	}
	defer conn.Close()

	sessionPool[userID] = &CurrentSocketConnection{
		Connection: conn,
	}

	fmt.Println("Current amount of users: ", len(sessionPool))

	for {
		_, message, err := conn.ReadMessage()
		if err != nil {
			fmt.Println("User disconnected", err)
			// Delete userID from map
			delete(sessionPool, userID)
			fmt.Println("Current amount of users: ", len(sessionPool))
			return
		}

		fmt.Println("Received message:", string(message))
	}
}

// @Summary Send message to socket
// @Description
// @Tags socket
// @ID send-message-to-socket
// @Accept  json
// @Produce  json
// @Param request body schemas.SendMessagePayload true "query params"
// @Success 204
// @Router /send-message [post]
func (cc *SocketController) SendMessage(ctx *gin.Context) {
	var payload *schemas.SendMessagePayload

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	for _, userID := range payload.Users {
		connection, exists := sessionPool[userID]
		if exists {
			conn := connection.Connection
			newMessage := schemas.MakeMessageReceived(payload.Message)
			err := conn.WriteJSON(newMessage)
			utils.HandleErrorGin(ctx, err)
		}
	}

	ctx.Status(http.StatusNoContent)
}
