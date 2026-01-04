package controllers

import (
	"context"
	"log"
	"mw-server/internal/auth"
	"mw-server/internal/customErrors"
	"mw-server/internal/schemas"
	"mw-server/internal/services"
	"mw-server/pkg/util"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

// Without next lines swagger does not see openapi models
var _ = &customErrors.NoRightToChangeDayReportError{}

type JobDoneController struct {
	permissionService    *services.PermissionService
	jobDoneService       *services.JobDoneService
	jobDoneJobTagService *services.JobDoneJobTagService
	jobTagService        *services.JobTagService
	geminiService        *services.GeminiService
	dayReportService     *services.DayReportService
	wayService           *services.WayService
	companionFeedbackSvc *services.CompanionFeedbackService
	metricService        *services.MetricService
}

func NewJobDoneController(
	permissionService *services.PermissionService,
	jobDoneService *services.JobDoneService,
	jobDoneJobTagService *services.JobDoneJobTagService,
	jobTagService *services.JobTagService,
	geminiService *services.GeminiService,
	dayReportService *services.DayReportService,
	wayService *services.WayService,
	companionFeedbackSvc *services.CompanionFeedbackService,
	metricService *services.MetricService,
) *JobDoneController {
	return &JobDoneController{permissionService, jobDoneService, jobDoneJobTagService, jobTagService, geminiService, dayReportService, wayService, companionFeedbackSvc, metricService}
}

// Create JobDone  handler
// @Summary Create a new jobDone
// @Description
// @Tags jobDone
// @ID create-jobDone
// @Accept  json
// @Produce  json
// @Param request body schemas.CreateJobDonePayload true "query params"
// @Success 200 {object} schemas.JobDonePopulatedResponse
// @Failure 403 {object} customErrors.NoRightToChangeDayReportError "User doesn't have rights to create job done."
// @Router /jobDones [post]
func (jc *JobDoneController) CreateJobDone(ctx *gin.Context) {
	var payload *schemas.CreateJobDonePayload

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "Failed payload", "error": err.Error()})
		return
	}

	userIDRaw, _ := ctx.Get(auth.ContextKeyUserID)
	userID := userIDRaw.(string)

	err := jc.permissionService.CheckIsUserHavingPermissionsForDayReport(ctx, userID, payload.DayReportUuid)
	util.HandleErrorGin(ctx, err)

	jobDone, err := jc.jobDoneService.CreateJobDone(ctx, payload)
	util.HandleErrorGin(ctx, err)

	for _, jobTagID := range payload.JobTagUuids {
		_, err := jc.jobDoneJobTagService.CreateJobDoneJobTag(ctx, &schemas.CreateJobDoneJobTagPayload{
			JobDoneUuid: jobDone.ID,
			JobTagUuid:  jobTagID,
		})
		util.HandleErrorGin(ctx, err)
	}

	jobTags, err := jc.jobTagService.GetLabelsByIDs(ctx, payload.JobTagUuids)
	util.HandleErrorGin(ctx, err)

	const MINIMAL_JOB_LENS_FOR_ANALYSIS = 5

	if len(payload.Description) > MINIMAL_JOB_LENS_FOR_ANALYSIS {
		go func() {
			language := payload.CompanionLanguage
			if language == "" {
				language = "en"
			}
			character := string(schemas.CompanionCharacterArmySergeant)
			existingFeedback, _ := jc.companionFeedbackSvc.GetCompanionFeedbackByWayId(context.Background(), uuid.MustParse(jobDone.WayUUID))
			if existingFeedback != nil {
				character = string(existingFeedback.Character)
			}
			if err := jc.triggerCompanionFeedbackGeneration(context.Background(), jobDone.WayUUID, payload.Description, companionFeedbackParams{language: language, character: character}); err != nil {
				log.Printf("[CreateJobDone] ERROR in companion feedback generation: %v", err)
			}
		}()
	}

	response := schemas.JobDonePopulatedResponse{
		Uuid:          jobDone.ID,
		CreatedAt:     jobDone.CreatedAt,
		UpdatedAt:     jobDone.UpdatedAt,
		Description:   jobDone.Description,
		Time:          jobDone.Time,
		OwnerUuid:     jobDone.OwnerUuid,
		OwnerName:     jobDone.OwnerName,
		DayReportUuid: jobDone.DayReportID,
		WayUUID:       jobDone.WayUUID,
		WayName:       jobDone.WayName,
		Tags:          jobTags,
	}

	ctx.JSON(http.StatusOK, response)
}

