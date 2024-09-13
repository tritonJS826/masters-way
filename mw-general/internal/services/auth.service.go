package services

import (
	"context"
	"mw-general/internal/auth"

	"golang.org/x/oauth2"
	oauthGoogle "google.golang.org/api/oauth2/v2"
	"google.golang.org/api/option"
)

type AuthService struct {
	googleOAuthConfig *oauth2.Config
	jwtKey            []byte
}

func newAuthService(googleOAuthConfig *oauth2.Config, jwtKey []byte) *AuthService {
	return &AuthService{googleOAuthConfig, jwtKey}
}

func (as *AuthService) AuthenticateGoogleUser(ctx context.Context, code, state string) (*oauthGoogle.Userinfo, error) {
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

	return userInfo, nil
}

func (as *AuthService) GetGoogleAuthURL() string {
	return as.googleOAuthConfig.AuthCodeURL(auth.OauthStateString, oauth2.AccessTypeOffline)
}
