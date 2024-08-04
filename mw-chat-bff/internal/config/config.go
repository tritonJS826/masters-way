package config

import (
	"fmt"
	"log"

	"github.com/spf13/viper"
)

type Config struct {
	ServerPort             string `mapstructure:"SERVER_PORT"`
	WebappBaseURL          string `mapstructure:"WEBAPP_BASE_URL"`
	EnvType                string `mapstructure:"ENV_TYPE"`
	GeneralAPIHost         string `mapstructure:"GENERAL_API_HOST"`
	GeneralBaseURL         string `mapstructure:"GENERAL_BASE_URL"`
	ChatAPIHost            string `mapstructure:"CHAT_API_HOST"`
	ChatBaseURL            string `mapstructure:"CHAT_BASE_URL"`
	MWChatWebSocketAPIHost string `mapstructure:"MW_CHAT_WEBSOCKET_API_HOST"`
	MWChatWebSocketBaseURL string `mapstructure:"MW_CHAT_WEBSOCKET_BASE_URL"`
	ChatBffBaseURL         string `mapstructure:"CHAT_BFF_BASE_URL"`
	SecretSessionKey       string `mapstructure:"SECRET_SESSION_KEY"`
}

var prodRequiredVariables = [11]string{
	"SERVER_PORT",
	"WEBAPP_BASE_URL",
	"ENV_TYPE",
	"GENERAL_API_HOST",
	"GENERAL_BASE_URL",
	"CHAT_API_HOST",
	"CHAT_BASE_URL",
	"MW_CHAT_WEBSOCKET_API_HOST",
	"MW_CHAT_WEBSOCKET_BASE_URL",
	"CHAT_BFF_BASE_URL",
	"SECRET_SESSION_KEY",
}

var devRequiredVariables = [11]string{
	"SERVER_PORT",
	"WEBAPP_BASE_URL",
	"ENV_TYPE",
	"GENERAL_API_HOST",
	"GENERAL_BASE_URL",
	"CHAT_API_HOST",
	"CHAT_BASE_URL",
	"MW_CHAT_WEBSOCKET_API_HOST",
	"MW_CHAT_WEBSOCKET_BASE_URL",
	"CHAT_BFF_BASE_URL",
	"SECRET_SESSION_KEY",
}

func LoadConfig(path string) (config Config, err error) {
	viper.SetConfigFile(path + ".env")

	viper.AutomaticEnv()

	err = viper.ReadInConfig()
	if err != nil {
		log.Fatalf("could not loadconfig: %v", err)
		return
	}

	err = viper.Unmarshal(&config)
	if err != nil {
		log.Fatalf("could not loadconfig: %v", err)
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
