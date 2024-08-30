package config

import (
	"fmt"
	"log"

	"github.com/spf13/viper"
)

type Config struct {
	DBSource          string `mapstructure:"DB_SOURCE"`
	ServerPort        string `mapstructure:"SERVER_PORT"`
	EnvType           string `mapstructure:"ENV_TYPE"`
	GooglClientId     string `mapstructure:"GOOGLE_CLIENT_ID"`
	GooglClientSecret string `mapstructure:"GOOGLE_SECRET_ID"`
	SecretSessionKey  string `mapstructure:"SECRET_SESSION_KEY"`
	ApiBaseUrl        string `mapstructure:"API_BASE_URL"`
	WebappBaseUrl     string `mapstructure:"WEBAPP_BASE_URL"`
	Domain            string `mapstructure:"WEBAPP_DOMAIN"`
	GeminiApiKey      string `mapstructure:"GEMINI_API_KEY"`
	GeminiModel       string `mapstructure:"GEMINI_MODEL"`
	GeneralAPIHost    string `mapstructure:"GENERAL_API_HOST"`
	GeneralBaseURL    string `mapstructure:"GENERAL_BASE_URL"`
}

var prodRequiredVariables = [11]string{
	"DB_SOURCE",
	"SERVER_PORT",
	"ENV_TYPE",
	"GOOGLE_CLIENT_ID",
	"GOOGLE_SECRET_ID",
	"SECRET_SESSION_KEY",
	"API_BASE_URL",
	"WEBAPP_BASE_URL",
	"WEBAPP_DOMAIN",
	"GEMINI_API_KEY",
	"GEMINI_MODEL",
}

var devRequiredVariables = [11]string{
	"DB_SOURCE",
	"SERVER_PORT",
	"ENV_TYPE",
	"GOOGLE_CLIENT_ID",
	"GOOGLE_SECRET_ID",
	"SECRET_SESSION_KEY",
	"API_BASE_URL",
	"WEBAPP_BASE_URL",
	"WEBAPP_DOMAIN",
	"GEMINI_API_KEY",
	"GEMINI_MODEL",
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
