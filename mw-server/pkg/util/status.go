package util

type ResponseStatusString struct {
	Status string `json:"status" validate:"required"`
}
