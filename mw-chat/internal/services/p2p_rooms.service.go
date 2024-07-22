package services

import (
	"context"
	db "mwchat/internal/db/sqlc"
	"mwchat/internal/schemas"
	"mwchat/pkg/utils"
	"time"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgtype"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/samber/lo"
)

type P2PRoomsService struct {
	pool    *pgxpool.Pool
	queries *db.Queries
}

func NewP2PRoomsService(pool *pgxpool.Pool) *P2PRoomsService {
	queries := db.New(pool)
	return &P2PRoomsService{pool, queries}
}

func (p2pRoomsService *P2PRoomsService) GetP2PRoomsWithInterlocutor(ctx context.Context, userUUID uuid.UUID) (*schemas.GetRoomsResponse, error) {

	p2pRoomsRaw, err := p2pRoomsService.queries.GetP2PRoomsWithInterlocutorByUserUUID(ctx, pgtype.UUID{Bytes: userUUID, Valid: true})
	if err != nil {
		return nil, err
	}

	rooms := lo.Map(p2pRoomsRaw, func(dbRoom db.GetP2PRoomsWithInterlocutorByUserUUIDRow, i int) schemas.RoomPreviewResponse {
		return schemas.RoomPreviewResponse{
			RoomID:    utils.ConvertPgUUIDToUUID(dbRoom.Uuid).String(),
			UserID:    utils.ConvertPgUUIDToUUID(dbRoom.Uuid).String(),
			IsBlocked: dbRoom.BlockedByUserUuid.Valid,
		}
	})

	return &schemas.GetRoomsResponse{
		Size:  len(rooms),
		Rooms: rooms,
	}, nil
}

func (p2pRoomsService *P2PRoomsService) GetP2PRoomWithMessages(ctx context.Context, roomUUID uuid.UUID) (*schemas.RoomPopulatedResponse, error) {
	p2pRoom, err := p2pRoomsService.queries.GetP2PRoomByUUID(ctx, pgtype.UUID{Bytes: roomUUID, Valid: true})
	if err != nil {
		return nil, err
	}

	messagesRaw, err := p2pRoomsService.queries.GetMessagesByP2PRoomUUID(ctx, pgtype.UUID{Bytes: roomUUID, Valid: true})
	if err != nil {
		return nil, err
	}

	messages := lo.Map(messagesRaw, func(dbMessage db.P2pMessage, i int) schemas.MessageResponse {
		return schemas.MessageResponse{
			OwnerID: utils.ConvertPgUUIDToUUID(dbMessage.OwnerUuid).String(),
			Message: dbMessage.Text.String,
		}
	})

	return &schemas.RoomPopulatedResponse{
		RoomID:    utils.ConvertPgUUIDToUUID(p2pRoom.Uuid).String(),
		Messages:  messages,
		IsBlocked: p2pRoom.BlockedByUserUuid.Valid,
	}, nil
}

func (p2pRoomsService *P2PRoomsService) CreateP2PRoom(ctx context.Context, invitingUserUUID, invitedUserUUID uuid.UUID) (*schemas.RoomPopulatedResponse, error) {
	now := time.Now()

	tx, err := p2pRoomsService.pool.Begin(ctx)
	if err != nil {
		return nil, err
	}
	defer tx.Rollback(ctx)

	qtx := p2pRoomsService.queries.WithTx(tx)

	newP2PRoom, err := qtx.CreateP2PRoom(ctx, pgtype.Timestamp{Time: now, Valid: true})
	if err != nil {
		return nil, err
	}

	params := db.AddUserToP2PRoomParams{
		UserUuid: pgtype.UUID{Bytes: invitingUserUUID, Valid: true},
		RoomUuid: pgtype.UUID{Bytes: newP2PRoom.Uuid.Bytes, Valid: true},
		JoinedAt: pgtype.Timestamp{Time: now, Valid: true},
	}
	_, err = qtx.AddUserToP2PRoom(ctx, params)
	if err != nil {
		return nil, err
	}

	params = db.AddUserToP2PRoomParams{
		UserUuid: pgtype.UUID{Bytes: invitedUserUUID, Valid: true},
		RoomUuid: pgtype.UUID{Bytes: newP2PRoom.Uuid.Bytes, Valid: true},
		JoinedAt: pgtype.Timestamp{Time: now, Valid: true},
	}
	_, err = qtx.AddUserToP2PRoom(ctx, params)
	if err != nil {
		return nil, err
	}

	tx.Commit(ctx)

	return &schemas.RoomPopulatedResponse{
		RoomID:    utils.ConvertPgUUIDToUUID(newP2PRoom.Uuid).String(),
		Messages:  []schemas.MessageResponse{},
		IsBlocked: newP2PRoom.BlockedByUserUuid.Valid,
	}, nil
}

func (p2pRoomsService *P2PRoomsService) BlockOrUnblockP2PRoom(ctx context.Context, BlockOrUnblockParams *BlockOrUnblockRoomParams) error {
	params := db.ToggleBlockP2PRoomParams{
		UserUuid: pgtype.UUID{Bytes: BlockOrUnblockParams.UserUUID, Valid: BlockOrUnblockParams.IsBlocked},
		RoomUuid: pgtype.UUID{Bytes: BlockOrUnblockParams.RoomUUID, Valid: true},
	}
	err := p2pRoomsService.queries.ToggleBlockP2PRoom(ctx, params)
	if err != nil {
		return err
	}

	return nil
}

func (p2pRoomsService *P2PRoomsService) CreateMessageInP2PRoom(ctx context.Context, messageParams *RoomMessageParams) (*schemas.MessageResponse, error) {
	params := db.CreateMessageInP2PRoomParams{
		OwnerUuid: pgtype.UUID{Bytes: messageParams.OwnerUUID, Valid: true},
		RoomUuid:  pgtype.UUID{Bytes: messageParams.RoomUUID, Valid: true},
		Text:      pgtype.Text{String: messageParams.Text, Valid: true},
	}

	message, err := p2pRoomsService.queries.CreateMessageInP2PRoom(ctx, params)
	if err != nil {
		return nil, err
	}

	return &schemas.MessageResponse{
		OwnerID: utils.ConvertPgUUIDToUUID(message.OwnerUuid).String(),
		Message: message.Text.String,
	}, nil
}
