package controllers

import "mw-training/internal/services"

type Controller struct {
	TrainingTrainingTagController  *TrainingTrainingTagController
	TrainingController             *TrainingController
	TrainingMentorController       *TrainingMentorController
	TrainingMessageToAiController  *TrainingMessageToAiController
	TrainingStudentController      *TrainingStudentController
	FavoriteTrainingUserController *FavoriteTrainingUserController
	PracticeMaterialController     *PracticeMaterialController
	TheoryMaterialController       *TheoryMaterialController
	TopicController                *TopicController
	TestController                 *TestController
	TrainingTestController         *TrainingTestsController
	SessionController              *SessionController
	TestSessionResultController    *TestSessionResultController
	QuestionController             *QuestionController
	QuestionResultController       *QuestionResultController
	DevController                  *DevController
}

func NewController(services *services.Service) *Controller {
	return &Controller{
		TrainingTrainingTagController:  NewTrainingTagController(services.TrainingTrainingTagService),
		TrainingController:             NewTrainingController(services.TrainingService),
		TrainingMentorController:       NewTrainingMentorController(services.TrainingMentorService),
		TrainingMessageToAiController:  NewTrainingMessageToAiController(services.TrainingMessageToAiService),
		TrainingStudentController:      NewTrainingStudentController(services.TrainingStudentService),
		FavoriteTrainingUserController: NewFavoriteTrainingUserController(services.FavoriteTrainingUserService),
		PracticeMaterialController:     NewPracticeMaterialController(services.PracticeMaterialService),
		TheoryMaterialController:       NewTheoryMaterialController(services.TheoryMaterialService),
		TopicController:                NewTopicController(services.TopicService),
		TestController:                 NewTestController(services.TestService),
		TrainingTestController:         NewTrainingTestController(services.TrainingTestService),
		SessionController:              NewSessionController(services.SessionService),
		TestSessionResultController:    NewTestSessionResultController(services.TestSessionResultService),
		QuestionController:             NewQuestionController(services.QuestionService),
		QuestionResultController:       NewQuestionResultController(services.QuestionResultService),

		DevController: NewDevController(services.DevService),
	}
}
