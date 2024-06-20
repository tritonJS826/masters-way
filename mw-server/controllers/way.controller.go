package controllers

import (
	"context"
	"database/sql"
	"net/http"
	"strconv"
	"time"

	db "mwserver/db/sqlc"
	"mwserver/schemas"
	"mwserver/services"
	"mwserver/util"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
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

	limitParams := map[services.LimitParamName]uuid.UUID{
		"userID": payload.OwnerUuid,
	}

	// Проверка достижения ограничения на максимальное количество приватных путей
	if payload.IsPrivate {
		err := cc.ls.IsLimitReachedByPricingPlan(services.MaxPrivateWays, limitParams)
		util.HandleErrorGin(ctx, err)
	}

	// Проверка достижения ограничения на максимальное количество путей
	err := cc.ls.IsLimitReachedByPricingPlan(services.MaxOwnWays, limitParams)
	util.HandleErrorGin(ctx, err)

	now := time.Now()
	args := &db.CreateWayParams{
		Name:              payload.Name,
		GoalDescription:   payload.GoalDescription,
		EstimationTime:    payload.EstimationTime,
		OwnerUuid:         payload.OwnerUuid,
		IsCompleted:       payload.IsCompleted,
		IsPrivate:         false,
		CopiedFromWayUuid: util.ToNullUuid(payload.CopiedFromWayUuid),
		UpdatedAt:         now,
		CreatedAt:         now,
	}

	way, err := cc.db.CreateWay(ctx, *args)
	util.HandleErrorGin(ctx, err)

	isWayCopied := way.CopiedFromWayUuid.Valid
	if isWayCopied {
		args1 := services.GetPopulatedWayByIdParams{
			WayUuid:              way.CopiedFromWayUuid.UUID,
			CurrentChildrenDepth: 1,
		}
		originalWay, err := services.GetPopulatedWayById(cc.db, ctx, args1)
		util.HandleErrorGin(ctx, err)

		// copy wayTags
		lo.ForEach(originalWay.WayTags, func(wayTag schemas.WayTagResponse, i int) {
			cc.db.CreateWaysWayTag(ctx, db.CreateWaysWayTagParams{
				WayUuid:    way.Uuid,
				WayTagUuid: uuid.MustParse(wayTag.Uuid),
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
				UpdatedAt:        now,
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

	now := time.Now()
	args := &db.UpdateWayParams{
		Uuid:            uuid.MustParse(wayId),
		Name:            sql.NullString{String: payload.Name, Valid: payload.Name != ""},
		GoalDescription: sql.NullString{String: payload.GoalDescription, Valid: payload.GoalDescription != ""},
		EstimationTime:  sql.NullInt32{Int32: payload.EstimationTime, Valid: payload.EstimationTime != 0},
		IsCompleted:     sql.NullBool{Bool: payload.IsCompleted, Valid: true},
		IsPrivate:       sql.NullBool{Bool: payload.IsPrivate, Valid: true},
		UpdatedAt:       sql.NullTime{Time: now, Valid: true},
	}

	way, err := cc.db.UpdateWay(ctx, *args)
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

	waySizeArgs := &db.CountWaysByTypeParams{
		WayStatus: status,
		Column1:   currentDate,
	}
	waysSize, _ := cc.db.CountWaysByType(ctx, *waySizeArgs)

	listWaysArgs := &db.ListWaysParams{
		Limit:   int32(reqLimit),
		Offset:  int32(offset),
		Column3: status,
		Column4: currentDate,
	}

	ways, err := cc.db.ListWays(ctx, *listWaysArgs)
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

	err := cc.db.DeleteWay(ctx, uuid.MustParse(wayId))
	util.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusNoContent, gin.H{"status": "successfuly deleted"})

}
