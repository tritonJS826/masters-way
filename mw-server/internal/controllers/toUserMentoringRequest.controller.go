package controllers

import (
	"net/http"

	"mwserver/internal/schemas"
	"mwserver/internal/services"
	"mwserver/pkg/util"

	"github.com/gin-gonic/gin"
)

type ToUserMentoringRequestController struct {
	toUserMentoringRequestService *services.ToUserMentoringRequestService
}

func NewToUserMentoringRequestController(toUserMentoringRequestService *services.ToUserMentoringRequestService) *ToUserMentoringRequestController {
	return &ToUserMentoringRequestController{toUserMentoringRequestService}
}

// Create userMentoringRequest handler
// @Summary Create a new userMentoringRequest
// @Description
// @Tags toUserMentoringRequest
// @ID create-userMentoringRequest
// @Accept  json
// @Produce  json
// @Param request body schemas.CreateToUserMentoringRequestPayload true "query params"
// @Success 200 {object} schemas.ToUserMentoringRequestResponse
// @Router /toUserMentoringRequests [post]
func (tc *ToUserMentoringRequestController) CreateToUserMentoringRequest(ctx *gin.Context) {
	var payload *schemas.CreateToUserMentoringRequestPayload

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "Failed payload", "error": err.Error()})
		return
	}

	toUserMentoringRequest, err := tc.toUserMentoringRequestService.CreateToUserMentoringRequest(ctx, payload)
	util.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusOK, toUserMentoringRequest)
}

// Deleting ToUserMentoringRequest handlers
// @Summary Delete toUserMentoringReques by UUID
// @Description
// @Tags toUserMentoringRequest
// @ID delete-toUserMentoringRequest
// @Accept  json
// @Produce  json
// @Param userUuid path string true "user UUID"
// @Param wayUuid path string true "way UUID"
// @Success 200
// @Router /toUserMentoringRequests/{userUuid}/{wayUuid} [delete]
func (tc *ToUserMentoringRequestController) DeleteToUserMentoringRequestById(ctx *gin.Context) {
	userID := ctx.Param("userUuid")
	wayID := ctx.Param("wayUuid")

	err := tc.toUserMentoringRequestService.DeleteToUserMentoringRequestById(ctx, userID, wayID)
	util.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusOK, gin.H{"status": "successfully deleted"})
}
