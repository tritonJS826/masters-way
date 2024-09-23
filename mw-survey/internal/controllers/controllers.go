package controllers

import "mwsurvey/internal/services"

type Controller struct {
	SurveyController *SurveyController
	DevController    *DevController
}

func NewController(services *services.Service) *Controller {
	return &Controller{
		SurveyController: NewSurveyController(services.SurveyService),
		DevController:    NewDevController(services.DevService),
	}
}
