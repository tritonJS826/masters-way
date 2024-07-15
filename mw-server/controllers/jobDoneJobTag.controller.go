package controllers

import (
	"context"
	"net/http"

	db "mwserver/db/sqlc"
	"mwserver/schemas"
	"mwserver/util"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgtype"
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

	args := db.CreateJobDonesJobTagParams{
		JobDoneUuid: pgtype.UUID{Bytes: uuid.MustParse(payload.JobDoneUuid), Valid: true},
		JobTagUuid:  pgtype.UUID{Bytes: uuid.MustParse(payload.JobTagUuid), Valid: true},
	}

	jobDoneJobTag, err := cc.db.CreateJobDonesJobTag(ctx, args)
	util.HandleErrorGin(ctx, err)

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

	args := db.DeleteJobDonesJobTagByJobDoneIdParams{
		JobDoneUuid: pgtype.UUID{Bytes: uuid.MustParse(jobDoneId), Valid: true},
		JobTagUuid:  pgtype.UUID{Bytes: uuid.MustParse(jobTagId), Valid: true},
	}
	err := cc.db.DeleteJobDonesJobTagByJobDoneId(ctx, args)
	util.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusNoContent, gin.H{"status": "successfully deleted"})

}
