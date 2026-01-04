package services

import (
	"context"
	"mw-server/internal/customErrors"
	db "mw-server/internal/db/sqlc"
	"mw-server/internal/schemas"
	"mw-server/pkg/util"
	"time"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgtype"
	"github.com/samber/lo"
)

type IDayReportRepository interface {
	GetDayReportsByRankRange(ctx context.Context, arg db.GetDayReportsByRankRangeParams) ([]db.GetDayReportsByRankRangeRow, error)
	GetWayRelatedUsers(ctx context.Context, wayUuids []pgtype.UUID) ([]db.GetWayRelatedUsersRow, error)
	GetListJobTagsByWayUuids(ctx context.Context, wayUuids []pgtype.UUID) ([]db.JobTag, error)
	GetJobDonesByDayReportUuids(ctx context.Context, dayReportUuids []pgtype.UUID) ([]db.GetJobDonesByDayReportUuidsRow, error)
	GetPlansByDayReportUuids(ctx context.Context, dayReportUuids []pgtype.UUID) ([]db.GetPlansByDayReportUuidsRow, error)
	GetLastDayReportDate(ctx context.Context, wayUuids []pgtype.UUID) (db.GetLastDayReportDateRow, error)
	GetProblemsByDayReportUuids(ctx context.Context, dollar_1 []pgtype.UUID) ([]db.Problem, error)
	GetListCommentsByDayReportUuids(ctx context.Context, dayReportUuids []pgtype.UUID) ([]db.Comment, error)
	CreateDayReport(ctx context.Context, arg db.CreateDayReportParams) (db.DayReport, error)
	UpdateWay(ctx context.Context, arg db.UpdateWayParams) (db.UpdateWayRow, error)
	GetLast14DayReportsByWayUuid(ctx context.Context, wayUuid pgtype.UUID) ([]db.DayReport, error)
	GetTodayDayReportByWayUuid(ctx context.Context, wayUuid pgtype.UUID) (db.DayReport, error)
}

type DayReportService struct {
	dayReportRepository IDayReportRepository
}

func NewDayReportService(dayReportRepository IDayReportRepository) *DayReportService {
	return &DayReportService{dayReportRepository}
}

type GetDayReportsByWayIdParams struct {
	ParentWayID    uuid.UUID
	ChildrenWayIDs []uuid.UUID
	ReqLimit       int
	Offset         int
}

