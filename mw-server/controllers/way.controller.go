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
		IsCompleted:       payload.IsCompleted,
		IsPrivate:         false,
		CopiedFromWayUuid: util.ToNullUuid(payload.CopiedFromWayUuid),
		UpdatedAt:         now,
		CreatedAt:         now,
	}

	way, err := cc.db.CreateWay(ctx, *args)
	createDefaultJobTagParams := db.CreateJobTagParams{
		Name:        "no tags",
		Description: "Default Label: Assigned when no other labels apply.",
		Color:       "rgb(255, 0, 0)",
		WayUuid:     way.Uuid,
	}
	dbJobTag, _ := cc.db.CreateJobTag(ctx, createDefaultJobTagParams)
	jobTag := schemas.JobTagResponse{
		Uuid:        dbJobTag.Uuid.String(),
		Name:        dbJobTag.Name,
		Description: dbJobTag.Description,
		Color:       dbJobTag.Color,
	}
	defaultJobTags := []schemas.JobTagResponse{
		jobTag,
	}

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
		JobTags:                defaultJobTags,
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

	userImageUrl, _ := util.MarshalNullString(way.OwnerImageUrl)

	response := schemas.WayPopulatedResponse{
		Uuid:            way.Uuid.String(),
		Name:            way.Name,
		GoalDescription: way.GoalDescription,
		UpdatedAt:       way.UpdatedAt.String(),
		CreatedAt:       way.CreatedAt.String(),
		EstimationTime:  way.EstimationTime,
		IsCompleted:     way.IsCompleted,
		IsPrivate:       way.IsPrivate,
		Owner: schemas.UserPlainResponse{
			Uuid:        way.OwnerUuid.String(),
			Name:        way.OwnerName,
			Email:       way.OwnerEmail,
			Description: way.OwnerDescription,
			CreatedAt:   way.OwnerCreatedAt.String(),
			ImageUrl:    string(userImageUrl),
			IsMentor:    way.OwnerIsMentor,
		},
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

func (cc *WayController) getDeepJobDonesByDayReportUuids(ctx *gin.Context, dayReportUuid uuid.UUID) []schemas.JobDonePopulatedResponse {

	jobDonsJobTags, _ := cc.db.GetJobDonesJoinJobTags(ctx, dayReportUuid)
	jobDonesDeepMap := make(map[uuid.UUID]schemas.JobDonePopulatedResponse)
	for _, data := range jobDonsJobTags {
		jobDoneDeep := jobDonesDeepMap[data.Uuid]
		updatedTags := append(jobDoneDeep.Tags, schemas.JobTagResponse{
			Uuid:        data.JobTagUuid.String(),
			Name:        data.Name,
			Description: data.Description_2,
			Color:       data.Color,
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
			Uuid:          data.Uuid.String(),
			CreatedAt:     data.CreatedAt.String(),
			UpdatedAt:     data.UpdatedAt.String(),
			Description:   data.Description,
			Time:          data.Time,
			OwnerUuid:     data.OwnerUuid.String(),
			OwnerName:     planOwner.Name,
			IsDone:        data.IsDone,
			DayReportUuid: data.DayReportUuid.String(),
			Tags:          updatedTags,
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
		userImageUrl, _ := util.MarshalNullString(commentRaw.OwnerImageUrl)
		return schemas.CommentPopulatedResponse{
			Uuid:        commentRaw.Uuid.String(),
			Description: commentRaw.Description,
			Owner: schemas.UserPlainResponse{
				Uuid:        commentRaw.OwnerUuid.String(),
				Name:        commentRaw.OwnerName,
				Email:       commentRaw.OwnerEmail,
				Description: commentRaw.OwnerDescription,
				CreatedAt:   commentRaw.OwnerCreatedAt.String(),
				ImageUrl:    string(userImageUrl),
				IsMentor:    commentRaw.OwnerIsMentor,
			},
		}
	})
	return comments
}
