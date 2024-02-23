package schemas

import (
	"github.com/google/uuid"
)

type CreateFavoriteUserPayload struct {
	DonorUserUuid    uuid.UUID `json:"donorUserUuid"`
	AcceptorUserUuid uuid.UUID `json:"acceptorUserUuid"`
}
