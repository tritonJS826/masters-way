package services

import (
	"context"
	"mwchat/internal/schemas"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgxpool"
)

type P2PService interface {
	GetP2PRoomsWithInterlocutor(ctx context.Context, userUUID uuid.UUID) (*schemas.GetRoomsResponse, error)
	GetP2PRoomWithMessages(ctx context.Context, roomUUID uuid.UUID) (*schemas.RoomPopulatedResponse, error)
	CreateP2PRoom(ctx context.Context, invitingUserUUID, invitedUserUUID uuid.UUID) (*schemas.RoomPopulatedResponse, error)
	BlockOrUnblockP2PRoom(ctx context.Context, BlockOrUnblockParams *BlockOrUnblockRoomParams) error
	CreateMessageInP2PRoom(ctx context.Context, messageParams *RoomMessageParams) (*schemas.MessageResponse, error)
}

type GroupService interface {
	GetGroupRoomsPreview()
	GetGroupRoomById()
	CreateGroupRoom()
	UpdateGroupRoom()
	AddUserToGroupRoom()
	DeleteUserFromGroupRoom()
	GetRequestsToGroupRoom()
	CreateRequestsToGroupRoom()
	AcceptRequestsToGroupRoom()
	DeclineRequestsToGroupRoom()
	CreateMessageInGroupRoom()
}

type Service struct {
	P2PService
	GroupService
}

func NewService(pool *pgxpool.Pool) *Service {
	return &Service{
		P2PService: NewP2PRoomsService(pool),
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
