package main

import (
	"log"
	"mw-chat-websocket/internal/config"
	"mw-chat-websocket/internal/controllers"
	"mw-chat-websocket/internal/server"
)

// @title     Masters way notification-websocket API
// @version 1.0
// @BasePath  /mw-notification-websocket
func main() {
	newConfig, err := config.LoadConfig("")
	if err != nil {
		log.Fatal("cannot load config:", err)
	}

	controllers := controllers.NewController()

	newServer := server.NewServer(&newConfig)
	newServer.SetRoutes(controllers)

	log.Fatal(newServer.GinServer.Run(":" + newConfig.ServerPort))

}
