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
// @ID create-way
// @Accept  json
// @Produce  json
// @Param request body schemas.CreateWay true "query params"
// @Success 200 {object} schemas.WayPlainResponse
// @Router /ways [post]
func (cc *WayController) CreateWay(ctx *gin.Context) {
	var payload *schemas.CreateWay

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "Failed payload", "error": err.Error()})
		return
	}

	now := time.Now()
	args := &db.CreateWayParams{
		Name:              payload.Name,
		GoalDescription:   payload.GoalDescription,
		EstimationTime:    int32(payload.EstimationTime),
		OwnerUuid:         payload.OwnerUuid,
		Status:            payload.Status,
		CopiedFromWayUuid: util.ToNullUuid(payload.CopiedFromWayUuid),
		LastUpdate:        now,
		CreatedAt:         now,
	}

	way, err := cc.db.CreateWay(ctx, *args)

	if err != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{"status": "Failed retrieving way", "error": err.Error()})
		return
	}

	// TODO: replace way with schemas.WayPlainResponse in response
	// response := schemas.WayPlainResponse{

	// }

	ctx.JSON(http.StatusOK, gin.H{"status": "successfully created way", "way": way})
}

// Update way handler
// @Summary Update way by UUID
// @Description
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
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "Failed payload", "error": err.Error()})
		return
	}

	now := time.Now()
	args := &db.UpdateWayParams{
		Uuid:            uuid.MustParse(wayId),
		Name:            sql.NullString{String: payload.Name, Valid: payload.Name != ""},
		GoalDescription: sql.NullString{String: payload.GoalDescription, Valid: payload.GoalDescription != ""},
		EstimationTime:  sql.NullInt32{Int32: int32(payload.EstimationTime), Valid: payload.EstimationTime != 0},
		Status:          sql.NullString{String: payload.Status, Valid: payload.Status != ""},
		LastUpdate:      sql.NullTime{Time: now, Valid: true},
	}

	way, err := cc.db.UpdateWay(ctx, *args)

	if err != nil {
		if err == sql.ErrNoRows {
			ctx.JSON(http.StatusNotFound, gin.H{"status": "failed", "message": "Failed to retrieve way with this ID"})
			return
		}
		ctx.JSON(http.StatusBadGateway, gin.H{"status": "Failed retrieving way", "error": err.Error()})
		return
	}

	// TODO: replace way with schemas.WayPlainResponse in response
	// response := schemas.WayPlainResponse{

	// }

	ctx.JSON(http.StatusOK, gin.H{"status": "successfully updated way", "way": way})
}

type dayReportDeep struct {
	Uuid      uuid.UUID
	WayUuid   uuid.UUID
	CreatedAt time.Time
	UpdatedAt time.Time
	IsDayOff  bool
	JobDones  []jobDoneDeepType
	Plans     []planDeepType
	Problems  []problemDeepType
	Comments  []db.GetListCommentsByDayReportIdRow
}
type getWayByIdResponse struct {
	Uuid              uuid.UUID
	Name              string
	GoalDescription   string
	LastUpdate        time.Time
	CreatedAt         time.Time
	EstimationTime    int32
	OwnerUuid         uuid.UUID
	CopiedFromWayUuid uuid.NullUUID
	Status            string
	JobTags           []db.JobTag
	WayTag            []db.WayTag
	DayReports        []dayReportDeep
	Metrics           []db.Metric
}

