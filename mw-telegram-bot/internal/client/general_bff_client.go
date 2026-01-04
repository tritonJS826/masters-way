package client

import (
	"bytes"
	"encoding/json"
	"fmt"
	"log"
	"mw-telegram-bot/internal/config"
	"net/http"
	"time"
)

type GeneralBFFClient struct {
	config     *config.Config
	httpClient *http.Client
}

type CreateJobDonePayload struct {
	Description       string   `json:"description" validate:"required"`
	Time              int32    `json:"time" validate:"required"`
	DayReportUuid     string   `json:"dayReportUuid" validate:"required"`
	OwnerUuid         string   `json:"ownerUuid" validate:"required"`
	JobTagUuids       []string `json:"jobTagUuids" validate:"required"`
	CompanionLanguage string   `json:"companionLanguage" example:"en|ru|ua"`
}

type JobDoneResponse struct {
	Uuid          string `json:"uuid"`
	CreatedAt     string `json:"createdAt"`
	UpdatedAt     string `json:"updatedAt"`
	Description   string `json:"description"`
	Time          int32  `json:"time"`
	OwnerUuid     string `json:"ownerUuid"`
	OwnerName     string `json:"ownerName"`
	DayReportUuid string `json:"dayReportUuid"`
	WayUUID       string `json:"wayUuid"`
	WayName       string `json:"wayName"`
}

type ErrorResponse struct {
	Error   string `json:"error"`
	Message string `json:"message"`
}

type TelegramLoginRequest struct {
	TelegramId   int64  `json:"telegramId"`
	TelegramName string `json:"telegramName"`
}

type TelegramLoginResponse struct {
	AuthURL string `json:"authUrl"`
	Code    string `json:"code"`
}

type TelegramValidateRequest struct {
	Code         string `json:"code"`
	TelegramId   int64  `json:"telegramId"`
	TelegramName string `json:"telegramName"`
}

type TelegramValidateResponse struct {
	UserUuid string `json:"userUuid"`
	Email    string `json:"email"`
	Name     string `json:"name"`
}

type LinkedUserResponse struct {
	UserUuid string `json:"userUuid"`
	Email    string `json:"email"`
	Name     string `json:"name"`
}

func NewGeneralBFFClient(cfg *config.Config) (*GeneralBFFClient, error) {
	return &GeneralBFFClient{
		config: cfg,
		httpClient: &http.Client{
			Timeout: 30 * time.Second,
		},
	}, nil
}

func (c *GeneralBFFClient) CreateJobDone(tgId int64, description string, timeSpent int32) (*JobDoneResponse, error) {
	user, err := c.GetLinkedUser(tgId)
	if err != nil {
		return nil, fmt.Errorf("user not linked: please use /login first")
	}

	payload := CreateJobDonePayload{
		Description:       description,
		Time:              timeSpent,
		OwnerUuid:         user.UserUuid,
		DayReportUuid:     "",
		JobTagUuids:       []string{},
		CompanionLanguage: "en",
	}

	jsonData, err := json.Marshal(payload)
	if err != nil {
		return nil, fmt.Errorf("failed to marshal payload: %w", err)
	}

	url := fmt.Sprintf("%s/jobDones", c.config.GeneralBFFBaseURL)
	req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonData))
	if err != nil {
		return nil, fmt.Errorf("failed to create request: %w", err)
	}

	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", "Bearer "+c.config.SecretSessionKey)

	resp, err := c.httpClient.Do(req)
	if err != nil {
		return nil, fmt.Errorf("failed to send request: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK && resp.StatusCode != http.StatusCreated {
		var errResp ErrorResponse
		if err := json.NewDecoder(resp.Body).Decode(&errResp); err != nil {
			return nil, fmt.Errorf("request failed with status %d", resp.StatusCode)
		}
		return nil, fmt.Errorf("request failed: %s - %s", errResp.Error, errResp.Message)
	}

	var result JobDoneResponse
	if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
		return nil, fmt.Errorf("failed to decode response: %w", err)
	}

	log.Printf("Successfully created jobDone with UUID: %s", result.Uuid)
	return &result, nil
}

