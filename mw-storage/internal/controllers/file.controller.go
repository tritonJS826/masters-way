package controllers

import (
	"context"
	"fmt"
	"mime/multipart"
	"mwstorage/internal/auth"
	"mwstorage/internal/schemas"
	"net/http"

	"github.com/gin-gonic/gin"
	"golang.org/x/oauth2"
	"google.golang.org/api/drive/v3"
	"google.golang.org/api/googleapi"
	"google.golang.org/api/option"
)

type FileController struct {
	// messagesService *services.MessagesService
}

func NewFileController() *FileController {
	return &FileController{}
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
	service, err := getDriveService(googleAccessToken)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create Google Drive service: " + err.Error()})
		return
	}

	folderName := "Master's Way"

	folder, err := findFolderByName(service, folderName)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to find folder: " + err.Error()})
		return
	}

	if folder == nil {
		folder, err = createFolder(service, folderName)
		if err != nil {
			ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create folder: " + err.Error()})
			return
		}
	}

	uploadedFile, err := uploadFileToFolder(service, file, folder.Id)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to upload file to folder: " + err.Error()})
		return
	}

	response := &schemas.UploadFileResponse{
		ID:         "",
		OwnerID:    userID,
		Name:       file.Filename,
		SrcURL:     uploadedFile.WebContentLink,
		PreviewURL: uploadedFile.WebViewLink,
		IconURL:    uploadedFile.IconLink,
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

func getDriveService(googleAccessToken string) (*drive.Service, error) {
	token := &oauth2.Token{
		AccessToken: googleAccessToken,
	}

	config := &oauth2.Config{}
	client := config.Client(context.Background(), token)

	service, err := drive.NewService(context.Background(), option.WithHTTPClient(client))
	if err != nil {
		return nil, fmt.Errorf("unable to create Drive client: %v", err)
	}
	return service, nil
}

func uploadFileToFolder(service *drive.Service, fileHeader *multipart.FileHeader, folderID string) (*drive.File, error) {
	file, err := fileHeader.Open()
	if err != nil {
		return nil, fmt.Errorf("unable to open file: %v", err)
	}
	defer file.Close()

	fileMetadata := &drive.File{
		Name:    fileHeader.Filename,
		Parents: []string{folderID}, // Указываем ID папки
	}

	mimeType := fileHeader.Header.Get("Content-Type")

	driveFile, err := service.Files.
		Create(fileMetadata).
		Media(file, googleapi.ContentType(mimeType)).
		Fields("id", "name", "webContentLink", "webViewLink", "iconLink").
		Do()
	if err != nil {
		return nil, fmt.Errorf("unable to upload file: %v", err)
	}

	_, err = service.Permissions.Create(driveFile.Id, &drive.Permission{
		Type: "anyone", // Anyone can access the file
		Role: "reader", // Read-only access
	}).Do()
	if err != nil {
		return nil, fmt.Errorf("unable to set file permissions: %v", err)
	}

	return driveFile, nil
}

func findFolderByName(service *drive.Service, folderName string) (*drive.File, error) {
	escapedFolderName := fmt.Sprintf("%q", folderName)
	query := fmt.Sprintf("name = %s and mimeType = 'application/vnd.google-apps.folder' and trashed = false", escapedFolderName)

	folderList, err := service.Files.List().Q(query).Fields("files(id, name)").Do()
	if err != nil {
		return nil, fmt.Errorf("unable to find folder: %v", err)
	}

	if len(folderList.Files) == 0 {
		return nil, nil
	}

	return folderList.Files[0], nil
}

func createFolder(service *drive.Service, folderName string) (*drive.File, error) {
	folderMetadata := &drive.File{
		Name:     folderName,
		MimeType: "application/vnd.google-apps.folder",
	}

	folder, err := service.Files.Create(folderMetadata).Fields("id", "name").Do()
	if err != nil {
		return nil, fmt.Errorf("unable to create folder: %v", err)
	}

	fmt.Printf("Folder created: ID=%s, Name=%s\n", folder.Id, folder.Name)
	return folder, nil
}
