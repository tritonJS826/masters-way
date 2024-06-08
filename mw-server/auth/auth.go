package auth

import (
	"mwserver/config"
	"net/http"

	"github.com/gorilla/sessions"
	"github.com/markbates/goth"
	"github.com/markbates/goth/gothic"
	"github.com/markbates/goth/providers/google"
)

const (
	MaxAge = 200
)

const AuthSession = "auth-session"
const UserIdKey = "userID"

func NewAuth() {
	store := sessions.NewCookieStore([]byte(config.Env.SecretSessionKey))

	store.MaxAge(MaxAge)
	store.Options.MaxAge = MaxAge
	store.Options.Path = "/"
	store.Options.HttpOnly = true
	store.Options.Secure = true
	store.Options.SameSite = http.SameSiteNoneMode
	store.Options.Domain = config.Env.Domain

	gothic.Store = store

	googleCallBackUrl := config.Env.ApiBaseUrl + "/api/auth/google/callback"

	goth.UseProviders(
		google.New(config.Env.GooglClientId, config.Env.GooglClientSecret, googleCallBackUrl, "email", "profile"),
	)
}
