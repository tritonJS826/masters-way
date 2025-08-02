package main

import (
	"log"
	"mw-test-websocket/internal/config"
	"mw-test-websocket/internal/controllers"
	"mw-test-websocket/internal/server"
	"mw-test-websocket/internal/services"
)

// @title     Masters way test-websocket API
// @version 1.0
// @BasePath  /mw-test-websocket
func main() {
	newConfig, err := config.LoadConfig("")
	if err != nil {
		log.Fatal("cannot load config:", err)
	}

	newService := services.NewService(&newConfig)
	controllers := controllers.NewController(newService)

	newServer := server.NewServer(&newConfig)
	newServer.SetRoutes(controllers)

	// if newConfig.EnvType == "prod" {
	// 	log.Fatal(newServer.GinServer.RunTLS(":"+newConfig.ServerPort, "../server.crt", "../server.key"))
	// } else {
	log.Fatal(newServer.GinServer.Run(":" + newConfig.ServerPort))
	// }
}
