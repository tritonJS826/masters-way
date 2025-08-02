package auth

import (
	"errors"
	"mw-test-websocket/internal/config"
	"net/http"
	"strings"

	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
)

const HeaderKeyAuthorization = "Authorization"
const ContextKeyAuthorization = "ContextKeyAuthorization"
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

func AuthMiddleware(cfg *config.Config) gin.HandlerFunc {
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
		claims, err := ValidateJWT(cfg.SecretSessionKey, tokenString)
		if err != nil {
			ctx.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Invalid token"})
			return
		}

		ctx.Set(ContextKeyUserID, claims.UserID)
		ctx.Next()
	}
}
