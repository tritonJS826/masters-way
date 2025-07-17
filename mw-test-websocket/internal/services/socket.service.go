package services

import (
	"context"

	"errors"
)

var ErrPrivateRoomAlreadyExists = errors.New("A private room for these users already exists")

type SocketService struct {
}

func NewSocketService() *SocketService {
	return &SocketService{}
}

func (socketService *SocketService) ConnectSocket(ctx context.Context) error {
	// userPgUUID := pgtype.UUID{Bytes: userUUID, Valid: true}

	// chatPreview, err := roomsService.roomsRepository.GetChatPreview(ctx, userPgUUID)
	// if err != nil {
	// 	return nil, err
	// }

	// return &schemas.GetChatPreviewResponse{
	// 	UnreadMessagesAmount: int(chatPreview),
	// }, nil
	return nil
}
