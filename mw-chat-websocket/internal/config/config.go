package config

import (
	"fmt"
	"log"

	"github.com/spf13/viper"
)

type Config struct {
	ServerPort    string `mapstructure:"SERVER_PORT"`
	WebappBaseUrl string `mapstructure:"WEBAPP_BASE_URL"`
	EnvType       string `mapstructure:"ENV_TYPE"`
}

var prodRequiredVariables = [3]string{
	"SERVER_PORT",
	"WEBAPP_BASE_URL",
	"ENV_TYPE",
}

var devRequiredVariables = [3]string{
	"SERVER_PORT",
	"WEBAPP_BASE_URL",
	"ENV_TYPE",
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

// v := reflect.ValueOf(config)
// 	t := reflect.TypeOf(config)

// 	for i := 0; i < v.NumField(); i++ {
// 		fieldName := t.Field(i).Name
// 		fieldValue := v.Field(i).Interface()

// 		fmt.Println("fieldName: ", fieldName, "fieldValue: ", fieldValue)

// 		if fieldValue == nil {
// 			fmt.Println("----------------------------------------")
// 			fmt.Printf("env variable: %s is not found in .env file", fieldName)
// 			fmt.Println("----------------------------------------")

// 			panic("env variable: %s is not found in .env file")
// 		}
// 	}
