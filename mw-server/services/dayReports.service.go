package services

import (
	"context"
	dbb "mwserver/db/sqlc"
	"mwserver/schemas"
	"mwserver/util"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgtype"
	"github.com/samber/lo"
)

type GetDayReportsByWayIdParams struct {
	WayUuid  uuid.UUID
	ReqLimit int
	Offset   int
}

func GetDayReportsByWayId(db *dbb.Queries, ctx context.Context, params *GetDayReportsByWayIdParams) (schemas.ListDayReportsResponse, error) {
	wayPgUUID := pgtype.UUID{Bytes: params.WayUuid, Valid: true}
	dayReportsSize, err := db.GetDayReportsCountByWayId(ctx, wayPgUUID)

	way, err := db.GetWayById(ctx, wayPgUUID)
	if err != nil {
		return schemas.ListDayReportsResponse{
			DayReports: make([]schemas.DayReportPopulatedResponse, 0),
		}, err
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

	mentorsRaw, _ := db.GetMentorUsersByWayId(ctx, wayPgUUID)
	mentors := lo.Map(mentorsRaw, func(dbMentor dbb.User, i int) schemas.UserPlainResponse {
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

	formerMentorsRaw, _ := db.GetFormerMentorUsersByWayId(ctx, wayPgUUID)
	formerMentors := lo.Map(formerMentorsRaw, func(dbFormerMentor dbb.User, i int) schemas.UserPlainResponse {
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

	allWayRelatedUsers := make([]schemas.UserPlainResponse, len(mentors)+len(formerMentors)+1)
	allWayRelatedUsers = append(allWayRelatedUsers, mentors...)
	allWayRelatedUsers = append(allWayRelatedUsers, formerMentors...)
	allWayRelatedUsers = append(allWayRelatedUsers, wayOwner)

	jobTagsRaw, _ := db.GetListJobTagsByWayUuid(ctx, wayPgUUID)
	jobTags := lo.Map(jobTagsRaw, func(dbJobTag dbb.JobTag, i int) schemas.JobTagResponse {
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

	allWayRelatedUsersMap := lo.SliceToMap(allWayRelatedUsers, func(relatedUser schemas.UserPlainResponse) (string, schemas.UserPlainResponse) {
		return relatedUser.Uuid, relatedUser
	})

	args := dbb.GetListDayReportsByWayUuidParams{
		WayUuid:       wayPgUUID,
		RequestOffset: int32(params.Offset),
		RequestLimit:  int32(params.ReqLimit),
	}

	dayReportsRaw, _ := db.GetListDayReportsByWayUuid(ctx, args)
	dayReportUuids := lo.Map(dayReportsRaw, func(dbDayReport dbb.DayReport, i int) pgtype.UUID {
		return dbDayReport.Uuid
	})

	dbJobDones, _ := db.GetJobDonesByDayReportUuids(ctx, dayReportUuids)
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

	dbPlans, _ := db.GetPlansByDayReportUuids(ctx, dayReportUuids)
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

	dbProblems, _ := db.GetProblemsByDayReportUuids(ctx, dayReportUuids)

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

	dbComments, _ := db.GetListCommentsByDayReportUuids(ctx, dayReportUuids)
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

	response := schemas.ListDayReportsResponse{
		DayReports: dayReports,
		Size:       int(dayReportsSize),
	}

	return response, nil
}
