package services

import (
	"context"
	"fmt"
	"log"
	db "mw-server/internal/db/sqlc"
	"mw-server/internal/schemas"
	"mw-server/pkg/util"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgtype"
	"github.com/samber/lo"
)

type IWayRepository interface {
	CountWaysByType(ctx context.Context, arg db.CountWaysByTypeParams) (int64, error)
	CreateJobTag(ctx context.Context, arg db.CreateJobTagParams) (db.JobTag, error)
	CreateMetric(ctx context.Context, arg db.CreateMetricParams) (db.Metric, error)
	CreateWay(ctx context.Context, arg db.CreateWayParams) (db.CreateWayRow, error)
	CreateWaysWayTag(ctx context.Context, arg db.CreateWaysWayTagParams) (db.WaysWayTag, error)
	DeleteWay(ctx context.Context, wayUuid pgtype.UUID) error
	GetFavoriteForUserUuidsByWayId(ctx context.Context, wayUuid pgtype.UUID) (int64, error)
	GetFormerMentorUsersByWayId(ctx context.Context, wayUuid pgtype.UUID) ([]db.User, error)
	GetFromUserMentoringRequestWaysByWayId(ctx context.Context, wayUuid pgtype.UUID) ([]db.User, error)
	GetListJobTagsByWayUuid(ctx context.Context, wayUuid pgtype.UUID) ([]db.JobTag, error)
	GetListMetricsByWayUuid(ctx context.Context, wayUuid pgtype.UUID) ([]db.Metric, error)
	GetListWayTagsByWayId(ctx context.Context, wayUuid pgtype.UUID) ([]db.WayTag, error)
	GetMentorUsersByWayId(ctx context.Context, wayUuid pgtype.UUID) ([]db.User, error)
	GetUserByID(ctx context.Context, userUuid pgtype.UUID) (db.User, error)
	GetWayById(ctx context.Context, wayUuid pgtype.UUID) (db.GetWayByIdRow, error)
	GetWayChildren(ctx context.Context, wayUuid pgtype.UUID) ([]pgtype.UUID, error)
	GetWayPlainForNotification(ctx context.Context, wayUuid pgtype.UUID) (db.GetWayPlainForNotificationRow, error)
	ListWays(ctx context.Context, arg db.ListWaysParams) ([]db.ListWaysRow, error)
	UpdateWay(ctx context.Context, arg db.UpdateWayParams) (db.UpdateWayRow, error)
	IsAllMetricsDone(ctx context.Context, wayUuid pgtype.UUID) (bool, error)
}

type WayService struct {
	wayRepository IWayRepository
}

func NewWayService(wayRepository IWayRepository) *WayService {
	return &WayService{wayRepository}
}

type GetPopulatedWayByIdParams struct {
	WayUuid              uuid.UUID
	CurrentChildrenDepth int
}

