package services

import (
	"context"
	"mw-chat/internal/schemas"
	"mw-chat/pkg/utils"
	"time"

	"errors"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgtype"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/samber/lo"

	db "mw-chat/internal/db/sqlc"
)

var ErrPrivateRoomAlreadyExists = errors.New("A private room for these users already exists")

type RoomsRepository interface {
	GetChatPreview(ctx context.Context, userUUID pgtype.UUID) (int64, error)
	CreateMessage(ctx context.Context, arg db.CreateMessageParams) (db.CreateMessageRow, error)
	GetPrivateRoomByUserUUIDs(ctx context.Context, arg db.GetPrivateRoomByUserUUIDsParams) (pgtype.UUID, error)
	GetMessagesByRoomUUID(ctx context.Context, roomUuid pgtype.UUID) ([]db.GetMessagesByRoomUUIDRow, error)
	GetRoomsByUserUUID(ctx context.Context, arg db.GetRoomsByUserUUIDParams) ([]db.GetRoomsByUserUUIDRow, error)
	GetRoomByUUID(ctx context.Context, arg db.GetRoomByUUIDParams) (db.GetRoomByUUIDRow, error)
	GetUsersUUIDsInRoom(ctx context.Context, roomUuid pgtype.UUID) ([]pgtype.UUID, error)
	AddUserToRoom(ctx context.Context, arg db.AddUserToRoomParams) (db.AddUserToRoomRow, error)
	SetAllRoomMessagesAsRead(ctx context.Context, arg db.SetAllRoomMessagesAsReadParams) error
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
	userPgUUID := pgtype.UUID{Bytes: userUUID, Valid: true}

	chatPreview, err := roomsService.roomsRepository.GetChatPreview(ctx, userPgUUID)
	if err != nil {
		return nil, err
	}

	return &schemas.GetChatPreviewResponse{
		UnreadMessagesAmount: int(chatPreview),
	}, nil
}

func (roomsService *RoomsService) GetRooms(ctx context.Context, userUUID uuid.UUID, roomType string) (*schemas.GetRoomsResponse, error) {
	params := db.GetRoomsByUserUUIDParams{
		UserUuid: pgtype.UUID{Bytes: userUUID, Valid: true},
		RoomType: db.RoomType(roomType),
	}

	roomsRaw, err := roomsService.roomsRepository.GetRoomsByUserUUID(ctx, params)
	if err != nil {
		return nil, err
	}

	rooms := lo.Map(roomsRaw, func(dbRoom db.GetRoomsByUserUUIDRow, _ int) schemas.RoomPreviewResponse {
		users := lo.Map(dbRoom.UserUuids, func(_ pgtype.UUID, i int) schemas.UserResponse {
			return schemas.UserResponse{
				UserID: utils.ConvertPgUUIDToUUID(dbRoom.UserUuids[i]).String(),
				Role:   dbRoom.UserRoles[i],
			}
		})
		return schemas.RoomPreviewResponse{
			RoomID:    utils.ConvertPgUUIDToUUID(dbRoom.Uuid).String(),
			Name:      utils.MarshalPgText(dbRoom.Name),
			RoomType:  string(dbRoom.Type),
			IsBlocked: dbRoom.IsRoomBlocked,
			Users:     users,
		}
	})

	return &schemas.GetRoomsResponse{
		Size:  len(rooms),
		Rooms: rooms,
	}, nil
}

