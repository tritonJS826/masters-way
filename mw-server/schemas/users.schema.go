package schemas

import (
	"time"

	"github.com/google/uuid"
)

type CreateUserPayload struct {
	Name        string `json:"name" validate:"required"`
	Email       string `json:"email" validate:"required"`
	Description string `json:"description" validate:"required"`
	ImageUrl    string `json:"imageUrl" validate:"required" extensions:"x-nullable"`
	IsMentor    bool   `json:"isMentor" validate:"required"`
}

type UserPlainResponse struct {
	Uuid        uuid.UUID `json:"uuid" validate:"required"`
	Name        string    `json:"name" validate:"required"`
	Email       string    `json:"email" validate:"required"`
	Description string    `json:"description" validate:"required"`
	CreatedAt   time.Time `json:"createdAt" validate:"required"`
	ImageUrl    string    `json:"imageUrl" validate:"required" extensions:"x-nullable"`
	IsMentor    bool      `json:"isMentor" validate:"required"`
}
type UpdateUserPayload struct {
	Name        string `json:"name"`
	Email       string `json:"email"`
	Description string `json:"description"`
	ImageUrl    string `json:"imageUrl" extensions:"x-nullable"`
	IsMentor    bool   `json:"isMentor"`
}

type UserPopulatedResponse struct {
	Uuid             uuid.UUID                        `json:"uuid" validate:"required"`
	Name             string                           `json:"name" validate:"required"`
	Email            string                           `json:"email" validate:"required"`
	Description      string                           `json:"description" validate:"required"`
	CreatedAt        time.Time                        `json:"createdAt" validate:"required"`
	ImageUrl         string                           `json:"imageUrl" validate:"required" extensions:"x-nullable"`
	IsMentor         bool                             `json:"isMentor" validate:"required"`
	OwnWays          []WayPlainResponse               `json:"ownWays" validate:"required"`
	FavoriteWays     []WayPlainResponse               `json:"favoriteWays" validate:"required"`
	MentoringWays    []WayPlainResponse               `json:"mentoringWays" validate:"required"`
	WayCollections   []WayCollectionPopulatedResponse `json:"wayCollections" validate:"required"`
	FavoriteForUsers []string                         `json:"favoriteForUsers" validate:"required"`
	FavoriteUsers    []UserPlainResponse              `json:"favoriteUsers" validate:"required"`
	Tags             []UserTagResponse                `json:"tags" validate:"required"`
	WayRequests      []WayPlainResponse               `json:"wayRequests" validate:"required"`
}
