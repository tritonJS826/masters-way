package config

import (
	"fmt"
	"log"

	"github.com/spf13/viper"
)

type Config struct {
	DbSource          string `mapstructure:"DB_SOURCE"`
	PostgresUser      string `mapstructure:"POSTGRES_USER"`
	PostgresPassword  string `mapstructure:"POSTGRES_PASSWORD"`
	PostgresDb        string `mapstructure:"POSTGRES_DB"`
	ServerAddress     string `mapstructure:"SERVER_ADDRESS"`
	EnvType           string `mapstructure:"ENV_TYPE"`
	GooglClientId     string `mapstructure:"GOOGLE_CLIENT_ID"`
	GooglClientSecret string `mapstructure:"GOOGLE_SECRET_ID"`
	SecretSessionKey  string `mapstructure:"SECRET_SESSION_KEY"`
	ApiBaseUrl        string `mapstructure:"API_BASE_URL"`
	WebappBaseUrl     string `mapstructure:"WEBAPP_BASE_URL"`
	Domain            string `mapstructure:"WEBAPP_DOMAIN"`
	GeminiApiKey      string `mapstructure:"GEMINI_API_KEY"`
	GeminiModel       string `mapstructure:"GEMINI_MODEL"`
}

var prodRequiredVariables = [14]string{
	"DB_SOURCE",
	"POSTGRES_USER",
	"POSTGRES_PASSWORD",
	"POSTGRES_DB",
	"SERVER_ADDRESS",
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

var devRequiredVariables = [14]string{
	"DB_SOURCE",
	"POSTGRES_USER",
	"POSTGRES_PASSWORD",
	"POSTGRES_DB",
	"SERVER_ADDRESS",
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
	viper.AddConfigPath(path)
	viper.SetConfigFile(".env")

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

var Env, _ = LoadConfig(".")
