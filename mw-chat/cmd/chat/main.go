package main

import (
	"log"
	"mwchat/internal/config"
	"mwchat/internal/server"
	"mwchat/pkg/database"
)

func main() {
	newConfig, err := config.LoadConfig(".")
	if err != nil {
		log.Fatal("cannot load config:", err)
	}

	newPool, err := database.NewPostgresDB(&newConfig)
	if err != nil {
		log.Fatal("cannot load config:", err)
	}
	defer newPool.Close()

	newServer := server.NewServer(&newConfig)
	newServer.SetRoutes()

	if newConfig.EnvType == "prod" {
		log.Fatal(newServer.GinServer.RunTLS(":"+newConfig.ServerPort, "./server.crt", "./server.key"))
	} else {
		log.Fatal(newServer.GinServer.Run(":" + newConfig.ServerPort))
	}
}
