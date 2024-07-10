package services

import (
	"context"
	"database/sql"
	"fmt"
	dbb "mwserver/db/sqlc"
	dbbPGX "mwserver/db_pgx/sqlc"
	"mwserver/schemas"
	"mwserver/util"
	"time"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgtype"
	"github.com/samber/lo"
)

type GetPopulatedWayByIdParams struct {
	WayUuid              uuid.UUID
	CurrentChildrenDepth int
}

func GetPopulatedWayById(dbPGX *dbbPGX.Queries, ctx context.Context, params GetPopulatedWayByIdParams) (schemas.WayPopulatedResponse, error) {
	wayPgUUID := pgtype.UUID{Bytes: params.WayUuid, Valid: true}
	way, err := dbPGX.GetWayById(ctx, wayPgUUID)
	if err != nil {
		return schemas.WayPopulatedResponse{}, err
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

	jobTagsRaw, _ := dbPGX.GetListJobTagsByWayUuid(ctx, wayPgUUID)
	jobTags := lo.Map(jobTagsRaw, func(dbJobTag dbbPGX.JobTag, i int) schemas.JobTagResponse {
		return schemas.JobTagResponse{
			Uuid:        util.ConvertPgUUIDToUUID(dbJobTag.Uuid).String(),
			Name:        dbJobTag.Name,
			Description: dbJobTag.Description,
			Color:       dbJobTag.Color,
		}
	})
	jobTagsMap := lo.SliceToMap(jobTags, func(jobTag schemas.JobTagResponse) (string, schemas.JobTagResponse) {
		return jobTag.Uuid, jobTag
	})

	favoriteForUserAmount, _ := dbPGX.GetFavoriteForUserUuidsByWayId(ctx, wayPgUUID)
	fromUserMentoringRequestsRaw, _ := dbPGX.GetFromUserMentoringRequestWaysByWayId(ctx, wayPgUUID)
	fromUserMentoringRequests := lo.Map(fromUserMentoringRequestsRaw, func(fromUser dbbPGX.User, i int) schemas.UserPlainResponse {
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

	formerMentorsRaw, _ := dbPGX.GetFormerMentorUsersByWayId(ctx, wayPgUUID)
	formerMentors := lo.Map(formerMentorsRaw, func(dbFormerMentor dbbPGX.User, i int) schemas.UserPlainResponse {
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

	mentorsRaw, _ := dbPGX.GetMentorUsersByWayId(ctx, wayPgUUID)
	mentors := lo.Map(mentorsRaw, func(dbMentor dbbPGX.User, i int) schemas.UserPlainResponse {
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

	metricsRaw, _ := dbPGX.GetListMetricsByWayUuid(ctx, wayPgUUID)
	metrics := lo.Map(metricsRaw, func(dbMetric dbbPGX.Metric, i int) schemas.MetricResponse {
		return schemas.MetricResponse{
			Uuid:             util.ConvertPgUUIDToUUID(dbMetric.Uuid).String(),
			Description:      dbMetric.Description,
			IsDone:           dbMetric.IsDone,
			DoneDate:         util.MarshalPgTimestamp(dbMetric.DoneDate),
			MetricEstimation: dbMetric.MetricEstimation,
		}
	})

	wayTagsRaw, _ := dbPGX.GetListWayTagsByWayId(ctx, wayPgUUID)
	wayTags := lo.Map(wayTagsRaw, func(dbWayTag dbbPGX.WayTag, i int) schemas.WayTagResponse {
		return schemas.WayTagResponse{
			Uuid: util.ConvertPgUUIDToUUID(dbWayTag.Uuid).String(),
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

	dayReportsRaw, _ := dbPGX.GetListDayReportsByWayUuid(ctx, wayPgUUID)
	dayReportUuids := lo.Map(dayReportsRaw, func(dbDayReport dbbPGX.DayReport, i int) pgtype.UUID {
		return dbDayReport.Uuid
	})

	dbJobDones, _ := dbPGX.GetJobDonesByDayReportUuids(ctx, dayReportUuids)
	jobDonesMap := make(map[string][]schemas.JobDonePopulatedResponse)
	lo.ForEach(dbJobDones, func(dbJobDone dbbPGX.GetJobDonesByDayReportUuidsRow, i int) {
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

	dbPlans, _ := dbPGX.GetPlansByDayReportUuids(ctx, dayReportUuids)
	plansMap := make(map[string][]schemas.PlanPopulatedResponse)
	lo.ForEach(dbPlans, func(plan dbbPGX.GetPlansByDayReportUuidsRow, i int) {
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

	dbProblems, _ := dbPGX.GetProblemsByDayReportUuids(ctx, dayReportUuids)

	problemsMap := make(map[string][]schemas.ProblemPopulatedResponse)
	lo.ForEach(dbProblems, func(problem dbbPGX.GetProblemsByDayReportUuidsRow, i int) {
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

	dbComments, _ := dbPGX.GetListCommentsByDayReportUuids(ctx, dayReportUuids)
	commentsMap := make(map[string][]schemas.CommentPopulatedResponse)
	lo.ForEach(dbComments, func(comment dbbPGX.Comment, i int) {
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

	dayReports := make([]schemas.DayReportPopulatedResponse, len(dayReportsRaw))
	for i, dayReport := range dayReportsRaw {

		dayReportUUIDString := util.ConvertPgUUIDToUUID(dayReport.Uuid).String()

		if jobDonesMap[dayReportUUIDString] == nil {
			jobDonesMap[dayReportUUIDString] = []schemas.JobDonePopulatedResponse{}
		}
		if plansMap[dayReportUUIDString] == nil {
			plansMap[dayReportUUIDString] = []schemas.PlanPopulatedResponse{}
		}
		if problemsMap[dayReportUUIDString] == nil {
			problemsMap[dayReportUUIDString] = []schemas.ProblemPopulatedResponse{}
		}
		if commentsMap[dayReportUUIDString] == nil {
			commentsMap[dayReportUUIDString] = []schemas.CommentPopulatedResponse{}
		}

		dayReports[i] = schemas.DayReportPopulatedResponse{
			Uuid:      dayReportUUIDString,
			CreatedAt: dayReport.CreatedAt.Time.Format(util.DEFAULT_STRING_LAYOUT),
			UpdatedAt: dayReport.UpdatedAt.Time.Format(util.DEFAULT_STRING_LAYOUT),
			IsDayOff:  dayReport.IsDayOff,
			JobsDone:  jobDonesMap[dayReportUUIDString],
			Plans:     plansMap[dayReportUUIDString],
			Problems:  problemsMap[dayReportUUIDString],
			Comments:  commentsMap[dayReportUUIDString],
		}
	}

	var children []schemas.WayPopulatedResponse
	if params.CurrentChildrenDepth < int(limitMap[MaxCompositeWayDeps][dbb.PricingPlanTypeStarter]) {
		children = lo.Map(way.ChildrenUuids, func(childUuid string, i int) schemas.WayPopulatedResponse {
			args := GetPopulatedWayByIdParams{
				WayUuid:              uuid.MustParse(childUuid),
				CurrentChildrenDepth: params.CurrentChildrenDepth + 1,
			}
			child, _ := GetPopulatedWayById(dbPGX, ctx, args)

			return child
		})
	} else {
		children = []schemas.WayPopulatedResponse{}
	}

	response := schemas.WayPopulatedResponse{
		Uuid:                   util.ConvertPgUUIDToUUID(way.Uuid).String(),
		Name:                   way.Name,
		GoalDescription:        way.GoalDescription,
		UpdatedAt:              way.UpdatedAt.Time.Format(util.DEFAULT_STRING_LAYOUT),
		CreatedAt:              way.CreatedAt.Time.Format(util.DEFAULT_STRING_LAYOUT),
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
		CopiedFromWayUuid:      util.MarshalPgUUID(way.CopiedFromWayUuid),
		Children:               children,
	}

	return response, nil
}

func UpdateWayIsCompletedStatus(db *dbb.Queries, ctx context.Context, wayUuid uuid.UUID) error {
	isCompleted, err := db.IsAllMetricsDone(ctx, wayUuid)

	now := time.Now()
	args := &dbb.UpdateWayParams{
		Uuid:        wayUuid,
		IsCompleted: sql.NullBool{Bool: isCompleted, Valid: true},
		UpdatedAt:   sql.NullTime{Time: now, Valid: true},
	}

	db.UpdateWay(ctx, *args)

	return err
}

func GetPlainWayById(dbPGX *dbbPGX.Queries, ctx context.Context, wayUuid uuid.UUID) (schemas.WayPlainResponse, error) {
	wayPgUUID := pgtype.UUID{Bytes: wayUuid, Valid: true}
	wayDetails, err := dbPGX.GetWayDetailsById(ctx, wayPgUUID)
	if err != nil {
		return schemas.WayPlainResponse{}, err
	}

	copiedFromWayUuid := util.MarshalPgUUID(wayDetails.CopiedFromWayUuid)

	mentorsRaw, ok := wayDetails.Mentors.([]interface{})
	if !ok {
		return schemas.WayPlainResponse{}, fmt.Errorf("failed to assert type for mentors")
	}

	mentors := lo.Map(mentorsRaw, func(mentor interface{}, i int) schemas.UserPlainResponse {
		mentorMap := mentor.(map[string]interface{})
		createdAt, err := time.Parse("2006-01-02T15:04:05", mentorMap["created_at"].(string))
		if err != nil {
			fmt.Println("Error parsing created_at:", err)
		}

		return schemas.UserPlainResponse{
			Uuid:        mentorMap["uuid"].(string),
			Name:        mentorMap["name"].(string),
			Email:       mentorMap["email"].(string),
			Description: mentorMap["description"].(string),
			CreatedAt:   createdAt.Format(util.DEFAULT_STRING_LAYOUT),
			ImageUrl:    mentorMap["image_url"].(string),
			IsMentor:    mentorMap["is_mentor"].(bool),
		}
	})

	owner := schemas.UserPlainResponse{
		Uuid:        util.ConvertPgUUIDToUUID(wayDetails.OwnerUuid).String(),
		Name:        wayDetails.OwnerName,
		Email:       wayDetails.OwnerEmail,
		Description: wayDetails.OwnerDescription,
		CreatedAt:   wayDetails.OwnerCreatedAt.Time.Format(util.DEFAULT_STRING_LAYOUT),
		ImageUrl:    wayDetails.OwnerImageUrl,
		IsMentor:    wayDetails.OwnerIsMentor,
	}

	wayTagsRaw, ok := wayDetails.WayTags.([]interface{})
	if !ok {
		return schemas.WayPlainResponse{}, fmt.Errorf("failed to assert type for wayTags")
	}

	wayTags := lo.Map(wayTagsRaw, func(tag interface{}, i int) schemas.WayTagResponse {
		tagMap := tag.(map[string]interface{})
		return schemas.WayTagResponse{
			Uuid: tagMap["uuid"].(string),
			Name: tagMap["name"].(string),
		}
	})

	response := schemas.WayPlainResponse{
		Uuid:              util.ConvertPgUUIDToUUID(wayDetails.Uuid).String(),
		Name:              wayDetails.Name,
		GoalDescription:   wayDetails.GoalDescription,
		UpdatedAt:         wayDetails.UpdatedAt.Time.Format(util.DEFAULT_STRING_LAYOUT),
		CreatedAt:         wayDetails.CreatedAt.Time.Format(util.DEFAULT_STRING_LAYOUT),
		EstimationTime:    wayDetails.EstimationTime,
		IsCompleted:       wayDetails.IsCompleted,
		Owner:             owner,
		CopiedFromWayUuid: copiedFromWayUuid,
		IsPrivate:         wayDetails.IsPrivate,
		FavoriteForUsers:  int32(wayDetails.WayFavoriteForUsers),
		DayReportsAmount:  int32(wayDetails.WayDayReportsAmount),
		Mentors:           mentors,
		MetricsDone:       int32(wayDetails.WayMetricsDone),
		MetricsTotal:      int32(wayDetails.WayMetricsTotal),
		WayTags:           wayTags,
		ChildrenUuids:     wayDetails.ChildrenAmount,
	}

	return response, nil
}
