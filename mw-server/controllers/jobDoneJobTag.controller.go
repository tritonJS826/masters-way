package controllers

import (
	"context"
	"net/http"

	db "mwserver/db/sqlc"
	"mwserver/schemas"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type JobDoneJobTagController struct {
	db  *db.Queries
	ctx context.Context
}

func NewJobDoneJobTagController(db *db.Queries, ctx context.Context) *JobDoneJobTagController {
	return &JobDoneJobTagController{db, ctx}
}

// Create jobDoneJobTag handler
// @Summary Create a new jobDoneJobTag
// @Description
// @Tags jobDoneJobTag
// @ID create-jobDoneJobTag
// @Accept  json
// @Produce  json
// @Param request body schemas.CreateJobDoneJobTagPayload true "query params"
// @Success 200
// @Router /jobDoneJobTags [post]
func (cc *JobDoneJobTagController) CreateJobDoneJobTag(ctx *gin.Context) {
	var payload *schemas.CreateJobDoneJobTagPayload

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "Failed payload", "error": err.Error()})
		return
	}

	args := &db.CreateJobDonesJobTagParams{
		JobDoneUuid: payload.JobDoneUuid,
		JobTagUuid:  payload.JobTagUuid,
	}

	jobDoneJobTag, err := cc.db.CreateJobDonesJobTag(ctx, *args)

	if err != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{"status": "Failed retrieving jobDoneJobTag", "error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, jobDoneJobTag)
}

// Deleting JobDoneJobTag handlers
// @Summary Delete jobDoneJobTag by UUID
// @Description
// @Tags jobDoneJobTag
// @ID delete-jobDoneJobTag
// @Accept  json
// @Produce  json
// @Param jobDoneId path string true "jobDone ID"
// @Param jobTagId path string true "jobTag UUID"
// @Success 200
// @Router /jobDoneJobTags/{jobTagId}/{jobDoneId} [delete]
func (cc *JobDoneJobTagController) DeleteJobDoneJobTagById(ctx *gin.Context) {
	jobTagId := ctx.Param("jobTagId")
	jobDoneId := ctx.Param("jobDoneId")

	args := &db.DeleteJobDonesJobTagByJobDoneIdParams{
		JobDoneUuid: uuid.MustParse(jobDoneId),
		JobTagUuid:  uuid.MustParse(jobTagId),
	}
	err := cc.db.DeleteJobDonesJobTagByJobDoneId(ctx, *args)
	if err != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{"status": "failed", "error": err.Error()})
		return
	}

	ctx.JSON(http.StatusNoContent, gin.H{"status": "successfully deleted"})

}
