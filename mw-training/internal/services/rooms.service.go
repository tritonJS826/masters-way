package services

import (
	"context"
	"mw-training/internal/schemas"

	"errors"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"

	db "mw-training/internal/db/sqlc"
)

var ErrPrivateRoomAlreadyExists = errors.New("A private room for these users already exists")

type RoomsRepository interface {
	// GetChatPreview(ctx context.Context, userUUID pgtype.UUID) (int64, error)
	// CreateMessage(ctx context.Context, arg db.CreateMessageParams) (db.CreateMessageRow, error)
	// GetPrivateRoomByUserUUIDs(ctx context.Context, arg db.GetPrivateRoomByUserUUIDsParams) (pgtype.UUID, error)
	// GetMessagesByRoomUUID(ctx context.Context, roomUuid pgtype.UUID) ([]db.GetMessagesByRoomUUIDRow, error)
	// GetRoomsByUserUUID(ctx context.Context, arg db.GetRoomsByUserUUIDParams) ([]db.GetRoomsByUserUUIDRow, error)
	// GetRoomByUUID(ctx context.Context, roomUuid pgtype.UUID) (db.GetRoomByUUIDRow, error)
	// GetUsersUUIDsInRoom(ctx context.Context, roomUuid pgtype.UUID) ([]pgtype.UUID, error)
	// AddUserToRoom(ctx context.Context, arg db.AddUserToRoomParams) (db.AddUserToRoomRow, error)
	WithTx(tx pgx.Tx) *db.Queries
}

type RoomsService struct {
	pool            *pgxpool.Pool
	roomsRepository RoomsRepository
}

func NewRoomsService(pool *pgxpool.Pool, roomsRepository RoomsRepository) *RoomsService {
	return &RoomsService{pool, roomsRepository}
}

func (roomsService *RoomsService) GetChatPreview(ctx context.Context, userUUID uuid.UUID) (*schemas.GetChatPreviewResponse, error) {
	return &schemas.GetChatPreviewResponse{}, nil
}

func (roomsService *RoomsService) GetRooms(ctx context.Context, userUUID uuid.UUID, roomType string) (*schemas.GetRoomsResponse, error) {

	return &schemas.GetRoomsResponse{}, nil
}

func (roomsService *RoomsService) GetRoomByUUID(ctx context.Context, roomUUID uuid.UUID) (*schemas.RoomPopulatedResponse, error) {

	return &schemas.RoomPopulatedResponse{}, nil
}

type CreateRoomServiceParams struct {
	CurrentUserUUID uuid.UUID
	ParticipantUUID *string
	Name            *string
	Type            string
}

type FindOrCreateRoomUUIDResponse struct {
	RoomUUID         uuid.UUID
	IsAlreadyCreated bool
}

func (roomsService *RoomsService) FindOrCreateRoomUUID(ctx context.Context, roomParams *CreateRoomServiceParams) (*FindOrCreateRoomUUIDResponse, error) {
	return &FindOrCreateRoomUUIDResponse{}, nil
}

func (roomsService *RoomsService) createRoomTransaction(ctx context.Context, roomParams *CreateRoomServiceParams) (uuid.UUID, error) {
	// tx, err := roomsService.pool.Begin(ctx)
	// if err != nil {
	// 	return uuid.Nil, err
	// }
	// defer tx.Rollback(ctx)

	// qtx := roomsService.roomsRepository.WithTx(tx)

	// now := time.Now()
	// newRoom, err := qtx.CreateRoom(ctx, db.CreateRoomParams{
	// 	CreatedAt: pgtype.Timestamp{Time: now, Valid: true},
	// 	Name:      pgtype.Text{String: name, Valid: name != ""},
	// 	Type:      db.RoomType(roomParams.Type),
	// })
	// tx.Commit(ctx)

	return uuid.UUID{}, nil
}

type BlockOrUnblockRoomParams struct {
	UserUUID  uuid.UUID
	RoomUUID  uuid.UUID
	IsBlocked bool
}

func (roomsService *RoomsService) BlockOrUnblockRoom(ctx context.Context, BlockOrUnblockParams *BlockOrUnblockRoomParams) error {
	// params := db.ToggleBlockP2PRoomParams{
	// 	UserUuid: pgtype.UUID{Bytes: BlockOrUnblockParams.UserUUID, Valid: BlockOrUnblockParams.IsBlocked},
	// 	RoomUuid: pgtype.UUID{Bytes: BlockOrUnblockParams.RoomUUID, Valid: true},
	// }
	// err := p2pRoomsService.p2pRoomsRepository.ToggleBlockP2PRoom(ctx, params)
	// if err != nil {
	// 	return err
	// }

	return nil
}
