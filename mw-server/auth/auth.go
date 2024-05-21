package auth

import (
	"log"
	"mwserver/util"

	"github.com/gorilla/sessions"
	"github.com/markbates/goth"
	"github.com/markbates/goth/gothic"
	"github.com/markbates/goth/providers/google"
)

const (
	MaxAge = 86400 * 5
)

func NewAuth() {
	config, err := util.LoadConfig(".")
	if err != nil {
		log.Fatalf("failed to load config: %v", err)
	}

	store := sessions.NewCookieStore([]byte(config.SecretSessionKey))
	store.MaxAge(MaxAge)

	store.Options.Path = "/"
	store.Options.HttpOnly = config.EnvType != "prod"
	store.Options.Secure = config.EnvType == "prod"

	gothic.Store = store

	goth.UseProviders(
		google.New(config.GooglClientId, config.GooglClientSecret, "http://https://34.82.43.122/api/auth/google/callback", "email", "profile"),
	)
}
