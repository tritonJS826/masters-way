package facades

import (
	"mw-general-bff/internal/config"
	"mw-general-bff/internal/services"
)

type Facade struct {
	FileFacade                     *FileFacade
	AuthFacade                     *AuthFacade
	CommentFacade                  *CommentFacade
	CompositeWayFacade             *CompositeWayFacade
	DayReportFacade                *DayReportFacade
	FavoriteUserFacade             *FavoriteUserFacade
	FavoriteUserWayFacade          *FavoriteUserWayFacade
	FromUserMentoringRequestFacade *FromUserMentoringRequestFacade
	GeminiFacade                   *GeminiFacade
	JobDoneFacade                  *JobDoneFacade
	JobDoneJobTagFacade            *JobDoneJobTagFacade
	JobTagFacade                   *JobTagFacade
	MentorUserWayFacade            *MentorUserWayFacade
	MetricFacade                   *MetricFacade
	PlanFacade                     *PlanFacade
	PlanJobTagFacade               *PlanJobTagFacade
	ProblemFacade                  *ProblemFacade
	ProjectFacade                  *ProjectFacade
	WayFacade                      *WayFacade
	WayTagFacade                   *WayTagFacade
	ToUserMentoringRequestFacade   *ToUserMentoringRequestFacade
	UserFacade                     *UserFacade
	UserTagFacade                  *UserTagFacade
	UserProjectFacade              *UserProjectFacade
	WayCollectionFacade            *WayCollectionFacade
	WayCollectionWayFacade         *WayCollectionWayFacade
	HealthCheckFacade              *HealthCheckFacade
}

func NewFacade(service *services.Service, config *config.Config) *Facade {
	return &Facade{
		FileFacade:                     newFileFacade(service.StorageService),
		AuthFacade:                     newAuthFacade(service.AuthService, service.NotificationService, config),
		CommentFacade:                  newCommentFacade(service.GeneralService, service.NotificationService, service.MailService, config),
		CompositeWayFacade:             newCompositeWayFacade(service.GeneralService),
		DayReportFacade:                newDayReportFacade(service.GeneralService),
		FavoriteUserFacade:             newFavoriteUserFacade(service.GeneralService),
		FavoriteUserWayFacade:          newFavoriteUserWayFacade(service.GeneralService),
		FromUserMentoringRequestFacade: newFromUserMentoringRequestFacade(service.GeneralService),
		GeminiFacade:                   newGeminiFacade(service.GeneralService),
		JobDoneFacade:                  newJobDoneFacade(service.GeneralService, service.NotificationService, service.MailService, config),
		JobDoneJobTagFacade:            newJobDoneJobTagFacade(service.GeneralService),
		JobTagFacade:                   newJobTagFacade(service.GeneralService),
		MentorUserWayFacade:            newMentorUserWayFacade(service.GeneralService),
		MetricFacade:                   newMetricFacade(service.GeneralService),
		PlanFacade:                     newPlanFacade(service.GeneralService, service.NotificationService, service.MailService, config),
		PlanJobTagFacade:               newPlanJobTagFacade(service.GeneralService),
		ProblemFacade:                  newProblemFacade(service.GeneralService, service.NotificationService, service.MailService, config),
		ProjectFacade:                  newProjectFacade(service.GeneralService),
		WayFacade:                      newWayFacade(service.GeneralService, service.TrainingService),
		WayTagFacade:                   newWayTagFacade(service.GeneralService),
		ToUserMentoringRequestFacade:   newToUserMentoringRequestFacade(service.GeneralService),
		UserFacade:                     newUserFacade(service.GeneralService),
		UserTagFacade:                  newUserTagFacade(service.GeneralService),
		UserProjectFacade:              newUserProjectFacade(service.GeneralService),
		WayCollectionFacade:            newWayCollectionFacade(service.GeneralService),
		WayCollectionWayFacade:         newWayCollectionWayFacade(service.GeneralService),
		HealthCheckFacade:              newHealthCheckFacade(service.GeneralService),
	}
}
