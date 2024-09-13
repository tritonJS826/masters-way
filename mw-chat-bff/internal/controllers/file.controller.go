package controllers

import (
	"fmt"
	"mw-chat-bff/internal/auth"
	"mw-chat-bff/internal/services"
	util "mw-chat-bff/internal/utils"
	"net/http"

	"github.com/gin-gonic/gin"
)

type FileController struct {
	generalService *services.GeneralService
	fileService    *services.FileService
}

func NewFileController(generalService *services.GeneralService, fileService *services.FileService) *FileController {
	return &FileController{generalService, fileService}
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
	userIDRaw, _ := ctx.Get(auth.ContextKeyUserID)
	userID := userIDRaw.(string)

	googleToken, err := fc.generalService.GetGoogleAccessTokenByID(ctx, userID)
	if err != nil {
		util.HandleErrorGin(ctx, fmt.Errorf("general service error: %w", err))
	}

	response, err := fc.fileService.UploadFile(ctx.Request, googleToken)
	if err != nil {
		util.HandleErrorGin(ctx, fmt.Errorf("storage service error: %w", err))
	}

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
