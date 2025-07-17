package controllers

import (
	"fmt"
	"log"
	"mw-test-websocket/internal/auth"
	eventFactory "mw-test-websocket/internal/eventFactory"
	"mw-test-websocket/internal/schemas"
	"mw-test-websocket/internal/services"
	"mw-test-websocket/pkg/utils"
	"net/http"
	"sync"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
	"github.com/samber/lo"
)

type SocketController struct {
	SocketService services.SocketService
}

func NewSocketController(socketService services.SocketService) *SocketController {
	return &SocketController{SocketService: socketService}
}

type UserInfo struct {
	UserUuid string
}

type ConnectionsDetails struct {
	// string is unique key for session
	Connections map[string]*websocket.Conn
	Users       map[string]*UserInfo
}

// key: session uuid
// val: session details and session users
// var users = make(map[string]*User)
var (
	sessionPool = make(map[string]*ConnectionsDetails)
	mu          sync.RWMutex
)

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
	sessionUuidRaw, _ := ctx.Get(auth.ContextKeySessionUuid)
	sessionUuid := sessionUuidRaw.(string)

	conn, err := upgrader.Upgrade(ctx.Writer, ctx.Request, nil)
	if err != nil {
		log.Println(err)
		return
	}
	defer conn.Close()

	connectionID := time.Now().Format(time.RFC3339Nano)
	fmt.Printf("socket connection: %s, sessionUuid: %s\n", connectionID, sessionUuid)

	// set session and user Data
	mu.Lock()
	session, exists := sessionPool[sessionUuid]
	if !exists {
		session = &ConnectionsDetails{
			Connections: make(map[string]*websocket.Conn),
			Users:       make(map[string]*UserInfo),
		}
		sessionPool[sessionUuid] = session
	}
	session.Connections[connectionID] = conn
	session.Users[userID] = &UserInfo{UserUuid: userID}
	mu.Unlock()

	// listen for the events
	for {
		fmt.Println("LISTENING !!!!")
		_, message, err := conn.ReadMessage()
		if err != nil {
			mu.Lock()
			if session, exists := sessionPool[sessionUuid]; exists {
				delete(session.Connections, connectionID)
				delete(session.Users, userID)

				if len(session.Connections) == 0 {
					delete(sessionPool, sessionUuid)
				}
			}
			mu.Unlock()

			return
		}

		fmt.Println("Received message:", string(message))
	}
}

// @Summary User joined session
// @Description
// @Tags socket
// @ID user-joined-session
// @Accept  json
// @Produce  json
// @Param sessionUuid path string true "sessionUuid"
// @Param request body schemas.UserJoinedSessionEventPayload true "query params"
// @Success 200 {object} schemas.UserJoinedSessionEventResponse
// @Router /session/{sessionUuid}/userJoinedSession [post]
func (cc *SocketController) SendUserJoinedSessionEvent(ctx *gin.Context) {
	sessionUuid := ctx.Param("sessionUuid")
	var payload *schemas.UserJoinedSessionEventPayload

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var currentUsers []schemas.UserInfo
	mu.RLock()
	session, exists := sessionPool[sessionUuid]
	if exists {
		for _, connection := range session.Connections {
			newMessage := eventFactory.MakeUserJoinedSessionEvent(schemas.UserJoinedSessionEventPayload{UserUuid: payload.UserUuid})
			err := connection.WriteJSON(newMessage)
			utils.HandleErrorGin(ctx, err)
		}

		currentUsers = lo.MapToSlice(session.Users, func(userUuid string, userInfo *UserInfo) schemas.UserInfo {
			return schemas.UserInfo{
				UserUuid: userInfo.UserUuid,
			}
		})
	}
	mu.RUnlock()

	response := schemas.UserJoinedSessionEventResponse{
		CurrentUsers: currentUsers,
	}

	ctx.JSON(http.StatusOK, response)
}

// @Summary User ready to start play
// @Description
// @Tags socket
// @ID user-ready-to-start-play
// @Accept  json
// @Produce  json
// @Param sessionUuid path string true "sessionUuid"
// @Param request body schemas.UserReadyToStartPlayEventPayload true "query params"
// @Success 204
// @Router /session/{sessionUuid}/userReadyToStartPlay [post]
func (cc *SocketController) SendUserReadyToStartPlayEvent(ctx *gin.Context) {
	sessionUuid := ctx.Param("sessionUuid")
	var payload *schemas.UserReadyToStartPlayEventPayload

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	mu.RLock()
	session, exists := sessionPool[sessionUuid]
	if exists {
		for _, connection := range session.Connections {
			newMessage := eventFactory.MakeUserReadyToStartPlayEvent(schemas.UserReadyToStartPlayEventPayload{UserUuid: payload.UserUuid})
			err := connection.WriteJSON(newMessage)
			utils.HandleErrorGin(ctx, err)
		}
	}
	mu.RUnlock()

	ctx.Status(http.StatusNoContent)
}

