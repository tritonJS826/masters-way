package controllers

import (
	"mw-general-bff/internal/schemas"
	"mw-general-bff/internal/services"
	"net/http"

	"github.com/gin-gonic/gin"
)

// Without next lines swagger does not see openapi models
var _ = &schemas.UploadFileResponse{}

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
// @Param roomId query string true "Room id"
// @Success 200 {object} schemas.UploadFileResponse
// @Router /files [post]
func (fc *FileController) UploadFile(ctx *gin.Context) {
	// userIDRaw, _ := ctx.Get(auth.ContextKeyUserID)
	// userID := userIDRaw.(string)

	// roomID := ctx.Query("roomId")

	// googleToken, err := fc.generalService.GetGoogleAccessTokenByID(ctx, userID)
	// if err != nil {
	// 	util.HandleErrorGin(ctx, fmt.Errorf("general service error: %w", err))
	// }

	// response, err := fc.fileService.UploadFile(ctx.Request, googleToken)
	// if err != nil {
	// 	util.HandleErrorGin(ctx, fmt.Errorf("storage service error: %w", err))
	// }

	// message := fmt.Sprintf("![%s](%s) \n\n [open link](%s)", response.Name, response.PreviewURL, response.SrcURL)

	// messageResponse, err := fc.chatService.CreateMessage(ctx, message, roomID)
	// util.HandleErrorGin(ctx, err)

	// // TODO rename  service method
	// populatedUserMap, err := fc.generalService.GetPopulatedUsers(ctx, []string{messageResponse.Message.OwnerID})
	// if err != nil {
	// 	util.HandleErrorGin(ctx, fmt.Errorf("general service error: %w", err))
	// }

	// messageResponse.Message.OwnerName = populatedUserMap[messageResponse.Message.OwnerID].Name
	// messageResponse.Message.OwnerImageURL = populatedUserMap[messageResponse.Message.OwnerID].ImageURL

	// err = fc.chatWebSocketService.SendMessage(ctx, roomID, messageResponse)
	// util.HandleErrorGin(ctx, err)

	ctx.Status(http.StatusOK)
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
	// var fileIDs []string

	// if err := ctx.ShouldBindJSON(&fileIDs); err != nil {
	// 	ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	// 	return
	// }

	// // userIDRaw, _ := ctx.Get(auth.ContextKeyUserID)
	// // userID := userIDRaw.(string)

	ctx.Status(http.StatusNoContent)
}