// CreateJobDoneForTelegram creates a job done with automatic day report handling
// @Summary Create job done for telegram
// @Description Creates a job done, automatically finding or creating a day report for today
// @Tags jobDone
// @ID create-job-done-telegram
// @Accept json
// @Produce json
// @Param request body schemas.CreateJobDoneForTelegramPayload true "Job done payload"
// @Success 200 {object} schemas.JobDonePopulatedResponse
// @Router /jobDones/telegram [post]
func (jc *JobDoneController) CreateJobDoneForTelegram(ctx *gin.Context) {
	var payload *schemas.CreateJobDoneForTelegramPayload

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "Failed payload", "error": err.Error()})
		return
	}

	dayReport, err := jc.dayReportService.GetOrCreateTodayDayReport(ctx, payload.WayUuid)
	util.HandleErrorGin(ctx, err)

	jobDonePayload := &schemas.CreateJobDonePayload{
		Description:       payload.Description,
		Time:              payload.Time,
		DayReportUuid:     dayReport.Uuid,
		OwnerUuid:         payload.OwnerUuid,
		JobTagUuids:       payload.JobTagUuids,
		CompanionLanguage: payload.CompanionLanguage,
	}

	jobDone, err := jc.jobDoneService.CreateJobDone(ctx, jobDonePayload)
	util.HandleErrorGin(ctx, err)

	for _, jobTagID := range payload.JobTagUuids {
		_, err := jc.jobDoneJobTagService.CreateJobDoneJobTag(ctx, &schemas.CreateJobDoneJobTagPayload{
			JobDoneUuid: jobDone.ID,
			JobTagUuid:  jobTagID,
		})
		util.HandleErrorGin(ctx, err)
	}

	jobTags, err := jc.jobTagService.GetLabelsByIDs(ctx, payload.JobTagUuids)
	util.HandleErrorGin(ctx, err)

	const MINIMAL_JOB_LENS_FOR_ANALYSIS = 5

	if len(payload.Description) > MINIMAL_JOB_LENS_FOR_ANALYSIS {
		go func() {
			language := payload.CompanionLanguage
			if language == "" {
				language = "en"
			}
			if err := jc.triggerCompanionFeedbackGeneration(context.Background(), jobDone.WayUUID, payload.Description, companionFeedbackParams{language: language, character: string(schemas.CompanionCharacterArmySergeant)}); err != nil {
				log.Printf("[CreateJobDoneForTelegram] ERROR in companion feedback generation: %v", err)
			}
		}()
	}

	response := schemas.JobDonePopulatedResponse{
		Uuid:          jobDone.ID,
		CreatedAt:     jobDone.CreatedAt,
		UpdatedAt:     jobDone.UpdatedAt,
		Description:   jobDone.Description,
		Time:          jobDone.Time,
		OwnerUuid:     jobDone.OwnerUuid,
		OwnerName:     jobDone.OwnerName,
		DayReportUuid: jobDone.DayReportID,
		WayUUID:       jobDone.WayUUID,
		WayName:       jobDone.WayName,
		Tags:          jobTags,
	}

	ctx.JSON(http.StatusOK, response)
}

type companionFeedbackParams struct {
	language  string
	character string
}