func (ws *WayService) GetPopulatedWayById(ctx context.Context, params GetPopulatedWayByIdParams) (*schemas.WayPopulatedResponse, error) {
	wayPgUUID := pgtype.UUID{Bytes: params.WayUuid, Valid: true}
	way, err := ws.wayRepository.GetWayById(ctx, wayPgUUID)
	if err != nil {
		return nil, err
	}

	wayOwner := schemas.UserPlainResponse{
		Uuid:        util.ConvertPgUUIDToUUID(way.OwnerUuid).String(),
		Name:        way.OwnerName,
		Email:       way.OwnerEmail,
		Description: way.OwnerDescription,
		CreatedAt:   way.OwnerCreatedAt.Time.Format(util.DEFAULT_STRING_LAYOUT),
		ImageUrl:    way.OwnerImageUrl,
		IsMentor:    way.OwnerIsMentor,
	}

	jobTagsRaw, _ := ws.wayRepository.GetListJobTagsByWayUuid(ctx, wayPgUUID)
	jobTags := lo.Map(jobTagsRaw, func(dbJobTag db.JobTag, i int) schemas.JobTagResponse {
		return schemas.JobTagResponse{
			Uuid:        util.ConvertPgUUIDToUUID(dbJobTag.Uuid).String(),
			Name:        dbJobTag.Name,
			Description: dbJobTag.Description,
			Color:       dbJobTag.Color,
		}
	})

	favoriteForUserAmount, _ := ws.wayRepository.GetFavoriteForUserUuidsByWayId(ctx, wayPgUUID)
	fromUserMentoringRequestsRaw, _ := ws.wayRepository.GetFromUserMentoringRequestWaysByWayId(ctx, wayPgUUID)
	fromUserMentoringRequests := lo.Map(fromUserMentoringRequestsRaw, func(fromUser db.User, i int) schemas.UserPlainResponse {
		return schemas.UserPlainResponse{
			Uuid:        util.ConvertPgUUIDToUUID(fromUser.Uuid).String(),
			Name:        fromUser.Name,
			Email:       fromUser.Email,
			Description: fromUser.Description,
			CreatedAt:   fromUser.CreatedAt.Time.Format(util.DEFAULT_STRING_LAYOUT),
			ImageUrl:    fromUser.ImageUrl,
			IsMentor:    fromUser.IsMentor,
		}
	})

	formerMentorsRaw, _ := ws.wayRepository.GetFormerMentorUsersByWayId(ctx, wayPgUUID)
	formerMentors := lo.Map(formerMentorsRaw, func(dbFormerMentor db.User, i int) schemas.UserPlainResponse {
		return schemas.UserPlainResponse{
			Uuid:        util.ConvertPgUUIDToUUID(dbFormerMentor.Uuid).String(),
			Name:        dbFormerMentor.Name,
			Email:       dbFormerMentor.Email,
			Description: dbFormerMentor.Description,
			CreatedAt:   dbFormerMentor.CreatedAt.Time.Format(util.DEFAULT_STRING_LAYOUT),
			ImageUrl:    dbFormerMentor.ImageUrl,
			IsMentor:    dbFormerMentor.IsMentor,
		}
	})

	mentorsRaw, _ := ws.wayRepository.GetMentorUsersByWayId(ctx, wayPgUUID)
	mentors := lo.Map(mentorsRaw, func(dbMentor db.User, i int) schemas.UserPlainResponse {
		return schemas.UserPlainResponse{
			Uuid:        util.ConvertPgUUIDToUUID(dbMentor.Uuid).String(),
			Name:        dbMentor.Name,
			Email:       dbMentor.Email,
			Description: dbMentor.Description,
			CreatedAt:   dbMentor.CreatedAt.Time.Format(util.DEFAULT_STRING_LAYOUT),
			ImageUrl:    dbMentor.ImageUrl,
			IsMentor:    dbMentor.IsMentor,
		}
	})

	metricsRaw, _ := ws.wayRepository.GetListMetricsByWayUuid(ctx, wayPgUUID)
	fmt.Println(metricsRaw[1].ParentUuid)
	metrics := lo.Map(metricsRaw, func(dbMetric db.Metric, i int) schemas.MetricResponse {
		return schemas.MetricResponse{
			Uuid:             util.ConvertPgUUIDToUUID(dbMetric.Uuid).String(),
			Description:      dbMetric.Description,
			IsDone:           dbMetric.IsDone,
			DoneDate:         util.MarshalPgTimestamp(dbMetric.DoneDate),
			MetricEstimation: dbMetric.MetricEstimation,
			ParentUuid:       util.MarshalPgUUID(dbMetric.ParentUuid),
		}
	})

	fmt.Println(metrics[1].ParentUuid)
	buildMetricTree := func(metrics []schemas.MetricResponse) []*schemas.MetricTreeNode {
		nodeMap := make(map[string]*schemas.MetricTreeNode)

		for _, metric := range metrics {
			nodeMap[metric.Uuid] = &schemas.MetricTreeNode{
				Metric:   metric,
				Children: []*schemas.MetricTreeNode{},
			}
		}

		roots := []*schemas.MetricTreeNode{}

		for _, node := range nodeMap {
			if node.Metric.ParentUuid == nil {
				roots = append(roots, node)
			} else {
				parent, exists := nodeMap[*node.Metric.ParentUuid]
				if exists {
					if parent.Children == nil {
						parent.Children = []*schemas.MetricTreeNode{}
					}
					parent.Children = append(parent.Children, node)
				} else {
					log.Printf("Parent with UUID %v not found for node %v", *node.Metric.ParentUuid, node.Metric.Uuid)
				}
			}
		}

		return roots
	}

	metricsTree := buildMetricTree(metrics)
	println(len(metricsTree))

	wayTagsRaw, _ := ws.wayRepository.GetListWayTagsByWayId(ctx, wayPgUUID)
	wayTags := lo.Map(wayTagsRaw, func(dbWayTag db.WayTag, i int) schemas.WayTagResponse {
		return schemas.WayTagResponse{
			Uuid: util.ConvertPgUUIDToUUID(dbWayTag.Uuid).String(),
			Name: dbWayTag.Name,
		}
	})

	children := []schemas.WayPopulatedResponse{}
	if params.CurrentChildrenDepth < int(limitMap[MaxCompositeWayDeps][db.PricingPlanTypeStarter]) {
		children = lo.Map(way.ChildrenUuids, func(childUuid string, i int) schemas.WayPopulatedResponse {
			args := GetPopulatedWayByIdParams{
				WayUuid:              uuid.MustParse(childUuid),
				CurrentChildrenDepth: params.CurrentChildrenDepth + 1,
			}
			child, _ := ws.GetPopulatedWayById(ctx, args)

			return *child
		})
	}

	response := &schemas.WayPopulatedResponse{
		Uuid:                   util.ConvertPgUUIDToUUID(way.Uuid).String(),
		Name:                   way.Name,
		GoalDescription:        way.GoalDescription,
		UpdatedAt:              way.UpdatedAt.Time.Format(util.DEFAULT_STRING_LAYOUT),
		CreatedAt:              way.CreatedAt.Time.Format(util.DEFAULT_STRING_LAYOUT),
		EstimationTime:         way.EstimationTime,
		IsCompleted:            way.IsCompleted,
		IsPrivate:              way.IsPrivate,
		ProjectUuid:            util.MarshalPgUUID(way.ProjectUuid),
		Owner:                  wayOwner,
		Mentors:                mentors,
		FormerMentors:          formerMentors,
		FromUserMentorRequests: fromUserMentoringRequests,
		FavoriteForUsersAmount: int32(favoriteForUserAmount),
		WayTags:                wayTags,
		JobTags:                jobTags,
		Metrics:                metricsTree,
		CopiedFromWayUuid:      util.MarshalPgUUID(way.CopiedFromWayUuid),
		Children:               children,
	}

	return response, nil
}

