package controllers

import (
	"net/http"

	"mwserver/internal/services"
	"mwserver/schemas"
	"mwserver/util"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type MentorUserWayController struct {
	limitService         *services.LimitService
	mentorUserWayService *services.MentorUserWayService
}

func NewMentorUserWayController(limitService *services.LimitService, mentorUserWayService *services.MentorUserWayService) *MentorUserWayController {
	return &MentorUserWayController{limitService, mentorUserWayService}
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
func (mc *MentorUserWayController) AddMentorUserWay(ctx *gin.Context) {
	var payload *schemas.CreateMentorUserWayPayload

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "Failed payload", "error": err.Error()})
		return
	}

	err := mc.limitService.CheckIsLimitReachedByPricingPlan(ctx, &services.LimitReachedParams{
		LimitName: services.MaxMentoringsWays,
		UserID:    uuid.MustParse(payload.UserUuid),
	})
	util.HandleErrorGin(ctx, err)

	err = mc.mentorUserWayService.AddMentorUserWay(ctx, payload.UserUuid, payload.WayUuid)
	util.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusOK, gin.H{"status": "successfully added"})
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
func (mc *MentorUserWayController) DeleteMentorUserWay(ctx *gin.Context) {
	var payload *schemas.DeleteMentorUserWayPayload

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "Failed payload", "error": err.Error()})
		return
	}

	err := mc.mentorUserWayService.DeleteMentorUserWay(ctx, payload.UserUuid, payload.WayUuid)
	util.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusOK, gin.H{"status": "successfully deleted"})
}
