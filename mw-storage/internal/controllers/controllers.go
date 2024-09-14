package controllers

import "mwstorage/internal/services"

type Controller struct {
	FileController *FileController
	DevController  *DevController
}

func NewController(services *services.Service) *Controller {
	return &Controller{
		FileController: NewFileController(services.FileService, services.GoogleDriveService),
		DevController:  NewDevController(services.DevService),
	}
}
