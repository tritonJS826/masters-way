package config

import (
	"fmt"
	"log"

	"github.com/spf13/viper"
)

type Config struct {
	DBSource           string `mapstructure:"DB_SOURCE"`
	ServerPort         string `mapstructure:"SERVER_PORT"`
	EnvType            string `mapstructure:"ENV_TYPE"`
	GooglClientId      string `mapstructure:"GOOGLE_CLIENT_ID"`
	GooglClientSecret  string `mapstructure:"GOOGLE_SECRET_ID"`
	SecretSessionKey   string `mapstructure:"SECRET_SESSION_KEY"`
	ApiBaseUrl         string `mapstructure:"API_BASE_URL"`
	WebappBaseUrl      string `mapstructure:"WEBAPP_BASE_URL"`
	GeminiApiKey       string `mapstructure:"GEMINI_API_KEY"`
	GeminiModel        string `mapstructure:"GEMINI_MODEL"`
	TestGeneralAPIHost string `mapstructure:"TEST_GENERAL_API_HOST"`
	TestGeneralBaseURL string `mapstructure:"TEST_GENERAL_BASE_URL"`
	SenderEmail        string `mapstructure:"SENDER_EMAIL"`
	SenderName         string `mapstructure:"SENDER_NAME"`
	SenderPassword     string `mapstructure:"SENDER_PASSWORD"`
	SmtpAuthAddress    string `mapstructure:"SMTP_AUTH_ADDRESS"`
	SmtpServerAddress  string `mapstructure:"SMTP_SERVER_ADDRESS"`
}

var prodRequiredVariables = [17]string{
	"DB_SOURCE",
	"SERVER_PORT",
	"ENV_TYPE",
	"GOOGLE_CLIENT_ID",
	"GOOGLE_SECRET_ID",
	"SECRET_SESSION_KEY",
	"API_BASE_URL",
	"WEBAPP_BASE_URL",
	"GEMINI_API_KEY",
	"GEMINI_MODEL",
	"TEST_GENERAL_API_HOST",
	"TEST_GENERAL_BASE_URL",
	"SENDER_EMAIL",
	"SENDER_NAME",
	"SENDER_PASSWORD",
	"SMTP_AUTH_ADDRESS",
	"SMTP_SERVER_ADDRESS",
}

var devRequiredVariables = [12]string{
	"DB_SOURCE",
	"SERVER_PORT",
	"ENV_TYPE",
	"GOOGLE_CLIENT_ID",
	"GOOGLE_SECRET_ID",
	"SECRET_SESSION_KEY",
	"API_BASE_URL",
	"WEBAPP_BASE_URL",
	"GEMINI_API_KEY",
	"GEMINI_MODEL",
	"TEST_GENERAL_API_HOST",
	"TEST_GENERAL_BASE_URL",
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
