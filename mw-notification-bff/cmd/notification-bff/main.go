package main

import (
	"context"
	"fmt"
	"log"
	"mw-notification-bff/internal/config"
	"mw-notification-bff/internal/controllers"
	"mw-notification-bff/internal/routers"
	"mw-notification-bff/internal/services"

	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
)

// @title     Masters way notification-bff API
// @version 1.0
// @BasePath  /notification
func main() {
	newConfig, err := config.LoadConfig("./")
	if err != nil {
		fmt.Fprintf(os.Stderr, "cannot load config: %v\n", err)
		os.Exit(1)
	}

	conn, err := grpc.NewClient(newConfig.NotificationAPIHost, grpc.WithTransportCredentials(insecure.NewCredentials()))
	if err != nil {
		fmt.Fprintf(os.Stderr, "Unable to create connection: %v", err)
		os.Exit(1)
	}
	defer conn.Close()

	newService := services.NewService(&newConfig, conn)
	newController := controllers.NewController(newService)

	newRouter := routers.NewRouter(&newConfig, newController)
	newRouter.SetRoutes()

	newServer := &http.Server{
		Addr:    ":" + newConfig.ServerPort,
		Handler: newRouter.Gin,
	}

	go func() {
		if err := newServer.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatalf("Server start failed: %s\n", err)
		}
	}()
	log.Println("Server started successfully")

	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit
	log.Println("Shutdown initiated...")

	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	if err := newServer.Shutdown(ctx); err != nil {
		log.Printf("Server Shutdown Error: %v", err)
	}

	select {
	case <-ctx.Done():
		log.Println("Server shutdown completed or timed out")
	}

	log.Println("Server exiting")
	os.Exit(0)
}
