package controllers

import (
	"context"
	"database/sql"
	"net/http"

	db "mwserver/db/sqlc"
	"mwserver/schemas"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type UserTagController struct {
	db  *db.Queries
	ctx context.Context
}

func NewUserTagController(db *db.Queries, ctx context.Context) *UserTagController {
	return &UserTagController{db, ctx}
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
// @Router /usersTags [post]
func (cc *UserTagController) CreateUserTag(ctx *gin.Context) {
	var payload *schemas.CreateUserTagPayload

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "Failed payload", "error": err.Error()})
		return
	}

	args := &db.CreateUserTagParams{
		Name:      payload.Name,
		OwnerUuid: uuid.MustParse(payload.OwnerUuid),
	}

	userTag, err := cc.db.CreateUserTag(ctx, *args)

	if err != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{"status": "Failed retrieving userTag", "error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, userTag)
}

// Update userTag handler
// @Summary Update userTag by UUID
// @Description
// @Tags userTag
// @ID update-userTag
// @Accept  json
// @Produce  json
// @Param request body schemas.UpdateUserTagPayload true "query params"
// @Param userTagId path string true "userTag ID"
// @Success 200 {object} schemas.UserTagResponse
// @Router /userTags/{userTagId} [patch]
func (cc *UserTagController) UpdateUserTag(ctx *gin.Context) {
	var payload *schemas.UpdateUserTagPayload
	userTagId := ctx.Param("userTagId")

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "Failed payload", "error": err.Error()})
		return
	}

	args := &db.UpdateUserTagParams{
		Uuid: uuid.MustParse(userTagId),
		Name: sql.NullString{String: payload.Name, Valid: payload.Name != ""},
	}

	userTag, err := cc.db.UpdateUserTag(ctx, *args)

	if err != nil {
		if err == sql.ErrNoRows {
			ctx.JSON(http.StatusNotFound, gin.H{"status": "failed", "message": "Failed to retrieve userTag with this ID"})
			return
		}
		ctx.JSON(http.StatusBadGateway, gin.H{"status": "Failed retrieving userTag", "error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, userTag)
}

// Get a all users tags by owner id handler
// @Summary Get userTags by user UUID
// @Description
// @Tags userTag
// @ID get-userTags-by-User-uuid
// @Accept  json
// @Produce  json
// @Param userId path string true "user ID"
// @Success 200 {array} schemas.UserTagResponse
// @Router /userTags/{userId} [get]
func (cc *UserTagController) GetUserTagsByUserId(ctx *gin.Context) {
	userId := ctx.Param("userId")

	userTag, err := cc.db.GetListUserTagsByUserId(ctx, uuid.MustParse(userId))
	if err != nil {
		if err == sql.ErrNoRows {
			ctx.JSON(http.StatusNotFound, gin.H{"status": "failed", "message": "Failed to retrieve userTag with this ID"})
			return
		}
		ctx.JSON(http.StatusBadGateway, gin.H{"status": "Failed retrieving userTag", "error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, userTag)
}

// Deleting userTag handlers
// @Summary Delete userTag by UUID
// @Description
// @Tags userTag
// @ID delete-userTag
// @Accept  json
// @Produce  json
// @Param userTagId path string true "userTag ID"
// @Success 200
// @Router /userTags/{userTagId} [delete]
func (cc *UserTagController) DeleteUserTagById(ctx *gin.Context) {
	userTagId := ctx.Param("userTagId")

	err := cc.db.DeleteUserTag(ctx, uuid.MustParse(userTagId))
	if err != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{"status": "failed", "error": err.Error()})
		return
	}

	ctx.JSON(http.StatusNoContent, gin.H{"status": "successfully deleted"})

}
