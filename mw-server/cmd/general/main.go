package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	database "go-common/database"
	"mw-server/internal/config"
	"mw-server/internal/controllers"
	"mw-server/internal/routers"
	"mw-server/internal/services"

	"github.com/go-co-op/gocron/v2"
	"github.com/google/generative-ai-go/genai"
	"github.com/samber/lo"
	"google.golang.org/api/option"
)

// @title Masters way general API
// @version 1.0
// @BasePath /general
func main() {
	newConfig, err := config.LoadConfig("./")
	if err != nil {
		fmt.Fprintf(os.Stderr, "cannot load config: %v\n", err)
		os.Exit(1)
	}

	// This line executed with no errors only with empty db
	// So it is important for first microservice deploy
	database.RunMigrations(newConfig.DBSource)

	newPool, err := database.NewPostgresDB(newConfig.DBSource)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Unable to create connection pool: %v\n", err)
		os.Exit(1)
	}
	defer newPool.Close()

	var geminiClient *genai.Client
	if newConfig.EnvType == "prod" {
		geminiClient, err = genai.NewClient(context.Background(), option.WithAPIKey(newConfig.GeminiApiKey))
		if err != nil {
			fmt.Fprintf(os.Stderr, "Unable to create gemini client: %v\n", err)
			os.Exit(1)
		}
		defer geminiClient.Close()
	}

	newService := services.NewService(newPool, geminiClient, &newConfig)
	newController := controllers.NewController(newService, &newConfig)

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

	scheduler, err := gocron.NewScheduler()
	if err != nil {
		log.Println("Ups, scheduler does not created!")
	}

	// Schedule the automatic coin refilling job
	_, err = scheduler.NewJob(
		gocron.DurationJob(6*time.Hour),
		gocron.NewTask(
			func(logString string) {
				log.Println(logString)

				ctx := context.Background()

				refilledProfiles, err := newService.ProfileSettingService.RefillCoins(ctx)
				if err != nil {
					log.Printf("Error during automatic coin refilling: %v", err)
				} else {
					lo.ForEach(refilledProfiles, func(profile services.RefillCoinsForAllResponse, _ int) {
						log.Println(
							"\nRefilled profile:", profile.Uuid,
							"\nPricingPlan:", profile.PricingPlan,
							"\nCoins:", profile.Coins,
							"\nExpirationDate:", profile.ExpirationDate,
						)
					})
				}
			},
			"gocron: automatic coin refilling for users...",
		),
	)
	if err != nil {
		log.Println("Ups, job does not created!")
	}

	scheduler.Start()

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
