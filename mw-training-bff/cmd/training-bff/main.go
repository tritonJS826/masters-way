package main

import (
	"context"
	"fmt"
	"log"
	"mw-training-bff/internal/config"
	"mw-training-bff/internal/controllers"
	"mw-training-bff/internal/routers"
	"mw-training-bff/internal/services"

	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
)

// @title     Masters way training-bff API
// @version 1.0
// @BasePath  /training
func main() {
	newConfig, err := config.LoadConfig("./")
	if err != nil {
		fmt.Fprintf(os.Stderr, "cannot load config: %v\n", err)
		os.Exit(1)
	}

	conn, err := grpc.NewClient(newConfig.TrainingAPIHost, grpc.WithTransportCredentials(insecure.NewCredentials()))
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
