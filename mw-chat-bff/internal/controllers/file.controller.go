package controllers

import (
	"mw-chat-bff/internal/services"
	util "mw-chat-bff/internal/utils"
	"net/http"

	"github.com/gin-gonic/gin"
)

type FileController struct {
	fileService *services.FileService
}

func NewFileController(fileService *services.FileService) *FileController {
	return &FileController{fileService}
}

// @Summary Upload file to storage
// @Description Uploads a file to the server and stores it in the designated storage path
// @Tags file
// @ID upload-file
// @Accept  multipart/form-data
// @Produce  json
// @Param file formData file true "File to upload"
// @Success 200 {object} schemas.UploadFileResponse
// @Router /files [post]
func (fc *FileController) UploadFile(ctx *gin.Context) {
	response, err := fc.fileService.UploadFile(ctx)
	util.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusOK, response)
}

// @Summary Delete files by IDs
// @Description Delete multiple files from the server storage using their IDs
// @Tags file
// @ID delete-files
// @Accept  json
// @Produce  json
// @Param fileIDs body []string true "List of file IDs to delete"
// @Success 204
// @Router /files [delete]
func (fc *FileController) DeleteFilesByIDs(ctx *gin.Context) {
	var fileIDs []string

	if err := ctx.ShouldBindJSON(&fileIDs); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// userIDRaw, _ := ctx.Get(auth.ContextKeyUserID)
	// userID := userIDRaw.(string)

	ctx.Status(http.StatusNoContent)
}
