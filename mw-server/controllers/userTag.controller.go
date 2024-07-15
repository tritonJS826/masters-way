package controllers

import (
	"context"
	"net/http"

	db "mwserver/db/sqlc"
	"mwserver/schemas"
	"mwserver/services"
	"mwserver/util"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgtype"
)

type UserTagController struct {
	db  *db.Queries
	ctx context.Context
	ls  *services.LimitService
}

func NewUserTagController(db *db.Queries, ctx context.Context, ls *services.LimitService) *UserTagController {
	return &UserTagController{db, ctx, ls}
}

// Create userTag  handler
// @Summary Create a new userTag
// @Description
// @Tags userTag
// @ID create-userTag
// @Accept  json
// @Produce  json
// @Param request body schemas.CreateUserTagPayload true "query params"
// @Success 200 {object} schemas.UserTagResponse
// @Router /userTags [post]
func (cc *UserTagController) AddUserTagByName(ctx *gin.Context) {
	var payload *schemas.CreateUserTagPayload

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "Failed payload", "error": err.Error()})
		return
	}

	userID := uuid.MustParse(payload.OwnerUuid)
	err := cc.ls.CheckIsLimitReachedByPricingPlan(&services.LimitReachedParams{
		LimitName: services.MaxUserTags,
		UserID:    userID,
	})
	util.HandleErrorGin(ctx, err)

	userTag, err := cc.db.GetUserTagByName(ctx, payload.Name)

	if err != nil {
		newUserTag, _ := cc.db.CreateUserTag(ctx, payload.Name)
		userTag = newUserTag
	}

	args := db.CreateUsersUserTagParams{
		UserTagUuid: userTag.Uuid,
		UserUuid:    pgtype.UUID{Bytes: uuid.MustParse(payload.OwnerUuid), Valid: true},
	}
	_, err = cc.db.CreateUsersUserTag(ctx, args)
	util.HandleErrorGin(ctx, err)

	response := schemas.UserTagResponse{
		Uuid: util.ConvertPgUUIDToUUID(userTag.Uuid).String(),
		Name: userTag.Name,
	}

	ctx.JSON(http.StatusOK, response)
}

// Deleting userTag handlers
// @Summary Delete userTag by UUID
// @Description
// @Tags userTag
// @ID delete-userTag
// @Accept  json
// @Produce  json
// @Param userTagId path string true "userTag ID"
// @Param userId path string true "user ID"
// @Success 200
// @Router /userTags/{userTagId}/{userId} [delete]
func (cc *UserTagController) DeleteUserTagByFromUserByTag(ctx *gin.Context) {
	userTagId := ctx.Param("userTagId")
	userId := ctx.Param("userId")

	args := db.DeleteUserTagFromUserParams{
		UserUuid:    pgtype.UUID{Bytes: uuid.MustParse(userId), Valid: true},
		UserTagUuid: pgtype.UUID{Bytes: uuid.MustParse(userTagId), Valid: true},
	}

	err := cc.db.DeleteUserTagFromUser(ctx, args)
	util.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusNoContent, gin.H{"status": "successfully deleted"})

}
