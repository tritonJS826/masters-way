package controllers

import (
	"fmt"
	"mw-chat-bff/internal/schemas"
	"mw-chat-bff/internal/services"
	"net/http"

	"github.com/gin-gonic/gin"
)

type P2PRoomsController struct {
	P2PRoomsService services.IP2PRoomsService
}

func NewP2PRoomsController(p2pService services.IP2PRoomsService) *P2PRoomsController {
	return &P2PRoomsController{
		P2PRoomsService: p2pService,
	}
}

// @Summary Get p2p rooms for user
// @Description
// @Tags p2p
// @ID get-p2p-rooms
// @Accept  json
// @Produce  json
// @Success 200 {object} schemas.GetRoomsResponse
// @Router /p2p-rooms [get]
func (pc *P2PRoomsController) GetP2PRooms(ctx *gin.Context) {
	ctx.JSON(http.StatusOK, &schemas.GetRoomsResponse{})
}

// @Summary Get p2p room by id
// @Description
// @Tags p2p
// @ID get-p2p-room-by-id
// @Accept  json
// @Produce  json
// @Param p2pRoomId path string true "p2p room Id"
// @Success 200 {object} schemas.MessageResponse
// @Router /p2p-rooms/{p2pRoomId} [get]
func (pc *P2PRoomsController) GetP2PRoomById(ctx *gin.Context) {
	p2pRoomId := ctx.Param("p2pRoomId")
	fmt.Println(p2pRoomId)

	pc.P2PRoomsService.GetP2PRoomById(ctx)
	ctx.JSON(http.StatusOK, &schemas.RoomPopulatedResponse{})
}

// @Summary Create p2p room for user
// @Description
// @Tags p2p
// @ID create-p2p-room
// @Accept  json
// @Produce  json
// @Success 200 {object} schemas.MessageResponse
// @Router /p2p-rooms [post]
func (pc *P2PRoomsController) CreateP2PRoom(ctx *gin.Context) {
	var payload *schemas.CreateP2PRoomPayload

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, &schemas.RoomPopulatedResponse{})
}

// @Summary Update p2p room for user
// @Description
// @Tags p2p
// @ID update-p2p-room
// @Accept  json
// @Produce  json
// @Param p2pRoomId path string true "p2p room Id"
// @Success 200 {object} schemas.MessageResponse
// @Router /p2p-rooms/{p2pRoomId} [patch]
func (pc *P2PRoomsController) UpdateP2PRoom(ctx *gin.Context) {
	p2pRoomId := ctx.Param("p2pRoomId")
	fmt.Println(p2pRoomId)

	ctx.JSON(http.StatusOK, &schemas.RoomPopulatedResponse{})
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
func (pc *P2PRoomsController) CreateMessageInP2PRoom(ctx *gin.Context) {
	var payload *schemas.CreateMessagePayload

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	ctx.JSON(http.StatusOK, &schemas.MessageResponse{})
}
