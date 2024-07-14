package config

import (
	"log"

	"github.com/spf13/viper"
)

type Config struct {
	DbDriver          string `mapstructure:"DB_DRIVER"`
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
	return
}

var Env, _ = LoadConfig(".")
