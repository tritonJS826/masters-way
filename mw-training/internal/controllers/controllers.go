package controllers

import "mw-training/internal/services"

type Controller struct {
	TrainingTrainingTagController  *TrainingTrainingTagController
	TrainingController             *TrainingController
	TrainingMentorController       *TrainingMentorController
	TrainingStudentController      *TrainingStudentController
	FavoriteTrainingUserController *FavoriteTrainingUserController
	PracticeMaterialController     *PracticeMaterialController
	TheoryMaterialController       *TheoryMaterialController
	TopicController                *TopicController
	DevController                  *DevController
}

func NewController(services *services.Service) *Controller {
	return &Controller{
		TrainingTrainingTagController:  NewTrainingTagController(services.TrainingTrainingTagService),
		TrainingController:             NewTrainingController(services.TrainingService),
		TrainingMentorController:       NewTrainingMentorController(services.TrainingMentorService),
		TrainingStudentController:      NewTrainingStudentController(services.TrainingStudentService),
		FavoriteTrainingUserController: NewFavoriteTrainingUserController(services.FavoriteTrainingUserService),
		PracticeMaterialController:     NewPracticeMaterialController(services.PracticeMaterialService),
		TheoryMaterialController:       NewTheoryMaterialController(services.TheoryMaterialService),
		TopicController:                NewTopicController(services.TopicService),
		DevController:                  NewDevController(services.DevService),
	}
}
