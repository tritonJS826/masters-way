package services

import (
	"context"
	"database/sql"
	"fmt"
	"log"
	dbb "mwserver/db/sqlc"
	"mwserver/schemas"
	"mwserver/util"
	"sync"
	"time"

	"github.com/bytedance/sonic"
	"github.com/google/uuid"
	"github.com/samber/lo"
)

type GetPopulatedWayByIdParams struct {
	WayUuid              uuid.UUID
	CurrentChildrenDepth int
}

func GetPopulatedWayById(db *dbb.Queries, ctx context.Context, params GetPopulatedWayByIdParams) (schemas.WayPopulatedResponse, error) {
	way, err := db.GetBasePopulatedWayByID(ctx, params.WayUuid)
	if err != nil {
		return schemas.WayPopulatedResponse{}, err
	}
	var wgChildren sync.WaitGroup
	var children []schemas.WayPopulatedResponse
	if len(way.ChildrenUuids) > 0 && params.CurrentChildrenDepth < int(limitMap[MaxCompositeWayDeps][dbb.PricingPlanTypeStarter]) {
		wgChildren.Add(1)
		go func() {
			defer wgChildren.Done()
			children = lo.Map(way.ChildrenUuids, func(childUuid uuid.UUID, i int) schemas.WayPopulatedResponse {
				args := GetPopulatedWayByIdParams{
					WayUuid:              childUuid,
					CurrentChildrenDepth: params.CurrentChildrenDepth + 1,
				}
				child, _ := GetPopulatedWayById(db, ctx, args)

				return child
			})
		}()
	} else {
		children = []schemas.WayPopulatedResponse{}
	}

	wayOwner := schemas.UserPlainResponse{
		Uuid:        way.OwnerUuid.String(),
		Name:        way.OwnerName,
		Email:       way.OwnerEmail,
		Description: way.OwnerDescription,
		CreatedAt:   way.OwnerCreatedAt.Format(util.DEFAULT_STRING_LAYOUT),
		ImageUrl:    way.OwnerImageUrl,
		IsMentor:    way.OwnerIsMentor,
	}

	var wg sync.WaitGroup

	var jobTagsMap map[string]schemas.JobTagResponse
	var jobTags []schemas.JobTagResponse
	var fromUserMentoringRequests []schemas.UserPlainResponse
	var formerMentors []schemas.UserPlainResponse
	var mentors []schemas.UserPlainResponse
	var metrics []schemas.MetricResponse
	var dayReportsUUID []uuid.UUID
	var wayTags []schemas.WayTagResponse

	var dayReportsTest []schemas.DayReportPopulatedDTO

	wg.Add(7)

	go func() {
		defer wg.Done()
		var metricTest []schemas.MetricPopulatedDTO
		if way.Metrics != nil {
			metricsBytes := way.Metrics.([]byte)
			err := sonic.Unmarshal(metricsBytes, &metricTest)
			if err != nil {
				log.Fatalln(err)
			}
		}
		metrics = lo.Map(metricTest, func(dbMetric schemas.MetricPopulatedDTO, i int) schemas.MetricResponse {
			var doneDate *string
			if dbMetric.DoneDate != nil {
				doneDateString := util.FormatDateString(*dbMetric.DoneDate)
				doneDate = &doneDateString
			}
			return schemas.MetricResponse{
				Uuid:             dbMetric.UUID.String(),
				Description:      dbMetric.Description,
				IsDone:           dbMetric.IsDone,
				DoneDate:         doneDate,
				MetricEstimation: dbMetric.MetricEstimation,
			}
		})
	}()

	go func() {
		defer wg.Done()
		var fromUserMentoringRequestsTest []schemas.UserPopulatedDTO
		if way.FromUserMentoringRequests != nil {
			fromUserMentoringRequestsBytes := way.FromUserMentoringRequests.([]byte)
			err := sonic.Unmarshal(fromUserMentoringRequestsBytes, &fromUserMentoringRequestsTest)
			if err != nil {
				log.Fatalln(err)
			}
		}
		fromUserMentoringRequests = lo.Map(fromUserMentoringRequestsTest, func(fromUser schemas.UserPopulatedDTO, i int) schemas.UserPlainResponse {
			return schemas.UserPlainResponse{
				Uuid:        fromUser.UUID.String(),
				Name:        fromUser.Name,
				Email:       fromUser.Email,
				Description: fromUser.Description,
				CreatedAt:   util.FormatDateString(fromUser.CreatedAt),
				ImageUrl:    fromUser.ImageURL,
				IsMentor:    fromUser.IsMentor,
			}
		})
	}()

	go func() {
		defer wg.Done()
		var formerMentorsTest []schemas.UserPopulatedDTO
		if way.FormerMentors != nil {
			formerMentorsBytes := way.FormerMentors.([]byte)
			err := sonic.Unmarshal(formerMentorsBytes, &formerMentorsTest)
			if err != nil {
				log.Fatalln(err)
			}
		}
		formerMentors = lo.Map(formerMentorsTest, func(dbFormerMentor schemas.UserPopulatedDTO, i int) schemas.UserPlainResponse {
			return schemas.UserPlainResponse{
				Uuid:        dbFormerMentor.UUID.String(),
				Name:        dbFormerMentor.Name,
				Email:       dbFormerMentor.Email,
				Description: dbFormerMentor.Description,
				CreatedAt:   util.FormatDateString(dbFormerMentor.CreatedAt),
				ImageUrl:    dbFormerMentor.ImageURL,
				IsMentor:    dbFormerMentor.IsMentor,
			}
		})
	}()

	go func() {
		defer wg.Done()
		var mentorsTest []schemas.UserPopulatedDTO
		if way.Mentors != nil {
			mentorsBytes := way.Mentors.([]byte)
			err := sonic.Unmarshal(mentorsBytes, &mentorsTest)
			if err != nil {
				log.Fatalln(err)
			}
		}
		mentors = lo.Map(mentorsTest, func(dbMentor schemas.UserPopulatedDTO, i int) schemas.UserPlainResponse {
			return schemas.UserPlainResponse{
				Uuid:        dbMentor.UUID.String(),
				Name:        dbMentor.Name,
				Email:       dbMentor.Email,
				Description: dbMentor.Description,
				CreatedAt:   util.FormatDateString(dbMentor.CreatedAt),
				ImageUrl:    dbMentor.ImageURL,
				IsMentor:    dbMentor.IsMentor,
			}
		})
	}()

	go func() {
		defer wg.Done()
		if way.DayReports != nil {
			dayReportsBytes := way.DayReports.([]byte)
			err := sonic.Unmarshal(dayReportsBytes, &dayReportsTest)
			if err != nil {
				log.Fatalln(err)
			}
		}
		dayReportsUUID = lo.Map(dayReportsTest, func(dbDayReport schemas.DayReportPopulatedDTO, i int) uuid.UUID {
			return dbDayReport.Uuid
		})
	}()

	go func() {
		defer wg.Done()
		var wayTagsTest []dbb.WayTag
		if way.WayTags != nil {
			wayTagsBytes := way.WayTags.([]byte)
			err := sonic.Unmarshal(wayTagsBytes, &wayTagsTest)
			if err != nil {
				log.Fatalln(err)
			}
		}
		wayTags = lo.Map(wayTagsTest, func(dbWayTag dbb.WayTag, i int) schemas.WayTagResponse {
			return schemas.WayTagResponse{
				Uuid: dbWayTag.Uuid.String(),
				Name: dbWayTag.Name,
			}
		})
	}()

	go func() {
		defer wg.Done()
		var jobTagsTest []dbb.JobTag
		if way.JobTags != nil {
			jobTagsBytes := way.JobTags.([]byte)
			err := sonic.Unmarshal(jobTagsBytes, &jobTagsTest)
			if err != nil {
				log.Fatalln(err)
			}
		}
		jobTags = lo.Map(jobTagsTest, func(dbJobTag dbb.JobTag, i int) schemas.JobTagResponse {
			return schemas.JobTagResponse{
				Uuid:        dbJobTag.Uuid.String(),
				Name:        dbJobTag.Name,
				Description: dbJobTag.Description,
				Color:       dbJobTag.Color,
			}
		})
		jobTagsMap = lo.SliceToMap(jobTags, func(jobTag schemas.JobTagResponse) (string, schemas.JobTagResponse) {
			return jobTag.Uuid, jobTag
		})
	}()

	wg.Wait()

	allWayRelatedUsers := append(append(append([]schemas.UserPlainResponse{}, mentors...), formerMentors...), wayOwner)
	allWayRelatedUsersMap := lo.SliceToMap(allWayRelatedUsers, func(relatedUser schemas.UserPlainResponse) (string, schemas.UserPlainResponse) {
		return relatedUser.Uuid, relatedUser
	})

	dbDayReportsTest, err := db.GetNestedEntitiesForDayReports(ctx, dayReportsUUID)
	if err != nil {
		return schemas.WayPopulatedResponse{}, err
	}

	jobDonesMap := make(map[string][]schemas.JobDonePopulatedResponse)
	plansMap := make(map[string][]schemas.PlanPopulatedResponse)
	problemsMap := make(map[string][]schemas.ProblemPopulatedResponse)
	commentsMap := make(map[string][]schemas.CommentPopulatedResponse)

	wg.Add(4)

	go func() {
		defer wg.Done()
		var jobDonesTest []schemas.JobDonePopulatedDTO
		if dbDayReportsTest.JobDonesArray != nil {
			jobDonesBytes := dbDayReportsTest.JobDonesArray.([]byte)
			err := sonic.Unmarshal(jobDonesBytes, &jobDonesTest)
			if err != nil {
				log.Fatalln(err)
			}
		}

		jobDoneChan := make(chan schemas.JobDonePopulatedResponse, len(jobDonesTest))

		var processWg sync.WaitGroup
		processWg.Add(len(jobDonesTest))
		for _, dbJobDone := range jobDonesTest {
			go func(dbJobDone schemas.JobDonePopulatedDTO) {
				defer processWg.Done()
				jobDoneOwner, ok := allWayRelatedUsersMap[dbJobDone.OwnerUuid.String()]
				if !ok {
					fmt.Println("Owner not found for UUID:", dbJobDone.OwnerUuid.String())
					return
				}
				tags := lo.Map(dbJobDone.TagUuids, func(tagUuid string, i int) schemas.JobTagResponse {
					return jobTagsMap[tagUuid]
				})

				jobDoneChan <- schemas.JobDonePopulatedResponse{
					Uuid:          dbJobDone.Uuid.String(),
					CreatedAt:     util.FormatDateString(dbJobDone.CreatedAt),
					UpdatedAt:     util.FormatDateString(dbJobDone.UpdatedAt),
					Description:   dbJobDone.Description,
					Time:          dbJobDone.Time,
					OwnerUuid:     dbJobDone.OwnerUuid.String(),
					OwnerName:     jobDoneOwner.Name,
					DayReportUuid: dbJobDone.DayReportUuid.String(),
					Tags:          tags,
				}
			}(dbJobDone)
		}

		go func() {
			processWg.Wait()
			close(jobDoneChan)
		}()

		for jobDone := range jobDoneChan {
			jobDonesMap[jobDone.DayReportUuid] = append(jobDonesMap[jobDone.DayReportUuid], jobDone)
		}
	}()

	go func() {
		defer wg.Done()
		var plansTest []schemas.PlanPopulatedDTO
		if dbDayReportsTest.PlansArray != nil {
			plansBytes := dbDayReportsTest.PlansArray.([]byte)
			err := sonic.Unmarshal(plansBytes, &plansTest)
			if err != nil {
				log.Fatalln(err)
			}
		}
		lo.ForEach(plansTest, func(plan schemas.PlanPopulatedDTO, i int) {
			planOwner := allWayRelatedUsersMap[plan.OwnerUuid.String()]
			tags := lo.Map(plan.TagUuids, func(tagUuid string, i int) schemas.JobTagResponse {
				return jobTagsMap[tagUuid]
			})
			plansMap[plan.DayReportUuid.String()] = append(
				plansMap[plan.DayReportUuid.String()],
				schemas.PlanPopulatedResponse{
					Uuid:          plan.Uuid.String(),
					CreatedAt:     util.FormatDateString(plan.CreatedAt),
					UpdatedAt:     util.FormatDateString(plan.UpdatedAt),
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
	}()

	go func() {
		defer wg.Done()
		var problemsTest []schemas.ProblemPopulatedDTO
		if dbDayReportsTest.ProblemsArray != nil {
			problemsBytes := dbDayReportsTest.ProblemsArray.([]byte)
			err := sonic.Unmarshal(problemsBytes, &problemsTest)
			if err != nil {
				log.Fatalln(err)
			}
		}
		lo.ForEach(problemsTest, func(problem schemas.ProblemPopulatedDTO, i int) {
			problemOwner := allWayRelatedUsersMap[problem.OwnerUuid.String()]
			tags := lo.Map(problem.TagUuids, func(tagUuid string, i int) schemas.JobTagResponse {
				return jobTagsMap[tagUuid]
			})
			problemsMap[problem.DayReportUuid.String()] = append(
				problemsMap[problem.DayReportUuid.String()],
				schemas.ProblemPopulatedResponse{
					Uuid:          problem.Uuid.String(),
					CreatedAt:     util.FormatDateString(problem.CreatedAt),
					UpdatedAt:     util.FormatDateString(problem.UpdatedAt),
					Description:   problem.Description,
					OwnerUuid:     problem.OwnerUuid.String(),
					OwnerName:     problemOwner.Name,
					DayReportUuid: problem.DayReportUuid.String(),
					Tags:          tags,
					IsDone:        problem.IsDone,
				},
			)
		})
	}()

	go func() {
		defer wg.Done()
		var commentsTest []schemas.CommentPopulatedDTO
		if dbDayReportsTest.CommentsArray != nil {
			commentsBytes := dbDayReportsTest.CommentsArray.([]byte)
			err := sonic.Unmarshal(commentsBytes, &commentsTest)
			if err != nil {
				log.Fatalln(err)
			}
		}
		lo.ForEach(commentsTest, func(comment schemas.CommentPopulatedDTO, i int) {
			commentOwner := allWayRelatedUsersMap[comment.OwnerUuid.String()]
			commentsMap[comment.DayReportUuid.String()] = append(
				commentsMap[comment.DayReportUuid.String()],
				schemas.CommentPopulatedResponse{
					Uuid:          comment.Uuid.String(),
					CreatedAt:     util.FormatDateString(comment.CreatedAt),
					UpdatedAt:     util.FormatDateString(comment.UpdatedAt),
					Description:   comment.Description,
					OwnerUuid:     commentOwner.Uuid,
					OwnerName:     commentOwner.Name,
					DayReportUuid: comment.DayReportUuid.String(),
				},
			)
		})
	}()

	wg.Wait()

	dayReports := make([]schemas.DayReportPopulatedResponse, len(dayReportsTest))
	for i, dayReport := range dayReportsTest {

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
			CreatedAt: util.FormatDateString(dayReport.CreatedAt),
			UpdatedAt: util.FormatDateString(dayReport.UpdatedAt),
			IsDayOff:  dayReport.IsDayOff,
			JobsDone:  jobDonesMap[dayReport.Uuid.String()],
			Plans:     plansMap[dayReport.Uuid.String()],
			Problems:  problemsMap[dayReport.Uuid.String()],
			Comments:  commentsMap[dayReport.Uuid.String()],
		}
	}

	wgChildren.Wait()

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
