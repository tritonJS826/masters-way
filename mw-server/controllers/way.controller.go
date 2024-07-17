package controllers

import (
	"context"
	"net/http"
	"strconv"
	"time"

	"mwserver/auth"
	db "mwserver/db/sqlc"
	"mwserver/schemas"
	"mwserver/services"
	"mwserver/util"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgtype"
	"github.com/samber/lo"
)

type WayController struct {
	db  *db.Queries
	ctx context.Context
	ls  *services.LimitService
}

func NewWayController(db *db.Queries, ctx context.Context, ls *services.LimitService) *WayController {
	return &WayController{db, ctx, ls}
}

// Create way  handler
// @Summary Create a new way
// @Description
// @Tags way
// @ID create-way
// @Accept  json
// @Produce  json
// @Param request body schemas.CreateWay true "query params"
// @Success 200 {object} schemas.WayPlainResponse
// @Router /ways [post]
func (cc *WayController) CreateWay(ctx *gin.Context) {
	var payload *schemas.CreateWay

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	err := cc.ls.CheckIsLimitReachedByPricingPlan(&services.LimitReachedParams{
		LimitName: services.MaxOwnWays,
		UserID:    payload.OwnerUuid,
	})
	util.HandleErrorGin(ctx, err)

	now := time.Now()
	var copiedFromWayUuid pgtype.UUID
	if payload.CopiedFromWayUuid != "" {
		copiedFromWayUuid = pgtype.UUID{Bytes: uuid.MustParse(payload.CopiedFromWayUuid), Valid: true}
	}
	args := db.CreateWayParams{
		Name:              payload.Name,
		GoalDescription:   payload.GoalDescription,
		EstimationTime:    payload.EstimationTime,
		OwnerUuid:         pgtype.UUID{Bytes: payload.OwnerUuid, Valid: true},
		IsCompleted:       payload.IsCompleted,
		IsPrivate:         false,
		CopiedFromWayUuid: copiedFromWayUuid,
		UpdatedAt:         pgtype.Timestamp{Time: now, Valid: true},
		CreatedAt:         pgtype.Timestamp{Time: now, Valid: true},
	}

	way, err := cc.db.CreateWay(ctx, args)
	util.HandleErrorGin(ctx, err)

	isWayCopied := way.CopiedFromWayUuid.Valid
	if isWayCopied {
		args1 := services.GetPopulatedWayByIdParams{
			WayUuid:              way.CopiedFromWayUuid.Bytes,
			CurrentChildrenDepth: 1,
		}
		originalWay, err := services.GetPopulatedWayById(cc.db, ctx, args1)
		util.HandleErrorGin(ctx, err)

		// copy wayTags
		lo.ForEach(originalWay.WayTags, func(wayTag schemas.WayTagResponse, i int) {
			cc.db.CreateWaysWayTag(ctx, db.CreateWaysWayTagParams{
				WayUuid:    way.Uuid,
				WayTagUuid: pgtype.UUID{Bytes: uuid.MustParse(wayTag.Uuid), Valid: true},
			})
		})
		// copy labels
		lo.ForEach(originalWay.JobTags, func(jobTag schemas.JobTagResponse, i int) {
			cc.db.CreateJobTag(ctx, db.CreateJobTagParams{
				WayUuid:     way.Uuid,
				Name:        jobTag.Name,
				Description: jobTag.Description,
				Color:       jobTag.Color,
			})
		})
		// copy metrics
		lo.ForEach(originalWay.Metrics, func(metric schemas.MetricResponse, i int) {
			cc.db.CreateMetric(ctx, db.CreateMetricParams{
				UpdatedAt:        pgtype.Timestamp{Time: now, Valid: true},
				Description:      metric.Description,
				IsDone:           false,
				MetricEstimation: metric.MetricEstimation,
				WayUuid:          way.Uuid,
			})
		})
	}

	wayPlain, err := services.GetPlainWayById(cc.db, ctx, way.Uuid)
	util.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusOK, wayPlain)
}

