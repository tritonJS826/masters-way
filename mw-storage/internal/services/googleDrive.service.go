package services

import (
	"context"
	"fmt"
	"mime/multipart"

	"golang.org/x/oauth2"
	"google.golang.org/api/drive/v3"
	"google.golang.org/api/googleapi"
	"google.golang.org/api/option"
)

const folderName = "Master's Way"

type GoogleDriveService struct {
}

func NewGoogleDriveService() *GoogleDriveService {
	return &GoogleDriveService{}
}

func (gs *GoogleDriveService) UploadFile(googleAccessToken string, file *multipart.FileHeader) (*drive.File, error) {
	service, err := gs.getDriveService(googleAccessToken)
	if err != nil {
		return nil, fmt.Errorf("Failed to create Google Drive service: %v", err)
	}

	folder, err := gs.findFolderByName(service, folderName)
	if err != nil {
		return nil, fmt.Errorf("Failed to find folder: %v", err)
	}

	if folder == nil {
		folder, err = gs.createFolder(service, folderName)
		if err != nil {
			return nil, fmt.Errorf("Failed to create folder: %v", err)
		}
	}

	uploadedFile, err := gs.uploadFileToFolder(service, file, folder.Id)
	if err != nil {
		return nil, fmt.Errorf("Failed to upload file to folder: %v", err)
	}

	return uploadedFile, nil
}

func (gs *GoogleDriveService) getDriveService(googleAccessToken string) (*drive.Service, error) {
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

func (gs *GoogleDriveService) uploadFileToFolder(service *drive.Service, fileHeader *multipart.FileHeader, folderID string) (*drive.File, error) {
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
		Fields("id", "name", "webContentLink", "webViewLink").
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

func (gs *GoogleDriveService) findFolderByName(service *drive.Service, folderName string) (*drive.File, error) {
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

func (gs *GoogleDriveService) createFolder(service *drive.Service, folderName string) (*drive.File, error) {
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
