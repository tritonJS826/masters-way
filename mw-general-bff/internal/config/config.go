package config

import (
	"fmt"
	"log"

	"github.com/spf13/viper"
)

type Config struct {
	ServerPort               string `mapstructure:"SERVER_PORT"`
	WebappBaseURL            string `mapstructure:"WEBAPP_BASE_URL"`
	EnvType                  string `mapstructure:"ENV_TYPE"`
	GeneralAPIHost           string `mapstructure:"GENERAL_API_HOST"`
	GeneralBaseURL           string `mapstructure:"GENERAL_BASE_URL"`
	MailAPIHost              string `mapstructure:"MAIL_API_HOST"`
	MailBaseURL              string `mapstructure:"MAIL_BASE_URL"`
	StorageAPIHost           string `mapstructure:"STORAGE_API_HOST"`
	StorageBaseURL           string `mapstructure:"STORAGE_BASE_URL"`
	NotificationAPIHost      string `mapstructure:"NOTIFICATION_API_HOST"`
	NotificationBaseURL      string `mapstructure:"NOTIFICATION_BASE_URL"`
	ChatAPIHost              string `mapstructure:"CHAT_API_HOST"`
	ChatBaseURL              string `mapstructure:"CHAT_BASE_URL"`
	TrainingAPIHost          string `mapstructure:"TRAINING_API_HOST"`
	TrainingBaseURL          string `mapstructure:"TRAINING_BASE_URL"`
	TestGeneralBffAPIHost    string `mapstructure:"TEST_GENERAL_BFF_API_HOST"`
	TestGeneralBffAPIBaseUrl string `mapstructure:"TEST_GENERAL_BFF_BASE_URL"`
	SecretSessionKey         string `mapstructure:"SECRET_SESSION_KEY"`
}

var prodRequiredVariables = [16]string{
	"SERVER_PORT",
	"WEBAPP_BASE_URL",
	"ENV_TYPE",
	"GENERAL_API_HOST",
	"GENERAL_BASE_URL",
	"STORAGE_API_HOST",
	"STORAGE_BASE_URL",
	"NOTIFICATION_API_HOST",
	"NOTIFICATION_BASE_URL",
	"CHAT_API_HOST",
	"CHAT_BASE_URL",
	"TRAINING_API_HOST",
	"TRAINING_BASE_URL",
	"TEST_GENERAL_BFF_API_HOST",
	"TEST_GENERAL_BFF_BASE_URL",
	"SECRET_SESSION_KEY",
}

var devRequiredVariables = [16]string{
	"SERVER_PORT",
	"WEBAPP_BASE_URL",
	"ENV_TYPE",
	"GENERAL_API_HOST",
	"GENERAL_BASE_URL",
	"STORAGE_API_HOST",
	"STORAGE_BASE_URL",
	"NOTIFICATION_API_HOST",
	"NOTIFICATION_BASE_URL",
	"CHAT_API_HOST",
	"CHAT_BASE_URL",
	"TRAINING_API_HOST",
	"TRAINING_BASE_URL",
	"TEST_GENERAL_BFF_API_HOST",
	"TEST_GENERAL_BFF_BASE_URL",
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
