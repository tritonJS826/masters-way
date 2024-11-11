package controllers

import (
	"mwstorage/internal/auth"
	db "mwstorage/internal/db/sqlc"
	"mwstorage/internal/schemas"
	"mwstorage/internal/services"
	"mwstorage/pkg/utils"
	"net/http"

	"github.com/gin-gonic/gin"
)

// Without next lines swagger does not see openapi models
var _ = &schemas.UploadFileResponse{}

type FileController struct {
	fileService        *services.FileService
	googleDriveService *services.GoogleDriveService
}

func NewFileController(fileService *services.FileService, googleDriveService *services.GoogleDriveService) *FileController {
	return &FileController{fileService, googleDriveService}
}

// @Summary Upload file to storage
// @Description Uploads a file to the server and stores it in the designated storage path
// @Tags file
// @ID upload-file
// @Accept  multipart/form-data
// @Produce  json
// @Param multipart formData file true "File to upload"
// @Success 200 {object} schemas.UploadFileResponse
// @Router /files [post]
func (fc *FileController) UploadFile(ctx *gin.Context) {
	file, err := ctx.FormFile("file")
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Failed to get file: " + err.Error()})
		return
	}

	userIDRaw, _ := ctx.Get(auth.ContextKeyUserID)
	userID := userIDRaw.(string)

	googleAccessToken := ctx.GetHeader("GoogleAccessToken")

	uploadedFile, err := fc.googleDriveService.UploadFile(googleAccessToken, file)
	utils.HandleErrorGin(ctx, err)

	saveFileInfoParams := &services.SaveFileInfoParams{
		SrcUrl:        uploadedFile.WebViewLink,
		Name:          uploadedFile.Name,
		PreviewUrl:    "https://drive.google.com/thumbnail?id=" + uploadedFile.Id,
		StorageType:   db.StorageTypeGoogleDrive,
		OwnerUuid:     userID,
		Size:          uploadedFile.Size,
		GoogleDriveID: &uploadedFile.Id,
	}

	response, err := fc.fileService.SaveFileInfo(ctx, saveFileInfoParams)
	utils.HandleErrorGin(ctx, err)

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
