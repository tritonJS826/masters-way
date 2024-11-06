package main

import (
	"context"
	"fmt"
	"log"
	"mw-notification/internal/config"
	"mw-notification/internal/controllers"
	"mw-notification/internal/routers"
	"mw-notification/internal/schemas"
	"mw-notification/internal/services"
	"mw-notification/pkg/database"
	pb "mw-notification/pkg/notification_v1/proto"
	"net"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/google/uuid"
	"github.com/samber/lo"
	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"
)

const grpcPort = 50051

type notificationServer struct {
	notificationService *services.NotificationService
	pb.UnimplementedNotificationV1Server
}

type enabledNotificationServer struct {
	enabledNotificationService *services.EnabledNotificationService
	pb.UnimplementedEnabledNotificationV1Server
}

func (ns *notificationServer) Get(ctx context.Context, in *pb.GetNotificationListRequest) (*pb.GetNotificationListResponse, error) {
	getNotificationResponseRaw, err := ns.notificationService.GetNotificationListByUserID(ctx, uuid.MustParse(in.GetUserUuid()))
	if err != nil {
		return nil, err
	}

	notifications := lo.Map(getNotificationResponseRaw.Notifications, func(notificationRaw schemas.NotificationResponse, _ int) *pb.NotificationResponse {
		return &pb.NotificationResponse{
			Uuid:        notificationRaw.UUID,
			UserUuid:    notificationRaw.UserUUID,
			IsRead:      notificationRaw.IsRead,
			Description: notificationRaw.Description,
			Url:         notificationRaw.Url,
			Nature:      notificationRaw.Nature,
			CreatedAt:   notificationRaw.CreatedAt,
		}
	})

	return &pb.GetNotificationListResponse{
		Size:          int32(getNotificationResponseRaw.Size),
		Notifications: notifications,
	}, nil
}

func (ns *notificationServer) Update(ctx context.Context, in *pb.UpdateNotificationRequest) (*pb.NotificationResponse, error) {
	notification, err := ns.notificationService.UpdateNotification(ctx, &services.UpdateNotificationParams{
		NotificationID: uuid.MustParse(in.GetNotificationUuid()),
		IsRead:         in.GetIsRead(),
	})
	if err != nil {
		return nil, err
	}

	return &pb.NotificationResponse{
		Uuid:        notification.UUID,
		UserUuid:    notification.UserUUID,
		IsRead:      notification.IsRead,
		Description: notification.Description,
		Url:         notification.Url,
		Nature:      notification.Nature,
		CreatedAt:   notification.CreatedAt,
	}, nil
}

func (ns *enabledNotificationServer) Get(ctx context.Context, in *pb.GetEnabledNotificationListRequest) (*pb.GetEnabledNotificationListResponse, error) {
	getEnabledNotificationListRaw, err := ns.enabledNotificationService.GetEnabledNotificationListByUserID(ctx, uuid.MustParse(in.GetUserUuid()))
	if err != nil {
		return nil, err
	}

	notifications := lo.Map(getEnabledNotificationListRaw.EnabledNotifications, func(notificationRaw schemas.EnabledNotificationResponse, _ int) *pb.EnabledNotificationResponse {
		return &pb.EnabledNotificationResponse{
			Uuid:      notificationRaw.UUID,
			UserUuid:  notificationRaw.UserUUID,
			Nature:    notificationRaw.Nature,
			Channel:   notificationRaw.Channel,
			IsEnabled: notificationRaw.IsEnabled,
		}
	})

	return &pb.GetEnabledNotificationListResponse{
		EnabledNotifications: notifications,
	}, nil
}

func (ns *enabledNotificationServer) Update(ctx context.Context, in *pb.UpdateEnabledNotificationRequest) (*pb.EnabledNotificationResponse, error) {
	enabledNotification, err := ns.enabledNotificationService.UpdateEnabledNotification(ctx, &services.UpdateEnabledNotificationParams{
		EnabledNotificationUUID: uuid.MustParse(in.GetEnabledNotificationUuid()),
		IsEnabled:               in.GetIsEnabled(),
	})
	if err != nil {
		return nil, err
	}

	return &pb.EnabledNotificationResponse{
		Uuid:      enabledNotification.UUID,
		UserUuid:  enabledNotification.UserUUID,
		Nature:    enabledNotification.Nature,
		Channel:   enabledNotification.Channel,
		IsEnabled: enabledNotification.IsEnabled,
	}, nil
}

// @title     Masters way notification API
// @version 1.0
// @BasePath  /notification
func main() {
	newConfig, err := config.LoadConfig("./")
	if err != nil {
		fmt.Fprintf(os.Stderr, "cannot load config: %v\n", err)
		os.Exit(1)
	}

	newPool, err := database.NewPostgresDB(&newConfig)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Unable to create connection pool: %v\n", err)
		os.Exit(1)
	}
	defer newPool.Close()

	newService := services.NewService(newPool)
	newController := controllers.NewController(newService)

	newRouter := routers.NewRouter(&newConfig, newController)
	newRouter.SetRoutes()

	newServer := &http.Server{
		Addr:    ":" + newConfig.ServerPort,
		Handler: newRouter.Gin,
	}

	// Start the server in a separate goroutine
	go func() {
		if err := newServer.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatalf("Server start failed: %s\n", err)
		}
	}()
	log.Println("Server started successfully")

	// Start gRPC server in a separate goroutine
	go func() {
		lis, err := net.Listen("tcp", fmt.Sprintf(":%d", grpcPort))
		if err != nil {
			log.Fatalf("failed to listen: %v", err)
		}

		s := grpc.NewServer()
		reflection.Register(s)
		pb.RegisterNotificationV1Server(s, &notificationServer{
			notificationService: newService.NotificationService,
		})
		pb.RegisterEnabledNotificationV1Server(s, &enabledNotificationServer{
			enabledNotificationService: newService.EnabledNotificationService,
		})

		log.Printf("gRPC server listening at %v", lis.Addr())

		if err := s.Serve(lis); err != nil {
			log.Fatalf("failed to serve: %v", err)
		}
	}()
	log.Println("gRPC server started successfully")

	// Set up signal catching
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit
	log.Println("Shutdown initiated...")

	// Context for graceful shutdown with a timeout of 3 seconds
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	// Attempt to gracefully shutdown the server
	if err := newServer.Shutdown(ctx); err != nil {
		log.Printf("Server Shutdown Error: %v", err)
	}

	// Waiting for the shutdown context to be done or timeout
	select {
	case <-ctx.Done():
		log.Println("Server shutdown completed or timed out")
	}

	log.Println("Server exiting")
	os.Exit(0)
}
