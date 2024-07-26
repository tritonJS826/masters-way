package controllers

import (
	"log"
	"mw-chat-websocket/internal/services"
	"net/http"

	"github.com/gin-gonic/gin"

	socketio "github.com/googollee/go-socket.io"
	"github.com/rs/cors"
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
func (cc *SocketController) ConnectSocket(ctx *gin.Context) {
	server := socketio.NewServer(nil)

	server.OnConnect("/", func(s socketio.Conn) error {
		log.Println("connected:", s.ID())
		return nil
	})

	server.OnEvent("/", "join", func(s socketio.Conn, username string) {
		users[s.ID()] = &User{
			ID:       s.ID(),
			Username: username,
		}
		log.Printf("user %s joined as %s", s.ID(), username)
		s.Emit("join", username)
	})

	server.OnEvent("/", "message", func(s socketio.Conn, msg string) {
		user := users[s.ID()]
		if user != nil {
			log.Printf("message from %s: %s", user.Username, msg)
			server.BroadcastToNamespace("/", "message", user.Username, msg)
		}
	})

	server.OnDisconnect("/", func(s socketio.Conn, reason string) {
		user := users[s.ID()]
		if user != nil {
			log.Printf("user %s disconnected: %s", user.Username, reason)
			delete(users, s.ID())
		}
	})

	go server.Serve()
	defer server.Close()

	mux := http.NewServeMux()
	mux.Handle("/socket.io/", server)
	mux.Handle("/", http.FileServer(http.Dir("./public")))

	corsHandler := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:5500"}, // Update this with your client origin
		AllowCredentials: true,
		// Optionally configure other CORS options here
	}).Handler(mux)
	http.Handle("/socket.io/", corsHandler)
	http.Handle("/", http.FileServer(http.Dir("./public")))

	log.Println("Serving at localhost:8080...")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
