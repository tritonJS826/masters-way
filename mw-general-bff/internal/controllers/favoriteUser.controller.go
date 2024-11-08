package controllers

import (
	"mwserver/internal/services"

	"github.com/gin-gonic/gin"
)

type FavoriteUserController struct {
	favoriteUserService *services.FavoriteUserService
}

func NewFavoriteUserController(favoriteUserService *services.FavoriteUserService) *FavoriteUserController {
	return &FavoriteUserController{favoriteUserService}
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
	// var payload *schemas.CreateFavoriteUserPayload

	// if err := ctx.ShouldBindJSON(&payload); err != nil {
	// 	ctx.JSON(http.StatusBadRequest, gin.H{"status": "Failed payload", "error": err.Error()})
	// 	return
	// }

	// _, err := fuc.favoriteUserService.CreateFavoriteUser(ctx, payload.DonorUserUuid, payload.AcceptorUserUuid)
	// util.HandleErrorGin(ctx, err)

	// ctx.Status(http.StatusNoContent)
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
	// donorUserUuid := ctx.Param("donorUserUuid")
	// acceptorUserUuid := ctx.Param("acceptorUserUuid")

	// err := fuc.favoriteUserService.DeleteFavoriteUserById(ctx, donorUserUuid, acceptorUserUuid)
	// util.HandleErrorGin(ctx, err)

	// ctx.Status(http.StatusNoContent)
}
