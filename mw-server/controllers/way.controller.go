package controllers

import (
	"context"
	"database/sql"
	"net/http"
	"strconv"
	"time"

	db "mwserver/db/sqlc"
	"mwserver/schemas"
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
// @Success 200 {object} schemas.WayPlainResponse
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
		Status:            payload.Status,
		CopiedFromWayUuid: util.ToNullUuid(payload.CopiedFromWayUuid),
		UpdatedAt:         now,
		CreatedAt:         now,
	}

	way, err := cc.db.CreateWay(ctx, *args)

	if err != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{"error": err.Error()})
		return
	}

	response := schemas.WayPlainResponse{
		Name:              way.Name,
		Uuid:              way.Uuid.String(),
		GoalDescription:   way.GoalDescription,
		UpdatedAt:         way.UpdatedAt.String(),
		CreatedAt:         way.CreatedAt.String(),
		EstimationTime:    way.EstimationTime,
		Status:            way.Status,
		OwnerUuid:         way.OwnerUuid.String(),
		CopiedFromWayUuid: util.MarshalNullUuid(way.CopiedFromWayUuid).(string),
		IsPrivate:         way.IsPrivate,
	}

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
		Status:          sql.NullString{String: payload.Status, Valid: payload.Status != ""},
		UpdatedAt:       sql.NullTime{Time: now, Valid: true},
	}

	way, err := cc.db.UpdateWay(ctx, *args)

	if err != nil {
		if err == sql.ErrNoRows {
			ctx.JSON(http.StatusNotFound, gin.H{"error": "Failed to retrieve way with this ID"})
			return
		}
		ctx.JSON(http.StatusBadGateway, gin.H{"error": err.Error()})
		return
	}

	response := schemas.WayPlainResponse{
		Uuid:              way.Uuid.String(),
		Name:              way.Name,
		GoalDescription:   way.GoalDescription,
		UpdatedAt:         way.UpdatedAt.String(),
		CreatedAt:         way.CreatedAt.String(),
		EstimationTime:    way.EstimationTime,
		Status:            way.Status,
		OwnerUuid:         way.OwnerUuid.String(),
		CopiedFromWayUuid: util.MarshalNullUuid(way.CopiedFromWayUuid).(string),
		IsPrivate:         way.IsPrivate,
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

	// first step (could be parallelized):
	way, err := cc.db.GetWayById(ctx, wayUuid)
	if err != nil {
		if err == sql.ErrNoRows {
			ctx.JSON(http.StatusNotFound, gin.H{"error": "Failed to retrieve way with this ID"})
			return
		}
		ctx.JSON(http.StatusBadGateway, gin.H{"error": err.Error()})
		return
	}

	jobTagsRaw, _ := cc.db.GetListJobTagsByWayUuid(ctx, wayUuid)
	jobTags := lo.Map(jobTagsRaw, func(dbJobTag db.JobTag, i int) schemas.JobTagResponse {
		return schemas.JobTagResponse{
			Uuid:        dbJobTag.Uuid.String(),
			Name:        dbJobTag.Name,
			Description: dbJobTag.Description,
			Color:       dbJobTag.Color,
		}
	})
	dayReportsRaw, _ := cc.db.GetListDayReportsByWayUuid(ctx, wayUuid)
	favoriteForUserUuidsRaw, _ := cc.db.GetFavoriteForUserUuidsByWayId(ctx, wayUuid)
	favoriteForUserUuids := lo.Map(favoriteForUserUuidsRaw, func(uuid uuid.UUID, i int) string {
		return uuid.String()
	})
	fromUserMentoringRequestsRaw, _ := cc.db.GetFromUserMentoringRequestWaysByWayId(ctx, wayUuid)
	fromUserMentoringRequests := lo.Map(fromUserMentoringRequestsRaw, func(fromUser db.User, i int) schemas.UserPlainResponse {
		return schemas.UserPlainResponse{
			Uuid:        fromUser.Uuid.String(),
			Name:        fromUser.Name,
			Email:       fromUser.Email,
			Description: fromUser.Description,
			CreatedAt:   fromUser.CreatedAt.String(),
			ImageUrl:    util.MarshalNullString(fromUser.ImageUrl).(string),
			IsMentor:    fromUser.IsMentor,
		}
	})

	formerMentorsRaw, _ := cc.db.GetFormerMentorUsersByWayId(ctx, wayUuid)
	formerMentors := lo.Map(formerMentorsRaw, func(dbFormerMentor db.User, i int) schemas.UserPlainResponse {
		return schemas.UserPlainResponse{
			Uuid:        dbFormerMentor.Uuid.String(),
			Name:        dbFormerMentor.Name,
			Email:       dbFormerMentor.Email,
			Description: dbFormerMentor.Description,
			CreatedAt:   dbFormerMentor.CreatedAt.String(),
			ImageUrl:    util.MarshalNullString(dbFormerMentor.ImageUrl).(string),
			IsMentor:    dbFormerMentor.IsMentor,
		}
	})

	mentorsRaw, _ := cc.db.GetMentorUsersByWayId(ctx, wayUuid)
	mentors := lo.Map(mentorsRaw, func(dbMentor db.User, i int) schemas.UserPlainResponse {
		return schemas.UserPlainResponse{
			Uuid:        dbMentor.Uuid.String(),
			Name:        dbMentor.Name,
			Email:       dbMentor.Email,
			Description: dbMentor.Description,
			CreatedAt:   dbMentor.CreatedAt.String(),
			ImageUrl:    util.MarshalNullString(dbMentor.ImageUrl).(string),
			IsMentor:    dbMentor.IsMentor,
		}
	})

	metricsRaw, _ := cc.db.GetListMetricsByWayUuid(ctx, wayUuid)
	metrics := lo.Map(metricsRaw, func(dbMetric db.Metric, i int) schemas.MetricResponse {
		return schemas.MetricResponse{
			CreatedAt:        dbMetric.CreatedAt.String(),
			UpdatedAt:        dbMetric.UpdatedAt.String(),
			Description:      dbMetric.Description,
			IsDone:           dbMetric.IsDone,
			DoneDate:         util.MarshalNullTime(dbMetric.DoneDate).(string),
			MetricEstimation: dbMetric.MetricEstimation,
		}
	})
	wayTagsRaw, _ := cc.db.GetListWayTagsByWayId(ctx, wayUuid)
	wayTags := lo.Map(wayTagsRaw, func(dbWayTag db.WayTag, i int) schemas.WayTagResponse {
		return schemas.WayTagResponse{
			Uuid: dbWayTag.Uuid.String(),
			Name: dbWayTag.Name,
		}
	})

	// second step (could be parallelized) populations:
	dayReports := make([]schemas.DayReportPopulatedResponse, len(dayReportsRaw))
	for i, dayReport := range dayReportsRaw {

		jobDonesWithTags := cc.getDeepJobDonesByDayReportUuids(ctx, dayReport.Uuid)
		plansWithTags := cc.getDeepPlanByDayReportUuids(ctx, dayReport.Uuid)
		problemsWithTags := cc.getDeepProblemsByDayReportUuids(ctx, dayReport.Uuid)
		commentsWithTags := cc.getDeepCommentsByDayReportUuids(ctx, dayReport.Uuid)

		dayReports[i] = schemas.DayReportPopulatedResponse{
			Uuid:      dayReport.Uuid.String(),
			CreatedAt: dayReport.CreatedAt,
			UpdatedAt: dayReport.UpdatedAt,
			IsDayOff:  dayReport.IsDayOff,
			JobsDone:  jobDonesWithTags,
			Plans:     plansWithTags,
			Problems:  problemsWithTags,
			Comments:  commentsWithTags,
		}
	}

	response := schemas.WayPopulatedResponse{
		Uuid:            way.Uuid.String(),
		Name:            way.Name,
		GoalDescription: way.GoalDescription,
		UpdatedAt:       way.UpdatedAt.String(),
		CreatedAt:       way.CreatedAt.String(),
		EstimationTime:  way.EstimationTime,
		Status:          way.Status,
		IsPrivate:       way.IsPrivate,
		Owner: schemas.UserPlainResponse{
			Uuid:        way.OwnerUuid.String(),
			Name:        way.OwnerName,
			Email:       way.OwnerEmail,
			Description: way.OwnerDescription,
			CreatedAt:   way.OwnerCreatedAt.String(),
			ImageUrl:    util.MarshalNullString(way.OwnerImageUrl).(string),
			IsMentor:    way.OwnerIsMentor,
		},
		DayReports:             dayReports,
		Mentors:                mentors,
		FormerMentors:          formerMentors,
		FromUserMentorRequests: fromUserMentoringRequests,
		FavoriteForUserUuids:   favoriteForUserUuids,
		WayTags:                wayTags,
		JobTags:                jobTags,
		Metrics:                metrics,
		CopiedFromWayUuid:      way.CopiedFromWayUuid.UUID.String(),
	}

	ctx.JSON(http.StatusOK, response)
}

