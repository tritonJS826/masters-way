package main

import (
	"fmt"
	"log"
	"mw-chat-bff/internal/config"
	"mw-chat-bff/internal/controllers"
	"mw-chat-bff/internal/server"
	"mw-chat-bff/internal/services"
)

func main() {
	cfg, err := config.LoadConfig("")
	if err != nil {
		log.Fatal("cannot load config:", err)
	}

	fmt.Println(cfg.ChatAPIHost)
	fmt.Println(cfg.ChatBaseURL)
	fmt.Println(cfg.GeneralAPIHost)
	fmt.Println(cfg.GeneralBaseURL)

	services := services.NewService(&cfg)
	controllers := controllers.NewController(services)

	newServer := server.NewServer(&cfg)
	newServer.SetRoutes(controllers)

	if cfg.EnvType == "prod" {
		log.Fatal(newServer.GinServer.RunTLS(":"+cfg.ServerPort, "./server.crt", "./server.key"))
	} else {
		log.Fatal(newServer.GinServer.Run(":" + cfg.ServerPort))
	}
}
