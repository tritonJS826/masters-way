package schemas

type UploadFileResponse struct {
	ID      string `json:"Id" validate:"required"`
	OwnerID string `json:"OwnerId" validate:"required"`
	Name    string `json:"Name" validate:"required"`
	Url     string `json:"Url" validate:"required"`
}
