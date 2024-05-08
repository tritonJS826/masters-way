package controllers

import (
	"context"
	"net/http"

	db "mwserver/db/sqlc"
	"mwserver/schemas"
	"mwserver/util"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type FavoriteUserController struct {
	db  *db.Queries
	ctx context.Context
}

func NewFavoriteUserController(db *db.Queries, ctx context.Context) *FavoriteUserController {
	return &FavoriteUserController{db, ctx}
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

	args := &db.CreateFavoriteUserParams{
		DonorUserUuid:    payload.DonorUserUuid,
		AcceptorUserUuid: payload.AcceptorUserUuid,
	}

	favoriteUser, err := cc.db.CreateFavoriteUser(ctx, *args)
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

	args := db.DeleteFavoriteUserByIdsParams{
		DonorUserUuid:    uuid.MustParse(donorUserUuid),
		AcceptorUserUuid: uuid.MustParse(acceptorUserUuid),
	}

	err := cc.db.DeleteFavoriteUserByIds(ctx, args)
	util.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusNoContent, gin.H{"status": "successfully deleted"})

}