func (drs *DayReportService) GetDayReportsByWayID(ctx context.Context, params *GetDayReportsByWayIdParams) (*schemas.ListDayReportsResponse, error) {
	wayPgUUIDs := make([]pgtype.UUID, 0, len(params.ChildrenWayIDs)+1)
	wayPgUUIDs = append(wayPgUUIDs, pgtype.UUID{Bytes: params.ParentWayID, Valid: true})

	for _, wayID := range params.ChildrenWayIDs {
		wayPgUUIDs = append(wayPgUUIDs, pgtype.UUID{Bytes: wayID, Valid: true})
	}

	getDayReportsByRankRangeParams := db.GetDayReportsByRankRangeParams{
		WayUuids:       wayPgUUIDs,
		StartRankRange: int32(params.Offset + 1),
		EndRankRange:   int32(params.ReqLimit + params.Offset),
	}

	dayReportsRaw, err := drs.dayReportRepository.GetDayReportsByRankRange(ctx, getDayReportsByRankRangeParams)
	if err != nil {
		return nil, err
	}

	if len(dayReportsRaw) == 0 {
		return &schemas.ListDayReportsResponse{
			DayReports: []schemas.CompositeDayReportPopulatedResponse{},
			Size:       0,
		}, nil
	}

	dayReportMap := lo.SliceToMap(dayReportsRaw, func(dbDayReport db.GetDayReportsByRankRangeRow) (string, db.GetDayReportsByRankRangeRow) {
		return util.ConvertPgUUIDToUUID(dbDayReport.Uuid).String(), dbDayReport
	})

	dayReportPgUUIDs := lo.Map(dayReportsRaw, func(dbDayReport db.GetDayReportsByRankRangeRow, _ int) pgtype.UUID {
		return dbDayReport.Uuid
	})

	wayRelatedUsersRaw, _ := drs.dayReportRepository.GetWayRelatedUsers(ctx, wayPgUUIDs)
	allWayRelatedUsersMap := lo.SliceToMap(wayRelatedUsersRaw, func(relatedUser db.GetWayRelatedUsersRow) (string, schemas.UserPlainResponse) {
		userUUID := util.ConvertPgUUIDToUUID(relatedUser.Uuid).String()
		return userUUID, schemas.UserPlainResponse{
			Uuid:        userUUID,
			Name:        relatedUser.Name.String,
			Email:       relatedUser.Email.String,
			Description: relatedUser.Description.String,
			CreatedAt:   relatedUser.CreatedAt.Time.Format(util.DEFAULT_STRING_LAYOUT),
			ImageUrl:    relatedUser.ImageUrl.String,
			IsMentor:    relatedUser.IsMentor.Bool,
		}
	})

	jobTagsRaw, err := drs.dayReportRepository.GetListJobTagsByWayUuids(ctx, wayPgUUIDs)
	if err != nil {
		return nil, err
	}
	jobTagsMap := lo.SliceToMap(jobTagsRaw, func(jobTag db.JobTag) (string, schemas.JobTagResponse) {
		jobTagUUID := util.ConvertPgUUIDToUUID(jobTag.Uuid).String()
		return jobTagUUID, schemas.JobTagResponse{
			Uuid:        jobTagUUID,
			Name:        jobTag.Name,
			Description: jobTag.Description,
			Color:       jobTag.Color,
		}
	})

	dbJobDones, err := drs.dayReportRepository.GetJobDonesByDayReportUuids(ctx, dayReportPgUUIDs)
	if err != nil {
		return nil, err
	}
	jobDonesMap := make(map[string][]schemas.JobDonePopulatedResponse)
	lo.ForEach(dbJobDones, func(dbJobDone db.GetJobDonesByDayReportUuidsRow, i int) {
		jobDoneOwnerUUIDString := util.ConvertPgUUIDToUUID(dbJobDone.OwnerUuid).String()
		jobDoneOwner := allWayRelatedUsersMap[jobDoneOwnerUUIDString]

		tags := lo.Map(dbJobDone.TagUuids, func(tagUuid string, i int) schemas.JobTagResponse {
			return jobTagsMap[tagUuid]
		})

		dayReportUUIDString := util.ConvertPgUUIDToUUID(dbJobDone.DayReportUuid).String()
		jobDonesMap[dayReportUUIDString] = append(
			jobDonesMap[dayReportUUIDString],
			schemas.JobDonePopulatedResponse{
				Uuid:          util.ConvertPgUUIDToUUID(dbJobDone.Uuid).String(),
				CreatedAt:     dbJobDone.CreatedAt.Time.Format(util.DEFAULT_STRING_LAYOUT),
				UpdatedAt:     dbJobDone.UpdatedAt.Time.Format(util.DEFAULT_STRING_LAYOUT),
				Description:   dbJobDone.Description,
				Time:          dbJobDone.Time,
				OwnerUuid:     jobDoneOwnerUUIDString,
				OwnerName:     jobDoneOwner.Name,
				DayReportUuid: dayReportUUIDString,
				WayUUID:       util.ConvertPgUUIDToUUID(dayReportMap[dayReportUUIDString].WayUuid).String(),
				WayName:       dayReportMap[dayReportUUIDString].WayName,
				Tags:          tags,
			},
		)
	})

	dbPlans, _ := drs.dayReportRepository.GetPlansByDayReportUuids(ctx, dayReportPgUUIDs)
	plansMap := make(map[string][]schemas.PlanPopulatedResponse)
	lo.ForEach(dbPlans, func(plan db.GetPlansByDayReportUuidsRow, i int) {
		planOwnerUUIDString := util.ConvertPgUUIDToUUID(plan.OwnerUuid).String()
		planOwner := allWayRelatedUsersMap[planOwnerUUIDString]
		tags := lo.Map(plan.TagUuids, func(tagUuid string, i int) schemas.JobTagResponse {
			return jobTagsMap[tagUuid]
		})
		dayReportUUIDString := util.ConvertPgUUIDToUUID(plan.DayReportUuid).String()
		plansMap[dayReportUUIDString] = append(
			plansMap[dayReportUUIDString],
			schemas.PlanPopulatedResponse{
				Uuid:          util.ConvertPgUUIDToUUID(plan.Uuid).String(),
				CreatedAt:     plan.CreatedAt.Time.Format(util.DEFAULT_STRING_LAYOUT),
				UpdatedAt:     plan.UpdatedAt.Time.Format(util.DEFAULT_STRING_LAYOUT),
				Description:   plan.Description,
				Time:          plan.Time,
				OwnerUuid:     util.ConvertPgUUIDToUUID(plan.OwnerUuid).String(),
				OwnerName:     planOwner.Name,
				DayReportUuid: dayReportUUIDString,
				WayUUID:       util.ConvertPgUUIDToUUID(dayReportMap[dayReportUUIDString].WayUuid).String(),
				WayName:       dayReportMap[dayReportUUIDString].WayName,
				Tags:          tags,
				IsDone:        plan.IsDone,
			},
		)
	})

	dbProblems, _ := drs.dayReportRepository.GetProblemsByDayReportUuids(ctx, dayReportPgUUIDs)
	problemsMap := make(map[string][]schemas.ProblemPopulatedResponse)
	lo.ForEach(dbProblems, func(problem db.Problem, i int) {
		problemOwnerUUIDString := util.ConvertPgUUIDToUUID(problem.OwnerUuid).String()
		problemOwner := allWayRelatedUsersMap[problemOwnerUUIDString]
		dayReportUUIDString := util.ConvertPgUUIDToUUID(problem.DayReportUuid).String()
		problemsMap[dayReportUUIDString] = append(
			problemsMap[dayReportUUIDString],
			schemas.ProblemPopulatedResponse{
				Uuid:          util.ConvertPgUUIDToUUID(problem.Uuid).String(),
				CreatedAt:     problem.CreatedAt.Time.Format(util.DEFAULT_STRING_LAYOUT),
				UpdatedAt:     problem.UpdatedAt.Time.Format(util.DEFAULT_STRING_LAYOUT),
				Description:   problem.Description,
				OwnerUuid:     util.ConvertPgUUIDToUUID(problem.OwnerUuid).String(),
				OwnerName:     problemOwner.Name,
				DayReportUuid: dayReportUUIDString,
				WayUUID:       util.ConvertPgUUIDToUUID(dayReportMap[dayReportUUIDString].WayUuid).String(),
				WayName:       dayReportMap[dayReportUUIDString].WayName,
				IsDone:        problem.IsDone,
			},
		)
	})

	dbComments, _ := drs.dayReportRepository.GetListCommentsByDayReportUuids(ctx, dayReportPgUUIDs)
	commentsMap := make(map[string][]schemas.CommentPopulatedResponse)
	lo.ForEach(dbComments, func(comment db.Comment, i int) {
		commentOwnerUUIDString := util.ConvertPgUUIDToUUID(comment.OwnerUuid).String()
		commentOwner := allWayRelatedUsersMap[commentOwnerUUIDString]
		dayReportUUIDString := util.ConvertPgUUIDToUUID(comment.DayReportUuid).String()
		commentsMap[dayReportUUIDString] = append(
			commentsMap[dayReportUUIDString],
			schemas.CommentPopulatedResponse{
				Uuid:          util.ConvertPgUUIDToUUID(comment.Uuid).String(),
				CreatedAt:     comment.CreatedAt.Time.Format(util.DEFAULT_STRING_LAYOUT),
				UpdatedAt:     comment.UpdatedAt.Time.Format(util.DEFAULT_STRING_LAYOUT),
				Description:   comment.Description,
				OwnerUuid:     commentOwner.Uuid,
				OwnerName:     commentOwner.Name,
				DayReportUuid: dayReportUUIDString,
				WayUUID:       util.ConvertPgUUIDToUUID(dayReportMap[dayReportUUIDString].WayUuid).String(),
				WayName:       dayReportMap[dayReportUUIDString].WayName,
			},
		)
	})

	dayReports := make([]schemas.CompositeDayReportPopulatedResponse, 0, params.ReqLimit)
	firstDayReportRaw := dayReportsRaw[0]
	rank := firstDayReportRaw.Rank

	firstDayReportUUIDString := util.ConvertPgUUIDToUUID(firstDayReportRaw.Uuid).String()
	firstWayUUIDString := util.ConvertPgUUIDToUUID(firstDayReportRaw.WayUuid).String()

	jobDonesSlice := []schemas.JobDonePopulatedResponse{}
	jobDones, jobDonesExists := jobDonesMap[firstDayReportUUIDString]
	if jobDonesExists {
		jobDonesSlice = jobDones
	}

	plansSlice := []schemas.PlanPopulatedResponse{}
	plans, plansExists := plansMap[firstDayReportUUIDString]
	if plansExists {
		plansSlice = plans
	}

	problemsSlice := []schemas.ProblemPopulatedResponse{}
	problems, problemsExists := problemsMap[firstDayReportUUIDString]
	if problemsExists {
		problemsSlice = problems
	}

	commentsSlice := []schemas.CommentPopulatedResponse{}
	comments, commentsExists := commentsMap[firstDayReportUUIDString]
	if commentsExists {
		commentsSlice = comments
	}

	firstNewUUID, _ := uuid.NewRandom()
	currentDayReport := schemas.CompositeDayReportPopulatedResponse{
		UUID:      firstNewUUID.String(),
		CreatedAt: firstDayReportRaw.CreatedAt.Time.Truncate(24 * time.Hour).Format(util.DEFAULT_STRING_LAYOUT),
		UpdatedAt: firstDayReportRaw.UpdatedAt.Time.Truncate(24 * time.Hour).Format(util.DEFAULT_STRING_LAYOUT),
		CompositionParticipants: []schemas.DayReportsCompositionParticipants{
			{
				DayReportID: firstDayReportUUIDString,
				WayID:       firstWayUUIDString,
				WayName:     firstDayReportRaw.WayName,
			},
		},
		JobsDone: jobDonesSlice,
		Plans:    plansSlice,
		Problems: problemsSlice,
		Comments: commentsSlice,
	}

	for i := 1; i < len(dayReportsRaw); i++ {
		currentDayReportRaw := dayReportsRaw[i]
		currentDayReportUUIDString := util.ConvertPgUUIDToUUID(currentDayReportRaw.Uuid).String()
		currentWayUUIDString := util.ConvertPgUUIDToUUID(currentDayReportRaw.WayUuid).String()

		if currentDayReportRaw.Rank == rank {
			currentDayReport.JobsDone = append(currentDayReport.JobsDone, jobDonesMap[currentDayReportUUIDString]...)
			currentDayReport.Plans = append(currentDayReport.Plans, plansMap[currentDayReportUUIDString]...)
			currentDayReport.Problems = append(currentDayReport.Problems, problemsMap[currentDayReportUUIDString]...)
			currentDayReport.Comments = append(currentDayReport.Comments, commentsMap[currentDayReportUUIDString]...)
			currentDayReport.CompositionParticipants = append(currentDayReport.CompositionParticipants, schemas.DayReportsCompositionParticipants{
				DayReportID: currentDayReportUUIDString,
				WayID:       currentWayUUIDString,
				WayName:     currentDayReportRaw.WayName,
			})
		} else {
			dayReports = append(dayReports, currentDayReport)

			rank = currentDayReportRaw.Rank

			currentJobDonesSlice := []schemas.JobDonePopulatedResponse{}
			jobDones, jobDonesExists := jobDonesMap[currentDayReportUUIDString]
			if jobDonesExists {
				currentJobDonesSlice = jobDones
			}

			currentPlansSlice := []schemas.PlanPopulatedResponse{}
			plans, plansExists := plansMap[currentDayReportUUIDString]
			if plansExists {
				currentPlansSlice = plans
			}

			currentProblemsSlice := []schemas.ProblemPopulatedResponse{}
			problems, problemsExists := problemsMap[currentDayReportUUIDString]
			if problemsExists {
				currentProblemsSlice = problems
			}

			currentCommentsSlice := []schemas.CommentPopulatedResponse{}
			comments, commentsExists := commentsMap[currentDayReportUUIDString]
			if commentsExists {
				currentCommentsSlice = comments
			}

			currentNewUUID, _ := uuid.NewRandom()
			currentDayReport = schemas.CompositeDayReportPopulatedResponse{
				UUID:      currentNewUUID.String(),
				CreatedAt: currentDayReportRaw.CreatedAt.Time.Truncate(24 * time.Hour).Format(util.DEFAULT_STRING_LAYOUT),
				UpdatedAt: currentDayReportRaw.UpdatedAt.Time.Truncate(24 * time.Hour).Format(util.DEFAULT_STRING_LAYOUT),
				CompositionParticipants: []schemas.DayReportsCompositionParticipants{
					{
						DayReportID: currentDayReportUUIDString,
						WayID:       currentWayUUIDString,
						WayName:     currentDayReportRaw.WayName,
					},
				},
				JobsDone: currentJobDonesSlice,
				Plans:    currentPlansSlice,
				Problems: currentProblemsSlice,
				Comments: currentCommentsSlice,
			}
		}
	}

	dayReports = append(dayReports, currentDayReport)

	return &schemas.ListDayReportsResponse{
		DayReports: dayReports,
		Size:       int(firstDayReportRaw.MaxRank),
	}, nil
}

