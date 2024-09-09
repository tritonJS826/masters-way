package controllers

type Controller struct {
	FileController     *FileController
	MessagesController *MessageController
	DevController      *DevController
}

func NewController() *Controller {
	return &Controller{
		FileController: NewFileController(),
		// MessagesController: NewMessagesController(services.MessagesService),
		// DevController:      NewDevController(services.DevService),
	}
}