func (roomsService *RoomsService) GetRoomByUUID(ctx context.Context, userUUID, roomUUID uuid.UUID) (*schemas.RoomPopulatedResponse, error) {
	roomPgUUID := pgtype.UUID{Bytes: roomUUID, Valid: true}
	userPgUUID := pgtype.UUID{Bytes: userUUID, Valid: true}

	room, err := roomsService.roomsRepository.GetRoomByUUID(ctx, db.GetRoomByUUIDParams{
		RoomUuid: roomPgUUID,
		UserUuid: userPgUUID,
	})
	if err != nil {
		return nil, err
	}

	err = roomsService.roomsRepository.SetAllRoomMessagesAsRead(ctx, db.SetAllRoomMessagesAsReadParams{
		RoomUuid: roomPgUUID,
		UserUuid: userPgUUID,
	})
	if err != nil {
		return nil, err
	}

	users := lo.Map(room.UserUuids, func(_ pgtype.UUID, i int) schemas.UserResponse {
		return schemas.UserResponse{
			UserID: utils.ConvertPgUUIDToUUID(room.UserUuids[i]).String(),
			Role:   room.UserRoles[i],
		}
	})

	messagesRaw, err := roomsService.roomsRepository.GetMessagesByRoomUUID(ctx, roomPgUUID)
	if err != nil {
		return nil, err
	}

	messages := lo.Map(messagesRaw, func(dbMessage db.GetMessagesByRoomUUIDRow, i int) schemas.MessageResponse {
		messageReaders := make([]schemas.MessageReader, len(dbMessage.MessageStatusUserUuids))
		for i := range dbMessage.MessageStatusUserUuids {
			messageReaders[i] = schemas.MessageReader{
				UserID:   utils.ConvertPgUUIDToUUID(dbMessage.MessageStatusUserUuids[i]).String(),
				ReadDate: dbMessage.MessageStatusUpdatedAt[i].Time.Format(utils.DEFAULT_STRING_LAYOUT),
			}
		}

		return schemas.MessageResponse{
			MessageID: utils.ConvertPgUUIDToUUID(dbMessage.Uuid).String(),
			OwnerID:   utils.ConvertPgUUIDToUUID(dbMessage.OwnerUuid).String(),
			Message:   dbMessage.Text,
			Readers:   messageReaders,
		}
	})

	return &schemas.RoomPopulatedResponse{
		RoomID:    utils.ConvertPgUUIDToUUID(room.Uuid).String(),
		Users:     users,
		Name:      utils.MarshalPgText(room.Name),
		Messages:  messages,
		IsBlocked: room.IsRoomBlocked,
		RoomType:  string(room.Type),
	}, nil
}

type CreateRoomServiceParams struct {
	CreatorUUID     uuid.UUID
	InvitedUserUUID *string
	Name            *string
	Type            string
}

func (roomsService *RoomsService) FindOrCreateRoomUUID(ctx context.Context, roomParams *CreateRoomServiceParams) (uuid.UUID, error) {
	creatorUserPgUUID := pgtype.UUID{Bytes: roomParams.CreatorUUID, Valid: true}

	if roomParams.Type == string(db.RoomTypePrivate) {
		roomPgUUID, err := roomsService.roomsRepository.GetPrivateRoomByUserUUIDs(ctx, db.GetPrivateRoomByUserUUIDsParams{
			User1: creatorUserPgUUID,
			User2: pgtype.UUID{Bytes: uuid.MustParse(*roomParams.InvitedUserUUID), Valid: true},
		})
		if err == nil {
			return roomPgUUID.Bytes, nil
		}
	}

	response, err := roomsService.createRoomTransaction(ctx, roomParams, creatorUserPgUUID)
	if err != nil {
		return uuid.Nil, err
	}

	return response, nil
}

func (roomsService *RoomsService) createRoomTransaction(ctx context.Context, roomParams *CreateRoomServiceParams, creatorUserPgUUID pgtype.UUID) (uuid.UUID, error) {
	tx, err := roomsService.pool.Begin(ctx)
	if err != nil {
		return uuid.Nil, err
	}
	defer tx.Rollback(ctx)

	qtx := roomsService.roomsRepository.WithTx(tx)

	var name string
	var creatorUserRole db.UserRoleType = db.UserRoleTypeRegular

	if roomParams.Type == string(db.RoomTypeGroup) {
		creatorUserRole = db.UserRoleTypeAdmin
		name = *roomParams.Name
	}

	now := time.Now()
	newRoom, err := qtx.CreateRoom(ctx, db.CreateRoomParams{
		CreatedAt: pgtype.Timestamp{Time: now, Valid: true},
		Name:      pgtype.Text{String: name, Valid: name != ""},
		Type:      db.RoomType(roomParams.Type),
	})
	if err != nil {
		return uuid.Nil, err
	}

	_, err = qtx.AddUserToRoom(ctx, db.AddUserToRoomParams{
		UserUuid: creatorUserPgUUID,
		UserRole: creatorUserRole,
		RoomUuid: newRoom.Uuid,
		JoinedAt: pgtype.Timestamp{Time: now, Valid: true},
	})
	if err != nil {
		return uuid.Nil, err
	}

	if roomParams.Type == string(db.RoomTypePrivate) {
		_, err := qtx.AddUserToRoom(ctx, db.AddUserToRoomParams{
			UserUuid: pgtype.UUID{Bytes: uuid.MustParse(*roomParams.InvitedUserUUID), Valid: true},
			UserRole: db.UserRoleTypeRegular,
			RoomUuid: newRoom.Uuid,
			JoinedAt: pgtype.Timestamp{Time: now, Valid: true},
		})
		if err != nil {
			return uuid.Nil, err
		}
	}

	tx.Commit(ctx)

	return newRoom.Uuid.Bytes, nil
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
