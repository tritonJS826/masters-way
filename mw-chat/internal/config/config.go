package config

import (
	"log"

	"github.com/spf13/viper"
)

type Config struct {
	ServerPort    string `mapstructure:"SERVER_PORT"`
	WebappBaseUrl string `mapstructure:"WEBAPP_BASE_URL"`
	EnvType       string `mapstructure:"ENV_TYPE"`
	DbSource      string `mapstructure:"DB_SOURCE"`
	ChatBaseUrl   string `mapstructure:"CHAT_BASE_URL"`
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
