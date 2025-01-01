package schemas

type User struct {
	Uuid     string `json:"uuid" validate:"required"`
	Name     string `json:"name" validate:"required"`
	ImageUrl string `json:"imageUrl" validate:"required"`
}
