package controllers

import (
	"context"
	"net/http"

	dbPGX "mwserver/db_pgx/sqlc"
	"mwserver/schemas"
	"mwserver/util"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgtype"
)

type FavoriteUserController struct {
	dbPGX *dbPGX.Queries
	ctx   context.Context
}

func NewFavoriteUserController(dbPGX *dbPGX.Queries, ctx context.Context) *FavoriteUserController {
	return &FavoriteUserController{dbPGX, ctx}
}

// Create favoriteUser handler
// @Summary Create a new favorite user
// @Description
// @Tags favoriteUser
// @ID create-favoriteUser
// @Accept  json
// @Produce  json
// @Param request body schemas.CreateFavoriteUserPayload true "query params"
// @Success 200
// @Router /favoriteUsers [post]
func (cc *FavoriteUserController) CreateFavoriteUser(ctx *gin.Context) {
	var payload *schemas.CreateFavoriteUserPayload

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "Failed payload", "error": err.Error()})
		return
	}

	args := dbPGX.CreateFavoriteUserParams{
		DonorUserUuid:    pgtype.UUID{Bytes: payload.DonorUserUuid, Valid: true},
		AcceptorUserUuid: pgtype.UUID{Bytes: payload.AcceptorUserUuid, Valid: true},
	}

	favoriteUser, err := cc.dbPGX.CreateFavoriteUser(ctx, args)
	util.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusOK, favoriteUser)
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
// @Success 200
// @Router /favoriteUsers/{donorUserUuid}/{acceptorUserUuid} [delete]
func (cc *FavoriteUserController) DeleteFavoriteUserById(ctx *gin.Context) {
	donorUserUuid := ctx.Param("donorUserUuid")
	acceptorUserUuid := ctx.Param("acceptorUserUuid")

	args := dbPGX.DeleteFavoriteUserByIdsParams{
		DonorUserUuid:    pgtype.UUID{Bytes: uuid.MustParse(donorUserUuid), Valid: true},
		AcceptorUserUuid: pgtype.UUID{Bytes: uuid.MustParse(acceptorUserUuid), Valid: true},
	}

	err := cc.dbPGX.DeleteFavoriteUserByIds(ctx, args)
	util.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusNoContent, gin.H{"status": "successfully deleted"})

}
