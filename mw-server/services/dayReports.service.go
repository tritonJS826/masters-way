package services

import (
	"context"
	dbb "mwserver/db/sqlc"
	"mwserver/schemas"
	"mwserver/util"
	"time"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgtype"
	"github.com/samber/lo"
)

type GetDayReportsByWayIdParams struct {
	ParentWayID    uuid.UUID
	ChildrenWayIDs []uuid.UUID
	ReqLimit       int
	Offset         int
}

func GetDayReportsByWayID(db *dbb.Queries, ctx context.Context, params *GetDayReportsByWayIdParams) (*schemas.ListDayReportsResponse, error) {
	wayPgUUIDs := make([]pgtype.UUID, 0, len(params.ChildrenWayIDs)+1)
	wayPgUUIDs = append(wayPgUUIDs, pgtype.UUID{Bytes: params.ParentWayID, Valid: true})

	for _, wayID := range params.ChildrenWayIDs {
		wayPgUUIDs = append(wayPgUUIDs, pgtype.UUID{Bytes: wayID, Valid: true})
	}

	getDayReportsByRankRangeParams := dbb.GetDayReportsByRankRangeParams{
		WayUuids:       wayPgUUIDs,
		StartRankRange: int32(params.Offset + 1),
		EndRankRange:   int32(params.ReqLimit + params.Offset),
	}

	dayReportsRaw, err := db.GetDayReportsByRankRange(ctx, getDayReportsByRankRangeParams)
	if err != nil {
		return nil, err
	}

	if len(dayReportsRaw) == 0 {
		return &schemas.ListDayReportsResponse{
			DayReports: []schemas.CompositeDayReportPopulatedResponse{},
			Size:       0,
		}, nil
	}

	dayReportMap := lo.SliceToMap(dayReportsRaw, func(dbDayReport dbb.GetDayReportsByRankRangeRow) (string, dbb.GetDayReportsByRankRangeRow) {
		return util.ConvertPgUUIDToUUID(dbDayReport.Uuid).String(), dbDayReport
	})

	dayReportPgUUIDs := lo.Map(dayReportsRaw, func(dbDayReport dbb.GetDayReportsByRankRangeRow, _ int) pgtype.UUID {
		return dbDayReport.Uuid
	})

	wayRelatedUsersRaw, _ := db.GetWayRelatedUsers(ctx, wayPgUUIDs)
	allWayRelatedUsersMap := lo.SliceToMap(wayRelatedUsersRaw, func(relatedUser dbb.User) (string, schemas.UserPlainResponse) {
		userUUID := util.ConvertPgUUIDToUUID(relatedUser.Uuid).String()
		return userUUID, schemas.UserPlainResponse{
			Uuid:        userUUID,
			Name:        relatedUser.Name,
			Email:       relatedUser.Email,
			Description: relatedUser.Description,
			CreatedAt:   relatedUser.CreatedAt.Time.Format(util.DEFAULT_STRING_LAYOUT),
			ImageUrl:    relatedUser.ImageUrl,
			IsMentor:    relatedUser.IsMentor,
		}
	})

	jobTagsRaw, _ := db.GetListJobTagsByWayUuids(ctx, wayPgUUIDs)
	jobTagsMap := lo.SliceToMap(jobTagsRaw, func(jobTag dbb.JobTag) (string, schemas.JobTagResponse) {
		jobTagUUID := util.ConvertPgUUIDToUUID(jobTag.Uuid).String()
		return jobTagUUID, schemas.JobTagResponse{
			Uuid:        jobTagUUID,
			Name:        jobTag.Name,
			Description: jobTag.Description,
			Color:       jobTag.Color,
		}
	})

	dbJobDones, _ := db.GetJobDonesByDayReportUuids(ctx, dayReportPgUUIDs)
	jobDonesMap := make(map[string][]schemas.JobDonePopulatedResponse)
	lo.ForEach(dbJobDones, func(dbJobDone dbb.GetJobDonesByDayReportUuidsRow, i int) {
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

	dbPlans, _ := db.GetPlansByDayReportUuids(ctx, dayReportPgUUIDs)
	plansMap := make(map[string][]schemas.PlanPopulatedResponse)
	lo.ForEach(dbPlans, func(plan dbb.GetPlansByDayReportUuidsRow, i int) {
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

	dbProblems, _ := db.GetProblemsByDayReportUuids(ctx, dayReportPgUUIDs)
	problemsMap := make(map[string][]schemas.ProblemPopulatedResponse)
	lo.ForEach(dbProblems, func(problem dbb.Problem, i int) {
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

	dbComments, _ := db.GetListCommentsByDayReportUuids(ctx, dayReportPgUUIDs)
	commentsMap := make(map[string][]schemas.CommentPopulatedResponse)
	lo.ForEach(dbComments, func(comment dbb.Comment, i int) {
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

func GetLastDayReportDate(db *dbb.Queries, ctx context.Context, wayUuid uuid.UUID) (*GetLastDayReportDateResponse, error) {
	wayPgUUID := pgtype.UUID{Bytes: wayUuid, Valid: true}

	response, err := db.GetLastDayReportDate(ctx, wayPgUUID)
	if err != nil {
		return nil, err
	}

	return &GetLastDayReportDateResponse{
		TotalStartDate: response.TotalStartDate.Time,
		EndDate:        response.EndDate.Time,
	}, nil
}
