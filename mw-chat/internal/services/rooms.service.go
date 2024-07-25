package services

import (
	"context"
	"mwchat/internal/schemas"
	"mwchat/pkg/utils"
	"time"

	"errors"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgtype"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/samber/lo"

	db "mwchat/internal/db/sqlc"
)

var ErrPrivateRoomAlreadyExists = errors.New("A private room for these users already exists")

type RoomsRepository interface {
	GetChatPreview(ctx context.Context, userUUID pgtype.UUID) (int64, error)
	CreateMessage(ctx context.Context, arg db.CreateMessageParams) (db.CreateMessageRow, error)
	GetIsPrivateRoomAlreadyExists(ctx context.Context, arg db.GetIsPrivateRoomAlreadyExistsParams) (bool, error)
	GetMessagesByRoomUUID(ctx context.Context, roomUuid pgtype.UUID) ([]db.GetMessagesByRoomUUIDRow, error)
	GetRoomsByUserUUID(ctx context.Context, arg db.GetRoomsByUserUUIDParams) ([]db.GetRoomsByUserUUIDRow, error)
	GetRoomByUUID(ctx context.Context, arg db.GetRoomByUUIDParams) (db.GetRoomByUUIDRow, error)
	AddUserToRoom(ctx context.Context, arg db.AddUserToRoomParams) (db.AddUserToRoomRow, error)
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

	rooms := lo.Map(roomsRaw, func(dbRoom db.GetRoomsByUserUUIDRow, i int) schemas.RoomPreviewResponse {
		users := make([]schemas.UserResponse, len(dbRoom.UserUuids))
		for i := range dbRoom.UserUuids {
			users[i] = schemas.UserResponse{
				UserID: utils.ConvertPgUUIDToUUID(dbRoom.UserUuids[i]).String(),
				Role:   dbRoom.UserRoles[i],
			}
		}
		return schemas.RoomPreviewResponse{
			RoomID:    utils.ConvertPgUUIDToUUID(dbRoom.Uuid).String(),
			Name:      dbRoom.Name.String,
			Users:     users,
			IsBlocked: dbRoom.IsRoomBlocked,
		}
	})

	return &schemas.GetRoomsResponse{
		Size:  len(rooms),
		Rooms: rooms,
	}, nil
}

func (roomsService *RoomsService) GetRoomByUuid(ctx context.Context, userUUID, roomUUID uuid.UUID) (*schemas.RoomPopulatedResponse, error) {
	roomPgUUID := pgtype.UUID{Bytes: roomUUID, Valid: true}
	params := db.GetRoomByUUIDParams{
		RoomUuid: roomPgUUID,
		UserUuid: pgtype.UUID{Bytes: userUUID, Valid: true},
	}

	room, err := roomsService.roomsRepository.GetRoomByUUID(ctx, params)
	if err != nil {
		return nil, err
	}

	users := make([]schemas.UserResponse, len(room.UserUuids))
	for i := range room.UserUuids {
		users[i] = schemas.UserResponse{
			UserID: utils.ConvertPgUUIDToUUID(room.UserUuids[i]).String(),
			Role:   room.UserRoles[i],
		}
	}

	messagesRaw, err := roomsService.roomsRepository.GetMessagesByRoomUUID(ctx, roomPgUUID)
	if err != nil {
		return nil, err
	}

	messages := lo.Map(messagesRaw, func(dbMessage db.GetMessagesByRoomUUIDRow, i int) schemas.MessageResponse {
		messageReaders := make([]schemas.MessageReaders, len(room.UserUuids))
		for i := range dbMessage.MessageStatusUserUuids {
			users[i] = schemas.UserResponse{
				UserID: utils.ConvertPgUUIDToUUID(room.UserUuids[i]).String(),
				Role:   room.UserRoles[i],
			}
		}

		return schemas.MessageResponse{
			OwnerID: utils.ConvertPgUUIDToUUID(dbMessage.OwnerUuid).String(),
			Message: dbMessage.Text,
			Readers: messageReaders,
		}
	})

	response := &schemas.RoomPopulatedResponse{
		RoomID:    utils.ConvertPgUUIDToUUID(room.Uuid).String(),
		Users:     users,
		Messages:  messages,
		IsBlocked: room.IsRoomBlocked,
		RoomType:  string(room.Type),
	}
	if room.Name.Valid {
		response.Name = &room.Name.String
	}

	return response, nil

}