func (ws *WayService) UpdateWayIsCompletedStatus(ctx context.Context, wayID string) error {
	wayPgUUID := pgtype.UUID{Bytes: uuid.MustParse(wayID), Valid: true}

	isCompleted, err := ws.wayRepository.IsAllMetricsDone(ctx, wayPgUUID)
	if err != nil {
		return err
	}

	now := time.Now()
	args := db.UpdateWayParams{
		WayUuid:     wayPgUUID,
		IsCompleted: pgtype.Bool{Bool: isCompleted, Valid: true},
		UpdatedAt:   pgtype.Timestamp{Time: now, Valid: true},
	}

	_, err = ws.wayRepository.UpdateWay(ctx, args)
	if err != nil {
		return err
	}

	return nil
}

func (ws *WayService) GetPlainWayById(ctx context.Context, wayUUID uuid.UUID) (*schemas.WayPlainResponse, error) {
	wayPgUUID := pgtype.UUID{Bytes: wayUUID, Valid: true}
	way, err := ws.wayRepository.GetWayById(ctx, wayPgUUID)
	if err != nil {
		return nil, err
	}

	mentorsRaw, _ := ws.wayRepository.GetMentorUsersByWayId(ctx, way.Uuid)

	mentors := lo.Map(mentorsRaw, func(dbMentor db.User, i int) schemas.UserPlainResponse {
		return schemas.UserPlainResponse{
			Uuid:        util.ConvertPgUUIDToUUID(dbMentor.Uuid).String(),
			Name:        dbMentor.Name,
			Email:       dbMentor.Email,
			Description: dbMentor.Description,
			CreatedAt:   dbMentor.CreatedAt.Time.Format(util.DEFAULT_STRING_LAYOUT),
			ImageUrl:    dbMentor.ImageUrl,
			IsMentor:    dbMentor.IsMentor,
		}
	})

	dbOwner, _ := ws.wayRepository.GetUserByID(ctx, way.OwnerUuid)
	owner := schemas.UserPlainResponse{
		Uuid:        util.ConvertPgUUIDToUUID(dbOwner.Uuid).String(),
		Name:        dbOwner.Name,
		Email:       dbOwner.Email,
		Description: dbOwner.Description,
		CreatedAt:   dbOwner.CreatedAt.Time.Format(util.DEFAULT_STRING_LAYOUT),
		ImageUrl:    dbOwner.ImageUrl,
		IsMentor:    dbOwner.IsMentor,
	}
	dbTags, _ := ws.wayRepository.GetListWayTagsByWayId(ctx, way.Uuid)
	wayTags := lo.Map(dbTags, func(dbTag db.WayTag, i int) schemas.WayTagResponse {
		return schemas.WayTagResponse{
			Uuid: util.ConvertPgUUIDToUUID(dbTag.Uuid).String(),
			Name: dbTag.Name,
		}
	})

	return &schemas.WayPlainResponse{
		Uuid:                   util.ConvertPgUUIDToUUID(way.Uuid).String(),
		Name:                   way.Name,
		GoalDescription:        way.GoalDescription,
		UpdatedAt:              way.UpdatedAt.Time.Format(util.DEFAULT_STRING_LAYOUT),
		CreatedAt:              way.CreatedAt.Time.Format(util.DEFAULT_STRING_LAYOUT),
		EstimationTime:         way.EstimationTime,
		IsCompleted:            way.IsCompleted,
		Owner:                  owner,
		CopiedFromWayUuid:      util.MarshalPgUUID(way.CopiedFromWayUuid),
		ProjectUuid:            util.MarshalPgUUID(way.ProjectUuid),
		IsPrivate:              way.IsPrivate,
		FavoriteForUsersAmount: int32(way.WayFavoriteForUsers),
		DayReportsAmount:       int32(way.WayDayReportsAmount),
		Mentors:                mentors,
		WayTags:                wayTags,
		MetricsDone:            int32(way.WayMetricsDone),
		MetricsTotal:           int32(way.WayMetricsTotal),
		ChildrenUuids:          way.ChildrenUuids,
	}, nil
}

