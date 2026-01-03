package main

import (
	"fmt"
	"log"
	"mw-telegram-bot/internal/bot"
	"mw-telegram-bot/internal/client"
	"mw-telegram-bot/internal/config"
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

	generalBFFClient, err := client.NewGeneralBFFClient(&newConfig)
	if err != nil {
		fmt.Fprintf(os.Stderr, "failed to create client: %v\n", err)
		os.Exit(1)
	}
	telegramBot, err := bot.NewTelegramBot(&newConfig, generalBFFClient)
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
