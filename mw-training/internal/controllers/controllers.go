package controllers

import "mw-training/internal/services"

type Controller struct {
	TrainingTagsController           *TrainingTagsController
	TrainingsController              *TrainingsController
	TrainingMentorsController        *TrainingMentorsController
	TrainingStudentController        *TrainingStudentController
	FavoriteUsersTrainingsController *FavoriteUsersTrainingsController
	PracticeMaterialsController      *PracticeMaterialsController
	TheoryMaterialsController        *TheoryMAterialsController
	TopicsController                 *TopicsController
	DevController                    *DevController
}

func NewController(services *services.Service) *Controller {
	return &Controller{
		TrainingTagsController:           NewTrainingTagsController(services.TrainingTagsService),
		TrainingsController:              NewTrainingsCoroller(services.TrainingsService),
		TrainingMentorsController:        NewTrainingMentorsController(services.TrainingMentorsService),
		TrainingStudentController:        TrainingStudentController(services.TrainingStudentsService),
		FavoriteUsersTrainingsController: FavoriteUsersTrainingsController(services.FavoriteUsersTrainingsService),
		PracticeMaterialsController:      PracticeMaterialsController(services.PracticeMaterialsService),
		TheoryMaterialsController:        TheoryMaterialsController(services.TheoryMaterialsService),
		TopicsController:                 TopicsController(services.TopicsService),
		DevController:                    NewDevController(services.DevService),
	}
}
