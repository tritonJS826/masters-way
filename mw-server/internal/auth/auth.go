package auth

import (
	"errors"
	"fmt"
	"mw-server/internal/config"
	"net/http"
	"sync"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
	"github.com/markbates/goth/providers/google"
	"golang.org/x/oauth2"
)

func MakeGoogleOAuthConfig(cfg *config.Config) *oauth2.Config {
	return &oauth2.Config{
		RedirectURL:  cfg.ApiBaseUrl + "/general/auth/google/callback",
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
	AccessExpIn  = 10 * time.Hour
	RefreshExpIn = 168 * time.Hour

	OauthStateString = "auth-state-string"

	HeaderKeyAuthorization = "Authorization"

	ContextKeyUserID        = "userID"
	ContextKeyAuthorization = "ContextKeyAuthorization"
)

type Claims struct {
	UserID string `json:"userID"`
	jwt.StandardClaims
}

func GenerateJWT(userID string, secretSessionKey string, expIn time.Duration) (string, error) {
	expirationTime := time.Now().Add(expIn)
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

type GoogleTokenMap struct {
	tokens map[string]*oauth2.Token
	sync.RWMutex
}

func NewGoogleTokenMap() *GoogleTokenMap {
	return &GoogleTokenMap{
		tokens: make(map[string]*oauth2.Token),
	}
}

func (g *GoogleTokenMap) SetGoogleToken(userID string, googleToken *oauth2.Token) {
	g.Lock()
	g.tokens[userID] = googleToken
	g.Unlock()
}

func (g *GoogleTokenMap) GetGoogleToken(userID string) (*oauth2.Token, error) {
	g.RLock()
	token, exists := g.tokens[userID]
	g.RUnlock()
	if !exists {
		return nil, fmt.Errorf("token not found for user ID: %s", userID)
	}
	return token, nil
}
