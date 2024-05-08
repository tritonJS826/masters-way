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

type MentorUserWayController struct {
	db  *db.Queries
	ctx context.Context
}

func NewMentorUserWayController(db *db.Queries, ctx context.Context) *MentorUserWayController {
	return &MentorUserWayController{db, ctx}
}

// Create mentorUserWay handler
// @Summary Create a new mentorUserWay
// @Description Make user mentor and also added to appropriate mentoring collection
// @Tags mentorUserWay
// @ID create-mentorUserWay
// @Accept  json
// @Produce  json
// @Param request body schemas.CreateMentorUserWayPayload true "query params"
// @Success 200
// @Router /mentorUserWays [post]
func (cc *MentorUserWayController) AddMentorUserWay(ctx *gin.Context) {
	var payload *schemas.CreateMentorUserWayPayload

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "Failed payload", "error": err.Error()})
		return
	}

	args0 := &db.DeleteFormerMentorWayIfExistParams{
		FormerMentorUuid: uuid.MustParse(payload.UserUuid),
		WayUuid:          uuid.MustParse(payload.WayUuid),
	}
	err0 := cc.db.DeleteFormerMentorWayIfExist(ctx, *args0)

	args := db.CreateMentorUserWayParams{
		WayUuid:  uuid.MustParse(payload.WayUuid),
		UserUuid: uuid.MustParse(payload.UserUuid),
	}
	_, err := cc.db.CreateMentorUserWay(ctx, args)
	util.HandleErrorGin(ctx, err)

	args2 := db.AddWayToMentoringCollectionParams{
		OwnerUuid: uuid.MustParse(payload.UserUuid),
		WayUuid:   uuid.MustParse(payload.WayUuid),
	}
	err2 := cc.db.AddWayToMentoringCollection(ctx, args2)
	util.HandleErrorGin(ctx, err2)

	args4 := &db.DeleteFromUserMentoringRequestParams{
		UserUuid: uuid.MustParse(payload.UserUuid),
		WayUuid:  uuid.MustParse(payload.WayUuid),
	}
	err4 := cc.db.DeleteFromUserMentoringRequest(ctx, *args4)

	if err0 == nil && err == nil && err2 == nil && err4 == nil {
		ctx.JSON(http.StatusOK, gin.H{"status": "successfully added"})
	}
}

// Deleting mentorUserWay handlers
// @Summary Delete mentorUserWay by UUID
// @Description
// @Tags mentorUserWay
// @ID delete-mentorUserWay
// @Accept  json
// @Produce  json
// @Param request body schemas.DeleteMentorUserWayPayload true "query params"
// @Success 200
// @Router /mentorUserWays [delete]
func (cc *MentorUserWayController) DeleteMentorUserWay(ctx *gin.Context) {
	var payload *schemas.DeleteMentorUserWayPayload

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "Failed payload", "error": err.Error()})
		return
	}

	args := db.DeleteMentorUserWayByIdsParams{
		WayUuid:  uuid.MustParse(payload.WayUuid),
		UserUuid: uuid.MustParse(payload.UserUuid),
	}
	err := cc.db.DeleteMentorUserWayByIds(ctx, args)
	util.HandleErrorGin(ctx, err)

	args2 := db.RemoveWayFromMentoringCollectionParams{
		OwnerUuid: uuid.MustParse(payload.UserUuid),
		WayUuid:   uuid.MustParse(payload.WayUuid),
	}
	err2 := cc.db.RemoveWayFromMentoringCollection(ctx, args2)
	util.HandleErrorGin(ctx, err2)

	args3 := &db.CreateFormerMentorsWayParams{
		FormerMentorUuid: uuid.MustParse(payload.UserUuid),
		WayUuid:          uuid.MustParse(payload.WayUuid),
	}
	_, err3 := cc.db.CreateFormerMentorsWay(ctx, *args3)
	util.HandleErrorGin(ctx, err3)

	ctx.JSON(http.StatusNoContent, gin.H{"status": "successfully deleted"})

}
