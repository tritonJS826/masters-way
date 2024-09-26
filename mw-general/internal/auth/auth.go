package auth

import (
	"errors"
	"mwgeneral/internal/config"
	"net/http"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
	"github.com/markbates/goth/providers/google"
	"golang.org/x/oauth2"
)

func MakeGoogleOAuthConfig(cfg *config.Config) *oauth2.Config {
	return &oauth2.Config{
		RedirectURL:  cfg.ApiBaseUrl + "/api/auth/google/callback",
		ClientID:     cfg.GooglClientId,
		ClientSecret: cfg.GooglClientSecret,
		Scopes: []string{
			"https://www.googleapis.com/auth/userinfo.email",
			"https://www.googleapis.com/auth/userinfo.profile",
			"https://www.googleapis.com/auth/drive.file",
		},
		Endpoint: google.Endpoint,
	}
}

const (
	// 30 days
	MaxAge           = 24 * time.Hour * 30
	OauthStateString = "auth-state-string"

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

func AuthMiddleware(cfg *config.Config) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		authHeader := ctx.GetHeader(HeaderKeyAuthorization)
		if authHeader == "" {
			ctx.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Authorization header is required"})
			return
		}

		tokenString := authHeader[len("Bearer "):]
		claims, err := ValidateJWT(tokenString, cfg.SecretSessionKey)
		if err != nil {
			ctx.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Invalid token"})
			return
		}

		ctx.Set(ContextKeyUserID, claims.UserID)
		ctx.Next()
	}
}
