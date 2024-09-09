package schemas

type UploadFileResponse struct {
	ID    string `json:"Id" validate:"required"`
	Owner string `json:"Owner" validate:"required"`
	Name  string `json:"Name" validate:"required"`
	Url   string `json:"Url" validate:"required"`
}