// @Summary host started game
// @Description
// @Tags socket
// @ID host-started-game
// @Accept  json
// @Produce  json
// @Param sessionUuid path string true "sessionUuid"
// @Param request body schemas.HostStartedGameEventPayload true "query params"
// @Success 204
// @Router /session/{sessionUuid}/hostStartedGame [post]
func (cc *SocketController) SendHostStartedGameEvent(ctx *gin.Context) {
	sessionUuid := ctx.Param("sessionUuid")
	var payload *schemas.HostStartedGameEventPayload

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	mu.RLock()
	session, exists := sessionPool[sessionUuid]
	if exists {
		for _, connection := range session.Connections {
			newMessage := eventFactory.MakeHostStartedGameEvent(schemas.HostStartedGameEventPayload{UserUuid: payload.UserUuid})
			err := connection.WriteJSON(newMessage)
			utils.HandleErrorGin(ctx, err)
		}
	}
	mu.RUnlock()

	ctx.Status(http.StatusNoContent)
}

// @Summary User captured target
// @Description
// @Tags socket
// @ID user-captured-target
// @Accept  json
// @Produce  json
// @Param sessionUuid path string true "sessionUuid"
// @Param request body schemas.UserCapturedTargetEventPayload true "query params"
// @Success 204
// @Router /session/{sessionUuid}/userCapturedTarget [post]
func (cc *SocketController) SendUserCapturedTargetEvent(ctx *gin.Context) {
	sessionUuid := ctx.Param("sessionUuid")
	var payload *schemas.UserCapturedTargetEventPayload

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	mu.RLock()
	session, exists := sessionPool[sessionUuid]
	if exists {
		for _, connection := range session.Connections {
			newMessage := eventFactory.MakeUserCapturedTargetEvent(schemas.UserCapturedTargetEventPayload{
				UserUuid:     payload.UserUuid,
				QuestionUuid: payload.QuestionUuid,
			})
			err := connection.WriteJSON(newMessage)
			utils.HandleErrorGin(ctx, err)
		}
	}
	mu.RUnlock()

	ctx.Status(http.StatusNoContent)
}

// @Summary User answered question
// @Description
// @Tags socket
// @ID user-answered-question
// @Accept  json
// @Produce  json
// @Param sessionUuid path string true "sessionUuid"
// @Param request body schemas.UserAnsweredQuestionEventPayload true "query params"
// @Success 204
// @Router /session/{sessionUuid}/userAnsweredQuestion [post]
func (cc *SocketController) SendUserAnsweredQuestionEvent(ctx *gin.Context) {
	sessionUuid := ctx.Param("sessionUuid")
	var payload *schemas.UserAnsweredQuestionEventPayload

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	mu.RLock()
	session, exists := sessionPool[sessionUuid]
	if exists {
		for _, connection := range session.Connections {
			newMessage := eventFactory.MakeUserAnsweredQuestionEvent(schemas.UserAnsweredQuestionEventPayload{
				UserUuid:     payload.UserUuid,
				QuestionUuid: payload.QuestionUuid,
			})
			err := connection.WriteJSON(newMessage)
			utils.HandleErrorGin(ctx, err)
		}
	}
	mu.RUnlock()

	ctx.Status(http.StatusNoContent)
}

// @Summary User answer handled by server
// @Description
// @Tags socket
// @ID user-answer-handled-by-server
// @Accept  json
// @Produce  json
// @Param sessionUuid path string true "sessionUuid"
// @Param request body schemas.UserAnswerHandledByServerEventPayload true "query params"
// @Success 204
// @Router /session/{sessionUuid}/userAnswerHandledByServer [post]
func (cc *SocketController) SendUserAnswerHandledByServerEvent(ctx *gin.Context) {
	sessionUuid := ctx.Param("sessionUuid")
	var payload *schemas.UserAnswerHandledByServerEventPayload

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	mu.RLock()
	session, exists := sessionPool[sessionUuid]
	if exists {
		for _, connection := range session.Connections {
			newMessage := eventFactory.MakeUserAnswerHandledByServerEvent(schemas.UserAnswerHandledByServerEventPayload{
				IsOk:                payload.IsOk,
				UserAnswer:          payload.UserAnswer,
				QuestionName:        payload.QuestionName,
				QuestionDescription: payload.QuestionDescription,
				QuestionAnswer:      payload.QuestionAnswer,
				ResultDescription:   payload.ResultDescription,
				Uuid:                payload.Uuid,
				UserUuid:            payload.UserUuid,
				QuestionUuid:        payload.QuestionUuid,
			})
			err := connection.WriteJSON(newMessage)
			utils.HandleErrorGin(ctx, err)
		}
	}
	mu.RUnlock()

	ctx.Status(http.StatusNoContent)
}
