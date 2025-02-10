package controllers

import (
	"fmt"
	"mw-chat-bff/internal/schemas"
	"mw-chat-bff/internal/services"
	util "mw-chat-bff/internal/utils"
	utils "mw-chat-bff/internal/utils"
	"net/http"

	"github.com/gin-gonic/gin"
)

type MessageController struct {
	generalService       *services.GeneralService
	chatService          *services.ChatService
	chatWebSocketService *services.ChatWebSocketService
}

func NewMessageController(generalService *services.GeneralService, chatService *services.ChatService, chatWebSocketService *services.ChatWebSocketService) *MessageController {
	return &MessageController{generalService, chatService, chatWebSocketService}
}

// @Summary Create message
// @Description
// @Tags message
// @ID create-message
// @Accept  json
// @Produce  json
// @Param request body schemas.CreateMessagePayload true "query params"
// @Success 200 {object} schemas.MessageResponse
// @Router /messages [post]
func (cc *MessageController) CreateMessage(ctx *gin.Context) {
	var payload *schemas.CreateMessagePayload

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	messageResponse, err := cc.chatService.CreateMessage(ctx, payload.Message, payload.RoomID)
	util.HandleErrorGin(ctx, err)

	userMap, err := cc.generalService.GetUserMapByIds(ctx, []string{messageResponse.Message.OwnerID})
	if err != nil {
		util.HandleErrorGin(ctx, fmt.Errorf("general service error: %w", err))
	}

	messageResponse.Message.OwnerName = userMap[messageResponse.Message.OwnerID].Name
	messageResponse.Message.OwnerImageURL = userMap[messageResponse.Message.OwnerID].ImageURL

	err = cc.chatWebSocketService.SendMessage(ctx, payload.RoomID, messageResponse)
	util.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusOK, messageResponse.Message)
}

// @Summary Update message status
// @Description Update message status by message Id
// @Tags message
// @ID update-message-status
// @Accept  json
// @Produce  json
// @Param request body schemas.UpdateMessageStatusPayload true "query params"
// @Param messageId path string true "message Id"
// @Success 204
// @Router /messages/{messageId}/message-status [patch]
func (messagesController *MessageController) UpdateMessageStatus(ctx *gin.Context) {
	messageIDParam := ctx.Param("messageId")

	var payload *schemas.UpdateMessageStatusPayload

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	err := messagesController.chatService.UpdateMessageStatus(ctx, messageIDParam, payload.IsRead)
	utils.HandleErrorGin(ctx, err)

	ctx.Status(http.StatusNoContent)
}