// Update way handler
// @Summary Update way by UUID
// @Description
// @Tags way
// @ID update-way
// @Accept  json
// @Produce  json
// @Param request body schemas.UpdateWayPayload true "query params"
// @Param wayId path string true "way ID"
// @Success 200 {object} schemas.WayPlainResponse
// @Router /ways/{wayId} [patch]
func (cc *WayController) UpdateWay(ctx *gin.Context) {
	var payload *schemas.UpdateWayPayload
	wayId := ctx.Param("wayId")

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	userIDRaw, _ := ctx.Get(auth.ContextKeyUserID)
	userID := uuid.MustParse(userIDRaw.(string))

	var isPrivate pgtype.Bool
	if payload.IsPrivate != nil && *payload.IsPrivate {
		err := cc.ls.CheckIsLimitReachedByPricingPlan(&services.LimitReachedParams{
			LimitName: services.MaxPrivateWays,
			UserID:    userID,
		})
		util.HandleErrorGin(ctx, err)

		isPrivate = pgtype.Bool{Bool: *payload.IsPrivate, Valid: true}
	}

	now := time.Now()
	args := db.UpdateWayParams{
		Uuid:            pgtype.UUID{Bytes: uuid.MustParse(wayId), Valid: true},
		Name:            pgtype.Text{String: payload.Name, Valid: payload.Name != ""},
		GoalDescription: pgtype.Text{String: payload.GoalDescription, Valid: payload.GoalDescription != ""},
		EstimationTime:  pgtype.Int4{Int32: payload.EstimationTime, Valid: payload.EstimationTime != 0},
		IsCompleted:     pgtype.Bool{Bool: payload.IsCompleted, Valid: true},
		IsPrivate:       isPrivate,
		UpdatedAt:       pgtype.Timestamp{Time: now, Valid: true},
	}

	way, err := cc.db.UpdateWay(ctx, args)
	util.HandleErrorGin(ctx, err)

	wayPlain, err := services.GetPlainWayById(cc.db, ctx, way.Uuid)
	util.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusOK, wayPlain)
}

// Get a single handler
// @Summary Get way by UUID
// @Description
// @Tags way
// @ID get-way-by-uuid
// @Accept  json
// @Produce  json
// @Param wayId path string true "way ID"
// @Success 200 {object} schemas.WayPopulatedResponse
// @Router /ways/{wayId} [get]
func (cc *WayController) GetWayById(ctx *gin.Context) {
	wayUuidRaw := ctx.Param("wayId")
	wayUuid := uuid.MustParse(wayUuidRaw)

	args := services.GetPopulatedWayByIdParams{
		WayUuid:              wayUuid,
		CurrentChildrenDepth: 1,
	}
	response, err := services.GetPopulatedWayById(cc.db, ctx, args)
	util.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusOK, response)
}

// Retrieve all records handlers
// @Summary Get all ways
// @Description Get ways with pagination
// @Tags way
// @ID get-all-ways
// @Accept  json
// @Produce  json
// @Param page query integer false "Page number for pagination"
// @Param limit query integer false "Number of items per page"
// @Param status query string false "Ways type: all | completed | inProgress | abandoned"
// @Success 200 {object} schemas.GetAllWaysResponse
// @Router /ways [get]
func (cc *WayController) GetAllWays(ctx *gin.Context) {
	page := ctx.DefaultQuery("page", "1")
	limit := ctx.DefaultQuery("limit", "10")
	// status = "inProgress" | "completed" | "all" | "abandoned"
	status := ctx.DefaultQuery("status", "all")

	reqPageID, _ := strconv.Atoi(page)
	reqLimit, _ := strconv.Atoi(limit)
	offset := (reqPageID - 1) * reqLimit
	currentDate := time.Now()

	waySizeArgs := db.CountWaysByTypeParams{
		WayStatus: status,
		Column1:   pgtype.Timestamp{Time: currentDate, Valid: true},
	}
	waysSize, _ := cc.db.CountWaysByType(ctx, waySizeArgs)

	listWaysArgs := db.ListWaysParams{
		Limit:   int32(reqLimit),
		Offset:  int32(offset),
		Column3: status,
		Column4: pgtype.Timestamp{Time: currentDate, Valid: true},
	}

	ways, err := cc.db.ListWays(ctx, listWaysArgs)
	util.HandleErrorGin(ctx, err)

	response := lo.Map(ways, func(way db.ListWaysRow, i int) schemas.WayPlainResponse {
		wayPlain, err := services.GetPlainWayById(cc.db, ctx, way.Uuid)
		util.HandleErrorGin(ctx, err)

		return wayPlain
	})

	ctx.JSON(http.StatusOK, schemas.GetAllWaysResponse{Size: int32(waysSize), Ways: response})
}

// Deleting way handlers
// @Summary Delete way by UUID
// @Description
// @Tags way
// @ID delete-way
// @Accept  json
// @Produce  json
// @Param wayId path string true "way ID"
// @Success 200
// @Router /ways/{wayId} [delete]
func (cc *WayController) DeleteWayById(ctx *gin.Context) {
	wayId := ctx.Param("wayId")

	err := cc.db.DeleteWay(ctx, pgtype.UUID{Bytes: uuid.MustParse(wayId), Valid: true})
	util.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusNoContent, gin.H{"status": "successfuly deleted"})

}