func (ws *WayService) CreateWay(ctx context.Context, payload *schemas.CreateWayPayload) (*schemas.WayPlainResponse, error) {
	now := time.Now()

	var projectPg, copiedFromWayPg pgtype.UUID
	if payload.CopiedFromWayID != nil {
		copiedFromWayPg = pgtype.UUID{Bytes: uuid.MustParse(*payload.CopiedFromWayID), Valid: true}
	}

	if payload.ProjectID != nil {
		projectPg = pgtype.UUID{Bytes: uuid.MustParse(*payload.ProjectID), Valid: true}
	}

	args := db.CreateWayParams{
		Name:              payload.Name,
		GoalDescription:   payload.GoalDescription,
		EstimationTime:    payload.EstimationTime,
		OwnerUuid:         pgtype.UUID{Bytes: uuid.MustParse(payload.OwnerID), Valid: true},
		IsCompleted:       payload.IsCompleted,
		IsPrivate:         false,
		CopiedFromWayUuid: copiedFromWayPg,
		UpdatedAt:         pgtype.Timestamp{Time: now, Valid: true},
		CreatedAt:         pgtype.Timestamp{Time: now, Valid: true},
		ProjectUuid:       projectPg,
	}

	way, err := ws.wayRepository.CreateWay(ctx, args)
	if err != nil {
		return nil, err
	}

	if copiedFromWayPg.Valid {
		err := ws.CopyWay(ctx, way.CopiedFromWayUuid.Bytes, way.Uuid.Bytes)
		if err != nil {
			return nil, err
		}
	}

	wayPlain, err := ws.GetPlainWayById(ctx, way.Uuid.Bytes)
	if err != nil {
		return nil, err
	}

	return wayPlain, nil
}

// Flatten the metric tree into a flat list of metrics
func flatMetricTree(nodes []*schemas.MetricTreeNode) []*schemas.MetricResponse {
	flatList := []*schemas.MetricResponse{}
	for _, node := range nodes {
		flatList = append(flatList, &node.Metric)
		flatList = append(flatList, flatMetricTree(node.Children)...)
	}
	return flatList
}

