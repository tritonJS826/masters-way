package services

import (
	"context"
	"fmt"
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
		StartRankRange: int32(params.Offset),
		EndRankRange:   int32(params.ReqLimit + params.Offset),
	}

	dayReportsRaw, err := db.GetDayReportsByRankRange(ctx, getDayReportsByRankRangeParams)
	if err != nil {
		return nil, err
	}

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
				Tags:          tags,
				IsDone:        plan.IsDone,
			},
		)
	})

	dbProblems, _ := db.GetProblemsByDayReportUuids(ctx, dayReportPgUUIDs)
	problemsMap := make(map[string][]schemas.ProblemPopulatedResponse)
	lo.ForEach(dbProblems, func(problem dbb.GetProblemsByDayReportUuidsRow, i int) {
		problemOwnerUUIDString := util.ConvertPgUUIDToUUID(problem.OwnerUuid).String()
		problemOwner := allWayRelatedUsersMap[problemOwnerUUIDString]
		tags := lo.Map(problem.TagUuids, func(tagUuid string, i int) schemas.JobTagResponse {
			return jobTagsMap[tagUuid]
		})
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
				Tags:          tags,
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
			},
		)
	})

	dayReports := make([]schemas.DayReportPopulatedResponse, 0, params.ReqLimit)
	rank := dayReportsRaw[0].Rank

	dayReportUUIDString := util.ConvertPgUUIDToUUID(dayReportsRaw[0].Uuid).String()
	currentDayReport := schemas.DayReportPopulatedResponse{
		// Uuid:      util.ConvertPgUUIDToUUID(dayReportsRaw[0].Uuid).String(),
		WayUuid:   util.ConvertPgUUIDToUUID(dayReportsRaw[0].WayUuid).String(),
		CreatedAt: dayReportsRaw[0].CreatedAt.Time.Format(util.DEFAULT_STRING_LAYOUT),
		UpdatedAt: dayReportsRaw[0].UpdatedAt.Time.Format(util.DEFAULT_STRING_LAYOUT),
		JobsDone:  jobDonesMap[dayReportUUIDString],
		Plans:     plansMap[dayReportUUIDString],
		Problems:  problemsMap[dayReportUUIDString],
		Comments:  commentsMap[dayReportUUIDString],
	}

	for i := 1; i < len(dayReportsRaw); i++ {
		dayReportUUIDString := util.ConvertPgUUIDToUUID(dayReportsRaw[i].Uuid).String()
		fmt.Println("dayReportUUIDString: ", dayReportUUIDString)

		if dayReportsRaw[i].Rank == rank {
			currentDayReport.JobsDone = append(currentDayReport.JobsDone, jobDonesMap[dayReportUUIDString]...)
			currentDayReport.Plans = append(currentDayReport.Plans, plansMap[dayReportUUIDString]...)
			currentDayReport.Problems = append(currentDayReport.Problems, problemsMap[dayReportUUIDString]...)
			currentDayReport.Comments = append(currentDayReport.Comments, commentsMap[dayReportUUIDString]...)
		} else {
			dayReports = append(dayReports, currentDayReport)

			rank = dayReportsRaw[i].Rank

			currentDayReport = schemas.DayReportPopulatedResponse{
				// Uuid:      util.ConvertPgUUIDToUUID(dayReportsRaw[i].Uuid).String(),
				WayUuid:   util.ConvertPgUUIDToUUID(dayReportsRaw[i].WayUuid).String(),
				CreatedAt: dayReportsRaw[i].CreatedAt.Time.Format(util.DEFAULT_STRING_LAYOUT),
				UpdatedAt: dayReportsRaw[i].UpdatedAt.Time.Format(util.DEFAULT_STRING_LAYOUT),
				JobsDone:  jobDonesMap[dayReportUUIDString],
				Plans:     plansMap[dayReportUUIDString],
				Problems:  problemsMap[dayReportUUIDString],
				Comments:  commentsMap[dayReportUUIDString],
			}
		}
	}

	dayReports = append(dayReports, currentDayReport)

	response := &schemas.ListDayReportsResponse{
		// DayReports: dayReports,
		Size: int(dayReportsRaw[0].MaxRank),
	}

	return response, nil
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

// for _, dayReportRaw := range dayReportsRaw {

// 		dayReportEntry, exists := dayReportRankMap[int32(dayReportRaw.Rank)]
// 		if exists {
// 			dayReportUUIDString := util.ConvertPgUUIDToUUID(dayReportRaw.Uuid).String()

// 			jobDones := jobDonesMap[dayReportUUIDString]
// 			plans := plansMap[dayReportUUIDString]
// 			problems := problemsMap[dayReportUUIDString]
// 			comments := commentsMap[dayReportUUIDString]

// 			dayReportEntry.JobsDone = append(dayReportEntry.JobsDone, jobDones...)
// 			dayReportEntry.Plans = append(dayReportEntry.Plans, plans...)
// 			dayReportEntry.Problems = append(dayReportEntry.Problems, problems...)
// 			dayReportEntry.Comments = append(dayReportEntry.Comments, comments...)

// 			dayReportRankMap[int32(dayReportRaw.Rank)] = dayReportEntry
// 		} else {
// 			dayReportRankMap[int32(dayReportRaw.Rank)] = schemas.DayReportPopulatedResponse{
// 				Uuid:      string(dayReportRaw.Rank),
// 				WayUuid:   params.ParentWayID.String(),
// 				CreatedAt: dayReportRaw.CreatedAt.Time.Format(util.DEFAULT_STRING_LAYOUT),
// 				UpdatedAt: dayReportRaw.UpdatedAt.Time.Format(util.DEFAULT_STRING_LAYOUT),
// 				IsDayOff:  false,
// 				JobsDone:  []schemas.JobDonePopulatedResponse{},
// 				Plans:     []schemas.PlanPopulatedResponse{},
// 				Problems:  []schemas.ProblemPopulatedResponse{},
// 				Comments:  []schemas.CommentPopulatedResponse{},
// 			}
// 		}
// 	}
