package controllers

import (
	"context"
	"database/sql"
	"net/http"
	"time"

	db "mwserver/db/sqlc"
	"mwserver/schemas"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type JobDoneController struct {
	db  *db.Queries
	ctx context.Context
}

func NewJobDoneController(db *db.Queries, ctx context.Context) *JobDoneController {
	return &JobDoneController{db, ctx}
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
// @Router /jobDones [post]
func (cc *JobDoneController) CreateJobDone(ctx *gin.Context) {
	var payload *schemas.CreateJobDonePayload

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "Failed payload", "error": err.Error()})
		return
	}

	now := time.Now()
	args := &db.CreateJobDoneParams{
		Description:   payload.Description,
		OwnerUuid:     uuid.MustParse(payload.OwnerUuid),
		DayReportUuid: uuid.MustParse(payload.DayReportUuid),
		UpdatedAt:     now,
		CreatedAt:     now,
		Time:          int32(payload.Time),
	}

	jobDone, err := cc.db.CreateJobDone(ctx, *args)

	if err != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{"status": "Failed retrieving JobDone", "error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, jobDone)
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
// @Router /jobDones/{jobDoneId} [patch]
func (cc *JobDoneController) UpdateJobDone(ctx *gin.Context) {
	var payload *schemas.UpdateJobDone
	jobDoneId := ctx.Param("jobDoneId")

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "Failed payload", "error": err.Error()})
		return
	}

	now := time.Now()
	args := &db.UpdateJobDoneParams{
		Uuid:        uuid.MustParse(jobDoneId),
		Description: sql.NullString{String: payload.Description, Valid: payload.Description != ""},
		UpdatedAt:   sql.NullTime{Time: now, Valid: true},
		Time:        sql.NullInt32{Int32: int32(payload.Time), Valid: payload.Time != 0},
	}

	jobDone, err := cc.db.UpdateJobDone(ctx, *args)

	if err != nil {
		if err == sql.ErrNoRows {
			ctx.JSON(http.StatusNotFound, gin.H{"status": "failed", "message": "Failed to retrieve JobDone with this ID"})
			return
		}
		ctx.JSON(http.StatusBadGateway, gin.H{"status": "Failed retrieving jobDone", "error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, jobDone)
}

// Get jobs done by day report uuid handler
// @Summary Get jobDones by dayReport UUID
// @Description
// @Tags jobDone
// @ID get-jobDones-by-DayReport-uuid
// @Accept  json
// @Produce  json
// @Param dayReportId path string true "dayReport UUID"
// @Success 200 {array} schemas.JobDonePopulatedResponse
// @Router /jobDones/{dayReportId} [get]
func (cc *JobDoneController) GetJobDonesByDayReportId(ctx *gin.Context) {
	dayReportId := ctx.Param("dayReportId")

	jobDone, err := cc.db.GetListJobsDoneByDayReportId(ctx, uuid.MustParse(dayReportId))
	if err != nil {
		if err == sql.ErrNoRows {
			ctx.JSON(http.StatusNotFound, gin.H{"status": "failed", "message": "Failed to retrieve JobDone with this ID"})
			return
		}
		ctx.JSON(http.StatusBadGateway, gin.H{"status": "Failed retrieving JobDone", "error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, jobDone)
}

// Deleting jobDone handlers
// @Summary Delete jobDone by UUID
// @Description
// @Tags jobDone
// @ID delete-jobDone
// @Accept  json
// @Produce  json
// @Param jobDoneId path string true "jobDone ID"
// @Success 200
// @Router /jobDones/{jobDoneId} [delete]
func (cc *JobDoneController) DeleteJobDoneById(ctx *gin.Context) {
	jobDoneId := ctx.Param("jobDoneId")

	err := cc.db.DeleteJobDone(ctx, uuid.MustParse(jobDoneId))
	if err != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{"status": "failed", "error": err.Error()})
		return
	}

	ctx.JSON(http.StatusNoContent, gin.H{"status": "successfully deleted"})

}
