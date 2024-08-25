package controllers

import (
	"net/http"

	"mwserver/internal/services"
	"mwserver/schemas"
	"mwserver/util"

	"github.com/gin-gonic/gin"
)

type FromUserMentoringRequestController struct {
	fromUserMentoringRequestService *services.FromUserMentoringRequestService
}

func NewFromUserMentoringRequestController(fromUserMentoringRequestService *services.FromUserMentoringRequestService) *FromUserMentoringRequestController {
	return &FromUserMentoringRequestController{fromUserMentoringRequestService}
}

// Create fromUserMentoringRequest handler
// @Summary Create a new fromUserMentoringRequest
// @Description
// @Tags fromUserMentoringRequest
// @ID create-fromUserMentoringRequest
// @Accept  json
// @Produce  json
// @Param request body schemas.CreateFromUserMentoringRequestPayload true "query params"
// @Success 200
// @Router /fromUserMentoringRequests [post]
func (fumrc *FromUserMentoringRequestController) CreateFromUserMentoringRequest(ctx *gin.Context) {
	var payload *schemas.CreateFromUserMentoringRequestPayload

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "Failed payload", "error": err.Error()})
		return
	}

	fromUserMentoringRequest, err := fumrc.fromUserMentoringRequestService.CreateFromUserMentoringRequest(ctx, payload.UserUuid, payload.WayUuid)
	util.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusOK, fromUserMentoringRequest)
}

// Deleting fromUserMentoringRequest handlers
// @Summary Delete fromUserMentoringRequest by UUID
// @Description
// @Tags fromUserMentoringRequest
// @ID delete-fromUserMentoringRequest
// @Accept  json
// @Produce  json
// @Param userUuid path string true "user UUID"
// @Param wayUuid path string true "way UUID"
// @Success 200
// @Router /fromUserMentoringRequests/{userUuid}/{wayUuid} [delete]
func (fumrc *FromUserMentoringRequestController) DeleteFromUserMentoringRequestById(ctx *gin.Context) {
	userID := ctx.Param("userUuid")
	wayID := ctx.Param("wayUuid")

	err := fumrc.fromUserMentoringRequestService.DeleteFromUserMentoringRequestById(ctx, userID, wayID)
	util.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusOK, gin.H{"status": "successfully deleted"})
}