// Retrieve all records handlers
// @Summary Get all ways
// @Description Get ways with pagination
// @Tags way
// @ID get-all-ways
// @Accept  json
// @Produce  json
// @Success 200 {array} schemas.WayPlainResponse
// @Router /ways [get]
func (cc *WayController) GetAllWays(ctx *gin.Context) {
	var page = ctx.DefaultQuery("page", "1")
	var limit = ctx.DefaultQuery("limit", "10")

	reqPageID, _ := strconv.Atoi(page)
	reqLimit, _ := strconv.Atoi(limit)
	offset := (reqPageID - 1) * reqLimit

	args := &db.ListWaysParams{
		Limit:  int32(reqLimit),
		Offset: int32(offset),
	}

	ways, err := cc.db.ListWays(ctx, *args)
	if err != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{"error": err.Error()})
		return
	}

	if ways == nil {
		ways = []db.Way{}
	}

	response := []schemas.WayPlainResponse{}
	for i, way := range ways {
		response[i] = schemas.WayPlainResponse{
			Name:              way.Name,
			GoalDescription:   way.GoalDescription,
			UpdatedAt:         way.UpdatedAt.String(),
			CreatedAt:         way.CreatedAt.String(),
			EstimationTime:    way.EstimationTime,
			Status:            way.Status,
			OwnerUuid:         way.OwnerUuid.String(),
			CopiedFromWayUuid: util.MarshalNullUuid(way.CopiedFromWayUuid).(string),
			IsPrivate:         way.IsPrivate,
		}
	}

	ctx.JSON(http.StatusOK, gin.H{"size": len(ways), "ways": ways})
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
	if err != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{"status": "failed", "error": err.Error()})
		return
	}

	ctx.JSON(http.StatusNoContent, gin.H{"status": "successfuly deleted"})

}

