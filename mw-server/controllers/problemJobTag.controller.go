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

type ProblemJobTagController struct {
	db  *db.Queries
	ctx context.Context
}

func NewProblemJobTagController(db *db.Queries, ctx context.Context) *ProblemJobTagController {
	return &ProblemJobTagController{db, ctx}
}

// Create problemJobTag  handler
// @Summary Create a new problemJobTag
// @Description
// @Tags problemJobTag
// @ID create-problemJobTag
// @Accept  json
// @Produce  json
// @Param request body schemas.CreateProblemJobTagPayload true "query params"
// @Success 200
// @Router /problemJobTags [post]
func (cc *ProblemJobTagController) CreateProblemJobTag(ctx *gin.Context) {
	var payload *schemas.CreateProblemJobTagPayload

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "Failed payload", "error": err.Error()})
		return
	}

	args := db.CreateProblemsJobTagParams{
		ProblemUuid: pgtype.UUID{Bytes: uuid.MustParse(payload.ProblemUuid), Valid: true},
		JobTagUuid:  pgtype.UUID{Bytes: uuid.MustParse(payload.JobTagUuid), Valid: true},
	}

	problemJobTag, err := cc.db.CreateProblemsJobTag(ctx, args)
	util.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusOK, problemJobTag)
}

// Deleting problemJobTag handlers
// @Summary Delete problemJobTag by UUID
// @Description
// @Tags problemJobTag
// @ID delete-problemJobTag
// @Accept  json
// @Produce  json
// @Param problemId path string true "problem ID"
// @Param jobTagId path string true "jobTag ID"
// @Success 200
// @Router /problemJobTags/{jobTagId}/{problemId} [delete]
func (cc *ProblemJobTagController) DeleteProblemJobTagById(ctx *gin.Context) {
	jobTagId := ctx.Param("jobTagId")
	problemId := ctx.Param("problemId")

	args := db.DeleteProblemsJobTagByIdsParams{
		ProblemUuid: pgtype.UUID{Bytes: uuid.MustParse(problemId), Valid: true},
		JobTagUuid:  pgtype.UUID{Bytes: uuid.MustParse(jobTagId), Valid: true},
	}
	err := cc.db.DeleteProblemsJobTagByIds(ctx, args)
	util.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusNoContent, gin.H{"status": "successfully deleted"})

}
