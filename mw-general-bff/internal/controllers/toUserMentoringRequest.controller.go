package controllers

import (
	"mw-general-bff/internal/schemas"
	"mw-general-bff/internal/services"
	"mw-general-bff/pkg/utils"
	"net/http"

	"github.com/gin-gonic/gin"
)

type ToUserMentoringRequestController struct {
	generalService *services.GeneralService
}

func NewToUserMentoringRequestController(generalService *services.GeneralService) *ToUserMentoringRequestController {
	return &ToUserMentoringRequestController{generalService}
}

// Create userMentoringRequest handler
// @Summary Create a new userMentoringRequest
// @Description
// @Tags toUserMentoringRequest
// @ID create-userMentoringRequest
// @Accept  json
// @Produce  json
// @Param request body schemas.CreateToUserMentoringRequestPayload true "query params"
// @Success 200 {object} openapiGeneral.MwserverInternalSchemasToUserMentoringRequestResponse
// @Router /toUserMentoringRequests [post]
func (tc *ToUserMentoringRequestController) CreateToUserMentoringRequest(ctx *gin.Context) {
	var payload *schemas.CreateToUserMentoringRequestPayload

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "Failed payload", "error": err.Error()})
		return
	}

	userMentoringRequest, err := tc.generalService.CreateToUserMentoringRequest(ctx, payload)
	utils.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusOK, userMentoringRequest)
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
// @Success 204
// @Router /toUserMentoringRequests/{userUuid}/{wayUuid} [delete]
func (tc *ToUserMentoringRequestController) DeleteToUserMentoringRequestById(ctx *gin.Context) {
	userID := ctx.Param("userUuid")
	wayID := ctx.Param("wayUuid")

	err := tc.generalService.DeleteToUserMentoringRequestById(ctx, userID, wayID)
	utils.HandleErrorGin(ctx, err)

	ctx.Status(http.StatusNoContent)
}
