package controllers

import (
	"net/http"

	"mw-general-bff/internal/facades"
	"mw-general-bff/internal/schemas"
	"mw-general-bff/pkg/utils"

	"github.com/gin-gonic/gin"
)

var _ = &schemas.CompanionFeedbackResponse{}

type CompanionController struct {
	companionFacade *facades.CompanionFacade
}

func NewCompanionController(companionFacade *facades.CompanionFacade) *CompanionController {
	return &CompanionController{companionFacade}
}

// Get companion feedback for a way
// @Summary Get AI companion feedback for a way
// @Description Returns motivational feedback based on last 14 days of activity. Analyzes jobs, plans, problems, and comments. Characters: army_sergeant, creative_artist, warm_sister, wise_mentor, cheerful_friend.
// @Tags companion
// @ID get-companion-feedback
// @Accept json
// @Produce json
// @Param wayId path string true "Way UUID"
// @Success 200 {object} schemas.CompanionFeedbackResponse
// @Router /companion/{wayId} [get]
func (cc *CompanionController) GetCompanionFeedback(ctx *gin.Context) {
	wayID := ctx.Param("wayId")

	response, err := cc.companionFacade.GetCompanionFeedback(ctx, wayID)
	utils.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusOK, response)
}
