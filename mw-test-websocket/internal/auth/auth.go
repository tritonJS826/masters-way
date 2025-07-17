package auth

import (
	"errors"
	"mw-test-websocket/internal/config"
	"net/http"

	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
)

const ContextKeyUserID = "userID"
const ContextKeySessionUuid = "sessionUuid"

type Claims struct {
	UserID string `json:"userID"`
	jwt.StandardClaims
}

func ValidateJWT(jwtKey, tokenString string) (*Claims, error) {
	claims := &Claims{}
	token, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
		return []byte(jwtKey), nil
	})
	if err != nil {
		return nil, err
	}
	if !token.Valid {
		return nil, errors.New("invalid token")
	}
	return claims, nil
}

// TODO: We cant set appropriate Authorization token to request when connecting by ws protocol from the client side
func ExtractTokenMiddleware(cfg *config.Config) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		token := ctx.Query("token")

		claims, err := ValidateJWT(cfg.SecretSessionKey, token)
		if err != nil {
			ctx.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Invalid token"})
			return
		}

		sessionUuid := ctx.Query("sessionUuid")

		ctx.Set(ContextKeyUserID, claims.UserID)
		ctx.Set(ContextKeySessionUuid, sessionUuid)
		ctx.Next()
	}
}
