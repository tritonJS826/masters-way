package auth

import (
	"errors"
	"mwserver/config"
	"net/http"

	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
	"github.com/gorilla/sessions"
	"github.com/markbates/goth"
	"github.com/markbates/goth/gothic"
	"github.com/markbates/goth/providers/google"
)

const (
	MaxAge = 86400 * 30
)

// refresh
const AuthSession = "auth-session"

// access
const AuthSessionPublic = "auth-session-public"
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

var jwtKey = []byte(config.Env.SecretSessionKey)

type Claims struct {
	UserID string `json:"userID"`
	jwt.StandardClaims
}

func GenerateJWT(userID string) (string, error) {
	expirationTime := time.Now().Add(24 * time.Hour)
	claims := &Claims{
		UserID: userID,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: expirationTime.Unix(),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(jwtKey)
}

func ValidateJWT(tokenString string) (*Claims, error) {
	claims := &Claims{}
	token, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
		return jwtKey, nil
	})
	if err != nil {
		return nil, err
	}
	if !token.Valid {
		return nil, errors.New("invalid token")
	}
	return claims, nil
}

func JWTMiddleware() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		authHeader := ctx.GetHeader("Authorization")
		if authHeader == "" {
			ctx.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Authorization header is required"})
			return
		}

		tokenString := authHeader[len("Bearer "):]
		claims, err := ValidateJWT(tokenString)
		if err != nil {
			ctx.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Invalid token"})
			return
		}

		ctx.Set("userID", claims.UserID)
		ctx.Next()
	}
}
