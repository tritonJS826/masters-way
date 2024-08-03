package main

import (
	"log"
	"mw-chat-websocket/internal/config"
	"mw-chat-websocket/internal/server"
)

func main() {
	newConfig, err := config.LoadConfig("")
	if err != nil {
		log.Fatal("cannot load config:", err)
	}

	newServer := server.NewServer(&newConfig)
	newServer.SetRoutes()

	if newConfig.EnvType == "prod" {
		log.Fatal(newServer.GinServer.RunTLS(":"+newConfig.ServerPort, "./server.crt", "./server.key"))
	} else {
		log.Fatal(newServer.GinServer.Run(":" + newConfig.ServerPort))
	}
}
