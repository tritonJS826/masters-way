package config

import (
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
	return
}
