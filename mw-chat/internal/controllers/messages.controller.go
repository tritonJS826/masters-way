package controllers

import (
	"mwchat/internal/auth"
	"mwchat/internal/schemas"
	"mwchat/internal/services"
	"mwchat/pkg/utils"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type MessagesController struct {
	messagesService services.IMessagesService
}

func NewMessagesController(messagesService services.IMessagesService) *MessagesController {
	return &MessagesController{messagesService}
}

// @Summary Create message in room
// @Description
// @Tags room
// @ID create-message-in-room
// @Accept  json
// @Produce  json
// @Param request body schemas.CreateMessagePayload true "query params"
// @Param roomId path string true "room Id"
// @Success 200 {object} schemas.CreateMessageResponse
// @Router /rooms/{roomId}/messages [post]
func (messagesController *MessagesController) CreateMessage(ctx *gin.Context) {
	var payload *schemas.CreateMessagePayload

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	roomId := ctx.Param("roomId")
	roomUUID := uuid.MustParse(roomId)

	userIDRaw, _ := ctx.Get(auth.ContextKeyUserID)
	userUUID := uuid.MustParse(userIDRaw.(string))

	params := &services.CreateMessageParams{
		OwnerUUID: userUUID,
		RoomUUID:  roomUUID,
		Text:      payload.Message,
	}
	message, err := messagesController.messagesService.CreateMessage(ctx, params)
	utils.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusOK, message)
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
func (messagesController *MessagesController) UpdateMessageStatus(ctx *gin.Context) {
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
