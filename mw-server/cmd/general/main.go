package main

import (
	"log"

	"mwserver/internal/config"
	"mwserver/internal/controllers"
	"mwserver/internal/router"
	"mwserver/internal/server"
	"mwserver/internal/services"
	"mwserver/pkg/database"
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

	// geminiClient, err = genai.NewClient(context.Background(), option.WithAPIKey(newConfig.GeminiApiKey))
	// if err != nil {
	// 	log.Fatalf("Failed to create client: %v", err)
	// }
	// defer geminiClient.Close()

	newService := services.NewService(newPool)
	newController := controllers.NewController(newService)

	newRouter := router.NewRouter(newController)
	newRouter.SetRoutes()

	newServer := server.NewServer(&newConfig, newRouter)

	log.Fatal(newServer.Run())
}
