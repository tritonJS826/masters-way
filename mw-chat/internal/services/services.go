package services

import (
	"context"
	db "mwchat/internal/db/sqlc"
	"mwchat/internal/schemas"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgxpool"
)

type IRoomsService interface {
	GetChatPreview(ctx context.Context, userUUID uuid.UUID) (*schemas.GetChatPreviewResponse, error)
	GetRooms(ctx context.Context, userUUID uuid.UUID, roomType string) (*schemas.GetRoomsResponse, error)
	GetRoomByUuid(ctx context.Context, userUUID, roomUUID uuid.UUID) (*schemas.RoomPopulatedResponse, error)
	CreateRoom(ctx context.Context, roomParams *CreateRoomServiceParams) (*schemas.RoomPopulatedResponse, error)
	BlockOrUnblockRoom(ctx context.Context, BlockOrUnblockParams *BlockOrUnblockRoomParams) error
	// AddUserToRoom(ctx context.Context, addUserToRoomParams *AddUserToRoomParams)
}

type IDevService interface {
	ResetDB(ctx context.Context) error
}

type IMessagesService interface {
	CreateMessage(ctx context.Context, messageParams *CreateMessageParams) (*schemas.CreateMessageResponse, error)
	UpdateMessageStatus(ctx context.Context, messageParams *UpdateMessageStatusParams) error
}

type Service struct {
	IRoomsService
	IMessagesService
	IDevService
}

func NewService(pool *pgxpool.Pool) *Service {
	queries := db.New(pool)
	return &Service{
		IRoomsService:    NewRoomsService(pool, queries),
		IMessagesService: NewMessagesService(pool, queries),
		IDevService:      NewDevService(pool, queries),
	}
}

type CreateRoomServiceParams struct {
	CreatorUUID     uuid.UUID
	InvitedUserUUID *string
	Name            *string
	Type            string
}

type CreateMessageParams struct {
	OwnerUUID uuid.UUID
	RoomUUID  uuid.UUID
	Text      string
}

type UpdateMessageStatusParams struct {
	MessageUUID uuid.UUID
	UserUUID    uuid.UUID
	IsRead      bool
}

type BlockOrUnblockRoomParams struct {
	UserUUID  uuid.UUID
	RoomUUID  uuid.UUID
	IsBlocked bool
}
