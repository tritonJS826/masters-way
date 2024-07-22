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

type P2PRoomsController struct {
	P2PService services.P2PService
}

func NewP2PRoomsController(P2PService services.P2PService) *P2PRoomsController {
	return &P2PRoomsController{P2PService: P2PService}
}

// @Summary Get p2p rooms for user
// @Description
// @Tags p2p
// @ID get-p2p-rooms
// @Accept  json
// @Produce  json
// @Success 200 {object} schemas.GetRoomsResponse
// @Router /p2p-rooms [get]
func (pc *P2PRoomsController) HandleGetP2PRooms(ctx *gin.Context) {
	userUUIDRaw, _ := ctx.Get(auth.ContextKeyUserID)
	userUUID := uuid.MustParse(userUUIDRaw.(string))

	p2pRooms, err := pc.P2PService.GetP2PRoomsWithInterlocutor(ctx, userUUID)
	utils.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusOK, p2pRooms)
}

// @Summary Get p2p room by id
// @Description
// @Tags p2p
// @ID get-p2p-room-by-id
// @Accept  json
// @Produce  json
// @Param p2pRoomId path string true "p2p room Id"
// @Success 200 {object} schemas.RoomPopulatedResponse
// @Router /p2p-rooms/{p2pRoomId} [get]
func (pc *P2PRoomsController) HandleGetP2PRoomById(ctx *gin.Context) {
	p2pRoomIdParam := ctx.Param("p2pRoomId")

	p2pRoom, err := pc.P2PService.GetP2PRoomWithMessages(ctx, uuid.MustParse(p2pRoomIdParam))
	utils.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusOK, p2pRoom)
}

// @Summary Create p2p room for user
// @Description
// @Tags p2p
// @ID create-p2p-room
// @Accept  json
// @Produce  json
// @Success 200 {object} schemas.RoomPopulatedResponse
// @Router /p2p-rooms [post]
func (pc *P2PRoomsController) HandleCreateP2PRoom(ctx *gin.Context) {
	var payload *schemas.CreateP2PRoomPayload

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	invitingUserUUIDRaw, _ := ctx.Get(auth.ContextKeyUserID)
	invitingUserUUID := uuid.MustParse(invitingUserUUIDRaw.(string))

	invitedUserUUID := uuid.MustParse(payload.UserID)

	newP2PRoom, err := pc.P2PService.CreateP2PRoom(ctx, invitingUserUUID, invitedUserUUID)
	utils.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusOK, newP2PRoom)
}

// @Summary Update p2p room for user
// @Description
// @Tags p2p
// @ID update-p2p-room
// @Accept  json
// @Produce  json
// @Param p2pRoomId path string true "p2p room Id"
// @Success 200 {object} schemas.RoomPopulatedResponse
// @Router /p2p-rooms/{p2pRoomId} [patch]
func (pc *P2PRoomsController) HandleUpdateP2PRoom(ctx *gin.Context) {
	var payload *schemas.RoomUpdatePayload

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	p2pRoomId := ctx.Param("p2pRoomId")
	p2pRoomUUID := uuid.MustParse(p2pRoomId)

	userUUIDRaw, _ := ctx.Get(auth.ContextKeyUserID)
	userUUID := uuid.MustParse(userUUIDRaw.(string))

	params := &services.BlockOrUnblockRoomParams{
		UserUUID:  userUUID,
		RoomUUID:  p2pRoomUUID,
		IsBlocked: payload.IsBlocked,
	}

	err := pc.P2PService.BlockOrUnblockP2PRoom(ctx, params)
	utils.HandleErrorGin(ctx, err)

	p2pRoom, err := pc.P2PService.GetP2PRoomWithMessages(ctx, p2pRoomUUID)
	utils.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusOK, p2pRoom)
}

// @Summary Create message in p2p room
// @Description
// @Tags p2p
// @ID make-message-in-p2p-room
// @Accept  json
// @Produce  json
// @Param request body schemas.CreateMessagePayload true "query params"
// @Param p2pRoomId path string true "p2p room Id"
// @Success 200 {object} schemas.MessageResponse
// @Router /p2p-rooms/{p2pRoomId}/messages [post]
func (pc *P2PRoomsController) HandleCreateMessageInP2PRoom(ctx *gin.Context) {
	var payload *schemas.CreateMessagePayload

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	userUUIDRaw, _ := ctx.Get(auth.ContextKeyUserID)
	userUUID := uuid.MustParse(userUUIDRaw.(string))

	params := &services.RoomMessageParams{
		OwnerUUID: userUUID,
		RoomUUID:  uuid.MustParse(payload.RoomID),
		Text:      payload.Message,
	}

	message, err := pc.P2PService.CreateMessageInP2PRoom(ctx, params)
	utils.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusOK, message)
}
