package services

import (
	"context"
	db "mwchat/internal/db/sqlc"
	"mwchat/internal/schemas"
	"mwchat/pkg/utils"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgtype"
	"github.com/jackc/pgx/v5/pgxpool"
)

type P2PRoomsRepository interface {
	AddUserToP2PRoom(ctx context.Context, arg db.AddUserToP2PRoomParams) error
	CreateMessageInP2PRoom(ctx context.Context, arg db.CreateMessageInP2PRoomParams) (db.CreateMessageInP2PRoomRow, error)
	CreateP2PRoom(ctx context.Context, createdAt pgtype.Timestamp) (db.CreateP2PRoomRow, error)
	GetP2PMessagesByRoomUUID(ctx context.Context, roomUuid pgtype.UUID) ([]db.GetP2PMessagesByRoomUUIDRow, error)
	GetP2PRoomByUUID(ctx context.Context, arg db.GetP2PRoomByUUIDParams) (db.GetP2PRoomByUUIDRow, error)
	GetP2PRoomsWithInterlocutorByUserUUID(ctx context.Context, userUuid pgtype.UUID) ([]db.GetP2PRoomsWithInterlocutorByUserUUIDRow, error)
	ToggleBlockP2PRoom(ctx context.Context, arg db.ToggleBlockP2PRoomParams) error
	WithTx(tx pgx.Tx) *db.Queries
}

type P2PRoomsService struct {
	pool               *pgxpool.Pool
	p2pRoomsRepository P2PRoomsRepository
}

func NewP2PRoomsService(pool *pgxpool.Pool, p2pRoomsRepository P2PRoomsRepository) *P2PRoomsService {
	return &P2PRoomsService{pool, p2pRoomsRepository}
}

func (p2pRoomsService *P2PRoomsService) GetP2PRoomsPreview(ctx context.Context, userUUID uuid.UUID) (*schemas.GetRoomsResponse, error) {

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

func (p2pRoomsService *P2PRoomsService) GetPopulatedP2PRoom(ctx context.Context, userUUID, roomUUID uuid.UUID) (*schemas.RoomPopulatedResponse, error) {
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

func (p2pRoomsService *P2PRoomsService) CreateP2PRoom(ctx context.Context, invitingUserUUID, invitedUserUUID uuid.UUID) (*schemas.RoomPopulatedResponse, error) {
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

func (p2pRoomsService *P2PRoomsService) BlockOrUnblockP2PRoom(ctx context.Context, BlockOrUnblockParams *BlockOrUnblockRoomParams) error {
	params := db.ToggleBlockP2PRoomParams{
		UserUuid: pgtype.UUID{Bytes: BlockOrUnblockParams.UserUUID, Valid: BlockOrUnblockParams.IsBlocked},
		RoomUuid: pgtype.UUID{Bytes: BlockOrUnblockParams.RoomUUID, Valid: true},
	}
	err := p2pRoomsService.p2pRoomsRepository.ToggleBlockP2PRoom(ctx, params)
	if err != nil {
		return err
	}

	return nil
}

func (p2pRoomsService *P2PRoomsService) CreateMessageInP2PRoom(ctx context.Context, messageParams *RoomMessageParams) (*schemas.MessageResponse, error) {
	params := db.CreateMessageInP2PRoomParams{
		OwnerUuid: pgtype.UUID{Bytes: messageParams.OwnerUUID, Valid: true},
		RoomUuid:  pgtype.UUID{Bytes: messageParams.RoomUUID, Valid: true},
		Text:      messageParams.Text,
	}

	message, err := p2pRoomsService.p2pRoomsRepository.CreateMessageInP2PRoom(ctx, params)
	if err != nil {
		return nil, err
	}

	return &schemas.MessageResponse{
		OwnerID: utils.ConvertPgUUIDToUUID(message.OwnerUuid).String(),
		Message: message.Text,
	}, nil
}
