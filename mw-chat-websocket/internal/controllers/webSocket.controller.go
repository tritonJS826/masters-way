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

	lop "github.com/samber/lo/parallel"

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
	Connection *websocket.Conn
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
// @ID send-message-event
// @Accept  json
// @Produce  json
// @Param request body schemas.SendMessagePayload true "query params"
// @Success 204
// @Router /messages [post]
func (cc *SocketController) SendMessageReceivedEvent(ctx *gin.Context) {
	var payload *schemas.SendMessagePayload

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	lop.ForEach(payload.Users, func(userID string, _ int) {
		session, exists := sessionPool[userID]
		if exists {
			newMessage := eventfactory.MakeMessageReceivedEvent(payload.Message)
			err := session.Connection.WriteJSON(newMessage)
			utils.HandleErrorGin(ctx, err)
		}
	})

	ctx.Status(http.StatusNoContent)
}

// @Summary Send created room event
// @Description
// @Tags socket
// @ID send-room-event
// @Accept  json
// @Produce  json
// @Param request body schemas.RoomPopulatedResponse true "query params"
// @Success 204
// @Router /rooms [post]
func (cc *SocketController) SendRoomCreatedEvent(ctx *gin.Context) {
	var payload *schemas.RoomPopulatedResponse

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	lop.ForEach(payload.Users, func(user schemas.UserResponse, _ int) {
		session, exists := sessionPool[user.UserID]
		if exists {
			newRoom := eventfactory.MakeRoomCreatedEvent(*payload)
			err := session.Connection.WriteJSON(newRoom)
			utils.HandleErrorGin(ctx, err)
		}
	})

	ctx.Status(http.StatusNoContent)
}
