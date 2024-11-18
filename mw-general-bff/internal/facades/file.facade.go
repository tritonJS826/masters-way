package facades

import (
	"mw-general-bff/internal/schemas"
	"mw-general-bff/internal/services"
	"net/http"
)

type FileFacade struct {
	storageService *services.StorageService
}

func newFileFacade(storageService *services.StorageService) *FileFacade {
	return &FileFacade{storageService}
}

func (ff *FileFacade) UploadFile(request *http.Request, googleToken string) (*schemas.UploadFileResponse, error) {
	return ff.storageService.UploadFile(request, googleToken)
}
