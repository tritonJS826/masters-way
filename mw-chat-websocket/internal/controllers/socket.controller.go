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
// @Param request body schemas.MessageResponse true "query params"
// @Success 204
// @Router /send-message [post]
func (cc *SocketController) SendMessage(ctx *gin.Context) {
	var payload *schemas.MessageResponse

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	fmt.Println("payload", payload)

	// payload := schemas.MessageResponse{
	// 	OwnerID:       "3d922e8a-5d58-4b82-9a3d-83e2e73b3f91",
	// 	OwnerName:     "test.user",
	// 	OwnerImageURL: "https://lh3.google.com/u/0/d/18oHI9KoiaYvd_UowHyqsJbDLLhmuxPxr=w1919-h1079-iv2",
	// 	RoomID:        "78bdf878-3b83-4f97-8d2e-928c132a10cd",
	// 	Message:       "Hello dear friend!",
	// 	Readers:       []schemas.MessageReader{},
	// }

	connection := sessionPool["d2cb5e1b-44df-48d3-b7a1-34f3d7a5b7e2"].Connection

	newMessage := schemas.MakeMessageReceived(payload)
	err := connection.WriteJSON(newMessage)
	utils.HandleErrorGin(ctx, err)

	ctx.Status(http.StatusNoContent)
}

// payload := schemas.MessageResponse{
// 	OwnerID:       "3f6f6cd5-f45e-4805-8f56-b0bcb4c3b3f9",
// 	OwnerName:     "test.user",
// 	OwnerImageURL: "https://lh3.google.com/u/0/d/18oHI9KoiaYvd_UowHyqsJbDLLhmuxPxr=w1919-h1079-iv2",
// 	Message:       "Hello dear friend!",
// 	Readers:       []schemas.MessageReader{},
// }
