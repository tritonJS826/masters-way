package controllers

import (
	"context"
	"net/http"

	db "mwserver/db/sqlc"
	"mwserver/schemas"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type FavoriteUserWayController struct {
	db  *db.Queries
	ctx context.Context
}

func NewFavoriteUserWayController(db *db.Queries, ctx context.Context) *FavoriteUserWayController {
	return &FavoriteUserWayController{db, ctx}
}

// Create favoriteUserWay handler
// @Summary Create a new favoriteUserWay
// @Description
// @ID create-favoriteUserWay
// @Accept  json
// @Produce  json
// @Param request body schemas.CreateFavoriteUserWayPayload true "query params"
// @Success 200
// @Router /favoriteUserWays [post]
func (cc *FavoriteUserWayController) CreateFavoriteUserWay(ctx *gin.Context) {
	var payload *schemas.CreateFavoriteUserWayPayload

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "Failed payload", "error": err.Error()})
		return
	}

	args := &db.CreateFavoriteUserWayParams{
		UserUuid: payload.UserUuid,
		WayUuid:  payload.WayUuid,
	}

	favoriteUserWay, err := cc.db.CreateFavoriteUserWay(ctx, *args)

	if err != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{"status": "Failed retrieving favoriteUserWay", "error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"status": "successfully created favoriteUserWay", "favoriteUserWay": favoriteUserWay})
}

// Deleting favoriteUserWay handlers
// @Summary Delete favoriteUserWay by UUID
// @Description
// @ID delete-favoriteUserWay
// @Accept  json
// @Produce  json
// @Param userUuid path string true "user UUID"
// @Param wayUuid path string true "way ID"
// @Success 200
// @Router /favoriteUserWays/{userUuid}/{wayUuid} [delete]
func (cc *FavoriteUserWayController) DeleteFavoriteUserWayById(ctx *gin.Context) {
	userUuid := ctx.Param("userUuid")
	wayUuid := ctx.Param("wayUuid")

	args := db.DeleteFavoriteUserWayByIdsParams{
		UserUuid: uuid.MustParse(userUuid),
		WayUuid:  uuid.MustParse(wayUuid),
	}

	err := cc.db.DeleteFavoriteUserWayByIds(ctx, args)
	if err != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{"status": "failed", "error": err.Error()})
		return
	}

	ctx.JSON(http.StatusNoContent, gin.H{"status": "successfuly deleted"})

}
