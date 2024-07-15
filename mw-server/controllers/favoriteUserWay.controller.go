package controllers

import (
	"context"
	"net/http"

	db "mwserver/db/sqlc"
	"mwserver/schemas"
	"mwserver/util"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgtype"
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
// @Tags favoriteUserWay
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

	args := db.CreateFavoriteUserWayParams{
		UserUuid: pgtype.UUID{Bytes: payload.UserUuid, Valid: true},
		WayUuid:  pgtype.UUID{Bytes: payload.WayUuid, Valid: true},
	}

	favoriteUserWay, err := cc.db.CreateFavoriteUserWay(ctx, args)
	util.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusOK, favoriteUserWay)
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
// @Success 200
// @Router /favoriteUserWays/{userUuid}/{wayUuid} [delete]
func (cc *FavoriteUserWayController) DeleteFavoriteUserWayById(ctx *gin.Context) {
	userUuid := ctx.Param("userUuid")
	wayUuid := ctx.Param("wayUuid")

	args := db.DeleteFavoriteUserWayByIdsParams{
		UserUuid: pgtype.UUID{Bytes: uuid.MustParse(userUuid), Valid: true},
		WayUuid:  pgtype.UUID{Bytes: uuid.MustParse(wayUuid), Valid: true},
	}

	err := cc.db.DeleteFavoriteUserWayByIds(ctx, args)
	util.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusNoContent, gin.H{"status": "successfully deleted"})

}
