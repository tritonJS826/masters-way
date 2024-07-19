package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type GroupRoomsController struct {
}

func NewGroupRoomsController() *GroupRoomsController {
	return &GroupRoomsController{}
}

// @Summary Get group rooms preview for user
// @Description
// @Tags group
// @ID get-group-rooms
// @Accept  json
// @Produce  json
// @Success 200 {object} map[string]interface{}
// @Router /group-rooms [get]
func (cc *GroupRoomsController) GetGroupRoomsPreview(ctx *gin.Context) {

}

// @Summary Get group room by id
// @Description
// @Tags group
// @ID get-group-room-by-id
// @Accept  json
// @Produce  json
// @Param groupRoomId path string true "group room Id"
// @Success 200 {object} map[string]interface{}
// @Router /group-rooms/{groupRoomId} [get]
func (cc *GroupRoomsController) GetGroupRoomById(ctx *gin.Context) {
	groupRoomId := ctx.Param("groupRoomId")

	ctx.JSON(http.StatusOK, groupRoomId)
}

// @Summary Create group rooms for user
// @Description
// @Tags group
// @ID create-group-rooms
// @Accept  json
// @Produce  json
// @Success 200 {object} map[string]interface{}
// @Router /group-rooms [post]
func (cc *GroupRoomsController) CreateGroupRoom(ctx *gin.Context) {

}

// @Summary Update group rooms for user
// @Description
// @Tags group
// @ID update-group-rooms
// @Accept  json
// @Produce  json
// @Param groupRoomId path string true "group room Id"
// @Success 200 {object} map[string]interface{}
// @Router /group-rooms/{groupRoomId} [patch]
func (cc *GroupRoomsController) UpdateGroupRoom(ctx *gin.Context) {
	groupRoomId := ctx.Param("groupRoomId")
	ctx.JSON(http.StatusOK, groupRoomId)
}

// @Summary Add user to group room
// @Description
// @Tags group
// @ID add-user-to-group
// @Accept  json
// @Produce  json
// @Param groupRoomId path string true "group room Id"
// @Param userId path string true "user Id to delete"
// @Success 200 {object} map[string]interface{}
// @Router /group-rooms/{groupRoomId}/users/{userId} [post]
func (cc *GroupRoomsController) AddUserToGroupRoom(ctx *gin.Context) {
	groupRoomId := ctx.Param("groupRoomId")
	userId := ctx.Param("userId")

	ctx.JSON(http.StatusOK, groupRoomId+userId)

}

// @Summary Delete user to group room
// @Description
// @Tags group
// @ID delete-user-to-group
// @Accept  json
// @Produce  json
// @Param groupRoomId path string true "group room Id"
// @Param userId path string true "user Id to delete"
// @Success 200 {object} map[string]interface{}
// @Router /group-rooms/{groupRoomId}/users/{userId} [delete]
func (cc *GroupRoomsController) DeleteUserFromGroupRoom(ctx *gin.Context) {
	groupRoomId := ctx.Param("groupRoomId")
	userId := ctx.Param("userId")

	ctx.JSON(http.StatusOK, groupRoomId+userId)

}

// @Summary Get requests to group room
// @Description
// @Tags group
// @ID get-requests-to-group-room
// @Accept  json
// @Produce  json
// @Success 200 {object} map[string]interface{}
// @Router /group-rooms/requests [get]
func (cc *GroupRoomsController) GetRequestsToGroupRoom(ctx *gin.Context) {

}

type MakeRequestsToGroupRoomPayload struct {
	GroupRoomId string `json:"groupRoomId" validate:"required"`
	UserToAdd   string `json:"userToAdd" validate:"required"`
}

// @Summary Make requests to group room
// @Description
// @Tags group
// @ID make-requests-to-group-room
// @Accept  json
// @Produce  json
// @Param request body MakeRequestsToGroupRoomPayload true "query params"
// @Success 200 {object} map[string]interface{}
// @Router /group-rooms/requests [post]
func (cc *GroupRoomsController) MakeRequestsToGroupRoom(ctx *gin.Context) {
	var payload *MakeRequestsToGroupRoomPayload

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
}

// @Summary Accept requests to group room
// @Description
// @Tags group
// @ID accept-requests-to-group-room
// @Accept  json
// @Produce  json
// @Param groupRoomId path string true "groupRoom Id to accept request"
// @Success 200 {object} map[string]interface{}
// @Router /group-rooms/requests/accept/{groupRoomId} [post]
func (cc *GroupRoomsController) AcceptRequestsToGroupRoom(ctx *gin.Context) {
	groupRoomId := ctx.Param("groupRoomId")

	ctx.JSON(http.StatusOK, groupRoomId)
}

// @Summary Delete requests to group room
// @Description
// @Tags group
// @ID delete-requests-to-group-room
// @Accept  json
// @Produce  json
// @Param groupRoomId path string true "groupRoom Id to delete request"
// @Success 200 {object} map[string]interface{}
// @Router /group-rooms/requests/decline/{groupRoomId} [delete]
func (cc *GroupRoomsController) DeclineRequestsToGroupRoom(ctx *gin.Context) {
	groupRoomId := ctx.Param("groupRoomId")

	ctx.JSON(http.StatusOK, groupRoomId)

}

type MakeMessageInGroupRoomPayload struct {
	GroupRoomId string `json:"groupRoomId" validate:"required"`
	UserToAdd   string `json:"userToAdd" validate:"required"`
}

// @Summary Make message to group room
// @Description
// @Tags group
// @ID make-message-in-group-room
// @Accept  json
// @Produce  json
// @Param request body MakeMessageInGroupRoomPayload true "query params"
// @Param groupRoomId path string true "group room Id"
// @Success 200 {object} map[string]interface{}
// @Router /group-rooms/{groupRoomId}/messages [post]
func (cc *GroupRoomsController) MakeMessageInGroupRoom(ctx *gin.Context) {
	var payload *MakeRequestsToGroupRoomPayload

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
}
