package controllers

import (
	"context"
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

type Client struct {
	ID   string            // e.g., unique ID for this connection
	User *schemas.UserInfo // Optional: Associate a user if relevant

	conn *websocket.Conn // The actual websocket connection

	// send is a buffered channel for outgoing messages.
	// Messages are structs that will be marshaled to JSON.
	send chan interface{} // or chan []byte if you pre-marshal

	// Context for graceful shutdown
	ctx    context.Context
	cancel context.CancelFunc

	// mu for connection-specific state, if any (less common for writes, but  good for reads/cleanup)
	// writeMu sync.Mutex // Not needed with the channel pattern, but illustrates per-connection locks
}

func NewClient(wsConn *websocket.Conn, id string, userInfo *schemas.UserInfo, onDisconnect func()) *Client {
	ctx, cancel := context.WithCancel(context.Background())
	c := &Client{
		ID:     id,
		User:   userInfo,
		conn:   wsConn,
		send:   make(chan interface{}, 256),
		ctx:    ctx,
		cancel: cancel,
	}

	go c.writer()
	go c.reader(onDisconnect)

	return c
}

func (c *Client) SendMessage(message interface{}) error {
	select {
	case c.send <- message:
		return nil
	case <-c.ctx.Done():
		return c.ctx.Err() // Client is shutting down
	default:
		// Optional: handle backpressure. If the channel is full,
		// you might log a warning, drop the message, or block.
		// For most use cases, blocking (removing the default case) is fine.
		log.Printf("Warning: Send channel for client %s is full, dropping message.", c.ID)
		return nil // Or return an error indicating congestion
	}
}

// Close gracefully shuts down the client connection.
func (c *Client) Close() {
	c.cancel()     // Signal goroutines to stop
	c.conn.Close() // Close the underlying websocket connection
}

func (c *Client) writer() {
	defer func() {
		c.conn.Close() // Ensure connection is closed when this goroutine exits
		log.Printf("Client writer %s stopped.", c.ID)
	}()

	// Optional: Ping interval to keep the connection alive (for browsers, load balancers)
	pingPeriod := 30 * time.Second
	pingTicker := time.NewTicker(pingPeriod)
	defer pingTicker.Stop()

	for {
		select {
		case message, ok := <-c.send:
			if !ok {
				// Channel closed, indicating shutdown
				c.conn.WriteMessage(websocket.CloseMessage, []byte{})
				return
			}
			// This is the only place WriteJSON is called for this connection
			if err := c.conn.WriteJSON(message); err != nil {
				log.Printf("Error writing JSON to client %s: %v", c.ID, err)
				// Handle specific write errors (e.g., broken pipe), maybe close connection
				return // Exit writer loop on error
			}
		case <-pingTicker.C:
			// Send a ping message
			if err := c.conn.WriteMessage(websocket.PingMessage, nil); err != nil {
				log.Printf("Error sending ping to client %s: %v", c.ID, err)
				return // Exit writer loop on error
			}
		case <-c.ctx.Done():
			// Context cancelled, initiate graceful shutdown
			log.Printf("Client writer %s received shutdown signal.", c.ID)
			return
		}
	}
}

func (c *Client) reader(onDisconnect func()) {
	defer func() {
		c.conn.Close()
		log.Printf("Client reader %s stopped.", c.ID)
		if onDisconnect != nil {
			onDisconnect()
		}
	}()

	// Set read limits and pong handler
	c.conn.SetReadLimit(512)                                 // Max message size
	c.conn.SetReadDeadline(time.Now().Add(60 * time.Second)) // Pong deadline

	c.conn.SetPongHandler(func(string) error {
		c.conn.SetReadDeadline(time.Now().Add(60 * time.Second)) // Extend deadline on pong
		return nil
	})

	for {
		select {
		case <-c.ctx.Done():
			return // Context cancelled, stop reading
		default:
			// ReadMessage blocks until a message is received or an error occurs
			messageType, p, err := c.conn.ReadMessage()
			if err != nil {
				if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway,
					websocket.CloseAbnormalClosure) {
					log.Printf("Client %s unexpected close error: %v", c.ID, err)
				} else {
					log.Printf("Client %s read error: %v", c.ID, err)
				}
				return // Exit reader loop on error/disconnect
			}
			// Process incoming message based on messageType
			switch messageType {
			case websocket.TextMessage:
				log.Printf("Received text from client %s: %s", c.ID, p)
				// TODO: Process incoming client messages (e.g., game actions)
			case websocket.BinaryMessage:
				log.Printf("Received binary from client %s: %x", c.ID, p)
			case websocket.PingMessage:
				log.Printf("Received ping from client %s", c.ID)
				// Gorilla handles Pong automatically if SetPongHandler is set.
			}
		}
	}
}