type GetLastDayReportDateResponse struct {
	TotalStartDate time.Time
	EndDate        time.Time
}

func (ds *DayReportService) GetLastDayReportDate(ctx context.Context, wayUUIDs []uuid.UUID) (*GetLastDayReportDateResponse, error) {
	wayPgUUIDs := lo.Map(wayUUIDs, func(wayUUID uuid.UUID, _ int) pgtype.UUID {
		return pgtype.UUID{Bytes: wayUUID, Valid: true}
	})

	response, err := ds.dayReportRepository.GetLastDayReportDate(ctx, wayPgUUIDs)
	if err != nil {
		return nil, err
	}

	if !response.IsValid {
		return nil, customErrors.MakeLastDayReportDateError()
	}

	return &GetLastDayReportDateResponse{
		TotalStartDate: response.TotalStartDate.Time,
		EndDate:        response.EndDate.Time,
	}, nil
}

func (drs *DayReportService) CreateDayReport(ctx context.Context, wayID string) (*schemas.CompositeDayReportPopulatedResponse, error) {
	now := time.Now()
	dbDayReport, err := drs.dayReportRepository.CreateDayReport(ctx, db.CreateDayReportParams{
		WayUuid:   pgtype.UUID{Bytes: uuid.MustParse(wayID), Valid: true},
		CreatedAt: pgtype.Timestamp{Time: now, Valid: true},
		UpdatedAt: pgtype.Timestamp{Time: now, Valid: true},
	})
	if err != nil {
		return nil, err
	}

	way, err := drs.dayReportRepository.UpdateWay(ctx, db.UpdateWayParams{
		WayUuid:   pgtype.UUID{Bytes: uuid.MustParse(wayID), Valid: true},
		UpdatedAt: pgtype.Timestamp{Time: now, Valid: true},
	})
	if err != nil {
		return nil, err
	}

	newUUID, _ := uuid.NewRandom()
	return &schemas.CompositeDayReportPopulatedResponse{
		UUID:      newUUID.String(),
		CreatedAt: dbDayReport.CreatedAt.Time.Truncate(24 * time.Hour).Format(util.DEFAULT_STRING_LAYOUT),
		UpdatedAt: dbDayReport.UpdatedAt.Time.Truncate(24 * time.Hour).Format(util.DEFAULT_STRING_LAYOUT),
		CompositionParticipants: []schemas.DayReportsCompositionParticipants{
			{
				DayReportID: util.ConvertPgUUIDToUUID(dbDayReport.Uuid).String(),
				WayID:       util.ConvertPgUUIDToUUID(way.Uuid).String(),
				WayName:     way.Name,
			},
		},
		JobsDone: []schemas.JobDonePopulatedResponse{},
		Plans:    []schemas.PlanPopulatedResponse{},
		Problems: []schemas.ProblemPopulatedResponse{},
		Comments: []schemas.CommentPopulatedResponse{},
	}, nil
}