func (cc *WayController) getDeepJobDonesByDayReportUuids(ctx *gin.Context, dayReportUuid uuid.UUID) []schemas.JobDonePopulatedResponse {

	jobDonsJobTags, _ := cc.db.GetJobDonesJoinJobTags(ctx, dayReportUuid)
	jobDonesDeepMap := make(map[uuid.UUID]schemas.JobDonePopulatedResponse)
	for _, data := range jobDonsJobTags {
		jobDoneDeep := jobDonesDeepMap[data.Uuid]
		updatedTags := append(jobDoneDeep.Tags, db.JobTag{
			Uuid:        data.JobTagUuid,
			Name:        data.Name,
			Description: data.Description_2,
			Color:       data.Color,
			WayUuid:     data.WayUuid,
		})
		jobDoneOwner, _ := cc.db.GetUserById(ctx, data.OwnerUuid)
		jobDonesDeepMap[data.Uuid] = schemas.JobDonePopulatedResponse{
			Uuid:          data.Uuid.String(),
			CreatedAt:     data.CreatedAt.String(),
			UpdatedAt:     data.UpdatedAt.String(),
			Description:   data.Description,
			Time:          data.Time,
			OwnerUuid:     data.OwnerUuid.String(),
			OwnerName:     jobDoneOwner.Name,
			DayReportUuid: data.DayReportUuid.String(),
			Tags:          updatedTags,
		}
	}

	jobDonesDeep := make([]schemas.JobDonePopulatedResponse, 0, len(jobDonesDeepMap))
	for _, value := range jobDonesDeepMap {
		jobDonesDeep = append(jobDonesDeep, value)
	}

	return jobDonesDeep
}