// Get a single handler
// @Summary Get way by UUID
// @Description
// @ID get-way-by-uuid
// @Accept  json
// @Produce  json
// @Param wayId path string true "way ID"
// @Success 200 {object} schemas.WayPopulatedResponse
// @Router /ways/{wayId} [get]
func (cc *WayController) GetWayById(ctx *gin.Context) {
	wayId := ctx.Param("wayId")
	wayUuid := uuid.MustParse(wayId)

	// first step (could be parallelized):
	way, err := cc.db.GetWayById(ctx, wayUuid)
	jobTags, err := cc.db.GetListJobTagsByWayUuid(ctx, wayUuid)
	dayReports, err := cc.db.GetListDayReportsByWayUuid(ctx, wayUuid)
	// fromUserMentoringRequestUuids, err := cc.db.
	// toUserMentoringRequestUuids, err :=
	// formerMentorUuids, err := cc.db.former
	// favoritesAmount, err := cc.db.fav
	metrics, err := cc.db.GetListMetricsByWayUuid(ctx, wayUuid)
	wayTags, err := cc.db.GetListWayTagsByWayId(ctx, wayUuid)
	// fromUserMentoringRequests :=
	// toUserMentoringRequestUuids :=
	if err != nil {
		if err == sql.ErrNoRows {
			ctx.JSON(http.StatusNotFound, gin.H{"status": "failed", "message": "Failed to retrieve way with this ID"})
			return
		}
		ctx.JSON(http.StatusBadGateway, gin.H{"status": "Failed retrieving way", "error": err.Error()})
		return
	}

	// second step (could be parallelized) populations:
	dayReportsWithMainData := make([]dayReportDeep, len(dayReports))
	for i, dayReport := range dayReports {

		jobDonesWithTags := cc.getDeepJobDonesByDayReportUuids(ctx, dayReport.Uuid)
		plansWithTags := cc.getDeepPlanByDayReportUuids(ctx, dayReport.Uuid)
		problemsWithTags := cc.getDeepProblemsByDayReportUuids(ctx, dayReport.Uuid)
		commentsWithTags := cc.getDeepCommentsByDayReportUuids(ctx, dayReport.Uuid)

		dayReportsWithMainData[i] = dayReportDeep{
			Uuid:      dayReport.Uuid,
			WayUuid:   dayReport.WayUuid,
			CreatedAt: dayReport.CreatedAt,
			UpdatedAt: dayReport.UpdatedAt,
			IsDayOff:  dayReport.IsDayOff,
			JobDones:  jobDonesWithTags,
			Plans:     plansWithTags,
			Problems:  problemsWithTags,
			Comments:  commentsWithTags,
		}
	}

	//TODO rename LastUpdate to UpdatedAt
	response := getWayByIdResponse{
		Uuid:              way.Uuid,
		Name:              way.Name,
		GoalDescription:   way.GoalDescription,
		LastUpdate:        way.LastUpdate,
		CreatedAt:         way.CreatedAt,
		EstimationTime:    way.EstimationTime,
		OwnerUuid:         way.OwnerUuid,
		CopiedFromWayUuid: way.CopiedFromWayUuid,
		Status:            way.Status,
		JobTags:           jobTags,
		WayTag:            wayTags,
		DayReports:        dayReportsWithMainData,
		Metrics:           metrics,
	}

	ctx.JSON(http.StatusOK, gin.H{"status": "Successfully retrived id", "way": response})
}

// Retrieve all records handlers
// @Summary Get all ways
// @Description Get ways with pagination
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
		ctx.JSON(http.StatusBadGateway, gin.H{"status": "Failed to retrieve ways", "error": err.Error()})
		return
	}

	if ways == nil {
		ways = []db.Way{}
	}

	//TODO add responseWays instead of ways

	ctx.JSON(http.StatusOK, gin.H{"status": "Successfully retrieved all ways", "size": len(ways), "ways": ways})
}

// Deleting way handlers
// @Summary Delete way by UUID
// @Description
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

type jobDoneDeepType struct {
	Uuid          uuid.UUID
	CreatedAt     time.Time
	UpdatedAt     time.Time
	Description   string
	Time          int32
	OwnerUuid     uuid.UUID
	OwnerName     string
	DayReportUuid uuid.UUID
	Tags          []db.JobTag
}

func (cc *WayController) getDeepJobDonesByDayReportUuids(ctx *gin.Context, dayReportUuid uuid.UUID) []jobDoneDeepType {

	jobDonsJobTags, _ := cc.db.GetJobDonesJoinJobTags(ctx, dayReportUuid)
	jobDonesDeepMap := make(map[uuid.UUID]jobDoneDeepType)
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
		jobDonesDeepMap[data.Uuid] = jobDoneDeepType{
			Uuid:          data.Uuid,
			CreatedAt:     data.CreatedAt,
			UpdatedAt:     data.UpdatedAt,
			Description:   data.Description,
			Time:          data.Time,
			OwnerUuid:     data.OwnerUuid,
			OwnerName:     jobDoneOwner.Name,
			DayReportUuid: data.DayReportUuid,
			Tags:          updatedTags,
		}
	}

	jobDonesDeep := make([]jobDoneDeepType, 0, len(jobDonesDeepMap))
	for _, value := range jobDonesDeepMap {
		jobDonesDeep = append(jobDonesDeep, value)
	}

	return jobDonesDeep
}

