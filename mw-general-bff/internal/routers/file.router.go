package routers

import (
	"mw-general-bff/internal/controllers"

	"github.com/gin-gonic/gin"
)

type fileRouter struct {
	fileController *controllers.FileController
}

func newFileRouter(fileController *controllers.FileController) *fileRouter {
	return &fileRouter{fileController}
}

func (fr *fileRouter) setFileRoutes(rg *gin.RouterGroup) {
	files := rg.Group("/files")
	files.POST("", fr.fileController.UploadFile)
	files.DELETE("", fr.fileController.DeleteFilesByIDs)
}
