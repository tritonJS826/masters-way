package services

import (
	"context"
	db "mwchat/internal/db/sqlc"
	"mwchat/internal/schemas"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgxpool"
)

type P2PService interface {
	GetP2PRoomsPreview(ctx context.Context, userUUID uuid.UUID) (*schemas.GetRoomsResponse, error)
	GetPopulatedP2PRoom(ctx context.Context, userUUID, roomUUID uuid.UUID) (*schemas.RoomPopulatedResponse, error)
	CreateP2PRoom(ctx context.Context, invitingUserUUID, invitedUserUUID uuid.UUID) (*schemas.RoomPopulatedResponse, error)
	BlockOrUnblockP2PRoom(ctx context.Context, BlockOrUnblockParams *BlockOrUnblockRoomParams) error
	CreateMessageInP2PRoom(ctx context.Context, messageParams *RoomMessageParams) (*schemas.MessageResponse, error)
}

type GroupService interface {
	GetGroupRoomsPreview(ctx context.Context, userUuid uuid.UUID) (*schemas.GetRoomsResponse, error)
	GetPopulatedGroupRoom(ctx context.Context, userUUID, roomUUID uuid.UUID) (*schemas.RoomPopulatedResponse, error)
	CreateGroupRoom(ctx context.Context, roomName string, userUUID uuid.UUID) (*schemas.RoomPopulatedResponse, error)
	BlockOrUnblockGroupRoom(ctx context.Context, blockOrUnblockParams *BlockOrUnblockRoomParams) error
}

type Service struct {
	P2PService
	GroupService
}

func NewService(pool *pgxpool.Pool) *Service {
	queries := db.New(pool)
	return &Service{
		P2PService:   NewP2PRoomsService(pool, queries),
		GroupService: NewGroupRoomsService(pool, queries),
	}
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
