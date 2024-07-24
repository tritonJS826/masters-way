package services

import (
	"context"
	"mwchat/internal/schemas"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgtype"
	"github.com/jackc/pgx/v5/pgxpool"

	db "mwchat/internal/db/sqlc"
)

type RoomsRepository interface {
	GetChatPreview(ctx context.Context, userUUID pgtype.UUID) (int64, error)
	CreateMessage(ctx context.Context, arg db.CreateMessageParams) (db.CreateMessageRow, error)
	GetMessagesByRoomUUID(ctx context.Context, roomUuid pgtype.UUID) ([]db.GetMessagesByRoomUUIDRow, error)
	GetRoomsByUserUUID(ctx context.Context, arg db.GetRoomsByUserUUIDParams) ([]db.GetRoomsByUserUUIDRow, error)
	AddUserToRoom(ctx context.Context, arg db.AddUserToRoomParams) error
	WithTx(tx pgx.Tx) *db.Queries
}

type RoomsService struct {
	pool            *pgxpool.Pool
	roomsRepository RoomsRepository
}

func NewP2PRoomsService(pool *pgxpool.Pool, roomsRepository RoomsRepository) *RoomsService {
	return &RoomsService{pool, roomsRepository}
}

func (p2pRoomsService *RoomsService) GetChatPreview(ctx context.Context, userUUID pgtype.UUID) (*schemas.GetChatPreviewResponse, error) {

	previewResponse := schemas.GetChatPreviewResponse{
		UnreadMessagesAmount: 1,
	}

	return &previewResponse, nil
}

func (p2pRoomsService *RoomsService) GetRooms(ctx context.Context, userUUID uuid.UUID, roomType string) (*schemas.GetRoomsResponse, error) {

	// p2pRoomsRaw, err := p2pRoomsService.p2pRoomsRepository.GetP2PRoomsWithInterlocutorByUserUUID(ctx, pgtype.UUID{Bytes: userUUID, Valid: true})
	// if err != nil {
	// 	return nil, err
	// }

	// rooms := lo.Map(p2pRoomsRaw, func(dbRoom db.GetP2PRoomsWithInterlocutorByUserUUIDRow, i int) schemas.RoomPreviewResponse {
	// 	return schemas.RoomPreviewResponse{
	// 		RoomID:    utils.ConvertPgUUIDToUUID(dbRoom.Uuid).String(),
	// 		UserID:    utils.ConvertPgUUIDToUUID(dbRoom.InterlocutorUuid).String(),
	// 		IsBlocked: dbRoom.BlockedByUserUuid.Valid,
	// 	}
	// })

	// return &schemas.GetRoomsResponse{
	// 	Size:  len(rooms),
	// 	Rooms: rooms,
	// }, nil

	return &schemas.GetRoomsResponse{}, nil
}

func (p2pRoomsService *RoomsService) GetRoomByUuid(ctx context.Context, userUUID, roomUUID uuid.UUID) (*schemas.RoomPopulatedResponse, error) {
	// params := db.GetP2PRoomByUUIDParams{
	// 	P2pRoomUuid: pgtype.UUID{Bytes: roomUUID, Valid: true},
	// 	UserUuid:    pgtype.UUID{Bytes: userUUID, Valid: true},
	// }

	// p2pRoom, err := p2pRoomsService.p2pRoomsRepository.GetP2PRoomByUUID(ctx, params)
	// if err != nil {
	// 	return nil, err
	// }

	// messagesRaw, err := p2pRoomsService.p2pRoomsRepository.GetP2PMessagesByRoomUUID(ctx, pgtype.UUID{Bytes: roomUUID, Valid: true})
	// if err != nil {
	// 	return nil, err
	// }

	// messages := lo.Map(messagesRaw, func(dbMessage db.GetP2PMessagesByRoomUUIDRow, i int) schemas.MessageResponse {
	// 	return schemas.MessageResponse{
	// 		OwnerID: utils.ConvertPgUUIDToUUID(dbMessage.OwnerUuid).String(),
	// 		Message: dbMessage.Text,
	// 	}
	// })

	// return &schemas.RoomPopulatedResponse{
	// 	RoomID:    utils.ConvertPgUUIDToUUID(p2pRoom.Uuid).String(),
	// 	UserID:    utils.ConvertPgUUIDToUUID(p2pRoom.InterlocutorUuid).String(),
	// 	Messages:  messages,
	// 	IsBlocked: p2pRoom.BlockedByUserUuid.Valid,
	// }, nil

	return &schemas.RoomPopulatedResponse{}, nil
}

