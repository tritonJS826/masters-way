package main

import (
	"context"
	"log"

	"mwserver/internal/config"
	"mwserver/internal/controllers"
	"mwserver/internal/routers"
	"mwserver/internal/server"
	"mwserver/internal/services"
	"mwserver/pkg/database"

	"github.com/google/generative-ai-go/genai"
	"google.golang.org/api/option"
)

func main() {
	newConfig, err := config.LoadConfig("./")
	if err != nil {
		log.Fatal("cannot load config:", err)
	}

	newPool, err := database.NewPostgresDB(&newConfig)
	if err != nil {
		log.Fatal("cannot load config:", err)
	}
	defer newPool.Close()

	geminiClient, err := genai.NewClient(context.Background(), option.WithAPIKey(newConfig.GeminiApiKey))
	if err != nil {
		log.Fatalf("Failed to create client: %v", err)
	}
	defer geminiClient.Close()

	newService := services.NewService(newPool, geminiClient)
	newController := controllers.NewController(newService)

	newRouter := routers.NewRouter(newController)
	newRouter.SetRoutes()

	newServer := server.NewServer(&newConfig, newRouter)

	log.Fatal(newServer.Run())
}
