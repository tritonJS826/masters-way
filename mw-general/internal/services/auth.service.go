package services

import (
	"context"
	"fmt"
	"mwgeneral/internal/auth"

	"golang.org/x/oauth2"
	oauthGoogle "google.golang.org/api/oauth2/v2"
	"google.golang.org/api/option"
)

type AuthService struct {
	googleTokenMap    map[string]string
	googleOAuthConfig *oauth2.Config
	jwtKey            []byte
}

func newAuthService(googleOAuthConfig *oauth2.Config, jwtKey []byte) *AuthService {
	return &AuthService{map[string]string{}, googleOAuthConfig, jwtKey}
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

func (as *AuthService) SetGoogleAccessTokenByUserID(userID, token string) {
	as.googleTokenMap[userID] = token
}

func (as *AuthService) GetGoogleAccessTokenByUserID(userID string) (string, error) {
	token, exists := as.googleTokenMap[userID]
	if !exists {
		return "", fmt.Errorf("access token not found for user ID: %s", userID)
	}
	return token, nil
}