func (c *GeneralBFFClient) InitiateTelegramLogin(tgId int64, tgName string) (string, string, error) {
	payload := TelegramLoginRequest{
		TelegramId:   tgId,
		TelegramName: tgName,
	}

	jsonData, err := json.Marshal(payload)
	if err != nil {
		return "", "", fmt.Errorf("failed to marshal payload: %w", err)
	}

	url := fmt.Sprintf("%s/auth/telegram/initiate", c.config.GeneralBFFBaseURL)
	req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonData))
	if err != nil {
		return "", "", fmt.Errorf("failed to create request: %w", err)
	}

	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", "Bearer "+c.config.SecretSessionKey)

	resp, err := c.httpClient.Do(req)
	if err != nil {
		return "", "", fmt.Errorf("failed to send request: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		var errResp ErrorResponse
		if err := json.NewDecoder(resp.Body).Decode(&errResp); err != nil {
			return "", "", fmt.Errorf("request failed with status %d", resp.StatusCode)
		}
		return "", "", fmt.Errorf("%s", errResp.Message)
	}

	var result TelegramLoginResponse
	if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
		return "", "", fmt.Errorf("failed to decode response: %w", err)
	}

	return result.AuthURL, result.Code, nil
}

func (c *GeneralBFFClient) ValidateTelegramCode(code string, tgId int64, tgName string) (*TelegramValidateResponse, error) {
	payload := TelegramValidateRequest{
		Code:         code,
		TelegramId:   tgId,
		TelegramName: tgName,
	}

	jsonData, err := json.Marshal(payload)
	if err != nil {
		return nil, fmt.Errorf("failed to marshal payload: %w", err)
	}

	url := fmt.Sprintf("%s/auth/telegram/validate", c.config.GeneralBFFBaseURL)
	req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonData))
	if err != nil {
		return nil, fmt.Errorf("failed to create request: %w", err)
	}

	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", "Bearer "+c.config.SecretSessionKey)

	resp, err := c.httpClient.Do(req)
	if err != nil {
		return nil, fmt.Errorf("failed to send request: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		var errResp ErrorResponse
		if err := json.NewDecoder(resp.Body).Decode(&errResp); err != nil {
			return nil, fmt.Errorf("request failed with status %d", resp.StatusCode)
		}
		return nil, fmt.Errorf("%s", errResp.Message)
	}

	var result TelegramValidateResponse
	if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
		return nil, fmt.Errorf("failed to decode response: %w", err)
	}

	return &result, nil
}

func (c *GeneralBFFClient) GetLinkedUser(tgId int64) (*LinkedUserResponse, error) {
	url := fmt.Sprintf("%s/auth/telegram/user/%d", c.config.GeneralBFFBaseURL, tgId)
	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		return nil, fmt.Errorf("failed to create request: %w", err)
	}

	req.Header.Set("Authorization", "Bearer "+c.config.SecretSessionKey)

	resp, err := c.httpClient.Do(req)
	if err != nil {
		return nil, fmt.Errorf("failed to send request: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode == http.StatusNotFound {
		return nil, fmt.Errorf("user not linked")
	}

	if resp.StatusCode != http.StatusOK {
		var errResp ErrorResponse
		if err := json.NewDecoder(resp.Body).Decode(&errResp); err != nil {
			return nil, fmt.Errorf("request failed with status %d", resp.StatusCode)
		}
		return nil, fmt.Errorf("%s", errResp.Message)
	}

	var result LinkedUserResponse
	if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
		return nil, fmt.Errorf("failed to decode response: %w", err)
	}

	return &result, nil
}

func (c *GeneralBFFClient) GetBaseURL() string {
	return c.config.GeneralBFFBaseURL
}

func (c *GeneralBFFClient) UnlinkUser(tgId int64) error {
	url := fmt.Sprintf("%s/auth/telegram/unlink/%d", c.config.GeneralBFFBaseURL, tgId)
	req, err := http.NewRequest("DELETE", url, nil)
	if err != nil {
		return fmt.Errorf("failed to create request: %w", err)
	}

	req.Header.Set("Authorization", "Bearer "+c.config.SecretSessionKey)

	resp, err := c.httpClient.Do(req)
	if err != nil {
		return fmt.Errorf("failed to send request: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		var errResp ErrorResponse
		if err := json.NewDecoder(resp.Body).Decode(&errResp); err != nil {
			return fmt.Errorf("request failed with status %d", resp.StatusCode)
		}
		return fmt.Errorf("request failed: %s - %s", errResp.Error, errResp.Message)
	}

	return nil
}