func (jc *JobDoneController) triggerCompanionFeedbackGeneration(ctx context.Context, wayID string, description string, params companionFeedbackParams) error {
	log.Printf("[CompanionFeedback] Starting feedback generation for wayID: %s", wayID)

	wayUUID := uuid.MustParse(wayID)

	reports, err := jc.dayReportService.GetLast14DayReportsByWayID(ctx, wayUUID)
	if err != nil {
		log.Printf("[CompanionFeedback] ERROR getting day reports: %v", err)
		return err
	}

	reportsData := formatDayReportsForCompanion(reports)

	way, err := jc.wayService.GetPlainWayById(ctx, wayUUID)
	if err != nil {
		log.Printf("[CompanionFeedback] ERROR getting way: %v", err)
		return err
	}

	metrics, err := jc.metricService.GetMetricsByWayUuid(ctx, wayUUID)
	if err != nil {
		log.Printf("[CompanionFeedback] ERROR getting metrics: %v", err)
		return err
	}

	companionMetrics := make([]schemas.CompanionMetric, len(metrics))
	for i, m := range metrics {
		companionMetrics[i] = schemas.CompanionMetric{
			Description: m.Description,
			IsDone:      m.IsDone,
			DoneDate:    m.DoneDate,
		}
	}

	character := params.character
	payload := &schemas.CompanionAnalyzePayload{
		WayUUID:        wayID,
		WayName:        way.Name,
		Goal:           way.GoalDescription,
		Character:      character,
		Language:       params.language,
		DayReportsData: reportsData,
		TriggerType:    "job_done",
		Metrics:        companionMetrics,
	}

	log.Printf("[CompanionFeedback] Calling Gemini API for wayID: %s", wayID)
	response, err := jc.geminiService.GenerateCompanionFeedback(ctx, payload)
	if err != nil {
		log.Printf("[CompanionFeedback] ERROR generating feedback from Gemini: %v", err)
		return err
	}

	log.Printf("[CompanionFeedback] Upserting feedback for wayID: %s", wayID)
	_, err = jc.companionFeedbackSvc.UpsertCompanionFeedback(ctx, &services.CreateCompanionFeedbackParams{
		WayUUID:       wayUUID,
		Status:        int32(response.Status),
		Comment:       response.Comment,
		Character:     character,
		Language:      params.language,
		LastUpdatedAt: time.Now(),
	})
	if err != nil {
		log.Printf("[CompanionFeedback] ERROR upserting feedback: %v", err)
		return err
	}

	log.Printf("[CompanionFeedback] Successfully generated feedback for wayID: %s", wayID)
	return nil
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

// Update JobDone handler
// @Summary Update jobDone by UUID
// @Description
// @Tags jobDone
// @ID update-jobDone
// @Accept  json
// @Produce  json
// @Param request body schemas.UpdateJobDone true "query params"
// @Param jobDoneId path string true "jobDone UUID"
// @Success 200 {object} schemas.JobDonePopulatedResponse
// @Failure 403 {object} customErrors.NoRightToChangeDayReportError "User doesn't have rights to update job done."
// @Router /jobDones/{jobDoneId} [patch]
func (jc *JobDoneController) UpdateJobDone(ctx *gin.Context) {
	var payload *schemas.UpdateJobDone
	jobDoneID := ctx.Param("jobDoneId")

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "Failed payload", "error": err.Error()})
		return
	}

	userIDRaw, _ := ctx.Get(auth.ContextKeyUserID)
	userID := userIDRaw.(string)

	err := jc.permissionService.CheckIsUserHavingPermissionsForJobDone(ctx, userID, jobDoneID)
	util.HandleErrorGin(ctx, err)

	jobDone, err := jc.jobDoneService.UpdateJobDone(ctx, &services.UpdateJobDoneParams{
		JobDoneID:   jobDoneID,
		Description: payload.Description,
		Time:        payload.Time,
	})
	util.HandleErrorGin(ctx, err)

	jobTags, err := jc.jobTagService.GetLabelsByIDs(ctx, jobDone.TagIDs)
	util.HandleErrorGin(ctx, err)

	const MINIMAL_JOB_LENS_FOR_ANALYSIS = 5

	if len(jobDone.Description) > MINIMAL_JOB_LENS_FOR_ANALYSIS {
		go func() {
			language := ""
			if payload.CompanionLanguage != nil {
				language = *payload.CompanionLanguage
			}
			if language == "" {
				language = "en"
			}
			character := string(schemas.CompanionCharacterArmySergeant)
			existingFeedback, _ := jc.companionFeedbackSvc.GetCompanionFeedbackByWayId(context.Background(), uuid.MustParse(jobDone.WayUUID))
			if existingFeedback != nil {
				character = string(existingFeedback.Character)
			}
			if err := jc.triggerCompanionFeedbackGeneration(context.Background(), jobDone.WayUUID, jobDone.Description, companionFeedbackParams{language: language, character: character}); err != nil {
				log.Printf("[UpdateJobDone] ERROR in companion feedback generation: %v", err)
			}
		}()
	}

	response := schemas.JobDonePopulatedResponse{
		Uuid:          jobDone.ID,
		CreatedAt:     jobDone.CreatedAt,
		UpdatedAt:     jobDone.UpdatedAt,
		Description:   jobDone.Description,
		Time:          jobDone.Time,
		OwnerUuid:     jobDone.OwnerUuid,
		OwnerName:     jobDone.OwnerName,
		DayReportUuid: jobDone.DayReportID,
		WayUUID:       jobDone.WayUUID,
		WayName:       jobDone.WayName,
		Tags:          jobTags,
	}

	ctx.JSON(http.StatusOK, response)
}

// Deleting jobDone handlers
// @Summary Delete jobDone by UUID
// @Description
// @Tags jobDone
// @ID delete-jobDone
// @Accept  json
// @Produce  json
// @Param jobDoneId path string true "jobDone ID"
// @Success 204
// @Failure 403 {object} customErrors.NoRightToChangeDayReportError "User doesn't have rights to delete job done."
// @Router /jobDones/{jobDoneId} [delete]
func (jc *JobDoneController) DeleteJobDoneById(ctx *gin.Context) {
	jobDoneID := ctx.Param("jobDoneId")

	userIDRaw, _ := ctx.Get(auth.ContextKeyUserID)
	userID := userIDRaw.(string)

	err := jc.permissionService.CheckIsUserHavingPermissionsForJobDone(ctx, userID, jobDoneID)
	util.HandleErrorGin(ctx, err)

	err = jc.jobDoneService.DeleteJobDoneByID(ctx, jobDoneID)
	util.HandleErrorGin(ctx, err)

	ctx.Status(http.StatusNoContent)
}
