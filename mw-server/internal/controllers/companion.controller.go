package controllers

import (
	"net/http"
	"time"

	"mw-server/internal/schemas"
	"mw-server/internal/services"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type CompanionController struct {
	companionFeedbackSvc *services.CompanionFeedbackService
}

func NewCompanionController(
	companionFeedbackSvc *services.CompanionFeedbackService,
) *CompanionController {
	return &CompanionController{companionFeedbackSvc}
}

// Get companion feedback for a way
// @Summary Get AI companion feedback for a way
// @Description Returns motivational feedback based on last 14 days of activity. Analyzes jobs, plans, problems, and comments. Characters: army_sergeant, creative_artist, warm_sister, wise_mentor, cheerful_friend.
// @Tags companion
// @ID get-companion-feedback
// @Accept json
// @Produce json
// @Param wayId path string true "Way UUID"
// @Success 200 {object} schemas.CompanionFeedback
// @Router /companion/{wayId} [get]
func (cc *CompanionController) GetCompanionFeedback(ctx *gin.Context) {
	wayIDRaw := ctx.Param("wayId")
	wayID := uuid.MustParse(wayIDRaw)

	feedback, err := cc.companionFeedbackSvc.GetCompanionFeedbackByWayId(ctx, wayID)
	if err != nil {
		ctx.JSON(http.StatusOK, schemas.CompanionFeedback{
			UUID:          uuid.Nil.String(),
			WayUUID:       wayIDRaw,
			Status:        0,
			Comment:       "Start adding your progress to get companion feedback!",
			Character:     schemas.CompanionCharacterArmySergeant,
			LastUpdatedAt: time.Now().Format(time.RFC3339),
		})
		return
	}

	ctx.JSON(http.StatusOK, feedback)
}
