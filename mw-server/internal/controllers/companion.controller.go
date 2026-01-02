package controllers

import (
	"net/http"
	"time"

	"mw-server/internal/schemas"
	"mw-server/internal/services"
	"mw-server/pkg/util"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type CompanionController struct {
	geminiService        *services.GeminiService
	dayReportService     *services.DayReportService
	wayService           *services.WayService
	companionFeedbackSvc *services.CompanionFeedbackService
}

func NewCompanionController(
	geminiService *services.GeminiService,
	dayReportService *services.DayReportService,
	wayService *services.WayService,
	companionFeedbackSvc *services.CompanionFeedbackService,
) *CompanionController {
	return &CompanionController{geminiService, dayReportService, wayService, companionFeedbackSvc}
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
	if err == nil {
		ctx.JSON(http.StatusOK, feedback)
		return
	}

	way, err := cc.wayService.GetPlainWayById(ctx, wayID)
	if err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"error": "Way not found"})
		return
	}

	reports, err := cc.dayReportService.GetLast14DayReportsByWayID(ctx, wayID)
	if err != nil {
		util.HandleErrorGin(ctx, err)
		return
	}

	reportsData := formatDayReportsForCompanion(reports)

	character := "army_sergeant"
	payload := &schemas.CompanionAnalyzePayload{
		WayUUID:        wayIDRaw,
		WayName:        way.Name,
		Goal:           way.GoalDescription,
		Character:      character,
		Language:       "en",
		DayReportsData: reportsData,
		TriggerType:    "initial",
	}

	response, err := cc.geminiService.GenerateCompanionFeedback(ctx, payload)
	if err != nil {
		util.HandleErrorGin(ctx, err)
		return
	}

	_, err = cc.companionFeedbackSvc.CreateCompanionFeedback(ctx, &services.CreateCompanionFeedbackParams{
		WayUUID:       wayID,
		Status:        int32(response.Status),
		Comment:       response.Comment,
		Character:     character,
		LastUpdatedAt: time.Now(),
	})
	if err != nil {
		util.HandleErrorGin(ctx, err)
		return
	}

	ctx.JSON(http.StatusOK, schemas.CompanionFeedback{
		UUID:          uuid.Nil.String(),
		WayUUID:       wayIDRaw,
		Status:        response.Status,
		Comment:       response.Comment,
		Character:     schemas.CompanionCharacter(character),
		LastUpdatedAt: time.Now().Format(time.RFC3339),
	})
}

func formatDayReportsForCompanion(reports []services.DayReportWithCounts) string {
	if len(reports) == 0 {
		return "No reports yet"
	}
	result := ""
	for _, report := range reports {
		result += "Date: " + report.CreatedAt.Format("2006-01-02") + " | "
		result += "Plans: " + itoa(report.PlansCount) + " | "
		result += "Jobs: " + itoa(report.JobsDoneCount) + " | "
		result += "Problems: " + itoa(report.ProblemsCount) + " | "
		result += "Comments: " + itoa(report.CommentsCount) + "\n"
	}
	return result
}

func itoa(n int) string {
	if n == 0 {
		return "0"
	}
	result := ""
	for n > 0 {
		result = string(rune('0'+n%10)) + result
		n /= 10
	}
	return result
}