func (p2pRoomsService *RoomsService) CreateRoom(ctx context.Context, invitingUserUUID, invitedUserUUID uuid.UUID) (*schemas.RoomPopulatedResponse, error) {
	// now := time.Now()

	// tx, err := p2pRoomsService.pool.Begin(ctx)
	// if err != nil {
	// 	return nil, err
	// }
	// defer tx.Rollback(ctx)

	// qtx := p2pRoomsService.p2pRoomsRepository.WithTx(tx)

	// newP2PRoom, err := qtx.CreateP2PRoom(ctx, pgtype.Timestamp{Time: now, Valid: true})
	// if err != nil {
	// 	return nil, err
	// }

	// params := db.AddUserToP2PRoomParams{
	// 	UserUuid: pgtype.UUID{Bytes: invitingUserUUID, Valid: true},
	// 	RoomUuid: pgtype.UUID{Bytes: newP2PRoom.Uuid.Bytes, Valid: true},
	// 	JoinedAt: pgtype.Timestamp{Time: now, Valid: true},
	// }
	// err = qtx.AddUserToP2PRoom(ctx, params)
	// if err != nil {
	// 	return nil, err
	// }

	// params = db.AddUserToP2PRoomParams{
	// 	UserUuid: pgtype.UUID{Bytes: invitedUserUUID, Valid: true},
	// 	RoomUuid: pgtype.UUID{Bytes: newP2PRoom.Uuid.Bytes, Valid: true},
	// 	JoinedAt: pgtype.Timestamp{Time: now, Valid: true},
	// }
	// err = qtx.AddUserToP2PRoom(ctx, params)
	// if err != nil {
	// 	return nil, err
	// }

	// tx.Commit(ctx)

	// return &schemas.RoomPopulatedResponse{
	// 	RoomID:    utils.ConvertPgUUIDToUUID(newP2PRoom.Uuid).String(),
	// 	UserID:    invitedUserUUID.String(),
	// 	Messages:  []schemas.MessageResponse{},
	// 	IsBlocked: newP2PRoom.BlockedByUserUuid.Valid,
	// }, nil

	return &schemas.RoomPopulatedResponse{}, nil
}

func (p2pRoomsService *RoomsService) BlockOrUnblockRoom(ctx context.Context, BlockOrUnblockParams *BlockOrUnblockRoomParams) error {
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

func (p2pRoomsService *RoomsService) CreateMessage(ctx context.Context, messageParams *RoomMessageParams) (*schemas.MessageResponse, error) {
	// params := db.CreateMessageInP2PRoomParams{
	// 	OwnerUuid: pgtype.UUID{Bytes: messageParams.OwnerUUID, Valid: true},
	// 	RoomUuid:  pgtype.UUID{Bytes: messageParams.RoomUUID, Valid: true},
	// 	Text:      messageParams.Text,
	// }

	// message, err := p2pRoomsService.p2pRoomsRepository.CreateMessageInP2PRoom(ctx, params)
	// if err != nil {
	// 	return nil, err
	// }

	return &schemas.MessageResponse{
		// OwnerID: utils.ConvertPgUUIDToUUID(message.OwnerUuid).String(),
		// Message: message.Text,
	}, nil
}
