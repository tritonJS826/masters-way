package controllers

import (
	"fmt"
	"log"
	"mw-chat-websocket/internal/auth"
	eventfactory "mw-chat-websocket/internal/eventFactory"
	"mw-chat-websocket/internal/schemas"
	"mw-chat-websocket/internal/services"
	"mw-chat-websocket/pkg/utils"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
)

type SocketController struct {
	SocketService services.SocketService
}

func NewSocketController(socketService services.SocketService) *SocketController {
	return &SocketController{SocketService: socketService}
}

type CurrentSocketConnection struct {
	// string is unique key for session
	Connections map[string]*websocket.Conn
}

// key: userID
// val: session and user details
// var users = make(map[string]*User)
var sessionPool = make(map[string]*CurrentSocketConnection)

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

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
	userIDRaw, _ := ctx.Get(auth.ContextKeyUserID)
	userID := userIDRaw.(string)

	conn, err := upgrader.Upgrade(ctx.Writer, ctx.Request, nil)
	if err != nil {
		log.Println(err)
		return
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
			return
		}

		fmt.Println("Received message:", string(message))
	}
}

// @Summary Send notification to socket
// @Description
// @Tags socket
// @ID send-notification-event
// @Accept  json
// @Produce  json
// @Param request body schemas.SendNotificationPayload true "query params"
// @Success 204
// @Router /notification [post]
func (cc *SocketController) SendNotificationReceivedEvent(ctx *gin.Context) {
	var payload *schemas.SendNotificationPayload

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	session, exists := sessionPool[payload.UserUUID]
	if exists {
		for _, connection := range session.Connections {
			newNotification := eventfactory.MakeNotificationReceivedEvent(*payload)
			err := connection.WriteJSON(newNotification)
			utils.HandleErrorGin(ctx, err)
		}
	}

	ctx.Status(http.StatusNoContent)
}
