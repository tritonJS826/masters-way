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
}

func NewWayController(db *db.Queries, ctx context.Context) *WayController {
	return &WayController{db, ctx}
}

// Create way  handler
// @Summary Create a new way
// @Description
// @Tags way
// @ID create-way
// @Accept  json
// @Produce  json
// @Param request body schemas.CreateWay true "query params"
// @Success 200 {object} schemas.WayPopulatedResponse
// @Router /ways [post]
func (cc *WayController) CreateWay(ctx *gin.Context) {
	var payload *schemas.CreateWay

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

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

	args2 := services.GetPopulatedWayByIdParams{
		WayUuid:              way.Uuid,
		CurrentChildrenDepth: 1,
	}
	response, err := services.GetPopulatedWayById(cc.db, ctx, args2)
	util.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusOK, response)
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

	copiedFromWayUuid := util.MarshalNullUuid(way.CopiedFromWayUuid)
	mentorsRaw, err := cc.db.GetMentorUsersByWayId(ctx, way.Uuid)
	util.HandleErrorGin(ctx, err)
	mentors := lo.Map(mentorsRaw, func(dbMentor db.User, i int) schemas.UserPlainResponse {
		return schemas.UserPlainResponse{
			Uuid:        dbMentor.Uuid.String(),
			Name:        dbMentor.Name,
			Email:       dbMentor.Email,
			Description: dbMentor.Description,
			CreatedAt:   dbMentor.CreatedAt.Format(util.DEFAULT_STRING_LAYOUT),
			ImageUrl:    util.MarshalNullString(dbMentor.ImageUrl),
			IsMentor:    dbMentor.IsMentor,
		}
	})

	dbOwner, err := cc.db.GetUserById(ctx, way.OwnerUuid)
	util.HandleErrorGin(ctx, err)
	owner := schemas.UserPlainResponse{
		Uuid:        dbOwner.Uuid.String(),
		Name:        dbOwner.Name,
		Email:       dbOwner.Email,
		Description: dbOwner.Description,
		CreatedAt:   dbOwner.CreatedAt.Format(util.DEFAULT_STRING_LAYOUT),
		ImageUrl:    util.MarshalNullString(dbOwner.ImageUrl),
		IsMentor:    dbOwner.IsMentor,
	}
	dbTags, err := cc.db.GetListWayTagsByWayId(ctx, way.Uuid)
	util.HandleErrorGin(ctx, err)
	wayTags := lo.Map(dbTags, func(dbTag db.WayTag, i int) schemas.WayTagResponse {
		return schemas.WayTagResponse{
			Uuid: dbTag.Uuid.String(),
			Name: dbTag.Name,
		}
	})
	response := schemas.WayPlainResponse{
		Uuid:              way.Uuid.String(),
		Name:              way.Name,
		GoalDescription:   way.GoalDescription,
		UpdatedAt:         way.UpdatedAt.Format(util.DEFAULT_STRING_LAYOUT),
		CreatedAt:         way.CreatedAt.Format(util.DEFAULT_STRING_LAYOUT),
		EstimationTime:    way.EstimationTime,
		IsCompleted:       way.IsCompleted,
		Owner:             owner,
		CopiedFromWayUuid: copiedFromWayUuid,
		IsPrivate:         way.IsPrivate,
		FavoriteForUsers:  int32(way.WayFavoriteForUsers),
		DayReportsAmount:  int32(way.WayDayReportsAmount),
		Mentors:           mentors,
		MetricsDone:       int32(way.WayMetricsDone),
		MetricsTotal:      int32(way.WayMetricsTotal),
		WayTags:           wayTags,
	}

	ctx.JSON(http.StatusOK, response)
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

	wayUuids := lo.Map(ways, func(way db.ListWaysRow, i int) uuid.UUID {
		return way.Uuid
	})
	wayOwnerUuids := lo.Map(ways, func(way db.ListWaysRow, i int) uuid.UUID {
		return way.OwnerUuid
	})

	dbWayTags, err := cc.db.GetListWayTagsByWayIds(ctx, wayUuids)
	util.HandleErrorGin(ctx, err)
	wayTagsMap := make(map[uuid.UUID][]schemas.WayTagResponse)
	lo.ForEach(dbWayTags, func(dbWayTag db.GetListWayTagsByWayIdsRow, i int) {
		wayTag := schemas.WayTagResponse{
			Uuid: dbWayTag.Uuid.String(),
			Name: dbWayTag.Name,
		}
		wayTagsMap[dbWayTag.WayUuid] = append(wayTagsMap[dbWayTag.Uuid], wayTag)
	})

	dbMentors, err := cc.db.GetMentorUsersByWayIds(ctx, wayUuids)
	util.HandleErrorGin(ctx, err)
	mentorsMap := make(map[uuid.UUID][]schemas.UserPlainResponse)
	lo.ForEach(dbMentors, func(dbMentor db.GetMentorUsersByWayIdsRow, i int) {
		mentor := schemas.UserPlainResponse{
			Uuid:        dbMentor.Uuid.String(),
			Name:        dbMentor.Name,
			Email:       dbMentor.Email,
			Description: dbMentor.Description,
			CreatedAt:   dbMentor.CreatedAt.Format(util.DEFAULT_STRING_LAYOUT),
			ImageUrl:    util.MarshalNullString(dbMentor.ImageUrl),
			IsMentor:    dbMentor.IsMentor,
		}
		mentorsMap[dbMentor.WayUuid] = append(mentorsMap[dbMentor.WayUuid], mentor)
	})

	dbOwners, err := cc.db.GetUserByIds(ctx, wayOwnerUuids)
	util.HandleErrorGin(ctx, err)
	ownersMap := lo.SliceToMap(dbOwners, func(dbOwner db.User) (string, schemas.UserPlainResponse) {
		owner := schemas.UserPlainResponse{
			Uuid:        dbOwner.Uuid.String(),
			Name:        dbOwner.Name,
			Email:       dbOwner.Email,
			Description: dbOwner.Description,
			CreatedAt:   dbOwner.CreatedAt.Format(util.DEFAULT_STRING_LAYOUT),
			ImageUrl:    util.MarshalNullString(dbOwner.ImageUrl),
			IsMentor:    dbOwner.IsMentor,
		}

		return owner.Uuid, owner
	})

	response := lo.Map(ways, func(way db.ListWaysRow, i int) schemas.WayPlainResponse {
		copiedFromWayUuid := util.MarshalNullUuid(way.CopiedFromWayUuid)

		if wayTagsMap[way.Uuid] == nil {
			wayTagsMap[way.Uuid] = make([]schemas.WayTagResponse, 0)
		}
		if mentorsMap[way.Uuid] == nil {
			mentorsMap[way.Uuid] = make([]schemas.UserPlainResponse, 0)
		}
		wayResponse := schemas.WayPlainResponse{
			Uuid:              way.Uuid.String(),
			Name:              way.Name,
			GoalDescription:   way.GoalDescription,
			UpdatedAt:         way.UpdatedAt.Format(util.DEFAULT_STRING_LAYOUT),
			CreatedAt:         way.CreatedAt.Format(util.DEFAULT_STRING_LAYOUT),
			EstimationTime:    way.EstimationTime,
			IsCompleted:       way.IsCompleted,
			Owner:             ownersMap[way.OwnerUuid.String()],
			CopiedFromWayUuid: copiedFromWayUuid,
			IsPrivate:         way.IsPrivate,
			FavoriteForUsers:  int32(way.WayFavoriteForUsers),
			DayReportsAmount:  int32(way.WayDayReportsAmount),
			Mentors:           mentorsMap[way.Uuid],
			WayTags:           wayTagsMap[way.Uuid],
			MetricsDone:       int32(way.WayMetricsDone),
			MetricsTotal:      int32(way.WayMetricsTotal),
		}

		return wayResponse
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
