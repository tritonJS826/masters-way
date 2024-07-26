package main

import (
	"log"
	"mw-chat-bff/internal/config"
	"mw-chat-bff/internal/controllers"
	"mw-chat-bff/internal/server"
)

func main() {
	newConfig, err := config.LoadConfig("")
	if err != nil {
		log.Fatal("cannot load config:", err)
	}

	controllers := controllers.NewController()

	newServer := server.NewServer(&newConfig)
	newServer.SetRoutes(controllers)

	if newConfig.EnvType == "prod" {
		log.Fatal(newServer.GinServer.RunTLS(":"+newConfig.ServerPort, "./server.crt", "./server.key"))
	} else {
		log.Fatal(newServer.GinServer.Run(":" + newConfig.ServerPort))
	}
}
