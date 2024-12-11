package utils

import (
	"fmt"
	"net/url"
)

func GetTokenParamFromURL(baseURL string) (string, error) {
	parsedURL, err := url.Parse(baseURL)
	if err != nil {
		return "", fmt.Errorf("Failed to parse URL: %v", err)
	}
	queryParams := parsedURL.Query()
	token := queryParams.Get("accessToken")
	if token == "" {
		return "", fmt.Errorf("Token not found in the URL")
	}

	return token, nil
}
