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

type MentorUserWayController struct {
	db  *db.Queries
	ctx context.Context
	ls  *services.LimitService
}

func NewMentorUserWayController(db *db.Queries, ctx context.Context, ls *services.LimitService) *MentorUserWayController {
	return &MentorUserWayController{db, ctx, ls}
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

	userID := uuid.MustParse(payload.UserUuid)
	err := cc.ls.CheckIsLimitReachedByPricingPlan(&services.LimitReachedParams{
		LimitName: services.MaxMentoringsWays,
		UserID:    userID,
	})
	util.HandleErrorGin(ctx, err)

	userPgUUID := pgtype.UUID{Bytes: uuid.MustParse(payload.UserUuid), Valid: true}
	wayPgUUID := pgtype.UUID{Bytes: uuid.MustParse(payload.WayUuid), Valid: true}

	args0 := db.DeleteFormerMentorWayIfExistParams{
		FormerMentorUuid: userPgUUID,
		WayUuid:          wayPgUUID,
	}
	err0 := cc.db.DeleteFormerMentorWayIfExist(ctx, args0)

	args := db.CreateMentorUserWayParams{
		WayUuid:  wayPgUUID,
		UserUuid: userPgUUID,
	}
	_, err = cc.db.CreateMentorUserWay(ctx, args)
	util.HandleErrorGin(ctx, err)

	args4 := db.DeleteFromUserMentoringRequestParams{
		UserUuid: userPgUUID,
		WayUuid:  wayPgUUID,
	}
	err4 := cc.db.DeleteFromUserMentoringRequest(ctx, args4)

	if err0 == nil && err == nil && err4 == nil {
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

	userPgUUID := pgtype.UUID{Bytes: uuid.MustParse(payload.UserUuid), Valid: true}
	wayPgUUID := pgtype.UUID{Bytes: uuid.MustParse(payload.WayUuid), Valid: true}

	args := db.DeleteMentorUserWayByIdsParams{
		WayUuid:  wayPgUUID,
		UserUuid: userPgUUID,
	}
	err := cc.db.DeleteMentorUserWayByIds(ctx, args)
	util.HandleErrorGin(ctx, err)

	args2 := db.CreateFormerMentorsWayParams{
		FormerMentorUuid: userPgUUID,
		WayUuid:          wayPgUUID,
	}
	_, err2 := cc.db.CreateFormerMentorsWay(ctx, args2)
	util.HandleErrorGin(ctx, err2)

	ctx.JSON(http.StatusNoContent, gin.H{"status": "successfully deleted"})

}