func (ws *WayService) CopyWay(ctx context.Context, fromWayUUID, toWayUUID uuid.UUID) error {
	toWayPgUUID := pgtype.UUID{Bytes: toWayUUID, Valid: true}

	now := time.Now()
	args := GetPopulatedWayByIdParams{
		WayUuid:              fromWayUUID,
		CurrentChildrenDepth: 1,
	}

	originalWay, err := ws.GetPopulatedWayById(ctx, args)
	if err != nil {
		return err
	}

	// copy wayTags from the copied way
	lo.ForEach(originalWay.WayTags, func(wayTag schemas.WayTagResponse, i int) {
		ws.wayRepository.CreateWaysWayTag(ctx, db.CreateWaysWayTagParams{
			WayUuid:    toWayPgUUID,
			WayTagUuid: pgtype.UUID{Bytes: uuid.MustParse(wayTag.Uuid), Valid: true},
		})
	})
	// copying labels from the copied way
	lo.ForEach(originalWay.JobTags, func(jobTag schemas.JobTagResponse, i int) {
		ws.wayRepository.CreateJobTag(ctx, db.CreateJobTagParams{
			WayUuid:     toWayPgUUID,
			Name:        jobTag.Name,
			Description: jobTag.Description,
			Color:       jobTag.Color,
		})
	})

	flattenMetrics := flatMetricTree(originalWay.Metrics)

	// copy metrics from the copied way
	lo.ForEach(flattenMetrics, func(metric *schemas.MetricResponse, i int) {
		parsedParentUuid, parserParentUuidErr := uuid.Parse(*metric.ParentUuid)
		ws.wayRepository.CreateMetric(ctx, db.CreateMetricParams{
			UpdatedAt:        pgtype.Timestamp{Time: now, Valid: true},
			Description:      metric.Description,
			IsDone:           false,
			MetricEstimation: metric.MetricEstimation,
			WayUuid:          toWayPgUUID,
			ParentUuid:       pgtype.UUID{Bytes: parsedParentUuid, Valid: parserParentUuidErr != nil},
		})
	})

	return nil
}

type UpdateWayParams struct {
	WayID           string
	Name            string
	GoalDescription string
	EstimationTime  int32
	IsPrivate       *bool
	IsCompleted     bool
}

func (ws *WayService) UpdateWay(ctx context.Context, params *UpdateWayParams) (*schemas.WayPlainResponse, error) {
	var isPrivate pgtype.Bool
	if params.IsPrivate != nil {
		isPrivate = pgtype.Bool{Bool: *params.IsPrivate, Valid: true}
	}

	now := time.Now()
	args := db.UpdateWayParams{
		WayUuid:         pgtype.UUID{Bytes: uuid.MustParse(params.WayID), Valid: true},
		Name:            pgtype.Text{String: params.Name, Valid: params.Name != ""},
		GoalDescription: pgtype.Text{String: params.GoalDescription, Valid: params.GoalDescription != ""},
		EstimationTime:  pgtype.Int4{Int32: params.EstimationTime, Valid: params.EstimationTime != 0},
		IsCompleted:     pgtype.Bool{Bool: params.IsCompleted, Valid: true},
		IsPrivate:       isPrivate,
		UpdatedAt:       pgtype.Timestamp{Time: now, Valid: true},
	}

	way, err := ws.wayRepository.UpdateWay(ctx, args)
	if err != nil {
		return nil, err
	}

	wayPlain, err := ws.GetPlainWayById(ctx, way.Uuid.Bytes)
	if err != nil {
		return nil, err
	}

	return wayPlain, nil
}

type GetAllWaysParams struct {
	Status                 string
	WayName                string
	Offset                 int
	ReqMinDayReportsAmount int
	ReqLimit               int
}

