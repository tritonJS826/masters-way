package schemas

type UploadFileResponse struct {
	ID         string `json:"id" validate:"required"`
	Name       string `json:"name" validate:"required"`
	OwnerID    string `json:"ownerId" validate:"required"`
	PreviewURL string `json:"previewUrl" validate:"required"`
	SrcURL     string `json:"srcUrl" validate:"required"`
}
