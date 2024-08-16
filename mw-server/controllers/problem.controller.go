package controllers

import (
	"context"
	"net/http"
	"time"

	db "mwserver/db/sqlc"
	"mwserver/schemas"
	"mwserver/util"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgtype"
)

type ProblemController struct {
	db  *db.Queries
	ctx context.Context
}

func NewProblemController(db *db.Queries, ctx context.Context) *ProblemController {
	return &ProblemController{db, ctx}
}

// Create Problem  handler
// @Summary Create a new problem
// @Description
// @Tags problem
// @ID create-problem
// @Accept  json
// @Produce  json
// @Param request body schemas.CreateProblemPayload true "query params"
// @Success 200 {object} schemas.ProblemPopulatedResponse
// @Router /problems [post]
func (cc *ProblemController) CreateProblem(ctx *gin.Context) {
	var payload *schemas.CreateProblemPayload

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "Failed payload", "error": err.Error()})
		return
	}

	now := time.Now()
	args := db.CreateProblemParams{
		CreatedAt:     pgtype.Timestamp{Time: now, Valid: true},
		UpdatedAt:     pgtype.Timestamp{Time: now, Valid: true},
		Description:   payload.Description,
		IsDone:        payload.IsDone,
		OwnerUuid:     pgtype.UUID{Bytes: uuid.MustParse(payload.OwnerUuid), Valid: true},
		DayReportUuid: pgtype.UUID{Bytes: uuid.MustParse(payload.DayReportUuid), Valid: true},
	}

	problem, err := cc.db.CreateProblem(ctx, args)
	util.HandleErrorGin(ctx, err)

	response := schemas.ProblemPopulatedResponse{
		Uuid:          util.ConvertPgUUIDToUUID(problem.Uuid).String(),
		CreatedAt:     problem.CreatedAt.Time.Format(util.DEFAULT_STRING_LAYOUT),
		UpdatedAt:     problem.UpdatedAt.Time.Format(util.DEFAULT_STRING_LAYOUT),
		Description:   problem.Description,
		IsDone:        problem.IsDone,
		OwnerUuid:     util.ConvertPgUUIDToUUID(problem.OwnerUuid).String(),
		OwnerName:     problem.OwnerName,
		DayReportUuid: util.ConvertPgUUIDToUUID(problem.DayReportUuid).String(),
	}

	ctx.JSON(http.StatusOK, response)
}

// Update Problem handler
// @Summary Update problem by UUID
// @Description
// @Tags problem
// @ID update-problem
// @Accept  json
// @Produce  json
// @Param request body schemas.UpdateProblemPayload true "query params"
// @Param problemId path string true "problem ID"
// @Success 200 {object} schemas.ProblemPopulatedResponse
// @Router /problems/{problemId} [patch]
func (cc *ProblemController) UpdateProblem(ctx *gin.Context) {
	var payload *schemas.UpdateProblemPayload
	problemId := ctx.Param("problemId")

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "Failed payload", "error": err.Error()})
		return
	}

	var descriptionPg pgtype.Text
	if payload.Description != nil {
		descriptionPg = pgtype.Text{String: *payload.Description, Valid: true}
	}
	var isDonePg pgtype.Bool
	if payload.IsDone != nil {
		isDonePg = pgtype.Bool{Bool: *payload.IsDone, Valid: true}
	}
	now := time.Now()
	args := db.UpdateProblemParams{
		Uuid:        pgtype.UUID{Bytes: uuid.MustParse(problemId), Valid: true},
		UpdatedAt:   pgtype.Timestamp{Time: now, Valid: true},
		IsDone:      isDonePg,
		Description: descriptionPg,
	}

	problem, err := cc.db.UpdateProblem(ctx, args)
	util.HandleErrorGin(ctx, err)

	response := schemas.ProblemPopulatedResponse{
		Uuid:          util.ConvertPgUUIDToUUID(problem.Uuid).String(),
		CreatedAt:     problem.CreatedAt.Time.Format(util.DEFAULT_STRING_LAYOUT),
		UpdatedAt:     problem.UpdatedAt.Time.Format(util.DEFAULT_STRING_LAYOUT),
		Description:   problem.Description,
		IsDone:        problem.IsDone,
		OwnerUuid:     util.ConvertPgUUIDToUUID(problem.OwnerUuid).String(),
		OwnerName:     problem.OwnerName,
		DayReportUuid: util.ConvertPgUUIDToUUID(problem.DayReportUuid).String(),
	}

	ctx.JSON(http.StatusOK, response)
}

// Deleting Problem handlers
// @Summary Delete problem by UUID
// @Description
// @Tags problem
// @ID delete-problem
// @Accept  json
// @Produce  json
// @Param problemId path string true "problem ID"
// @Success 200
// @Router /problems/{problemId} [delete]
func (cc *ProblemController) DeleteProblemById(ctx *gin.Context) {
	problemId := ctx.Param("problemId")

	err := cc.db.DeleteProblem(ctx, pgtype.UUID{Bytes: uuid.MustParse(problemId), Valid: true})
	util.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusNoContent, gin.H{"status": "successfully deleted"})

}
