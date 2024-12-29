package controllers

import "mw-training/internal/services"

type Controller struct {
	TrainingTagsController           *TrainingTagsController
	TrainingsController              *TrainingsController
	TrainingMentorsController        *TrainingMentorController
	TrainingStudentController        *TrainingStudentController
	FavoriteTrainingsUsersController *FavoriteTrainingUserController
	PracticeMaterialsController      *PracticeMaterialController
	TheoryMaterialsController        *TheoryMaterialController
	TopicsController                 *TopicsController
	DevController                    *DevController
}

func NewController(services *services.Service) *Controller {
	return &Controller{
		TrainingTagsController:           NewTrainingTagsController(services.TrainingTagsService),
		TrainingsController:              NewTrainingsCoroller(services.TrainingsService),
		TrainingMentorsController:        NewTrainingMentorController(services.TrainingMentorService),
		TrainingStudentController:        NewTrainingStudentController(services.TrainingStudentService),
		FavoriteTrainingsUsersController: NewFavoriteTrainingUserController(services.FavoriteTrainingUserService),
		PracticeMaterialsController:      NewPracticeMaterialController(services.PracticeMaterialService),
		TheoryMaterialsController:        NewTheoryMaterialController(services.TheoryMaterialService),
		TopicsController:                 NewTopicsController(services.TopicsService),
		DevController:                    NewDevController(services.DevService),
	}
}