type DayReportWithCounts struct {
	CreatedAt     time.Time
	PlansCount    int
	JobsDoneCount int
	ProblemsCount int
	CommentsCount int
}

func (drs *DayReportService) GetLast14DayReportsByWayID(ctx context.Context, wayID uuid.UUID) ([]DayReportWithCounts, error) {
	dayReports, err := drs.dayReportRepository.GetLast14DayReportsByWayUuid(ctx, pgtype.UUID{Bytes: wayID, Valid: true})
	if err != nil {
		return nil, err
	}

	if len(dayReports) == 0 {
		return []DayReportWithCounts{}, nil
	}

	dayReportUUIDs := lo.Map(dayReports, func(dr db.DayReport, _ int) pgtype.UUID {
		return dr.Uuid
	})

	jobDones, err := drs.dayReportRepository.GetJobDonesByDayReportUuids(ctx, dayReportUUIDs)
	if err != nil {
		return nil, err
	}

	plans, err := drs.dayReportRepository.GetPlansByDayReportUuids(ctx, dayReportUUIDs)
	if err != nil {
		return nil, err
	}

	problems, err := drs.dayReportRepository.GetProblemsByDayReportUuids(ctx, dayReportUUIDs)
	if err != nil {
		return nil, err
	}

	comments, err := drs.dayReportRepository.GetListCommentsByDayReportUuids(ctx, dayReportUUIDs)
	if err != nil {
		return nil, err
	}

	jobDonesMap := make(map[string]int)
	for _, jd := range jobDones {
		uuidStr := util.ConvertPgUUIDToUUID(jd.DayReportUuid).String()
		jobDonesMap[uuidStr]++
	}

	plansMap := make(map[string]int)
	for _, p := range plans {
		uuidStr := util.ConvertPgUUIDToUUID(p.DayReportUuid).String()
		plansMap[uuidStr]++
	}

	problemsMap := make(map[string]int)
	for _, pr := range problems {
		uuidStr := util.ConvertPgUUIDToUUID(pr.DayReportUuid).String()
		problemsMap[uuidStr]++
	}

	commentsMap := make(map[string]int)
	for _, c := range comments {
		uuidStr := util.ConvertPgUUIDToUUID(c.DayReportUuid).String()
		commentsMap[uuidStr]++
	}

	result := make([]DayReportWithCounts, 0, len(dayReports))
	for _, dr := range dayReports {
		uuidStr := util.ConvertPgUUIDToUUID(dr.Uuid).String()
		result = append(result, DayReportWithCounts{
			CreatedAt:     dr.CreatedAt.Time,
			PlansCount:    plansMap[uuidStr],
			JobsDoneCount: jobDonesMap[uuidStr],
			ProblemsCount: problemsMap[uuidStr],
			CommentsCount: commentsMap[uuidStr],
		})
	}

	return result, nil
}

