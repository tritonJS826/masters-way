package schemas

type UploadFileResponse struct {
	ID         string `json:"Id" validate:"required"`
	OwnerID    string `json:"OwnerId" validate:"required"`
	Name       string `json:"Name" validate:"required"`
	PreviewURL string `json:"previewUrl" validate:"required"`
	SrcURL     string `json:"srcUrl" validate:"required"`
	IconURL    string `json:"iconUrl" validate:"required"`
}
