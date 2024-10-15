package controllers

import "mwmail/internal/services"

type Controller struct {
	MailController *MailController
	DevController  *DevController
}

func NewController(services *services.Service) *Controller {
	return &Controller{
		MailController: NewMailController(services.MailService, services.SmtpService),
		DevController:  NewDevController(services.DevService),
	}
}
