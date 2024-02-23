package schemas

import (
	"time"

	"github.com/google/uuid"
)

type CreateUserPayload struct {
	Name        string `json:"name"`
	Email       string `json:"email"`
	Description string `json:"description"`
	ImageUrl    string `json:"imageUrl"`
	IsMentor    bool   `json:"isMentor"`
}

type UserPlainResponse struct {
	Uuid        uuid.UUID `json:"uuid"`
	Name        string    `json:"name"`
	Email       string    `json:"email"`
	Description string    `json:"description"`
	CreatedAt   time.Time `json:"createdAt"`
	ImageUrl    string    `json:"imageUrl"`
	IsMentor    bool      `json:"isMentor"`
}
type UpdateUserPayload struct {
	Name        string `json:"name"`
	Email       string `json:"email"`
	Description string `json:"description"`
	ImageUrl    string `json:"imageUrl"`
	IsMentor    bool   `json:"isMentor"`
}

type UserPopulatedResponse struct {
	Uuid             uuid.UUID
	Name             string
	Email            string
	Description      string
	CreatedAt        time.Time
	ImageUrl         string
	IsMentor         bool
	OwnWays          []WayPlainResponse
	FavoriteWays     []WayPlainResponse
	MentoringWays    []WayPlainResponse
	WayCollections   []WayCollectionPopulatedResponse
	FavoriteForUsers []string
	FavoriteUsers    []UserPlainResponse
	Tags             []UserTagResponse
	WayRequests      []WayPlainResponse
}
