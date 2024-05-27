package services

import (
	"context"
	dbb "mwserver/db/sqlc"
	"mwserver/schemas"
	"mwserver/util"

	"github.com/google/uuid"
	"github.com/samber/lo"
)

type GetPopulatedWayByIdParams struct {
	WayUuid              uuid.UUID
	CurrentChildrenDepth int
}

var maxDepth = 3

func GetPopulatedWayById(db *dbb.Queries, ctx context.Context, params GetPopulatedWayByIdParams) (schemas.WayPopulatedResponse, error) {

	way, err := db.GetWayById(ctx, params.WayUuid)
	if err != nil {
		return schemas.WayPopulatedResponse{}, err
	}

	wayOwner := schemas.UserPlainResponse{
		Uuid:        way.OwnerUuid.String(),
		Name:        way.OwnerName,
		Email:       way.OwnerEmail,
		Description: way.OwnerDescription,
		CreatedAt:   way.OwnerCreatedAt.Format(util.DEFAULT_STRING_LAYOUT),
		ImageUrl:    util.MarshalNullString(way.OwnerImageUrl),
		IsMentor:    way.OwnerIsMentor,
	}

	jobTagsRaw, _ := db.GetListJobTagsByWayUuid(ctx, params.WayUuid)
	jobTags := lo.Map(jobTagsRaw, func(dbJobTag dbb.JobTag, i int) schemas.JobTagResponse {
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

	favoriteForUserAmount, _ := db.GetFavoriteForUserUuidsByWayId(ctx, params.WayUuid)
	fromUserMentoringRequestsRaw, _ := db.GetFromUserMentoringRequestWaysByWayId(ctx, params.WayUuid)
	fromUserMentoringRequests := lo.Map(fromUserMentoringRequestsRaw, func(fromUser dbb.User, i int) schemas.UserPlainResponse {
		return schemas.UserPlainResponse{
			Uuid:        fromUser.Uuid.String(),
			Name:        fromUser.Name,
			Email:       fromUser.Email,
			Description: fromUser.Description,
			CreatedAt:   fromUser.CreatedAt.Format(util.DEFAULT_STRING_LAYOUT),
			ImageUrl:    util.MarshalNullString(fromUser.ImageUrl),
			IsMentor:    fromUser.IsMentor,
		}
	})

	formerMentorsRaw, _ := db.GetFormerMentorUsersByWayId(ctx, params.WayUuid)
	formerMentors := lo.Map(formerMentorsRaw, func(dbFormerMentor dbb.User, i int) schemas.UserPlainResponse {
		return schemas.UserPlainResponse{
			Uuid:        dbFormerMentor.Uuid.String(),
			Name:        dbFormerMentor.Name,
			Email:       dbFormerMentor.Email,
			Description: dbFormerMentor.Description,
			CreatedAt:   dbFormerMentor.CreatedAt.Format(util.DEFAULT_STRING_LAYOUT),
			ImageUrl:    util.MarshalNullString(dbFormerMentor.ImageUrl),
			IsMentor:    dbFormerMentor.IsMentor,
		}
	})

	mentorsRaw, _ := db.GetMentorUsersByWayId(ctx, params.WayUuid)
	mentors := lo.Map(mentorsRaw, func(dbMentor dbb.User, i int) schemas.UserPlainResponse {
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

	metricsRaw, _ := db.GetListMetricsByWayUuid(ctx, params.WayUuid)
	metrics := lo.Map(metricsRaw, func(dbMetric dbb.Metric, i int) schemas.MetricResponse {
		return schemas.MetricResponse{
			Uuid:             dbMetric.Uuid.String(),
			CreatedAt:        dbMetric.CreatedAt.Format(util.DEFAULT_STRING_LAYOUT),
			UpdatedAt:        dbMetric.UpdatedAt.Format(util.DEFAULT_STRING_LAYOUT),
			Description:      dbMetric.Description,
			IsDone:           dbMetric.IsDone,
			DoneDate:         util.MarshalNullTime(dbMetric.DoneDate),
			MetricEstimation: dbMetric.MetricEstimation,
		}
	})

	wayTagsRaw, _ := db.GetListWayTagsByWayId(ctx, params.WayUuid)
	wayTags := lo.Map(wayTagsRaw, func(dbWayTag dbb.WayTag, i int) schemas.WayTagResponse {
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

	dayReportsRaw, _ := db.GetListDayReportsByWayUuid(ctx, params.WayUuid)
	dayReportUuids := lo.Map(dayReportsRaw, func(dbDayReport dbb.DayReport, i int) uuid.UUID {
		return dbDayReport.Uuid
	})

	dbJobDones, _ := db.GetJobDonesByDayReportUuids(ctx, dayReportUuids)
	jobDonesMap := make(map[string][]schemas.JobDonePopulatedResponse)
	lo.ForEach(dbJobDones, func(dbJobDone dbb.GetJobDonesByDayReportUuidsRow, i int) {
		jobDoneOwner := allWayRelatedUsersMap[dbJobDone.OwnerUuid.String()]
		tags := lo.Map(dbJobDone.TagUuids, func(tagUuid string, i int) schemas.JobTagResponse {
			return jobTagsMap[tagUuid]
		})
		jobDonesMap[dbJobDone.DayReportUuid.String()] = append(
			jobDonesMap[dbJobDone.DayReportUuid.String()],
			schemas.JobDonePopulatedResponse{
				Uuid:          dbJobDone.Uuid.String(),
				CreatedAt:     dbJobDone.CreatedAt.Format(util.DEFAULT_STRING_LAYOUT),
				UpdatedAt:     dbJobDone.UpdatedAt.Format(util.DEFAULT_STRING_LAYOUT),
				Description:   dbJobDone.Description,
				Time:          dbJobDone.Time,
				OwnerUuid:     dbJobDone.OwnerUuid.String(),
				OwnerName:     jobDoneOwner.Name,
				DayReportUuid: dbJobDone.DayReportUuid.String(),
				Tags:          tags,
			},
		)
	})

	dbPlans, _ := db.GetPlansByDayReportUuids(ctx, dayReportUuids)
	plansMap := make(map[string][]schemas.PlanPopulatedResponse)
	lo.ForEach(dbPlans, func(plan dbb.GetPlansByDayReportUuidsRow, i int) {
		planOwner := allWayRelatedUsersMap[plan.OwnerUuid.String()]
		tags := lo.Map(plan.TagUuids, func(tagUuid string, i int) schemas.JobTagResponse {
			return jobTagsMap[tagUuid]
		})
		plansMap[plan.DayReportUuid.String()] = append(
			plansMap[plan.DayReportUuid.String()],
			schemas.PlanPopulatedResponse{
				Uuid:          plan.Uuid.String(),
				CreatedAt:     plan.CreatedAt.Format(util.DEFAULT_STRING_LAYOUT),
				UpdatedAt:     plan.UpdatedAt.Format(util.DEFAULT_STRING_LAYOUT),
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

	dbProblems, _ := db.GetProblemsByDayReportUuids(ctx, dayReportUuids)

	problemsMap := make(map[string][]schemas.ProblemPopulatedResponse)
	lo.ForEach(dbProblems, func(problem dbb.GetProblemsByDayReportUuidsRow, i int) {
		problemOwner := allWayRelatedUsersMap[problem.OwnerUuid.String()]
		tags := lo.Map(problem.TagUuids, func(tagUuid string, i int) schemas.JobTagResponse {
			return jobTagsMap[tagUuid]
		})
		problemsMap[problem.DayReportUuid.String()] = append(
			problemsMap[problem.DayReportUuid.String()],
			schemas.ProblemPopulatedResponse{
				Uuid:          problem.Uuid.String(),
				CreatedAt:     problem.CreatedAt.Format(util.DEFAULT_STRING_LAYOUT),
				UpdatedAt:     problem.UpdatedAt.Format(util.DEFAULT_STRING_LAYOUT),
				Description:   problem.Description,
				OwnerUuid:     problem.OwnerUuid.String(),
				OwnerName:     problemOwner.Name,
				DayReportUuid: problem.DayReportUuid.String(),
				Tags:          tags,
				IsDone:        problem.IsDone,
			},
		)
	})

	dbComments, _ := db.GetListCommentsByDayReportUuids(ctx, dayReportUuids)
	commentsMap := make(map[string][]schemas.CommentPopulatedResponse)
	lo.ForEach(dbComments, func(comment dbb.Comment, i int) {
		commentOwner := allWayRelatedUsersMap[comment.OwnerUuid.String()]
		commentsMap[comment.DayReportUuid.String()] = append(
			commentsMap[comment.DayReportUuid.String()],
			schemas.CommentPopulatedResponse{
				Uuid:          comment.Uuid.String(),
				CreatedAt:     comment.CreatedAt.Format(util.DEFAULT_STRING_LAYOUT),
				UpdatedAt:     comment.UpdatedAt.Format(util.DEFAULT_STRING_LAYOUT),
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
			CreatedAt: dayReport.CreatedAt.Format(util.DEFAULT_STRING_LAYOUT),
			UpdatedAt: dayReport.UpdatedAt.Format(util.DEFAULT_STRING_LAYOUT),
			IsDayOff:  dayReport.IsDayOff,
			JobsDone:  jobDonesMap[dayReport.Uuid.String()],
			Plans:     plansMap[dayReport.Uuid.String()],
			Problems:  problemsMap[dayReport.Uuid.String()],
			Comments:  commentsMap[dayReport.Uuid.String()],
		}
	}

	var children []schemas.WayPopulatedResponse
	if params.CurrentChildrenDepth < maxDepth {
		children = lo.Map(way.ChildrenUuids, func(childUuid string, i int) schemas.WayPopulatedResponse {
			args := GetPopulatedWayByIdParams{
				WayUuid:              uuid.MustParse(childUuid),
				CurrentChildrenDepth: params.CurrentChildrenDepth + 1,
			}
			child, _ := GetPopulatedWayById(db, ctx, args)

			return child
		})
	} else {
		children = []schemas.WayPopulatedResponse{}
	}

	response := schemas.WayPopulatedResponse{
		Uuid:                   way.Uuid.String(),
		Name:                   way.Name,
		GoalDescription:        way.GoalDescription,
		UpdatedAt:              way.UpdatedAt.Format(util.DEFAULT_STRING_LAYOUT),
		CreatedAt:              way.CreatedAt.Format(util.DEFAULT_STRING_LAYOUT),
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
		CopiedFromWayUuid:      util.MarshalNullUuid(way.CopiedFromWayUuid),
		Children:               children,
	}

	return response, err
}
