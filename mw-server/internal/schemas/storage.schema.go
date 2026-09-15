package schemas

type UploadFileResponse struct {
	ID         string `json:"id"`
	Name       string `json:"name"`
	OwnerID    string `json:"ownerId"`
	PreviewURL string `json:"previewUrl"`
	SrcURL     string `json:"srcUrl"`
}