func (ws *WayService) GetAllWays(ctx context.Context, params *GetAllWaysParams) (*schemas.GetAllWaysResponse, error) {
	currentDate := time.Now()

	waySizeArgs := db.CountWaysByTypeParams{
		WayStatus:           params.Status,
		Date:                pgtype.Timestamp{Time: currentDate, Valid: true},
		MinDayReportsAmount: int32(params.ReqMinDayReportsAmount),
		WayName:             params.WayName,
	}
	waysSize, err := ws.wayRepository.CountWaysByType(ctx, waySizeArgs)
	if err != nil {
		return nil, err
	}

	listWaysArgs := db.ListWaysParams{
		Date:                pgtype.Timestamp{Time: currentDate, Valid: true},
		Status:              params.Status,
		MinDayReportsAmount: int32(params.ReqMinDayReportsAmount),
		RequestOffset:       int32(params.Offset),
		RequestLimit:        int32(params.ReqLimit),
		WayName:             params.WayName,
	}
	ways, err := ws.wayRepository.ListWays(ctx, listWaysArgs)
	if err != nil {
		return nil, err
	}

	response := lo.Map(ways, func(way db.ListWaysRow, i int) schemas.WayPlainResponse {
		wayPlain, _ := ws.GetPlainWayById(ctx, way.Uuid.Bytes)
		return *wayPlain
	})

	return &schemas.GetAllWaysResponse{
		Size: int32(waysSize),
		Ways: response,
	}, nil
}

func (ws *WayService) DeleteWayById(ctx *gin.Context, wayID string) error {
	return ws.wayRepository.DeleteWay(ctx, pgtype.UUID{Bytes: uuid.MustParse(wayID), Valid: true})
}

func (ws *WayService) GetChildrenWayIDs(ctx context.Context, wayID uuid.UUID, maxDepth int) ([]uuid.UUID, error) {
	wayPgUUID := pgtype.UUID{Bytes: wayID, Valid: true}
	waysRaw, err := ws.GetNestedWayIDs(ctx, wayPgUUID, 0, maxDepth)
	if err != nil {
		return nil, err
	}

	ways := lo.Map(waysRaw, func(way pgtype.UUID, _ int) uuid.UUID {
		return util.ConvertPgUUIDToUUID(way)
	})

	return ways, nil
}

func (ws *WayService) GetNestedWayIDs(ctx context.Context, parentWayUUID pgtype.UUID, currentDepth int, maxDepth int) ([]pgtype.UUID, error) {
	if currentDepth >= maxDepth {
		return nil, nil
	}

	children, err := ws.wayRepository.GetWayChildren(ctx, parentWayUUID)
	if err != nil {
		return nil, err
	}

	for _, wayUUID := range children {
		child, err := ws.GetNestedWayIDs(ctx, wayUUID, currentDepth+1, maxDepth)
		if err != nil {
			return nil, err
		}
		children = append(children, child...)
	}

	return children, nil
}

func (ws *WayService) GetWayPlainForNotificationById(ctx context.Context, wayUUID uuid.UUID) (*schemas.WayPlainForNotificationResponse, error) {
	wayPgUUID := pgtype.UUID{Bytes: wayUUID, Valid: true}

	mentorsRaw, err := ws.wayRepository.GetMentorUsersByWayId(ctx, wayPgUUID)
	if err != nil {
		return nil, err
	}

	mentors := lo.Map(mentorsRaw, func(user db.User, _ int) schemas.UserPlainResponse {
		return schemas.UserPlainResponse{
			Uuid:        util.ConvertPgUUIDToUUID(user.Uuid).String(),
			Name:        user.Name,
			Email:       user.Email,
			Description: user.Description,
			CreatedAt:   user.CreatedAt.Time.Format(util.DEFAULT_STRING_LAYOUT),
			ImageUrl:    user.ImageUrl,
			IsMentor:    user.IsMentor,
		}
	})

	way, err := ws.wayRepository.GetWayPlainForNotification(ctx, wayPgUUID)
	if err != nil {
		return nil, err
	}

	return &schemas.WayPlainForNotificationResponse{
		Uuid: util.ConvertPgUUIDToUUID(way.Uuid).String(),
		Name: way.Name,
		Owner: schemas.UserPlainResponse{
			Uuid:        util.ConvertPgUUIDToUUID(way.OwnerUuid).String(),
			Name:        way.OwnerName,
			Email:       way.OwnerEmail,
			Description: way.OwnerDescription,
			CreatedAt:   way.OwnerCreatedAt.Time.Format(util.DEFAULT_STRING_LAYOUT),
			ImageUrl:    way.OwnerImageUrl,
			IsMentor:    way.OwnerIsMentor,
		},
		Mentors: mentors,
	}, nil
}
