package main

import (
	"fmt"
	"log"
	"mw-telegram-bot/internal/bot"
	"mw-telegram-bot/internal/config"
	"mw-telegram-bot/internal/openapi"
	"mw-telegram-bot/internal/services"
	"os"
	"os/signal"
	"syscall"
)

func main() {
	newConfig, err := config.LoadConfig("./")
	if err != nil {
		fmt.Fprintf(os.Stderr, "cannot load config: %v\n", err)
		os.Exit(1)
	}

	openapi.SecretSessionKey = newConfig.SecretSessionKey
	generalAPI := openapi.MakeGeneralAPIClient(&newConfig)
	authService := services.NewAuthService(generalAPI, &newConfig)

	telegramBot, err := bot.NewTelegramBot(&newConfig, authService)
	if err != nil {
		fmt.Fprintf(os.Stderr, "failed to create telegram bot: %v\n", err)
		os.Exit(1)
	}

	go func() {
		if err := telegramBot.Start(); err != nil {
			log.Printf("bot stopped with error: %v", err)
		}
	}()

	log.Println("Telegram bot started successfully")

	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit

	log.Println("Shutting down telegram bot...")
	telegramBot.Stop()
	log.Println("Bot shutdown complete")
}