type UserInfo struct {
	UserUuid string
}

type ConnectionsDetails struct {
	// string is unique key for session
	Connections  map[string]*Client
	Users        map[string]*UserInfo
	UserHostUuid string
	// percentage from 0.01x to 100x. Default 1 -->
	SpeedScale float32
	// seconds from 1 to 1800. Default 10
	EnemySpawnInterval int
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
		log.Printf("Failed to upgrade connection for user %s: %v", userID, err)
		return
	}

	connectionID := time.Now().Format(time.RFC3339Nano)
	userInfo := &schemas.UserInfo{UserUuid: userID}

	onDisconnect := func() {
		mu.Lock()
		defer mu.Unlock()

		session, exists := sessionPool[sessionUuid]
		if !exists {
			return
		}

		delete(session.Connections, connectionID)

		isUserStillConnected := lo.SomeBy(lo.Values(session.Connections), func(client *Client) bool {
			return client.User.UserUuid == userID
		})

		if !isUserStillConnected {
			delete(session.Users, userID)
		}

		if len(session.Connections) == 0 {
			delete(sessionPool, sessionUuid)
			log.Printf("Session %s closed as it has no more clients.", sessionUuid)
		}
	}

	client := NewClient(conn, connectionID, userInfo, onDisconnect)

	mu.Lock()
	defer mu.Unlock()

	session, exists := sessionPool[sessionUuid]
	if !exists {
		session = &ConnectionsDetails{
			Connections:        make(map[string]*Client),
			Users:              make(map[string]*UserInfo),
			UserHostUuid:       userID,
			SpeedScale:         1,
			EnemySpawnInterval: 10,
		}
		sessionPool[sessionUuid] = session
	}

	session.Connections[client.ID] = client
	if _, userExists := session.Users[userID]; !userExists {
		session.Users[userID] = &UserInfo{UserUuid: userID}
	}

	log.Printf("Client %s (user: %s) connected to session %s.", client.ID, userID, sessionUuid)
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
	var userHostUuid string
	mu.RLock()
	session, exists := sessionPool[sessionUuid]
	if exists {
		for _, connection := range session.Connections {
			newMessage := eventFactory.MakeUserJoinedSessionEvent(schemas.UserJoinedSessionEventPayload{UserUuid: payload.UserUuid})
			err := connection.SendMessage(newMessage)
			utils.HandleErrorGin(ctx, err)
		}

		userHostUuid = session.UserHostUuid
		currentUsers = lo.MapToSlice(session.Users, func(userUuid string, userInfo *UserInfo) schemas.UserInfo {
			return schemas.UserInfo{
				UserUuid: userInfo.UserUuid,
			}
		})
	}
	mu.RUnlock()

	response := schemas.UserJoinedSessionEventResponse{
		CurrentUsers: currentUsers,
		UserHostUuid: userHostUuid,
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
			err := connection.SendMessage(newMessage)
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
		session.SpeedScale = payload.SpeedScale
		session.EnemySpawnInterval = payload.EnemySpawnInterval

		for _, connection := range session.Connections {
			newMessage := eventFactory.MakeHostStartedGameEvent(schemas.HostStartedGameEventPayload{
				SpeedScale:         session.SpeedScale,
				EnemySpawnInterval: session.EnemySpawnInterval,
			})
			err := connection.SendMessage(newMessage)
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
			err := connection.SendMessage(newMessage)
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
			err := connection.SendMessage(newMessage)
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
			err := connection.SendMessage(newMessage)
			utils.HandleErrorGin(ctx, err)
		}
	}
	mu.RUnlock()

	ctx.Status(http.StatusNoContent)
}
