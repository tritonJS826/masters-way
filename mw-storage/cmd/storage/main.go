package main

import (
	"context"
	"fmt"
	"log"
	"mwstorage/internal/config"
	"mwstorage/internal/controllers"
	"mwstorage/internal/routers"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"
)

// @title     Masters way storage API
// @version 1.0
// @BasePath  /storage
func main() {
	newConfig, err := config.LoadConfig("./")
	if err != nil {
		fmt.Fprintf(os.Stderr, "cannot load config: %v\n", err)
		os.Exit(1)
	}

	// newPool, err := database.NewPostgresDB(&newConfig)
	// if err != nil {
	// 	fmt.Fprintf(os.Stderr, "Unable to create connection pool: %v\n", err)
	// 	os.Exit(1)
	// }
	// defer newPool.Close()

	// newService := services.NewService(newPool)
	newController := controllers.NewController()

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
