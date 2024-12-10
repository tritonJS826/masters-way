package services

import (
	"context"
	"fmt"
	"mw-server/internal/auth"

	"golang.org/x/oauth2"
	oauthGoogle "google.golang.org/api/oauth2/v2"
	"google.golang.org/api/option"
)

type GoogleTokenStore interface {
	SetGoogleToken(userID string, token *oauth2.Token)
	GetGoogleToken(userID string) (*oauth2.Token, error)
}

type AuthService struct {
	googleTokenStore  GoogleTokenStore
	googleOAuthConfig *oauth2.Config
	jwtKey            []byte
}

func newAuthService(googleOAuthConfig *oauth2.Config, jwtKey []byte) *AuthService {
	return &AuthService{
		googleTokenStore:  auth.NewGoogleTokenMap(),
		googleOAuthConfig: googleOAuthConfig,
		jwtKey:            jwtKey,
	}
}

type GoogleAuthInfo struct {
	UserInfo *oauthGoogle.Userinfo
	Token    *oauth2.Token
}

func (as *AuthService) AuthenticateGoogleUser(ctx context.Context, code, state string) (*GoogleAuthInfo, error) {
	token, err := as.googleOAuthConfig.Exchange(ctx, code)
	if err != nil {
		return nil, err
	}

	client := as.googleOAuthConfig.Client(ctx, token)

	oauth2Service, err := oauthGoogle.NewService(ctx, option.WithHTTPClient(client))
	if err != nil {
		return nil, err
	}

	userInfo, err := oauth2Service.Userinfo.Get().Do()
	if err != nil {
		return nil, err
	}

	return &GoogleAuthInfo{
		UserInfo: userInfo,
		Token:    token,
	}, nil
}

func (as *AuthService) GetGoogleAuthURL() string {
	return as.googleOAuthConfig.AuthCodeURL(auth.OauthStateString, oauth2.AccessTypeOffline)
}

func (as *AuthService) RefreshGoogleAccessToken(ctx context.Context, userID string) (*oauth2.Token, error) {
	token, err := as.googleTokenStore.GetGoogleToken(userID)
	if err != nil {
		return nil, fmt.Errorf("failed to get google token: %w", err)
	}

	client := as.googleOAuthConfig.TokenSource(ctx, token)
	newToken, err := client.Token()
	if err != nil {
		return nil, fmt.Errorf("failed to refresh Google access token: %w", err)
	}

	return newToken, nil
}

func (as *AuthService) SetGoogleTokenToTokenStore(userID string, googleToken *oauth2.Token) {
	as.googleTokenStore.SetGoogleToken(userID, googleToken)
}

func (as *AuthService) GetGoogleToken(userID string) (*oauth2.Token, error) {
	token, err := as.googleTokenStore.GetGoogleToken(userID)
	if err != nil {
		return nil, fmt.Errorf("failed to get google access token: %w", err)
	}
	return token, nil
}
