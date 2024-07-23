package services

import (
	"context"
	db "mwchat/internal/db/sqlc"
	"mwchat/internal/schemas"
	"mwchat/pkg/utils"
	"time"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgtype"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/samber/lo"
)

type GroupRoomsRepository interface {
	AddUserToGroupRoom(ctx context.Context, arg db.AddUserToGroupRoomParams) error
	CreateGroupRoom(ctx context.Context, arg db.CreateGroupRoomParams) (db.CreateGroupRoomRow, error)
	GetGroupRoomByUUID(ctx context.Context, arg db.GetGroupRoomByUUIDParams) (db.GetGroupRoomByUUIDRow, error)
	GetGroupRoomsByUserUUID(ctx context.Context, userUuid pgtype.UUID) ([]db.GetGroupRoomsByUserUUIDRow, error)
	GetGroupMessagesByRoomUUID(ctx context.Context, roomUuid pgtype.UUID) ([]db.GetGroupMessagesByRoomUUIDRow, error)
	ToggleBlockGroupRoom(ctx context.Context, arg db.ToggleBlockGroupRoomParams) error

	WithTx(tx pgx.Tx) *db.Queries
}

type GroupRoomsService struct {
	pool                 *pgxpool.Pool
	groupRoomsRepository GroupRoomsRepository
}

func NewGroupRoomsService(pool *pgxpool.Pool, groupRoomsRepository GroupRoomsRepository) *GroupRoomsService {
	return &GroupRoomsService{pool, groupRoomsRepository}
}

func (groupRoomsService *GroupRoomsService) GetGroupRoomsPreview(ctx context.Context, userUuid uuid.UUID) (*schemas.GetRoomsResponse, error) {
	groupRoomsRaw, err := groupRoomsService.groupRoomsRepository.GetGroupRoomsByUserUUID(ctx, pgtype.UUID{Bytes: userUuid})
	if err != nil {
		return nil, err
	}

	rooms := lo.Map(groupRoomsRaw, func(dbRoom db.GetGroupRoomsByUserUUIDRow, i int) schemas.RoomPreviewResponse {
		return schemas.RoomPreviewResponse{
			RoomID:    utils.ConvertPgUUIDToUUID(dbRoom.Uuid).String(),
			UserID:    utils.ConvertPgUUIDToUUID(dbRoom.FirstUserUuid).String(),
			Name:      dbRoom.Name,
			IsBlocked: dbRoom.IsBlocked,
		}
	})

	return &schemas.GetRoomsResponse{
		Size:  len(rooms),
		Rooms: rooms,
	}, nil
}

func (groupRoomsService *GroupRoomsService) GetPopulatedGroupRoom(ctx context.Context, userUUID, roomUUID uuid.UUID) (*schemas.RoomPopulatedResponse, error) {
	params := db.GetGroupRoomByUUIDParams{
		UserUuid: pgtype.UUID{Bytes: userUUID, Valid: true},
		RoomUuid: pgtype.UUID{Bytes: roomUUID, Valid: true},
	}

	groupRoom, err := groupRoomsService.groupRoomsRepository.GetGroupRoomByUUID(ctx, params)
	if err != nil {
		return nil, err
	}

	messagesRaw, err := groupRoomsService.groupRoomsRepository.GetGroupMessagesByRoomUUID(ctx, pgtype.UUID{Bytes: roomUUID, Valid: true})
	if err != nil {
		return nil, err
	}

	messages := lo.Map(messagesRaw, func(dbMessage db.GetGroupMessagesByRoomUUIDRow, i int) schemas.MessageResponse {
		return schemas.MessageResponse{
			OwnerID: utils.ConvertPgUUIDToUUID(dbMessage.OwnerUuid).String(),
			Message: dbMessage.Text,
		}
	})

	return &schemas.RoomPopulatedResponse{
		RoomID:    utils.ConvertPgUUIDToUUID(groupRoom.Uuid).String(),
		UserID:    utils.ConvertPgUUIDToUUID(groupRoom.FirstUserUuid).String(),
		Name:      groupRoom.Name,
		Messages:  messages,
		IsBlocked: groupRoom.IsBlocked,
	}, nil
}

