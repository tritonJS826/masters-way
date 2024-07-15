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

type JobTagController struct {
	db  *db.Queries
	ctx context.Context
}

func NewJobTagController(db *db.Queries, ctx context.Context) *JobTagController {
	return &JobTagController{db, ctx}
}

// Create wayTag  handler
// @Summary Create a new jobTag
// @Description
// @Tags jobTag
// @ID create-jobTag
// @Accept  json
// @Produce  json
// @Param request body schemas.CreateJobTagPayload true "query params"
// @Success 200 {object} schemas.JobTagResponse
// @Router /jobTags [post]
func (cc *JobTagController) CreateJobTag(ctx *gin.Context) {
	var payload *schemas.CreateJobTagPayload

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "Failed payload", "error": err.Error()})
		return
	}

	args := db.CreateJobTagParams{
		Name:        payload.Name,
		WayUuid:     pgtype.UUID{Bytes: uuid.MustParse(payload.WayUuid), Valid: true},
		Description: payload.Description,
		Color:       payload.Color,
	}

	jobTag, err := cc.db.CreateJobTag(ctx, args)
	util.HandleErrorGin(ctx, err)

	response := schemas.JobTagResponse{
		Uuid:        util.ConvertPgUUIDToUUID(jobTag.Uuid).String(),
		Name:        jobTag.Name,
		Description: jobTag.Description,
		Color:       jobTag.Color,
	}

	ctx.JSON(http.StatusOK, response)
}

// Update jobTag handler
// @Summary Update jobTag by UUID
// @Description
// @Tags jobTag
// @ID update-jobTag
// @Accept  json
// @Produce  json
// @Param request body schemas.UpdateJobTagPayload true "query params"
// @Param jobTagId path string true "jobTag UUID"
// @Success 200 {object} schemas.JobTagResponse
// @Router /jobTags/{jobTagId} [patch]
func (cc *JobTagController) UpdateJobTag(ctx *gin.Context) {
	var payload *schemas.UpdateJobTagPayload
	jobTagId := ctx.Param("jobTagId")

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "Failed payload", "error": err.Error()})
		return
	}

	args := db.UpdateJobTagParams{
		Uuid:        pgtype.UUID{Bytes: uuid.MustParse(jobTagId), Valid: true},
		Name:        pgtype.Text{String: payload.Name, Valid: payload.Name != ""},
		Description: pgtype.Text{String: payload.Description, Valid: payload.Description != ""},
		Color:       pgtype.Text{String: payload.Color, Valid: payload.Color != ""},
	}

	jobTag, err := cc.db.UpdateJobTag(ctx, args)
	util.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusOK, jobTag)
}

// Deleting wayTag handlers
// @Summary Delete jobTag by UUID
// @Description
// @Tags jobTag
// @ID delete-jobTag
// @Accept  json
// @Produce  json
// @Param jobTagId path string true "jobTag ID"
// @Success 200
// @Router /jobTags/{jobTagId} [delete]
func (cc *JobTagController) DeleteJobTagById(ctx *gin.Context) {
	jobTagId := ctx.Param("jobTagId")

	err := cc.db.DeleteJobTagById(ctx, pgtype.UUID{Bytes: uuid.MustParse(jobTagId), Valid: true})
	util.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusNoContent, gin.H{"status": "successfully deleted"})

}
