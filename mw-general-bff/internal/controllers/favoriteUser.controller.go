package controllers

import (
	"mw-general-bff/internal/schemas"
	"mw-general-bff/internal/services"
	"mw-general-bff/pkg/utils"
	"net/http"

	"github.com/gin-gonic/gin"
)

type FavoriteUserController struct {
	generalService *services.GeneralService
}

func NewFavoriteUserController(generalService *services.GeneralService) *FavoriteUserController {
	return &FavoriteUserController{generalService}
}

// Create favoriteUser handler
// @Summary Create a new favorite user
// @Description
// @Tags favoriteUser
// @ID create-favoriteUser
// @Accept  json
// @Produce  json
// @Param request body schemas.CreateFavoriteUserPayload true "query params"
// @Success 204
// @Router /favoriteUsers [post]
func (fuc *FavoriteUserController) CreateFavoriteUser(ctx *gin.Context) {
	var payload schemas.CreateFavoriteUserPayload

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "Failed payload", "error": err.Error()})
		return
	}

	args := &schemas.CreateFavoriteUserPayload{
		DonorUserUuid:    payload.DonorUserUuid,
		AcceptorUserUuid: payload.AcceptorUserUuid,
	}
	err := fuc.generalService.CreateFavoriteUser(ctx, args)
	if err != nil {
		utils.HandleErrorGin(ctx, err)
		return
	}

	ctx.Status(http.StatusNoContent)
}

// Deleting favorite user handlers
// @Summary Delete favoriteUser by UUID
// @Description
// @Tags favoriteUser
// @ID delete-favoriteUser
// @Accept  json
// @Produce  json
// @Param donorUserUuid path string true "donorUser UUID"
// @Param acceptorUserUuid path string true "acceptorUser UUID"
// @Success 204
// @Router /favoriteUsers/{donorUserUuid}/{acceptorUserUuid} [delete]
func (fuc *FavoriteUserController) DeleteFavoriteUserById(ctx *gin.Context) {
	donorUserUuid := ctx.Param("donorUserUuid")
	acceptorUserUuid := ctx.Param("acceptorUserUuid")

	err := fuc.generalService.DeleteFavoriteUserById(ctx, donorUserUuid, acceptorUserUuid)
	utils.HandleErrorGin(ctx, err)

	ctx.Status(http.StatusNoContent)
}
