package controllers

import (
	"mw-chat-bff/internal/schemas"
	"mw-chat-bff/internal/services"
	utils "mw-chat-bff/internal/utils"
	"net/http"

	"github.com/gin-gonic/gin"
)

type MessagesController struct {
	roomsService services.IMessagesService
}

func NewMessagesController(roomsService services.IMessagesService) *MessagesController {
	return &MessagesController{roomsService}
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
	messageIDParam := ctx.Param("messageId")

	var payload *schemas.UpdateMessageStatusPayload

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	err := messagesController.roomsService.UpdateMessageStatus(ctx, messageIDParam, payload.IsRead)
	utils.HandleErrorGin(ctx, err)

	ctx.Status(http.StatusNoContent)
}
