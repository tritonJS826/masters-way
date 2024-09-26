package controllers

import (
	"net/http"

	"mwgeneral/internal/schemas"
	"mwgeneral/internal/services"
	"mwgeneral/pkg/util"

	"github.com/gin-gonic/gin"
)

type FavoriteUserWayController struct {
	favoriteUserWayService *services.FavoriteUserWayService
}

func NewFavoriteUserWayController(favoriteUserWayService *services.FavoriteUserWayService) *FavoriteUserWayController {
	return &FavoriteUserWayController{favoriteUserWayService}
}

// Create favoriteUserWay handler
// @Summary Create a new favoriteUserWay
// @Description
// @Tags favoriteUserWay
// @ID create-favoriteUserWay
// @Accept  json
// @Produce  json
// @Param request body schemas.CreateFavoriteUserWayPayload true "query params"
// @Success 204
// @Router /favoriteUserWays [post]
func (fuwc *FavoriteUserWayController) CreateFavoriteUserWay(ctx *gin.Context) {
	var payload *schemas.CreateFavoriteUserWayPayload

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "Failed payload", "error": err.Error()})
		return
	}

	_, err := fuwc.favoriteUserWayService.CreateFavoriteUserWay(ctx, payload.UserUuid, payload.WayUuid)
	util.HandleErrorGin(ctx, err)

	ctx.Status(http.StatusNoContent)
}

// Deleting favoriteUserWay handlers
// @Summary Delete favoriteUserWay by UUID
// @Description
// @Tags favoriteUserWay
// @ID delete-favoriteUserWay
// @Accept  json
// @Produce  json
// @Param userUuid path string true "user UUID"
// @Param wayUuid path string true "way ID"
// @Success 204
// @Router /favoriteUserWays/{userUuid}/{wayUuid} [delete]
func (fuwc *FavoriteUserWayController) DeleteFavoriteUserWayById(ctx *gin.Context) {
	userID := ctx.Param("userUuid")
	wayID := ctx.Param("wayUuid")

	err := fuwc.favoriteUserWayService.DeleteFavoriteUserWayById(ctx, userID, wayID)
	util.HandleErrorGin(ctx, err)

	ctx.Status(http.StatusNoContent)
}