type DayReportResult struct {
	Uuid      string
	CreatedAt string
}

func (drs *DayReportService) GetOrCreateTodayDayReport(ctx context.Context, wayUuid string) (*DayReportResult, error) {
	now := time.Now()
	wayUUID := uuid.MustParse(wayUuid)
	pgWayUUID := pgtype.UUID{Bytes: wayUUID, Valid: true}

	existingReport, err := drs.dayReportRepository.GetTodayDayReportByWayUuid(ctx, pgWayUUID)
	if err == nil {
		return &DayReportResult{
			Uuid:      util.ConvertPgUUIDToUUID(existingReport.Uuid).String(),
			CreatedAt: existingReport.CreatedAt.Time.Format(util.DEFAULT_STRING_LAYOUT),
		}, nil
	}

	newReport, err := drs.dayReportRepository.CreateDayReport(ctx, db.CreateDayReportParams{
		WayUuid:   pgWayUUID,
		CreatedAt: pgtype.Timestamp{Time: now, Valid: true},
		UpdatedAt: pgtype.Timestamp{Time: now, Valid: true},
	})
	if err != nil {
		return nil, err
	}

	return &DayReportResult{
		Uuid:      util.ConvertPgUUIDToUUID(newReport.Uuid).String(),
		CreatedAt: newReport.CreatedAt.Time.Format(util.DEFAULT_STRING_LAYOUT),
	}, nil
}
