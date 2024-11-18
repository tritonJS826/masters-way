package controllers

import (
	"mw-general-bff/internal/facades"
	"mw-general-bff/internal/schemas"
	"mw-general-bff/pkg/utils"
	"net/http"

	"github.com/gin-gonic/gin"
)

type MentorUserWayController struct {
	mentorUserWayFacade *facades.MentorUserWayFacade
}

func NewMentorUserWayController(mentorUserWayFacade *facades.MentorUserWayFacade) *MentorUserWayController {
	return &MentorUserWayController{mentorUserWayFacade}
}

// Create mentorUserWay handler
// @Summary Create a new mentorUserWay
// @Description Make user mentor and also added to appropriate mentoring collection
// @Tags mentorUserWay
// @ID create-mentorUserWay
// @Accept  json
// @Produce  json
// @Param request body schemas.CreateMentorUserWayPayload true "query params"
// @Success 204
// @Router /mentorUserWays [post]
func (mc *MentorUserWayController) AddMentorUserWay(ctx *gin.Context) {
	var payload *schemas.CreateMentorUserWayPayload

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "Failed payload", "error": err.Error()})
		return
	}

	err := mc.mentorUserWayFacade.AddMentorUserWay(ctx, payload.UserUuid, payload.WayUuid)
	utils.HandleErrorGin(ctx, err)

	ctx.Status(http.StatusNoContent)
}

// Deleting mentorUserWay handlers
// @Summary Delete mentorUserWay by UUID
// @Description
// @Tags mentorUserWay
// @ID delete-mentorUserWay
// @Accept  json
// @Produce  json
// @Param request body schemas.DeleteMentorUserWayPayload true "query params"
// @Success 204
// @Router /mentorUserWays [delete]
func (mc *MentorUserWayController) DeleteMentorUserWay(ctx *gin.Context) {
	var payload *schemas.DeleteMentorUserWayPayload

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "Failed payload", "error": err.Error()})
		return
	}

	err := mc.mentorUserWayFacade.DeleteMentorUserWay(ctx, payload.UserUuid, payload.WayUuid)
	utils.HandleErrorGin(ctx, err)

	ctx.Status(http.StatusNoContent)
}
