package controllers

import (
	"mw-general-bff/internal/facades"
	"mw-general-bff/internal/schemas"
	"mw-general-bff/pkg/utils"
	"net/http"

	"github.com/gin-gonic/gin"
)

type FavoriteUserWayController struct {
	favoriteUserWayFacade *facades.FavoriteUserWayFacade
}

func NewFavoriteUserWayController(favoriteUserWayFacade *facades.FavoriteUserWayFacade) *FavoriteUserWayController {
	return &FavoriteUserWayController{favoriteUserWayFacade}
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
func (fc *FavoriteUserWayController) CreateFavoriteUserWay(ctx *gin.Context) {
	var payload schemas.CreateFavoriteUserWayPayload

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "Failed payload", "error": err.Error()})
		return
	}

	err := fc.favoriteUserWayFacade.CreateFavoriteUserWay(ctx, payload.UserUuid, payload.WayUuid)
	utils.HandleErrorGin(ctx, err)

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
func (fc *FavoriteUserWayController) DeleteFavoriteUserWayById(ctx *gin.Context) {
	userID := ctx.Param("userUuid")
	wayID := ctx.Param("wayUuid")

	err := fc.favoriteUserWayFacade.DeleteFavoriteUserWayById(ctx, userID, wayID)
	utils.HandleErrorGin(ctx, err)

	ctx.Status(http.StatusNoContent)
}
