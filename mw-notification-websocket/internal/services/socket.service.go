package services

import (
	"fmt"
	eventfactory "mw-chat-websocket/internal/eventFactory"
	"mw-chat-websocket/internal/schemas"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
)

type CurrentSocketConnection struct {
	// string is unique key for session
	Connections map[string]*websocket.Conn
}

// key: userID
// val: session and user details
// var users = make(map[string]*User)
var sessionPool = make(map[string]*CurrentSocketConnection)

type SocketService struct {
}

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

func NewSocketService() *SocketService {
	return &SocketService{}
}

func (socketService *SocketService) ConnectSocket(ctx *gin.Context, userID string) error {
	conn, err := upgrader.Upgrade(ctx.Writer, ctx.Request, nil)
	if err != nil {
		return err
	}
	defer conn.Close()

	connectionID := time.Now().Format(time.RFC3339Nano)
	fmt.Println(connectionID)

	if sessionPool[userID] == nil {
		sessionPool[userID] = &CurrentSocketConnection{
			Connections: map[string]*websocket.Conn{},
		}
	}
	sessionPool[userID].Connections[connectionID] = conn

	totalConnections := 0
	for _, session := range sessionPool {
		totalConnections += len(session.Connections)
	}

	fmt.Println("Current amount of users: ", len(sessionPool))
	fmt.Println("Total Connections: ", totalConnections)

	for {
		_, message, err := conn.ReadMessage()
		if err != nil {

			delete(sessionPool[userID].Connections, connectionID)

			totalConnections := 0
			for _, session := range sessionPool {
				totalConnections += len(session.Connections)
			}
			fmt.Println("Current amount of users: ", len(sessionPool))
			fmt.Println("Total Connections: ", totalConnections)
			return err
		}

		fmt.Println("Received message:", string(message))
	}
}

func (socketService *SocketService) SendNotificationReceivedEvent(ctx *gin.Context, payload *schemas.SendNotificationPayload) error {

	session, exists := sessionPool[payload.UserUUID]
	if exists {
		for _, connection := range session.Connections {
			newNotification := eventfactory.MakeNotificationReceivedEvent(*payload)
			err := connection.WriteJSON(newNotification)
			return err
		}
	}

	return nil
}
