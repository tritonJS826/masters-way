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

func (roomsService *RoomsService) GetChatPreview(ctx context.Context, userID string) (*schemas.GetChatPreviewResponse, error) {
	userPgUUID := pgtype.UUID{Bytes: uuid.MustParse(userID), Valid: true}

	chatPreview, err := roomsService.roomsRepository.GetChatPreview(ctx, userPgUUID)
	if err != nil {
		return nil, err
	}

	return &schemas.GetChatPreviewResponse{
		UnreadMessagesAmount: int(chatPreview),
	}, nil
}

func (roomsService *RoomsService) GetRooms(ctx context.Context, userID string, roomType string) (*schemas.GetRoomsResponse, error) {
	params := db.GetRoomsByUserUUIDParams{
		UserUuid: pgtype.UUID{Bytes: uuid.MustParse(userID), Valid: true},
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

func (roomsService *RoomsService) GetRoomByUuid(ctx context.Context, userID, roomID string) (*schemas.RoomPopulatedResponse, error) {
	roomPgUUID := pgtype.UUID{Bytes: uuid.MustParse(roomID), Valid: true}
	userPgUUID := pgtype.UUID{Bytes: uuid.MustParse(userID), Valid: true}

	getRoomByUUIDParams := db.GetRoomByUUIDParams{
		RoomUuid: roomPgUUID,
		UserUuid: userPgUUID,
	}

	room, err := roomsService.roomsRepository.GetRoomByUUID(ctx, getRoomByUUIDParams)
	if err != nil {
		return nil, err
	}

	readMessagesParams := db.SetAllRoomMessagesAsReadParams{
		RoomUuid: roomPgUUID,
		UserUuid: userPgUUID,
	}
	err = roomsService.roomsRepository.SetAllRoomMessagesAsRead(ctx, readMessagesParams)
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
	CreatorID     string
	InvitedUserID *string
	Name          *string
	Type          string
}

func (roomsService *RoomsService) CreateRoom(ctx context.Context, roomParams *CreateRoomServiceParams) (*schemas.RoomPopulatedResponse, error) {
	creatorUserPgUUID := pgtype.UUID{Bytes: uuid.MustParse(roomParams.CreatorID), Valid: true}
	if roomParams.Type == string(db.RoomTypePrivate) {
		params := db.GetIsPrivateRoomAlreadyExistsParams{
			User1: creatorUserPgUUID,
			User2: pgtype.UUID{Bytes: uuid.MustParse(*roomParams.InvitedUserID), Valid: true},
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
			UserUuid: pgtype.UUID{Bytes: uuid.MustParse(*roomParams.InvitedUserID), Valid: true},
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

	return &schemas.RoomPopulatedResponse{
		RoomID:    utils.ConvertPgUUIDToUUID(newRoom.Uuid).String(),
		Users:     users,
		Name:      utils.MarshalPgText(newRoom.Name),
		Messages:  []schemas.MessageResponse{},
		IsBlocked: false,
		RoomType:  string(newRoom.Type),
	}, nil
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
