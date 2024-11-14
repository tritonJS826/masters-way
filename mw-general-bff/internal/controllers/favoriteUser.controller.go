package controllers

import (
	"mw-general-bff/internal/facades"
	"mw-general-bff/internal/schemas"
	"mw-general-bff/pkg/utils"
	"net/http"

	"github.com/gin-gonic/gin"
)

type FavoriteUserController struct {
	favoriteUserFacade *facades.FavoriteUserFacade
}

func NewFavoriteUserController(favoriteUserFacade *facades.FavoriteUserFacade) *FavoriteUserController {
	return &FavoriteUserController{favoriteUserFacade}
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
func (fc *FavoriteUserController) CreateFavoriteUser(ctx *gin.Context) {
	var payload schemas.CreateFavoriteUserPayload

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "Failed payload", "error": err.Error()})
		return
	}

	args := &schemas.CreateFavoriteUserPayload{
		DonorUserUuid:    payload.DonorUserUuid,
		AcceptorUserUuid: payload.AcceptorUserUuid,
	}
	err := fc.favoriteUserFacade.CreateFavoriteUser(ctx, args)
	utils.HandleErrorGin(ctx, err)

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
func (fc *FavoriteUserController) DeleteFavoriteUserById(ctx *gin.Context) {
	donorUserUuid := ctx.Param("donorUserUuid")
	acceptorUserUuid := ctx.Param("acceptorUserUuid")

	err := fc.favoriteUserFacade.DeleteFavoriteUserById(ctx, donorUserUuid, acceptorUserUuid)
	utils.HandleErrorGin(ctx, err)

	ctx.Status(http.StatusNoContent)
}
