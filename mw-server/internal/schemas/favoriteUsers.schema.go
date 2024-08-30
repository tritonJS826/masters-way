package schemas

import (
	"github.com/google/uuid"
)

type CreateFavoriteUserPayload struct {
	DonorUserUuid    uuid.UUID `json:"donorUserUuid" validate:"required"`
	AcceptorUserUuid uuid.UUID `json:"acceptorUserUuid" validate:"required"`
}