func (roomsService *RoomsService) CreateRoom(ctx context.Context, roomParams *CreateRoomServiceParams) (*schemas.RoomPopulatedResponse, error) {
	creatorUserPgUUID := pgtype.UUID{Bytes: roomParams.CreatorUUID, Valid: true}
	if roomParams.Type == string(db.RoomTypePrivate) {
		params := db.GetIsPrivateRoomAlreadyExistsParams{
			User1: creatorUserPgUUID,
			User2: pgtype.UUID{Bytes: uuid.MustParse(*roomParams.InvitedUserUUID), Valid: true},
		}
		isPrivateRoomAlreadyExists, err := roomsService.roomsRepository.GetIsPrivateRoomAlreadyExists(ctx, params)
		if err != nil {
			return nil, err
		}
		if isPrivateRoomAlreadyExists {
			return nil, ErrPrivateRoomAlreadyExists
		}
	}

	response, err := roomsService.createRoomTransaction(ctx, roomParams, creatorUserPgUUID)
	if err != nil {
		return nil, err
	}

	return response, nil
}

func (roomsService *RoomsService) createRoomTransaction(ctx context.Context, roomParams *CreateRoomServiceParams, creatorUserPgUUID pgtype.UUID) (*schemas.RoomPopulatedResponse, error) {
	now := time.Now()
	tx, err := roomsService.pool.Begin(ctx)
	if err != nil {
		return nil, err
	}
	defer tx.Rollback(ctx)

	qtx := roomsService.roomsRepository.WithTx(tx)

	var name string
	var creatorUserRole db.UserRoleType = db.UserRoleTypeRegular

	if roomParams.Type == string(db.RoomTypeGroup) {
		creatorUserRole = db.UserRoleTypeAdmin
		name = *roomParams.Name
	}

	createRoomDBParams := db.CreateRoomParams{
		CreatedAt: pgtype.Timestamp{Time: now, Valid: true},
		Name:      pgtype.Text{String: name, Valid: name != ""},
		Type:      db.RoomType(roomParams.Type),
	}
	newRoom, err := qtx.CreateRoom(ctx, createRoomDBParams)
	if err != nil {
		return nil, err
	}

	createCreatorUserParams := db.AddUserToRoomParams{
		UserUuid: creatorUserPgUUID,
		UserRole: creatorUserRole,
		RoomUuid: newRoom.Uuid,
		JoinedAt: pgtype.Timestamp{Time: now, Valid: true},
	}
	creatorUser, err := qtx.AddUserToRoom(ctx, createCreatorUserParams)
	if err != nil {
		return nil, err
	}

	users := []schemas.UserResponse{}
	users = append(users, schemas.UserResponse{
		UserID: utils.ConvertPgUUIDToUUID(creatorUser.UserUuid).String(),
		Role:   string(creatorUser.UserRole),
	})

	if roomParams.Type == string(db.RoomTypePrivate) {
		createInvitedUserParams := db.AddUserToRoomParams{
			UserUuid: pgtype.UUID{Bytes: uuid.MustParse(*roomParams.InvitedUserUUID), Valid: true},
			UserRole: db.UserRoleTypeRegular,
			RoomUuid: newRoom.Uuid,
			JoinedAt: pgtype.Timestamp{Time: now, Valid: true},
		}
		invitedUser, err := qtx.AddUserToRoom(ctx, createInvitedUserParams)
		if err != nil {
			return nil, err
		}
		users = append(users, schemas.UserResponse{
			UserID: utils.ConvertPgUUIDToUUID(invitedUser.UserUuid).String(),
			Role:   string(invitedUser.UserRole),
		})
	}

	tx.Commit(ctx)

	var responseRoomName string
	if newRoom.Name.Valid {
		responseRoomName = newRoom.Name.String
	}

	return &schemas.RoomPopulatedResponse{
		RoomID:    utils.ConvertPgUUIDToUUID(newRoom.Uuid).String(),
		Users:     users,
		Name:      &responseRoomName,
		Messages:  []schemas.MessageResponse{},
		IsBlocked: false,
		RoomType:  string(newRoom.Type),
	}, nil
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

func (roomsService *RoomsService) CreateMessage(ctx context.Context, messageParams *RoomMessageParams) (*schemas.MessageResponse, error) {
	tx, err := roomsService.pool.Begin(ctx)
	if err != nil {
		return nil, err
	}
	defer tx.Rollback(ctx)

	qtx := roomsService.roomsRepository.WithTx(tx)

	createMessageParams := db.CreateMessageParams{
		OwnerUuid: pgtype.UUID{Bytes: messageParams.OwnerUUID, Valid: true},
		RoomUuid:  pgtype.UUID{Bytes: messageParams.RoomUUID, Valid: true},
		Text:      messageParams.Text,
	}

	message, err := qtx.CreateMessage(ctx, createMessageParams)
	if err != nil {
		return nil, err
	}

	messageStatusParams := db.CreateMessageStatusParams{
		MessageUuid:  message.Uuid,
		ReceiverUuid: message.OwnerUuid,
	}
	err = qtx.CreateMessageStatus(ctx, messageStatusParams)
	if err != nil {
		return nil, err
	}

	tx.Commit(ctx)

	return &schemas.MessageResponse{
		OwnerID: utils.ConvertPgUUIDToUUID(message.OwnerUuid).String(),
		Message: message.Text,
		Readers: []schemas.MessageReaders{},
	}, nil
}
