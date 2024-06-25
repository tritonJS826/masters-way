package services

import (
	"context"
	"database/sql"
	dbb "mwserver/db/sqlc"
	"mwserver/schemas"
	"mwserver/util"
	"sync"
	"time"

	"github.com/google/uuid"
	"github.com/samber/lo"
)

type GetPopulatedWayByIdParams struct {
	WayUuid              uuid.UUID
	CurrentChildrenDepth int
}

func GetPopulatedWayById(db *dbb.Queries, ctx context.Context, params GetPopulatedWayByIdParams) (schemas.WayPopulatedResponse, error) {
	way, err := db.GetWayDetailsByID(ctx, params.WayUuid)
	if err != nil {
		return schemas.WayPopulatedResponse{}, err
	}

	var wg sync.WaitGroup
	childrenChan := make(chan []schemas.WayPopulatedResponse, 1)

	if len(way.ChildrenUuids) > 0 && params.CurrentChildrenDepth < int(limitMap[MaxCompositeWayDeps][dbb.PricingPlanTypeStarter]) {
		go func() {
			children := []schemas.WayPopulatedResponse{}
			wg.Add(len(way.ChildrenUuids))
			children = make([]schemas.WayPopulatedResponse, len(way.ChildrenUuids))
			resultCh := make(chan struct {
				index int
				child schemas.WayPopulatedResponse
			}, len(way.ChildrenUuids))

			for i, childUuid := range way.ChildrenUuids {
				go func(i int, childUuid uuid.UUID) {
					defer wg.Done()
					args := GetPopulatedWayByIdParams{
						WayUuid:              childUuid,
						CurrentChildrenDepth: params.CurrentChildrenDepth + 1,
					}
					child, _ := GetPopulatedWayById(db, ctx, args)
					resultCh <- struct {
						index int
						child schemas.WayPopulatedResponse
					}{i, child}
				}(i, childUuid)
			}

			go func() {
				wg.Wait()
				close(resultCh)
			}()

			for result := range resultCh {
				children[result.index] = result.child
			}
			childrenChan <- children
		}()
	} else {
		close(childrenChan)
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

	fromUserMentoringRequestsRaw, _ := db.GetFromUserMentoringRequestWaysByWayId(ctx, params.WayUuid)
	fromUserMentoringRequests := lo.Map(fromUserMentoringRequestsRaw, func(fromUser dbb.User, i int) schemas.UserPlainResponse {
		return schemas.UserPlainResponse{
			Uuid:        fromUser.Uuid.String(),
			Name:        fromUser.Name,
			Email:       fromUser.Email,
			Description: fromUser.Description,
			CreatedAt:   fromUser.CreatedAt.Format(util.DEFAULT_STRING_LAYOUT),
			ImageUrl:    fromUser.ImageUrl,
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
			ImageUrl:    dbFormerMentor.ImageUrl,
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
			ImageUrl:    dbMentor.ImageUrl,
			IsMentor:    dbMentor.IsMentor,
		}
	})

	metricsRaw, _ := db.GetListMetricsByWayUuid(ctx, params.WayUuid)
	metrics := lo.Map(metricsRaw, func(dbMetric dbb.Metric, i int) schemas.MetricResponse {
		return schemas.MetricResponse{
			Uuid:             dbMetric.Uuid.String(),
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

	wayOwner := schemas.UserPlainResponse{
		Uuid:        way.OwnerUuid.String(),
		Name:        way.OwnerName,
		Email:       way.OwnerEmail,
		Description: way.OwnerDescription,
		CreatedAt:   way.OwnerCreatedAt.Format(util.DEFAULT_STRING_LAYOUT),
		ImageUrl:    way.OwnerImageUrl,
		IsMentor:    way.OwnerIsMentor,
	}

	allWayRelatedUsers := make([]schemas.UserPlainResponse, len(mentors)+len(formerMentors)+1)
	allWayRelatedUsers = append(allWayRelatedUsers, mentors...)
	allWayRelatedUsers = append(allWayRelatedUsers, formerMentors...)
	allWayRelatedUsers = append(allWayRelatedUsers, wayOwner)
	allWayRelatedUsersMap := lo.SliceToMap(allWayRelatedUsers, func(relatedUser schemas.UserPlainResponse) (string, schemas.UserPlainResponse) {
		return relatedUser.Uuid, relatedUser
	})

	dayReportsRaw, _ := db.GetListDayReportsByWayUuid(ctx, params.WayUuid)
	dayReports := make([]schemas.DayReportPopulatedResponse, len(dayReportsRaw))
	if len(dayReportsRaw) > 0 {
		dayReportUuids := lo.Map(dayReportsRaw, func(dbDayReport dbb.DayReport, i int) uuid.UUID {
			return dbDayReport.Uuid
		})

		dbJobDones, _ := db.GetJobDonesByDayReportUuids(ctx, dayReportUuids)
		jobDonesCh := make(chan map[string]schemas.JobDonePopulatedResponse)
		for _, dbJobDone := range dbJobDones {
			wg.Add(1)
			go func(dbJobDone dbb.GetJobDonesByDayReportUuidsRow) {
				defer wg.Done()
				jobDoneOwner := allWayRelatedUsersMap[dbJobDone.OwnerUuid.String()]
				tags := make([]schemas.JobTagResponse, len(dbJobDone.TagUuids))
				for i, tagUuid := range dbJobDone.TagUuids {
					tags[i] = jobTagsMap[tagUuid]
				}
				populatedJobDone := schemas.JobDonePopulatedResponse{
					Uuid:          dbJobDone.Uuid.String(),
					CreatedAt:     dbJobDone.CreatedAt.Format(util.DEFAULT_STRING_LAYOUT),
					UpdatedAt:     dbJobDone.UpdatedAt.Format(util.DEFAULT_STRING_LAYOUT),
					Description:   dbJobDone.Description,
					Time:          dbJobDone.Time,
					OwnerUuid:     dbJobDone.OwnerUuid.String(),
					OwnerName:     jobDoneOwner.Name,
					DayReportUuid: dbJobDone.DayReportUuid.String(),
					Tags:          tags,
				}
				jobDonesCh <- map[string]schemas.JobDonePopulatedResponse{dbJobDone.DayReportUuid.String(): populatedJobDone}
			}(dbJobDone)
		}

		go func() {
			wg.Wait()
			close(jobDonesCh)
		}()

		jobDonesMap := make(map[string][]schemas.JobDonePopulatedResponse)
		for result := range jobDonesCh {
			for key, val := range result {
				jobDonesMap[key] = append(jobDonesMap[key], val)
			}
		}

		dbPlans, _ := db.GetPlansByDayReportUuids(ctx, dayReportUuids)
		plansCh := make(chan map[string]schemas.PlanPopulatedResponse)
		for _, plan := range dbPlans {
			wg.Add(1)
			go func(plan dbb.GetPlansByDayReportUuidsRow) {
				defer wg.Done()
				planOwner := allWayRelatedUsersMap[plan.OwnerUuid.String()]
				tags := make([]schemas.JobTagResponse, len(plan.TagUuids))
				for i, tagUuid := range plan.TagUuids {
					tags[i] = jobTagsMap[tagUuid]
				}
				populatedPlan := schemas.PlanPopulatedResponse{
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
				}
				plansCh <- map[string]schemas.PlanPopulatedResponse{plan.DayReportUuid.String(): populatedPlan}
			}(plan)
		}

		go func() {
			wg.Wait()
			close(plansCh)
		}()

		plansMap := make(map[string][]schemas.PlanPopulatedResponse)
		for result := range plansCh {
			for key, val := range result {
				plansMap[key] = append(plansMap[key], val)
			}
		}

		dbProblems, _ := db.GetProblemsByDayReportUuids(ctx, dayReportUuids)
		problemsCh := make(chan map[string]schemas.ProblemPopulatedResponse)
		for _, problem := range dbProblems {
			wg.Add(1)
			go func(problem dbb.GetProblemsByDayReportUuidsRow) {
				defer wg.Done()
				problemOwner := allWayRelatedUsersMap[problem.OwnerUuid.String()]
				tags := make([]schemas.JobTagResponse, len(problem.TagUuids))
				for i, tagUuid := range problem.TagUuids {
					tags[i] = jobTagsMap[tagUuid]
				}
				populatedProblem := schemas.ProblemPopulatedResponse{
					Uuid:          problem.Uuid.String(),
					CreatedAt:     problem.CreatedAt.Format(util.DEFAULT_STRING_LAYOUT),
					UpdatedAt:     problem.UpdatedAt.Format(util.DEFAULT_STRING_LAYOUT),
					Description:   problem.Description,
					OwnerUuid:     problem.OwnerUuid.String(),
					OwnerName:     problemOwner.Name,
					DayReportUuid: problem.DayReportUuid.String(),
					Tags:          tags,
					IsDone:        problem.IsDone,
				}
				problemsCh <- map[string]schemas.ProblemPopulatedResponse{problem.DayReportUuid.String(): populatedProblem}
			}(problem)
		}

		go func() {
			wg.Wait()
			close(problemsCh)
		}()

		problemsMap := make(map[string][]schemas.ProblemPopulatedResponse)
		for result := range problemsCh {
			for key, val := range result {
				problemsMap[key] = append(problemsMap[key], val)
			}
		}

		dbComments, _ := db.GetListCommentsByDayReportUuids(ctx, dayReportUuids)
		commentsCh := make(chan map[string]schemas.CommentPopulatedResponse)
		for _, comment := range dbComments {
			wg.Add(1)
			go func(comment dbb.Comment) {
				defer wg.Done()
				commentOwner := allWayRelatedUsersMap[comment.OwnerUuid.String()]
				populatedComment := schemas.CommentPopulatedResponse{
					Uuid:          comment.Uuid.String(),
					CreatedAt:     comment.CreatedAt.Format(util.DEFAULT_STRING_LAYOUT),
					UpdatedAt:     comment.UpdatedAt.Format(util.DEFAULT_STRING_LAYOUT),
					Description:   comment.Description,
					OwnerUuid:     commentOwner.Uuid,
					OwnerName:     commentOwner.Name,
					DayReportUuid: comment.DayReportUuid.String(),
				}
				commentsCh <- map[string]schemas.CommentPopulatedResponse{comment.DayReportUuid.String(): populatedComment}
			}(comment)
		}

		go func() {
			wg.Wait()
			close(commentsCh)
		}()

		commentsMap := make(map[string][]schemas.CommentPopulatedResponse)
		for result := range commentsCh {
			for key, val := range result {
				commentsMap[key] = append(commentsMap[key], val)
			}
		}

		for i, dayReport := range dayReportsRaw {
			dayReportUUID := dayReport.Uuid.String()
			jobDones, exists := jobDonesMap[dayReportUUID]

			if !exists {
				jobDones = []schemas.JobDonePopulatedResponse{}
			}
			plans, exists := plansMap[dayReportUUID]
			if !exists {
				plans = []schemas.PlanPopulatedResponse{}
			}
			problems, exists := problemsMap[dayReportUUID]
			if !exists {
				problems = []schemas.ProblemPopulatedResponse{}
			}
			comments, exists := commentsMap[dayReportUUID]
			if !exists {
				comments = []schemas.CommentPopulatedResponse{}
			}

			dayReports[i] = schemas.DayReportPopulatedResponse{
				Uuid:      dayReportUUID,
				CreatedAt: dayReport.CreatedAt.Format(util.DEFAULT_STRING_LAYOUT),
				UpdatedAt: dayReport.UpdatedAt.Format(util.DEFAULT_STRING_LAYOUT),
				IsDayOff:  dayReport.IsDayOff,
				JobsDone:  jobDones,
				Plans:     plans,
				Problems:  problems,
				Comments:  comments,
			}
		}
	}

	wg.Wait()
	children := <-childrenChan
	if children == nil {
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
		FavoriteForUsersAmount: int32(way.FavoriteForUsersAmount),
		WayTags:                wayTags,
		JobTags:                jobTags,
		Metrics:                metrics,
		CopiedFromWayUuid:      util.MarshalNullUuid(way.CopiedFromWayUuid),
		Children:               children,
	}

	return response, err
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

func GetPlainWayById(db *dbb.Queries, ctx context.Context, wayUuid uuid.UUID) (schemas.WayPlainResponse, error) {
	way, err := db.GetWayById(ctx, wayUuid)

	copiedFromWayUuid := util.MarshalNullUuid(way.CopiedFromWayUuid)
	mentorsRaw, _ := db.GetMentorUsersByWayId(ctx, way.Uuid)

	mentors := lo.Map(mentorsRaw, func(dbMentor dbb.User, i int) schemas.UserPlainResponse {
		return schemas.UserPlainResponse{
			Uuid:        dbMentor.Uuid.String(),
			Name:        dbMentor.Name,
			Email:       dbMentor.Email,
			Description: dbMentor.Description,
			CreatedAt:   dbMentor.CreatedAt.Format(util.DEFAULT_STRING_LAYOUT),
			ImageUrl:    dbMentor.ImageUrl,
			IsMentor:    dbMentor.IsMentor,
		}
	})

	dbOwner, _ := db.GetUserById(ctx, way.OwnerUuid)
	owner := schemas.UserPlainResponse{
		Uuid:        dbOwner.Uuid.String(),
		Name:        dbOwner.Name,
		Email:       dbOwner.Email,
		Description: dbOwner.Description,
		CreatedAt:   dbOwner.CreatedAt.Format(util.DEFAULT_STRING_LAYOUT),
		ImageUrl:    dbOwner.ImageUrl,
		IsMentor:    dbOwner.IsMentor,
	}
	dbTags, _ := db.GetListWayTagsByWayId(ctx, way.Uuid)
	wayTags := lo.Map(dbTags, func(dbTag dbb.WayTag, i int) schemas.WayTagResponse {
		return schemas.WayTagResponse{
			Uuid: dbTag.Uuid.String(),
			Name: dbTag.Name,
		}
	})
	response := schemas.WayPlainResponse{
		Uuid:              way.Uuid.String(),
		Name:              way.Name,
		GoalDescription:   way.GoalDescription,
		UpdatedAt:         way.UpdatedAt.Format(util.DEFAULT_STRING_LAYOUT),
		CreatedAt:         way.CreatedAt.Format(util.DEFAULT_STRING_LAYOUT),
		EstimationTime:    way.EstimationTime,
		IsCompleted:       way.IsCompleted,
		Owner:             owner,
		CopiedFromWayUuid: copiedFromWayUuid,
		IsPrivate:         way.IsPrivate,
		FavoriteForUsers:  int32(way.WayFavoriteForUsers),
		DayReportsAmount:  int32(way.WayDayReportsAmount),
		Mentors:           mentors,
		MetricsDone:       int32(way.WayMetricsDone),
		MetricsTotal:      int32(way.WayMetricsTotal),
		WayTags:           wayTags,
		ChildrenUuids:     way.ChildrenUuids,
	}

	return response, err
}
