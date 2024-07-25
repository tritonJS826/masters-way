package main

import (
	"log"
	"mwchat/internal/config"
	"mwchat/internal/controllers"
	"mwchat/internal/server"
	"mwchat/internal/services"
	"mwchat/pkg/database"
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

	newService := services.NewService(newPool)
	newController := controllers.NewController(newService)

	newServer := server.NewServer(&newConfig)
	newServer.SetRoutes(newController)

	if newConfig.EnvType == "prod" {
		log.Fatal(newServer.GinServer.RunTLS(":"+newConfig.ServerPort, "./server.crt", "./server.key"))
	} else {
		log.Fatal(newServer.GinServer.Run(":" + newConfig.ServerPort))
	}
}
