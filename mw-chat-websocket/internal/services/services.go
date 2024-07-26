package services

import (
	"context"
)

type ISocketService interface {
	ConnectSocket(ctx context.Context) error
}

type Service struct {
	ISocketService
}

func NewService() *Service {
	return &Service{
		ISocketService: NewSocketService(),
	}
}
