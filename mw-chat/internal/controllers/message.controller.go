package controllers

import (
	"mw-chat/internal/auth"
	"mw-chat/internal/schemas"
	"mw-chat/internal/services"
	"mw-chat/pkg/utils"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type MessageController struct {
	messagesService *services.MessagesService
}

func NewMessagesController(messagesService *services.MessagesService) *MessageController {
	return &MessageController{messagesService}
}

// @Summary Create message
// @Description
// @Tags message
// @ID create-message
// @Accept  json
// @Produce  json
// @Param request body schemas.CreateMessagePayload true "query params"
// @Success 200 {object} schemas.CreateMessageResponse
// @Router /messages [post]
func (messagesController *MessageController) CreateMessage(ctx *gin.Context) {
	var payload *schemas.CreateMessagePayload

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	userIDRaw, _ := ctx.Get(auth.ContextKeyUserID)
	userID := userIDRaw.(string)

	params := &services.CreateMessageParams{
		OwnerUUID: userID,
		RoomUUID:  payload.RoomID,
		Text:      payload.Message,
	}
	message, err := messagesController.messagesService.CreateMessage(ctx, params)
	utils.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusOK, message)
}

// @Summary Create greeting message
// @Description
// @Tags message
// @ID create-greeting-message
// @Accept  json
// @Produce  json
// @Param request body schemas.CreateGreetingMessagePayload true "query params"
// @Success 200
// @Router /messages/greeting [post]
func (messagesController *MessageController) CreateGreetingMessage(ctx *gin.Context) {
	var payload *schemas.CreateGreetingMessagePayload

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	params := &services.CreateGreetingMessageParams{
		RoomUUID: payload.RoomID,
	}
	err := messagesController.messagesService.CreateGreetingMessage(ctx, params)
	utils.HandleErrorGin(ctx, err)

	ctx.Status(http.StatusOK)
}

// @Summary Update message status
// @Description Update message status by message Id
// @Tags message
// @ID update-message-status
// @Accept  json
// @Produce  json
// @Param request body schemas.UpdateMessageStatusPayload true "query params"
// @Param messageId path string true "message Id"
// @Success 204 "No Content"
// @Router /messages/{messageId}/message-status [patch]
func (messagesController *MessageController) UpdateMessageStatus(ctx *gin.Context) {
	var payload *schemas.UpdateMessageStatusPayload

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	messageIDParam := ctx.Param("messageId")
	userIDRaw, _ := ctx.Get(auth.ContextKeyUserID)

	params := &services.UpdateMessageStatusParams{
		MessageUUID: uuid.MustParse(messageIDParam),
		UserUUID:    uuid.MustParse(userIDRaw.(string)),
		IsRead:      payload.IsRead,
	}

	err := messagesController.messagesService.UpdateMessageStatus(ctx, params)
	utils.HandleErrorGin(ctx, err)

	ctx.Status(http.StatusNoContent)
}
