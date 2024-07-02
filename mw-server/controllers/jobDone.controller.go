package controllers

import (
	"context"
	"database/sql"
	"net/http"
	"time"

	db "mwserver/db/sqlc"
	dbPGX "mwserver/db_pgx/sqlc"
	"mwserver/schemas"
	"mwserver/util"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgtype"
	"github.com/samber/lo"
)

type JobDoneController struct {
	db    *db.Queries
	dbPGX *dbPGX.Queries
	ctx   context.Context
}

func NewJobDoneController(db *db.Queries, dbPGX *dbPGX.Queries, ctx context.Context) *JobDoneController {
	return &JobDoneController{db, dbPGX, ctx}
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
	args := &dbPGX.CreateJobDoneParams{
		Description:   payload.Description,
		OwnerUuid:     pgtype.UUID{Bytes: uuid.MustParse(payload.OwnerUuid), Valid: true},
		DayReportUuid: pgtype.UUID{Bytes: uuid.MustParse(payload.DayReportUuid), Valid: true},
		UpdatedAt:     pgtype.Timestamp{Time: now, Valid: true},
		CreatedAt:     pgtype.Timestamp{Time: now, Valid: true},
		Time:          int32(payload.Time),
	}

	jobDone, err := cc.dbPGX.CreateJobDone(ctx, *args)
	util.HandleErrorGin(ctx, err)

	tags := lo.Map(payload.JobTagUuids, func(tagUuidStringified string, i int) schemas.JobTagResponse {
		tagUuid := uuid.MustParse(tagUuidStringified)
		tagPgUuid := pgtype.UUID{Bytes: tagUuid, Valid: true}
		argsTag := &dbPGX.CreateJobDonesJobTagParams{
			JobDoneUuid: jobDone.Uuid,
			JobTagUuid:  tagPgUuid,
		}
		_, err := cc.dbPGX.CreateJobDonesJobTag(ctx, *argsTag)
		util.HandleErrorGin(ctx, err)

		tag, err := cc.dbPGX.GetJobTagByUuid(ctx, tagPgUuid)
		util.HandleErrorGin(ctx, err)
		return schemas.JobTagResponse{
			Uuid:        tagUuid.String(),
			Name:        tag.Name,
			Description: tag.Description,
			Color:       tag.Color,
		}
	})
	response := schemas.JobDonePopulatedResponse{
		Uuid:          util.ConvertPgUUIDToUUID(jobDone.Uuid).String(),
		CreatedAt:     jobDone.CreatedAt.Time.Format(util.DEFAULT_STRING_LAYOUT),
		UpdatedAt:     jobDone.UpdatedAt.Time.Format(util.DEFAULT_STRING_LAYOUT),
		Description:   jobDone.Description,
		Time:          jobDone.Time,
		OwnerUuid:     util.ConvertPgUUIDToUUID(jobDone.OwnerUuid).String(),
		OwnerName:     jobDone.OwnerName,
		DayReportUuid: util.ConvertPgUUIDToUUID(jobDone.DayReportUuid).String(),
		Tags:          tags,
	}

	ctx.JSON(http.StatusOK, response)
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
	util.HandleErrorGin(ctx, err)

	tagUuids := lo.Map(jobDone.TagUuids, func(stringifiedUuid string, i int) uuid.UUID {
		return uuid.MustParse(stringifiedUuid)
	})
	dbTags, _ := cc.db.GetListLabelsByLabelUuids(ctx, tagUuids)
	tags := lo.Map(dbTags, func(dbTag db.JobTag, i int) schemas.JobTagResponse {
		return schemas.JobTagResponse{
			Uuid:        dbTag.Uuid.String(),
			Name:        dbTag.Name,
			Description: dbTag.Description,
			Color:       dbTag.Color,
		}
	})
	response := schemas.JobDonePopulatedResponse{
		Uuid:          jobDone.Uuid.String(),
		CreatedAt:     jobDone.CreatedAt.Format(util.DEFAULT_STRING_LAYOUT),
		UpdatedAt:     jobDone.UpdatedAt.Format(util.DEFAULT_STRING_LAYOUT),
		Description:   jobDone.Description,
		Time:          jobDone.Time,
		OwnerUuid:     jobDone.OwnerUuid.String(),
		OwnerName:     jobDone.OwnerName,
		DayReportUuid: jobDone.DayReportUuid.String(),
		Tags:          tags,
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
// @Success 200
// @Router /jobDones/{jobDoneId} [delete]
func (cc *JobDoneController) DeleteJobDoneById(ctx *gin.Context) {
	jobDoneId := ctx.Param("jobDoneId")

	err := cc.db.DeleteJobDone(ctx, uuid.MustParse(jobDoneId))
	util.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusNoContent, gin.H{"status": "successfully deleted"})

}