type planDeepType struct {
	Uuid           uuid.UUID
	CreatedAt      time.Time
	UpdatedAt      time.Time
	Job            string
	EstimationTime int32
	OwnerUuid      uuid.UUID
	OwnerName      string
	IsDone         bool
	DayReportUuid  uuid.UUID
	Tags           []db.JobTag
}

func (cc *WayController) getDeepPlanByDayReportUuids(ctx *gin.Context, dayReportUuid uuid.UUID) []planDeepType {

	planJobTags, _ := cc.db.GetPlansJoinJobTags(ctx, dayReportUuid)
	planDeepMap := make(map[uuid.UUID]planDeepType)
	for _, data := range planJobTags {
		planDeep := planDeepMap[data.Uuid]
		updatedTags := append(planDeep.Tags, db.JobTag{
			Uuid:        data.Uuid,
			Name:        data.Name,
			Description: data.Description,
			Color:       data.Color,
			WayUuid:     data.WayUuid,
		})
		planOwner, _ := cc.db.GetUserById(ctx, data.OwnerUuid)
		planDeepMap[data.Uuid] = planDeepType{
			Uuid:           data.Uuid,
			CreatedAt:      data.CreatedAt,
			UpdatedAt:      data.UpdatedAt,
			Job:            data.Job,
			EstimationTime: data.EstimationTime,
			OwnerUuid:      data.OwnerUuid,
			OwnerName:      planOwner.Name,
			IsDone:         data.IsDone,
			DayReportUuid:  data.DayReportUuid,
			Tags:           updatedTags,
		}
	}

	plansDeep := make([]planDeepType, 0, len(planDeepMap))
	for _, value := range planDeepMap {
		plansDeep = append(plansDeep, value)
	}

	return plansDeep
}

type problemDeepType struct {
	Uuid          uuid.UUID
	CreatedAt     time.Time
	UpdatedAt     time.Time
	Description   string
	IsDone        bool
	OwnerUuid     uuid.UUID
	OwnerName     string
	DayReportUuid uuid.UUID
	Tags          []db.JobTag
}

func (cc *WayController) getDeepProblemsByDayReportUuids(ctx *gin.Context, dayReportUuid uuid.UUID) []problemDeepType {

	problemsJobTags, _ := cc.db.GetProblemsJoinJobTags(ctx, dayReportUuid)
	problemsDeepMap := make(map[uuid.UUID]problemDeepType)
	for _, data := range problemsJobTags {
		planDeep := problemsDeepMap[data.Uuid]
		updatedTags := append(planDeep.Tags, db.JobTag{
			Uuid:        data.Uuid,
			Name:        data.Name,
			Description: data.Description_2,
			Color:       data.Color,
			WayUuid:     data.WayUuid,
		})
		problemOwner, _ := cc.db.GetUserById(ctx, data.OwnerUuid)
		problemsDeepMap[data.Uuid] = problemDeepType{
			Uuid:          data.Uuid,
			CreatedAt:     data.CreatedAt,
			UpdatedAt:     data.UpdatedAt,
			Description:   data.Description,
			IsDone:        data.IsDone,
			OwnerUuid:     data.OwnerUuid,
			OwnerName:     problemOwner.Name,
			DayReportUuid: data.DayReportUuid,
			Tags:          updatedTags,
		}
	}

	problemsDeep := make([]problemDeepType, 0, len(problemsDeepMap))
	for _, value := range problemsDeepMap {
		problemsDeep = append(problemsDeep, value)
	}

	return problemsDeep
}

func (cc *WayController) getDeepCommentsByDayReportUuids(ctx *gin.Context, dayReportUuid uuid.UUID) []db.GetListCommentsByDayReportIdRow {

	comments, _ := cc.db.GetListCommentsByDayReportId(ctx, dayReportUuid)

	return comments
}
