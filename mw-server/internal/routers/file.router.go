package routers

import (
	"mw-server/internal/auth"
	"mw-server/internal/config"
	"mw-server/internal/controllers"

	"github.com/gin-gonic/gin"
)

type fileRouter struct {
	fileController *controllers.FileController
	config         *config.Config
}

func newFileRouter(fileController *controllers.FileController, config *config.Config) *fileRouter {
	return &fileRouter{fileController, config}
}

func (fr *fileRouter) setFileRoutes(rg *gin.RouterGroup) {
	r := rg.Group("/storage", auth.AuthMiddleware(fr.config))
	r.POST("/files", fr.fileController.UploadFile)
	r.DELETE("/files", fr.fileController.DeleteFilesByIDs)
}