func (cc *WayController) getDeepPlanByDayReportUuids(ctx *gin.Context, dayReportUuid uuid.UUID) []schemas.PlanPopulatedResponse {

	planJobTags, _ := cc.db.GetPlansJoinJobTags(ctx, dayReportUuid)
	planDeepMap := make(map[uuid.UUID]schemas.PlanPopulatedResponse)
	for _, data := range planJobTags {
		planDeep := planDeepMap[data.Uuid]
		updatedTags := append(planDeep.Tags, schemas.JobTagResponse{
			Uuid:        data.Uuid.String(),
			Name:        data.Name,
			Description: data.Description,
			Color:       data.Color,
		})
		planOwner, _ := cc.db.GetUserById(ctx, data.OwnerUuid)
		planDeepMap[data.Uuid] = schemas.PlanPopulatedResponse{
			Uuid:           data.Uuid.String(),
			CreatedAt:      data.CreatedAt.String(),
			UpdatedAt:      data.UpdatedAt.String(),
			Job:            data.Job,
			EstimationTime: data.EstimationTime,
			OwnerUuid:      data.OwnerUuid.String(),
			OwnerName:      planOwner.Name,
			IsDone:         data.IsDone,
			DayReportUuid:  data.DayReportUuid.String(),
			Tags:           updatedTags,
		}
	}

	plansDeep := make([]schemas.PlanPopulatedResponse, 0, len(planDeepMap))
	for _, value := range planDeepMap {
		plansDeep = append(plansDeep, value)
	}

	return plansDeep
}

func (cc *WayController) getDeepProblemsByDayReportUuids(ctx *gin.Context, dayReportUuid uuid.UUID) []schemas.ProblemPopulatedResponse {

	problemsJobTags, _ := cc.db.GetProblemsJoinJobTags(ctx, dayReportUuid)
	problemsDeepMap := make(map[uuid.UUID]schemas.ProblemPopulatedResponse)
	for _, data := range problemsJobTags {
		planDeep := problemsDeepMap[data.Uuid]
		updatedTags := append(planDeep.Tags, schemas.JobTagResponse{
			Uuid:        data.Uuid.String(),
			Name:        data.Name,
			Description: data.Description_2,
			Color:       data.Color,
		})
		problemOwner, _ := cc.db.GetUserById(ctx, data.OwnerUuid)
		problemsDeepMap[data.Uuid] = schemas.ProblemPopulatedResponse{
			Uuid:          data.Uuid.String(),
			CreatedAt:     data.CreatedAt.String(),
			UpdatedAt:     data.UpdatedAt.String(),
			Description:   data.Description,
			IsDone:        data.IsDone,
			OwnerUuid:     data.OwnerUuid.String(),
			OwnerName:     problemOwner.Name,
			DayReportUuid: data.DayReportUuid.String(),
			Tags:          updatedTags,
		}
	}

	problemsDeep := make([]schemas.ProblemPopulatedResponse, 0, len(problemsDeepMap))
	for _, value := range problemsDeepMap {
		problemsDeep = append(problemsDeep, value)
	}

	return problemsDeep
}

func (cc *WayController) getDeepCommentsByDayReportUuids(ctx *gin.Context, dayReportUuid uuid.UUID) []schemas.CommentPopulatedResponse {

	commentsRaw, _ := cc.db.GetListCommentsByDayReportId(ctx, dayReportUuid)
	comments := lo.Map(commentsRaw, func(commentRaw db.GetListCommentsByDayReportIdRow, i int) schemas.CommentPopulatedResponse {
		return schemas.CommentPopulatedResponse{
			Uuid:        commentRaw.Uuid.String(),
			Description: commentRaw.Description,
			Owner: schemas.UserPlainResponse{
				Uuid:        commentRaw.OwnerUuid.String(),
				Name:        commentRaw.OwnerName,
				Email:       commentRaw.OwnerEmail,
				Description: commentRaw.OwnerDescription,
				CreatedAt:   commentRaw.OwnerCreatedAt.String(),
				ImageUrl:    util.MarshalNullString(commentRaw.OwnerImageUrl).(string),
				IsMentor:    commentRaw.OwnerIsMentor,
			},
		}
	})
	return comments
}
