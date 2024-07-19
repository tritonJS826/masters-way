package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type P2PRoomsController struct {
}

func NewP2PRoomsController() *P2PRoomsController {
	return &P2PRoomsController{}
}

// @Summary Get p2p rooms for user
// @Description
// @Tags p2p
// @ID get-p2p-rooms
// @Accept  json
// @Produce  json
// @Success 200 {object} map[string]interface{}
// @Router /p2p-rooms [get]
func (pc *P2PRoomsController) GetP2PRooms(ctx *gin.Context) {
	ctx.JSON(http.StatusOK, gin.H{"message": "Get P2P Rooms"})
}

// @Summary Get p2p room by id
// @Description
// @Tags p2p
// @ID get-p2p-room-by-id
// @Accept  json
// @Produce  json
// @Param p2pRoomId path string true "p2p room Id"
// @Success 200 {object} map[string]interface{}
// @Router /p2p-rooms/{p2pRoomId} [get]
func (pc *P2PRoomsController) GetP2PRoomById(ctx *gin.Context) {
	p2pRoomId := ctx.Param("p2pRoomId")
	ctx.JSON(http.StatusOK, p2pRoomId)
}

// @Summary Create p2p room for user
// @Description
// @Tags p2p
// @ID create-p2p-room
// @Accept  json
// @Produce  json
// @Success 200 {object} map[string]interface{}
// @Router /p2p-rooms [post]
func (pc *P2PRoomsController) CreateP2PRoom(ctx *gin.Context) {
}

// @Summary Update p2p room for user
// @Description
// @Tags p2p
// @ID update-p2p-room
// @Accept  json
// @Produce  json
// @Param p2pRoomId path string true "p2p room Id"
// @Success 200 {object} map[string]interface{}
// @Router /p2p-rooms/{p2pRoomId} [patch]
func (pc *P2PRoomsController) UpdateP2PRoom(ctx *gin.Context) {
	p2pRoomId := ctx.Param("p2pRoomId")
	ctx.JSON(http.StatusOK, p2pRoomId)
}

type MakeMessageInP2PRoomPayload struct {
	P2PRoomId string `json:"p2pRoomId" validate:"required"`
	Message   string `json:"message" validate:"required"`
}

// @Summary Make message in p2p room
// @Description
// @Tags p2p
// @ID make-message-in-p2p-room
// @Accept  json
// @Produce  json
// @Param request body MakeMessageInP2PRoomPayload true "query params"
// @Param p2pRoomId path string true "p2p room Id"
// @Success 200 {object} map[string]interface{}
// @Router /p2p-rooms/{p2pRoomId}/messages [post]
func (pc *P2PRoomsController) MakeMessageInP2PRoom(ctx *gin.Context) {
	var payload *MakeMessageInP2PRoomPayload

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	ctx.JSON(http.StatusOK, payload)
}
