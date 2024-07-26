package services

import (
	"context"
	db "mwchat/internal/db/sqlc"
	"mwchat/internal/schemas"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgxpool"
)

type RoomService interface {
	GetChatPreview(ctx context.Context, userUUID uuid.UUID) (*schemas.GetChatPreviewResponse, error)
	GetRooms(ctx context.Context, userUUID uuid.UUID, roomType string) (*schemas.GetRoomsResponse, error)
	GetRoomByUuid(ctx context.Context, userUUID, roomUUID uuid.UUID) (*schemas.RoomPopulatedResponse, error)
	CreateRoom(ctx context.Context, roomParams *CreateRoomServiceParams) (*schemas.RoomPopulatedResponse, error)
	BlockOrUnblockRoom(ctx context.Context, BlockOrUnblockParams *BlockOrUnblockRoomParams) error
	CreateMessage(ctx context.Context, messageParams *RoomMessageParams) (*schemas.MessageResponse, error)
	// AddUserToRoom(ctx context.Context, addUserToRoomParams *AddUserToRoomParams)
}

type DevService interface {
	ResetDB(ctx context.Context) error
}

type Service struct {
	RoomService
	DevService
}

func NewService(pool *pgxpool.Pool) *Service {
	queries := db.New(pool)
	return &Service{
		RoomService: NewRoomsService(pool, queries),
		DevService:  NewDevService(queries),
	}
}

type CreateRoomServiceParams struct {
	CreatorUUID     uuid.UUID
	InvitedUserUUID *string
	Name            *string
	Type            string
}

type RoomMessageParams struct {
	OwnerUUID uuid.UUID
	RoomUUID  uuid.UUID
	Text      string
}

type BlockOrUnblockRoomParams struct {
	UserUUID  uuid.UUID
	RoomUUID  uuid.UUID
	IsBlocked bool
}
