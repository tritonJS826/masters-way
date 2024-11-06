package services

import (
	"mw-notification-bff/internal/config"
	"mw-notification-bff/internal/openapi"
	notification_grpc "mw-notification/pkg/notification_v1/proto"
)

type Service struct {
	GeneralService      *GeneralService
	NotificationService *NotificationService
}

func NewService(
	config *config.Config,
	notificationGRPCClient notification_grpc.NotificationV1Client,
	enabledNotificationGRPCClient notification_grpc.EnabledNotificationV1Client,
) *Service {
	var notificationApi = openapi.MakeNotificationAPIClient(config)
	var notificationBFFApi = openapi.MakeNotificationBFFAPIClient(config)

	return &Service{
		GeneralService:      NewGeneralService(notificationBFFApi),
		NotificationService: NewNotificationService(notificationApi, notificationGRPCClient, enabledNotificationGRPCClient),
	}
}

type PopulatedUser struct {
	UserID   string
	Name     string
	ImageURL string
}
