package controllers

import (
	"context"
	"database/sql"
	"fmt"
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
		IsCompleted:       payload.IsCompleted,
		IsPrivate:         false,
		CopiedFromWayUuid: util.ToNullUuid(payload.CopiedFromWayUuid),
		UpdatedAt:         now,
		CreatedAt:         now,
	}

	way, err := cc.db.CreateWay(ctx, *args)

	if err != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{"error": err.Error()})
		return
	}

	dbWayTags, err := cc.db.GetListWayTagsByWayId(ctx, way.Uuid)
	wayTags := make([]schemas.WayTagResponse, 0)
	if err != nil {
		wayTags = lo.Map(dbWayTags, func(dbWayTag db.WayTag, i int) schemas.WayTagResponse {
			return schemas.WayTagResponse{
				Uuid: dbWayTag.Uuid.String(),
				Name: dbWayTag.Name,
			}
		})
	}

	copiedFromWayUuid, _ := util.MarshalNullUuid(way.CopiedFromWayUuid)
	dbOwner, _ := cc.db.GetUserById(ctx, payload.OwnerUuid)
	imageUrl, _ := util.MarshalNullString(dbOwner.ImageUrl)
	owner := schemas.UserPlainResponse{
		Uuid:        dbOwner.Uuid.String(),
		Name:        dbOwner.Name,
		Email:       dbOwner.Email,
		Description: dbOwner.Description,
		CreatedAt:   dbOwner.CreatedAt.String(),
		ImageUrl:    string(imageUrl),
		IsMentor:    dbOwner.IsMentor,
	}

	response := schemas.WayPopulatedResponse{
		Name:                   way.Name,
		Uuid:                   way.Uuid.String(),
		GoalDescription:        way.GoalDescription,
		UpdatedAt:              way.UpdatedAt.String(),
		CreatedAt:              way.CreatedAt.String(),
		EstimationTime:         way.EstimationTime,
		IsCompleted:            way.IsCompleted,
		Owner:                  owner,
		CopiedFromWayUuid:      string(copiedFromWayUuid),
		IsPrivate:              way.IsPrivate,
		Mentors:                make([]schemas.UserPlainResponse, 0),
		WayTags:                wayTags,
		JobTags:                []schemas.JobTagResponse{},
		DayReports:             make([]schemas.DayReportPopulatedResponse, 0),
		FormerMentors:          make([]schemas.UserPlainResponse, 0),
		FromUserMentorRequests: make([]schemas.UserPlainResponse, 0),
		FavoriteForUsersAmount: 0,
		Metrics:                make([]schemas.MetricResponse, 0),
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
		IsCompleted:     sql.NullBool{Bool: payload.IsCompleted, Valid: true},
		IsPrivate:       sql.NullBool{Bool: payload.IsPrivate, Valid: true},
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

	copiedFromWayUuid, _ := util.MarshalNullUuid(way.CopiedFromWayUuid)
	mentorsRaw, _ := cc.db.GetMentorUsersByWayId(ctx, way.Uuid)
	mentors := lo.Map(mentorsRaw, func(dbMentor db.User, i int) schemas.UserPlainResponse {
		imageUrl, _ := util.MarshalNullString(dbMentor.ImageUrl)
		return schemas.UserPlainResponse{
			Uuid:        dbMentor.Uuid.String(),
			Name:        dbMentor.Name,
			Email:       dbMentor.Email,
			Description: dbMentor.Description,
			CreatedAt:   dbMentor.CreatedAt.String(),
			ImageUrl:    string(imageUrl),
			IsMentor:    dbMentor.IsMentor,
		}
	})

	dbOwner, _ := cc.db.GetUserById(ctx, way.Uuid)
	imageUrl, _ := util.MarshalNullString(dbOwner.ImageUrl)
	owner := schemas.UserPlainResponse{
		Uuid:        dbOwner.Uuid.String(),
		Name:        dbOwner.Name,
		Email:       dbOwner.Email,
		Description: dbOwner.Description,
		CreatedAt:   dbOwner.CreatedAt.String(),
		ImageUrl:    string(imageUrl),
		IsMentor:    dbOwner.IsMentor,
	}
	dbTags, _ := cc.db.GetListWayTagsByWayId(ctx, way.Uuid)
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
		UpdatedAt:         way.UpdatedAt.String(),
		CreatedAt:         way.CreatedAt.String(),
		EstimationTime:    way.EstimationTime,
		IsCompleted:       way.IsCompleted,
		Owner:             owner,
		CopiedFromWayUuid: string(copiedFromWayUuid),
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

	way, err := cc.db.GetWayById(ctx, wayUuid)
	if err != nil {
		if err == sql.ErrNoRows {
			ctx.JSON(http.StatusNotFound, gin.H{"error": "Failed to retrieve way with this ID"})
			return
		}
		ctx.JSON(http.StatusBadGateway, gin.H{"error": err.Error()})
		return
	}

	userImageUrl, _ := util.MarshalNullString(way.OwnerImageUrl)
	wayOwner := schemas.UserPlainResponse{
		Uuid:        way.OwnerUuid.String(),
		Name:        way.OwnerName,
		Email:       way.OwnerEmail,
		Description: way.OwnerDescription,
		CreatedAt:   way.OwnerCreatedAt.String(),
		ImageUrl:    string(userImageUrl),
		IsMentor:    way.OwnerIsMentor,
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
	jobTagsMap := lo.SliceToMap(jobTags, func(jobTag schemas.JobTagResponse) (string, schemas.JobTagResponse) {
		return jobTag.Uuid, jobTag
	})

	favoriteForUserAmount, _ := cc.db.GetFavoriteForUserUuidsByWayId(ctx, wayUuid)
	fromUserMentoringRequestsRaw, _ := cc.db.GetFromUserMentoringRequestWaysByWayId(ctx, wayUuid)
	fromUserMentoringRequests := lo.Map(fromUserMentoringRequestsRaw, func(fromUser db.User, i int) schemas.UserPlainResponse {
		imageUrl, _ := util.MarshalNullString(fromUser.ImageUrl)
		return schemas.UserPlainResponse{
			Uuid:        fromUser.Uuid.String(),
			Name:        fromUser.Name,
			Email:       fromUser.Email,
			Description: fromUser.Description,
			CreatedAt:   fromUser.CreatedAt.String(),
			ImageUrl:    string(imageUrl),
			IsMentor:    fromUser.IsMentor,
		}
	})

	formerMentorsRaw, _ := cc.db.GetFormerMentorUsersByWayId(ctx, wayUuid)
	formerMentors := lo.Map(formerMentorsRaw, func(dbFormerMentor db.User, i int) schemas.UserPlainResponse {
		imageUrl, _ := util.MarshalNullString(dbFormerMentor.ImageUrl)
		return schemas.UserPlainResponse{
			Uuid:        dbFormerMentor.Uuid.String(),
			Name:        dbFormerMentor.Name,
			Email:       dbFormerMentor.Email,
			Description: dbFormerMentor.Description,
			CreatedAt:   dbFormerMentor.CreatedAt.String(),
			ImageUrl:    string(imageUrl),
			IsMentor:    dbFormerMentor.IsMentor,
		}
	})

	mentorsRaw, _ := cc.db.GetMentorUsersByWayId(ctx, wayUuid)
	mentors := lo.Map(mentorsRaw, func(dbMentor db.User, i int) schemas.UserPlainResponse {
		imageUrl, _ := util.MarshalNullString(dbMentor.ImageUrl)
		return schemas.UserPlainResponse{
			Uuid:        dbMentor.Uuid.String(),
			Name:        dbMentor.Name,
			Email:       dbMentor.Email,
			Description: dbMentor.Description,
			CreatedAt:   dbMentor.CreatedAt.String(),
			ImageUrl:    string(imageUrl),
			IsMentor:    dbMentor.IsMentor,
		}
	})

	metricsRaw, _ := cc.db.GetListMetricsByWayUuid(ctx, wayUuid)
	metrics := lo.Map(metricsRaw, func(dbMetric db.Metric, i int) schemas.MetricResponse {
		return schemas.MetricResponse{
			Uuid:             dbMetric.Uuid.String(),
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

	allWayRelatedUsers := make([]schemas.UserPlainResponse, len(mentors)+len(formerMentors)+1)
	allWayRelatedUsers = append(allWayRelatedUsers, mentors...)
	allWayRelatedUsers = append(allWayRelatedUsers, formerMentors...)
	allWayRelatedUsers = append(allWayRelatedUsers, wayOwner)
	allWayRelatedUsersMap := lo.SliceToMap(allWayRelatedUsers, func(relatedUser schemas.UserPlainResponse) (string, schemas.UserPlainResponse) {
		return relatedUser.Uuid, relatedUser
	})

	dayReportsRaw, _ := cc.db.GetListDayReportsByWayUuid(ctx, wayUuid)
	dayReportUuids := lo.Map(dayReportsRaw, func(dbDayReport db.DayReport, i int) uuid.UUID {
		return dbDayReport.Uuid
	})

	dbJobDones, _ := cc.db.GetJobDonesByDayReportUuids(ctx, dayReportUuids)
	jobDonesMap := make(map[string][]schemas.JobDonePopulatedResponse)
	lo.ForEach(dbJobDones, func(dbJobDone db.GetJobDonesByDayReportUuidsRow, i int) {
		jobDoneOwner := allWayRelatedUsersMap[dbJobDone.OwnerUuid.String()]
		tags := lo.Map(dbJobDone.TagUuids, func(tagUuid string, i int) schemas.JobTagResponse {
			return jobTagsMap[tagUuid]
		})
		jobDonesMap[dbJobDone.DayReportUuid.String()] = append(
			jobDonesMap[dbJobDone.DayReportUuid.String()],
			schemas.JobDonePopulatedResponse{
				Uuid:          dbJobDone.Uuid.String(),
				CreatedAt:     dbJobDone.CreatedAt.String(),
				UpdatedAt:     dbJobDone.UpdatedAt.String(),
				Description:   dbJobDone.Description,
				Time:          dbJobDone.Time,
				OwnerUuid:     dbJobDone.OwnerUuid.String(),
				OwnerName:     jobDoneOwner.Name,
				DayReportUuid: dbJobDone.DayReportUuid.String(),
				Tags:          tags,
			},
		)
	})

	dbPlans, err := cc.db.GetPlansByDayReportUuids(ctx, dayReportUuids)
	plansMap := make(map[string][]schemas.PlanPopulatedResponse)
	lo.ForEach(dbPlans, func(plan db.GetPlansByDayReportUuidsRow, i int) {
		planOwner := allWayRelatedUsersMap[plan.OwnerUuid.String()]
		tags := lo.Map(plan.TagUuids, func(tagUuid string, i int) schemas.JobTagResponse {
			return jobTagsMap[tagUuid]
		})
		plansMap[plan.DayReportUuid.String()] = append(
			plansMap[plan.DayReportUuid.String()],
			schemas.PlanPopulatedResponse{
				Uuid:          plan.Uuid.String(),
				CreatedAt:     plan.CreatedAt.String(),
				UpdatedAt:     plan.UpdatedAt.String(),
				Description:   plan.Description,
				Time:          plan.Time,
				OwnerUuid:     plan.OwnerUuid.String(),
				OwnerName:     planOwner.Name,
				DayReportUuid: plan.DayReportUuid.String(),
				Tags:          tags,
				IsDone:        plan.IsDone,
			},
		)
	})

	dbProblems, _ := cc.db.GetProblemsByDayReportUuids(ctx, dayReportUuids)
	fmt.Println(dbProblems, err)
	problemsMap := make(map[string][]schemas.ProblemPopulatedResponse)
	lo.ForEach(dbProblems, func(problem db.GetProblemsByDayReportUuidsRow, i int) {
		problemOwner := allWayRelatedUsersMap[problem.OwnerUuid.String()]
		tags := lo.Map(problem.TagUuids, func(tagUuid string, i int) schemas.JobTagResponse {
			return jobTagsMap[tagUuid]
		})
		problemsMap[problem.DayReportUuid.String()] = append(
			problemsMap[problem.DayReportUuid.String()],
			schemas.ProblemPopulatedResponse{
				Uuid:          problem.Uuid.String(),
				CreatedAt:     problem.CreatedAt.String(),
				UpdatedAt:     problem.UpdatedAt.String(),
				Description:   problem.Description,
				OwnerUuid:     problem.OwnerUuid.String(),
				OwnerName:     problemOwner.Name,
				DayReportUuid: problem.DayReportUuid.String(),
				Tags:          tags,
				IsDone:        problem.IsDone,
			},
		)
	})

	dbComments, _ := cc.db.GetListCommentsByDayReportUuids(ctx, dayReportUuids)
	commentsMap := make(map[string][]schemas.CommentPopulatedResponse)
	lo.ForEach(dbComments, func(comment db.Comment, i int) {
		commentOwner := allWayRelatedUsersMap[comment.OwnerUuid.String()]
		commentsMap[comment.DayReportUuid.String()] = append(
			commentsMap[comment.DayReportUuid.String()],
			schemas.CommentPopulatedResponse{
				Uuid:          comment.Uuid.String(),
				CreatedAt:     comment.CreatedAt.String(),
				UpdatedAt:     comment.UpdatedAt.String(),
				Description:   comment.Description,
				OwnerUuid:     commentOwner.Uuid,
				OwnerName:     commentOwner.Name,
				DayReportUuid: comment.DayReportUuid.String(),
			},
		)
	})

	dayReports := make([]schemas.DayReportPopulatedResponse, len(dayReportsRaw))
	for i, dayReport := range dayReportsRaw {

		if jobDonesMap[dayReport.Uuid.String()] == nil {
			jobDonesMap[dayReport.Uuid.String()] = []schemas.JobDonePopulatedResponse{}
		}
		if plansMap[dayReport.Uuid.String()] == nil {
			plansMap[dayReport.Uuid.String()] = []schemas.PlanPopulatedResponse{}
		}
		if problemsMap[dayReport.Uuid.String()] == nil {
			problemsMap[dayReport.Uuid.String()] = []schemas.ProblemPopulatedResponse{}
		}
		if commentsMap[dayReport.Uuid.String()] == nil {
			commentsMap[dayReport.Uuid.String()] = []schemas.CommentPopulatedResponse{}
		}

		dayReports[i] = schemas.DayReportPopulatedResponse{
			Uuid:      dayReport.Uuid.String(),
			CreatedAt: dayReport.CreatedAt,
			UpdatedAt: dayReport.UpdatedAt,
			IsDayOff:  dayReport.IsDayOff,
			JobsDone:  jobDonesMap[dayReport.Uuid.String()],
			Plans:     plansMap[dayReport.Uuid.String()],
			Problems:  problemsMap[dayReport.Uuid.String()],
			Comments:  commentsMap[dayReport.Uuid.String()],
		}
	}

	response := schemas.WayPopulatedResponse{
		Uuid:                   way.Uuid.String(),
		Name:                   way.Name,
		GoalDescription:        way.GoalDescription,
		UpdatedAt:              way.UpdatedAt.String(),
		CreatedAt:              way.CreatedAt.String(),
		EstimationTime:         way.EstimationTime,
		IsCompleted:            way.IsCompleted,
		IsPrivate:              way.IsPrivate,
		Owner:                  wayOwner,
		DayReports:             dayReports,
		Mentors:                mentors,
		FormerMentors:          formerMentors,
		FromUserMentorRequests: fromUserMentoringRequests,
		FavoriteForUsersAmount: int32(favoriteForUserAmount),
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
		Column1: status,
		Column2: currentDate,
	}
	waysSize, _ := cc.db.CountWaysByType(ctx, *waySizeArgs)

	listWaysArgs := &db.ListWaysParams{
		Limit:   int32(reqLimit),
		Offset:  int32(offset),
		Column3: status,
		Column4: currentDate,
	}

	ways, err := cc.db.ListWays(ctx, *listWaysArgs)
	if err != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{"error": err.Error()})
		return
	}

	wayUuids := lo.Map(ways, func(way db.ListWaysRow, i int) uuid.UUID {
		return way.Uuid
	})
	wayOwnerUuids := lo.Map(ways, func(way db.ListWaysRow, i int) uuid.UUID {
		return way.OwnerUuid
	})

	dbWayTags, _ := cc.db.GetListWayTagsByWayIds(ctx, wayUuids)
	wayTagsMap := make(map[uuid.UUID][]schemas.WayTagResponse)
	lo.ForEach(dbWayTags, func(dbWayTag db.GetListWayTagsByWayIdsRow, i int) {
		wayTag := schemas.WayTagResponse{
			Uuid: dbWayTag.Uuid.String(),
			Name: dbWayTag.Name,
		}
		wayTagsMap[dbWayTag.WayUuid] = append(wayTagsMap[dbWayTag.Uuid], wayTag)
	})

	dbMentors, _ := cc.db.GetMentorUsersByWayIds(ctx, wayUuids)
	mentorsMap := make(map[uuid.UUID][]schemas.UserPlainResponse)
	lo.ForEach(dbMentors, func(dbMentor db.GetMentorUsersByWayIdsRow, i int) {
		imageUrl, _ := util.MarshalNullString(dbMentor.ImageUrl)
		mentor := schemas.UserPlainResponse{
			Uuid:        dbMentor.Uuid.String(),
			Name:        dbMentor.Name,
			Email:       dbMentor.Email,
			Description: dbMentor.Description,
			CreatedAt:   dbMentor.CreatedAt.String(),
			ImageUrl:    string(imageUrl),
			IsMentor:    dbMentor.IsMentor,
		}
		mentorsMap[dbMentor.WayUuid] = append(mentorsMap[dbMentor.WayUuid], mentor)
	})

	dbOwners, _ := cc.db.GetUserByIds(ctx, wayOwnerUuids)
	ownersMap := lo.SliceToMap(dbOwners, func(dbOwner db.User) (string, schemas.UserPlainResponse) {
		imageUrl, _ := util.MarshalNullString(dbOwner.ImageUrl)
		owner := schemas.UserPlainResponse{
			Uuid:        dbOwner.Uuid.String(),
			Name:        dbOwner.Name,
			Email:       dbOwner.Email,
			Description: dbOwner.Description,
			CreatedAt:   dbOwner.CreatedAt.String(),
			ImageUrl:    string(imageUrl),
			IsMentor:    dbOwner.IsMentor,
		}

		return owner.Uuid, owner
	})

	response := lo.Map(ways, func(way db.ListWaysRow, i int) schemas.WayPlainResponse {
		copiedFromWayUuid, _ := util.MarshalNullUuid(way.CopiedFromWayUuid)

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
			UpdatedAt:         way.UpdatedAt.String(),
			CreatedAt:         way.CreatedAt.String(),
			EstimationTime:    way.EstimationTime,
			IsCompleted:       way.IsCompleted,
			Owner:             ownersMap[way.OwnerUuid.String()],
			CopiedFromWayUuid: string(copiedFromWayUuid),
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
	if err != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{"status": "failed", "error": err.Error()})
		return
	}

	ctx.JSON(http.StatusNoContent, gin.H{"status": "successfuly deleted"})

}
