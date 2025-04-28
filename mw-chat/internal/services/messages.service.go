package services

import (
	"context"

	db "mw-chat/internal/db/sqlc"
	"mw-chat/internal/schemas"
	"mw-chat/pkg/utils"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgtype"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/samber/lo"
)

type IMessagesRepository interface {
	CreateMessage(ctx context.Context, arg db.CreateMessageParams) (db.CreateMessageRow, error)
	CreateMessageStatus(ctx context.Context, arg db.CreateMessageStatusParams) error
	GetUsersUUIDsInRoom(ctx context.Context, roomUuid pgtype.UUID) ([]pgtype.UUID, error)
	UpdateMessageStatus(ctx context.Context, arg db.UpdateMessageStatusParams) error
	SetAllRoomMessagesAsRead(ctx context.Context, arg db.SetAllRoomMessagesAsReadParams) error
	WithTx(tx pgx.Tx) *db.Queries
}

type MessagesService struct {
	pool               *pgxpool.Pool
	MessagesRepository IMessagesRepository
}

func NewMessagesService(pool *pgxpool.Pool, MessagesRepository IMessagesRepository) *MessagesService {
	return &MessagesService{pool, MessagesRepository}
}

type CreateMessageParams struct {
	OwnerUUID string
	RoomUUID  string
	Text      string
}

func (ms *MessagesService) CreateMessage(ctx context.Context, messageParams *CreateMessageParams) (*schemas.CreateMessageResponse, error) {
	tx, err := ms.pool.Begin(ctx)
	if err != nil {
		return nil, err
	}
	defer tx.Rollback(ctx)

	var messagesRepositoryTx IMessagesRepository = ms.MessagesRepository.WithTx(tx)

	roomPgUUID := pgtype.UUID{Bytes: uuid.MustParse(messageParams.RoomUUID), Valid: true}

	createMessageParams := db.CreateMessageParams{
		OwnerUuid: pgtype.UUID{Bytes: uuid.MustParse(messageParams.OwnerUUID), Valid: true},
		RoomUuid:  roomPgUUID,
		Text:      messageParams.Text,
	}

	message, err := messagesRepositoryTx.CreateMessage(ctx, createMessageParams)
	if err != nil {
		return nil, err
	}

	messageStatusParams := db.CreateMessageStatusParams{
		RoomUuid:    roomPgUUID,
		MessageUuid: message.Uuid,
		UserUuid:    message.OwnerUuid,
	}
	err = messagesRepositoryTx.CreateMessageStatus(ctx, messageStatusParams)
	if err != nil {
		return nil, err
	}

	userUUIDs, err := messagesRepositoryTx.GetUsersUUIDsInRoom(ctx, roomPgUUID)
	if err != nil {
		return nil, err
	}

	users := lo.Map(userUUIDs, func(user pgtype.UUID, i int) string {
		return utils.ConvertPgUUIDToUUID(user).String()
	})

	tx.Commit(ctx)

	return &schemas.CreateMessageResponse{
		Users: users,
		Message: schemas.MessageResponse{
			MessageID: utils.ConvertPgUUIDToUUID(message.Uuid).String(),
			OwnerID:   utils.ConvertPgUUIDToUUID(message.OwnerUuid).String(),
			Message:   message.Text,
			Readers:   []schemas.MessageReader{},
		},
	}, nil
}

type CreateGreetingMessageParams struct {
	RoomUUID string
}

var greetingChatMessage = "Hello! My name is Viktar, I'm a founder of Master's way. It is automated message, but I will be glad to reply you if you have any questions. Let me share with you one thing - you [can find here](https://youtu.be/WrgBgDZVVMo) short instructions about current app. Here you can find few examples of reports ([way1](https://mastersway.netlify.app/way/7f96584b-106a-4567-83ed-c404cbb828be), [way2](https://mastersway.netlify.app/way/2a32fd6e-55ae-4c3e-ac1f-ad02aec26d13)) and you can generate your own training program for free like here: ([training1](https://mastersway.netlify.app/training/776f8b9a-a146-43b5-be08-9514d8e34efb), [training2](https://mastersway.netlify.app/training/5dfd346c-5115-4526-8266-f2c632451b8b)). Also if you are looking for any kind of support or mentoring - just write me and I will help. Good luck :)"

// Viktar's prod user id
var greetingChatUserId = "ec3e7405-02d2-fdd4-e0ac-f9b1e2082f76"

func (messagesService *MessagesService) CreateGreetingMessage(ctx context.Context, params *CreateGreetingMessageParams) error {
	_, err := messagesService.CreateMessage(ctx, &CreateMessageParams{
		OwnerUUID: greetingChatUserId,
		RoomUUID:  params.RoomUUID,
		Text:      greetingChatMessage,
	})
	if err != nil {
		return err
	}

	return nil
}

type UpdateMessageStatusParams struct {
	MessageUUID uuid.UUID
	UserUUID    uuid.UUID
	IsRead      bool
}

func (messagesService *MessagesService) UpdateMessageStatus(ctx context.Context, params *UpdateMessageStatusParams) error {
	updateMessageStatusParams := db.UpdateMessageStatusParams{
		IsRead:      params.IsRead,
		MessageUuid: pgtype.UUID{Bytes: params.MessageUUID, Valid: true},
		UserUuid:    pgtype.UUID{Bytes: params.UserUUID, Valid: true},
	}

	err := messagesService.MessagesRepository.UpdateMessageStatus(ctx, updateMessageStatusParams)
	if err != nil {
		return err
	}

	return nil
}

func (messagesService *MessagesService) SetAllRoomMessagesAsRead(ctx context.Context, userUUID, roomUUID uuid.UUID) error {
	return messagesService.MessagesRepository.SetAllRoomMessagesAsRead(ctx, db.SetAllRoomMessagesAsReadParams{
		RoomUuid: pgtype.UUID{Bytes: roomUUID, Valid: true},
		UserUuid: pgtype.UUID{Bytes: userUUID, Valid: true},
	})
}
