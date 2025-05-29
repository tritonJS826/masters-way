package controllers

import "mw-training-bff/internal/services"

type Controller struct {
	TrainingTrainingTagController  *TrainingTrainingTagController
	TrainingStudentController      *TrainingStudentController
	TrainingMentorController       *TrainingMentorController
	TrainingController             *TrainingController
	TopicController                *TopicController
	TheoryMaterialController       *TheoryMaterialController
	PracticeMaterialController     *PracticeMaterialController
	FavoriteUserTrainingController *FavoriteUserTrainingController
	TestController                 *TestController
	TrainingTestsController        *TrainingTestsController
	SessionController              *SessionController
	QuestionController             *QuestionController
	QuestionResultsController      *QuestionResultController
	TestSessionResultsController   *TestSessionResultsController
}

func NewController(services *services.Service) *Controller {
	return &Controller{
		TrainingTrainingTagController:  NewTrainingTrainingTagController(services.GeneralService, services.TrainingTrainingTagService),
		TrainingStudentController:      NewTrainingStudentController(services.GeneralService, services.TrainingStudentService),
		TrainingMentorController:       NewTrainingMentorController(services.GeneralService, services.TrainingMentorService),
		TrainingController:             NewTrainingController(services.GeneralService, services.TrainingService),
		TopicController:                NewTopicController(services.GeneralService, services.TopicService),
		TheoryMaterialController:       NewTheoryMaterialController(services.GeneralService, services.TheoryMaterialService),
		PracticeMaterialController:     NewPracticeMaterialController(services.GeneralService, services.PracticeMaterialService),
		FavoriteUserTrainingController: NewFavoriteUserTrainingController(services.GeneralService, services.FavoriteUserTrainingService),
		TestController:                 NewTestController(services.GeneralService, services.TestService),
		TrainingTestsController:        NewTrainingTestsController(services.GeneralService, services.TrainingTestService),
		SessionController:              NewSessionController(services.GeneralService, services.SessionService),
		QuestionController:             NewQuestionController(services.GeneralService, services.QuestionService),
		QuestionResultsController:      NewQuestionResultController(services.GeneralService, services.QuestionResultsService),
		TestSessionResultsController:   NewTestSessionResultsController(services.GeneralService, services.TestSessionResultsService),
	}
}
