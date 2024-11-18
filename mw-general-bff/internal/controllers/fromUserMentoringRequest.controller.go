package controllers

import (
	"mw-general-bff/internal/facades"
	"mw-general-bff/internal/schemas"
	"mw-general-bff/pkg/utils"
	"net/http"

	"github.com/gin-gonic/gin"
)

type FromUserMentoringRequestController struct {
	fromUserMentoringRequestFacade *facades.FromUserMentoringRequestFacade
}

func NewFromUserMentoringRequestController(fromUserMentoringRequestFacade *facades.FromUserMentoringRequestFacade) *FromUserMentoringRequestController {
	return &FromUserMentoringRequestController{fromUserMentoringRequestFacade}
}

// Create fromUserMentoringRequest handler
// @Summary Create a new fromUserMentoringRequest
// @Description
// @Tags fromUserMentoringRequest
// @ID create-fromUserMentoringRequest
// @Accept  json
// @Produce  json
// @Param request body schemas.CreateFromUserMentoringRequestPayload true "query params"
// @Success 200 {object} schemas.FromUserMentoringRequestResponse
// @Router /fromUserMentoringRequests [post]
func (fc *FromUserMentoringRequestController) CreateFromUserMentoringRequest(ctx *gin.Context) {
	var payload schemas.CreateFromUserMentoringRequestPayload

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "Failed payload", "error": err.Error()})
		return
	}

	fromUserMentoringRequest, err := fc.fromUserMentoringRequestFacade.CreateFromUserMentoringRequest(ctx, payload.UserUuid, payload.WayUuid)
	utils.HandleErrorGin(ctx, err)

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
// @Success 204
// @Router /fromUserMentoringRequests/{userUuid}/{wayUuid} [delete]
func (fc *FromUserMentoringRequestController) DeleteFromUserMentoringRequestById(ctx *gin.Context) {
	userID := ctx.Param("userUuid")
	wayID := ctx.Param("wayUuid")

	err := fc.fromUserMentoringRequestFacade.DeleteFromUserMentoringRequestById(ctx, userID, wayID)
	utils.HandleErrorGin(ctx, err)

	ctx.Status(http.StatusNoContent)
}
