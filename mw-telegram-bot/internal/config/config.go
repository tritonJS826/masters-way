package config

import (
	"fmt"
	"log"

	"github.com/spf13/viper"
)

type Config struct {
	ServerPort         string `mapstructure:"TELEGRAM_BOT_PORT"`
	EnvType            string `mapstructure:"ENV_TYPE"`
	GeneralBFFAPIHost  string `mapstructure:"GENERAL_BFF_API_HOST"`
	GeneralBFFBaseURL  string `mapstructure:"GENERAL_BFF_BASE_URL"`
	SecretSessionKey   string `mapstructure:"SECRET_SESSION_KEY"`
	TelegramBotToken   string `mapstructure:"TELEGRAM_BOT_TOKEN"`
	TelegramBotWebhook string `mapstructure:"TELEGRAM_BOT_WEBHOOK_URL"`
	TelegramBotMode    string `mapstructure:"TELEGRAM_BOT_MODE"`
}

var prodRequiredVariables = [7]string{
	"TELEGRAM_BOT_PORT",
	"ENV_TYPE",
	"GENERAL_BFF_API_HOST",
	"GENERAL_BFF_BASE_URL",
	"SECRET_SESSION_KEY",
	"TELEGRAM_BOT_TOKEN",
	"TELEGRAM_BOT_WEBHOOK_URL",
}

var devRequiredVariables = [6]string{
	"TELEGRAM_BOT_PORT",
	"ENV_TYPE",
	"GENERAL_BFF_API_HOST",
	"GENERAL_BFF_BASE_URL",
	"SECRET_SESSION_KEY",
	"TELEGRAM_BOT_TOKEN",
}

func LoadConfig(path string) (config Config, err error) {
	viper.SetConfigFile(path + ".env")

	viper.AutomaticEnv()

	err = viper.ReadInConfig()
	if err != nil {
		log.Fatalf("could not load config: %v", err)
		return
	}

	err = viper.Unmarshal(&config)
	if err != nil {
		log.Fatalf("could not load config: %v", err)
	}

	const devEnvType = "dev"
	const prodEnvType = "prod"

	if config.EnvType != devEnvType && config.EnvType != prodEnvType {
		fmt.Println("!!!!!!!!!!!!!!!!!!!")
		log.Fatalf(`ENV_TYPE variable should be "dev" or "prod"`)
	}

	if config.EnvType == devEnvType {
		for _, key := range devRequiredVariables {
			if !viper.IsSet(key) {
				fmt.Println("!!!!!!!!!!!!!!!!!!!")
				log.Fatalf("required environment variable %s is not set", key)
			}
		}
	}

	if config.EnvType == prodEnvType {
		for _, key := range prodRequiredVariables {
			if !viper.IsSet(key) {
				fmt.Println("!!!!!!!!!!!!!!!!!!!")
				log.Fatalf("required environment variable %s is not set", key)
			}
		}
	}

	return
}