func (groupRoomsService *GroupRoomsService) CreateGroupRoom(ctx context.Context, roomName string, userUUID uuid.UUID) (*schemas.RoomPopulatedResponse, error) {
	now := time.Now()

	tx, err := groupRoomsService.pool.Begin(ctx)
	if err != nil {
		return nil, err
	}
	defer tx.Rollback(ctx)

	qtx := groupRoomsService.groupRoomsRepository.WithTx(tx)

	createGroupRoomParams := db.CreateGroupRoomParams{
		Name:      roomName,
		CreatedAt: pgtype.Timestamp{Time: now, Valid: true},
	}
	newGroupRoom, err := qtx.CreateGroupRoom(ctx, createGroupRoomParams)
	if err != nil {
		return nil, err
	}

	addUserParams := db.AddUserToGroupRoomParams{
		UserUuid: pgtype.UUID{Bytes: userUUID, Valid: true},
		RoomUuid: newGroupRoom.Uuid,
		Role:     db.GroupUserRoleAdmin,
		JoinedAt: pgtype.Timestamp{Time: now, Valid: true},
	}
	err = qtx.AddUserToGroupRoom(ctx, addUserParams)
	if err != nil {
		return nil, err
	}

	tx.Commit(ctx)

	return &schemas.RoomPopulatedResponse{
		RoomID:    utils.ConvertPgUUIDToUUID(newGroupRoom.Uuid).String(),
		Name:      newGroupRoom.Name,
		Messages:  []schemas.MessageResponse{},
		IsBlocked: newGroupRoom.IsBlocked,
	}, nil
}

func (groupRoomsService *GroupRoomsService) BlockOrUnblockGroupRoom(ctx context.Context, blockOrUnblockParams *BlockOrUnblockRoomParams) error {
	params := db.ToggleBlockGroupRoomParams{
		UserUuid:  pgtype.UUID{Bytes: blockOrUnblockParams.UserUUID, Valid: blockOrUnblockParams.IsBlocked},
		RoomUuid:  pgtype.UUID{Bytes: blockOrUnblockParams.RoomUUID, Valid: true},
		IsBlocked: blockOrUnblockParams.IsBlocked,
	}
	err := groupRoomsService.groupRoomsRepository.ToggleBlockGroupRoom(ctx, params)
	if err != nil {
		return err
	}

	return nil
}

func (groupRoomsService *GroupRoomsService) AddUserToGroupRoom() {
	// groupRoomId := ctx.Param("groupRoomId")
	// userId := ctx.Param("userId")
	// fmt.Println(groupRoomId, userId)

	// ctx.JSON(http.StatusOK, &schemas.RoomPopulatedResponse{})
}

func (groupRoomsService *GroupRoomsService) DeleteUserFromGroupRoom() {
	// groupRoomId := ctx.Param("groupRoomId")
	// userId := ctx.Param("userId")
	// fmt.Println(groupRoomId, userId)

	// ctx.JSON(http.StatusOK, &schemas.RoomPopulatedResponse{})
}

func (groupRoomsService *GroupRoomsService) GetRequestsToGroupRoom() {
	// ctx.JSON(http.StatusOK, &schemas.GetRequestsToGroupRoomResponse{})
}

func (groupRoomsService *GroupRoomsService) CreateRequestsToGroupRoom() {
	// var payload *schemas.CreateRequestToGroupRoomPayload

	// if err := ctx.ShouldBindJSON(&payload); err != nil {
	// 	ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	// 	return
	// }
	// ctx.Status(http.StatusNoContent)
}

func (groupRoomsService *GroupRoomsService) AGroupRoomsServiceeptRequestsToGroupRoom() {
	// groupRoomId := ctx.Param("groupRoomId")
	// fmt.Println(groupRoomId)

	// ctx.JSON(http.StatusOK, &schemas.RoomPopulatedResponse{})
}

func (groupRoomsService *GroupRoomsService) DeclineRequestsToGroupRoom() {
	// groupRoomId := ctx.Param("groupRoomId")
	// fmt.Println(groupRoomId)

	// ctx.JSON(http.StatusOK, &schemas.DeclineRequestToGroupRoomResponse{})
}

func (groupRoomsService *GroupRoomsService) CreateMessageInGroupRoom() {
	// var payload *schemas.CreateMessagePayload

	// if err := ctx.ShouldBindJSON(&payload); err != nil {
	// 	ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	// 	return
	// }
	// ctx.JSON(http.StatusOK, &schemas.MessageResponse{})
}
