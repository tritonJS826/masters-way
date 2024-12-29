package controllers

import "mw-training/internal/services"

type Controller struct {
	TrainingTagsController           *TrainingTagsController
	TrainingsController              *TrainingsController
	TrainingMentorsController        *TrainingMentorsController
	TrainingStudentController        *TrainingStudentController
	FavoriteTrainingsUsersController *FavoriteTrainingUserController
	PracticeMaterialsController      *PracticeMaterialController
	TheoryMaterialsController        *TheoryMAterialsController
	TopicsController                 *TopicsController
	DevController                    *DevController
}

func NewController(services *services.Service) *Controller {
	return &Controller{
		TrainingTagsController:           NewTrainingTagsController(services.TrainingTagsService),
		TrainingsController:              NewTrainingsCoroller(services.TrainingsService),
		TrainingMentorsController:        NewTrainingMentorsController(services.TrainingMentorsService),
		TrainingStudentController:        NewTrainingStudentController(services.TrainingStudentsService),
		FavoriteTrainingsUsersController: NewFavoriteTrainingUserController(services.FavoriteUsersTrainingsService),
		PracticeMaterialsController:      NewPracticeMaterialController(services.PracticeMaterialService),
		TheoryMaterialsController:        NewTheoryMaterialsController(services.TheoryMaterialsService),
		TopicsController:                 NewTopicsController(services.TopicsService),
		DevController:                    NewDevController(services.DevService),
	}
}
