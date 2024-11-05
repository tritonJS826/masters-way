package config

import (
	"fmt"
	"log"

	"github.com/spf13/viper"
)

type Config struct {
	ServerPort             string `mapstructure:"SERVER_PORT"`
	ChatBFFBaseURL         string `mapstructure:"CHAT_BFF_BASE_URL"`
	NotificationBFFBaseURL string `mapstructure:"NOTIFICATION_BFF_BASE_URL"`
	GeneralBFFBaseURL      string `mapstructure:"GENERAL_BFF_BASE_URL"`
	EnvType                string `mapstructure:"ENV_TYPE"`
	DBSource               string `mapstructure:"DB_SOURCE"`
	TestMailAPIHost        string `mapstructure:"TEST_MAIL_API_HOST"`
	TestMailBaseURL        string `mapstructure:"TEST_MAIL_BASE_URL"`
	SecretSessionKey       string `mapstructure:"SECRET_SESSION_KEY"`
	SenderPassword         string `mapstructure:"SENDER_PASSWORD"`
	SenderMail             string `mapstructure:"SENDER_EMAIL"`
	SenderName             string `mapstructure:"SENDER_NAME"`
	SmtpAuthAddress        string `mapstructure:"SMTP_AUTH_ADDRESS"`
	SmtpServerAddress      string `mapstructure:"SMTP_SERVER_ADDRESS"`
}

var prodRequiredVariables = [14]string{
	"SERVER_PORT",
	"CHAT_BFF_BASE_URL",
	"NOTIFICATION_BFF_BASE_URL",
	"GENERAL_BFF_BASE_URL",
	"ENV_TYPE",
	"DB_SOURCE",
	"TEST_MAIL_API_HOST",
	"TEST_MAIL_BASE_URL",
	"SECRET_SESSION_KEY",
	"SENDER_PASSWORD",
	"SENDER_EMAIL",
	"SENDER_NAME",
	"SMTP_AUTH_ADDRESS",
	"SMTP_SERVER_ADDRESS",
}

var devRequiredVariables = [9]string{
	"SERVER_PORT",
	"CHAT_BFF_BASE_URL",
	"NOTIFICATION_BFF_BASE_URL",
	"GENERAL_BFF_BASE_URL",
	"ENV_TYPE",
	"DB_SOURCE",
	"TEST_MAIL_API_HOST",
	"TEST_MAIL_BASE_URL",
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
