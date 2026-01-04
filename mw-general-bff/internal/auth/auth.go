package auth

import (
	"errors"
	"fmt"
	"mw-general-bff/internal/config"
	"net/http"
	"strings"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
)

const (
	// 30 days
	MaxAge             = 24 * time.Hour * 30
	OauthStateString   = "auth-state-string"
	TelegramCodePrefix = "TGCODE:"

	HeaderKeyAuthorization = "Authorization"

	ContextKeyUserID        = "userID"
	ContextKeyAuthorization = "ContextKeyAuthorization"
)

type Claims struct {
	UserID string `json:"userID"`
	jwt.StandardClaims
}

func GenerateJWT(userID string, secretSessionKey string) (string, error) {
	expirationTime := time.Now().Add(MaxAge)
	claims := &Claims{
		UserID: userID,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: expirationTime.Unix(),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString([]byte(secretSessionKey))
}

func ValidateJWT(tokenString string, secretSessionKey string) (*Claims, error) {
	claims := &Claims{}
	token, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
		return []byte(secretSessionKey), nil
	})
	if err != nil {
		return nil, err
	}
	if !token.Valid {
		return nil, errors.New("invalid token")
	}
	return claims, nil
}

func HandleHeaders(cfg *config.Config) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		authHeader := ctx.GetHeader(HeaderKeyAuthorization)
		if authHeader == "" {
			ctx.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Authorization header is required"})
			return
		}

		if !strings.HasPrefix(authHeader, "Bearer ") {
			ctx.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Authorization header must start with Bearer"})
			return
		}

		tokenString := strings.TrimPrefix(authHeader, "Bearer ")
		claims, err := ValidateJWT(tokenString, cfg.SecretSessionKey)
		if err != nil {
			ctx.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Invalid token"})
			return
		}

		ctx.Set(ContextKeyUserID, claims.UserID)
		ctx.Set(ContextKeyAuthorization, authHeader)
		ctx.Next()
	}
}

func ExtractTelegramCodeFromState(state string) (string, bool) {
	if !strings.HasPrefix(state, TelegramCodePrefix) {
		return "", false
	}
	return strings.TrimPrefix(state, TelegramCodePrefix), true
}

func BuildTelegramState(authCode string) string {
	return fmt.Sprintf("%s%s", TelegramCodePrefix, authCode)
}
