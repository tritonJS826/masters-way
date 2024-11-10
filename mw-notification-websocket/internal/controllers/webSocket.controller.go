package controllers

import (
	"mw-chat-websocket/internal/auth"
	"mw-chat-websocket/internal/schemas"
	"mw-chat-websocket/internal/services"
	"mw-chat-websocket/pkg/utils"
	"net/http"

	"github.com/gin-gonic/gin"
)

type SocketController struct {
	SocketService services.SocketService
}

func NewSocketController(socketService services.SocketService) *SocketController {
	return &SocketController{SocketService: socketService}
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

	err := cc.SocketService.ConnectSocket(ctx, userID)
	utils.HandleErrorGin(ctx, err)

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

	err := cc.SocketService.SendNotificationReceivedEvent(ctx, payload)
	utils.HandleErrorGin(ctx, err)

	ctx.Status(http.StatusNoContent)
}
