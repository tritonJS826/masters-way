package controllers

import (
	"mw-chat-bff/internal/services"
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

	fc.fileService.UploadFile(ctx)

	// storageURL := "http://mw-storage:8003/storage/files"

	// req, err := http.NewRequest("POST", storageURL, ctx.Request.Body)
	// if err != nil {
	// 	ctx.JSON(http.StatusInternalServerError, gin.H{"error": "failed to create request to storage"})
	// 	return
	// }

	// req.Header.Set("Content-Type", ctx.Request.Header.Get("Content-Type"))

	// client := &http.Client{}
	// resp, err := client.Do(req)
	// if err != nil {
	// 	ctx.JSON(http.StatusInternalServerError, gin.H{"error": "failed to send request to storage"})
	// 	return
	// }
	// defer resp.Body.Close()

	// if resp.StatusCode != http.StatusOK {
	// 	ctx.JSON(http.StatusInternalServerError, gin.H{"error": "storage service failed"})
	// 	return
	// }

	ctx.JSON(http.StatusOK, gin.H{"message": "File successfully uploaded"})
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
