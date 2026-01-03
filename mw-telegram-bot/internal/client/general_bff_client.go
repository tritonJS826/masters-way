package client

import (
	"bytes"
	"encoding/json"
	"fmt"
	"log"
	"mw-telegram-bot/internal/config"
	"net/http"
	"os"
	"sync"
	"time"
)

type GeneralBFFClient struct {
	config     *config.Config
	httpClient *http.Client
	userStore  *UserStore
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

type UserResponse struct {
	Uuid  string `json:"uuid"`
	Email string `json:"email"`
	Name  string `json:"name"`
}

type StoredUser struct {
	UserUuid   string    `json:"userUuid"`
	Email      string    `json:"email"`
	Name       string    `json:"name"`
	TelegramId int64     `json:"telegramId"`
	LinkedAt   time.Time `json:"linkedAt"`
}

type UserStore struct {
	users map[int64]*StoredUser
	mu    sync.RWMutex
	file  string
}

func NewUserStore(filePath string) (*UserStore, error) {
	store := &UserStore{
		users: make(map[int64]*StoredUser),
		file:  filePath,
	}

	if _, err := os.Stat(filePath); err == nil {
		data, err := os.ReadFile(filePath)
		if err != nil {
			return nil, fmt.Errorf("failed to read user store: %w", err)
		}
		if len(data) > 0 {
			var users map[int64]*StoredUser
			if err := json.Unmarshal(data, &users); err != nil {
				return nil, fmt.Errorf("failed to parse user store: %w", err)
			}
			store.users = users
			log.Printf("Loaded %d users from store", len(users))
		}
	}

	return store, nil
}

func (s *UserStore) Save() error {
	s.mu.RLock()
	defer s.mu.RUnlock()

	data, err := json.MarshalIndent(s.users, "", "  ")
	if err != nil {
		return fmt.Errorf("failed to marshal user store: %w", err)
	}

	if err := os.WriteFile(s.file, data, 0644); err != nil {
		return fmt.Errorf("failed to write user store: %w", err)
	}

	return nil
}

func (s *UserStore) Get(tgId int64) (*StoredUser, error) {
	s.mu.RLock()
	defer s.mu.RUnlock()

	user, exists := s.users[tgId]
	if !exists {
		return nil, fmt.Errorf("user not found for telegram id %d", tgId)
	}

	return user, nil
}

func (s *UserStore) Set(tgId int64, user *StoredUser) error {
	s.mu.Lock()
	defer s.mu.Unlock()

	s.users[tgId] = user
	return s.Save()
}

func (s *UserStore) Remove(tgId int64) error {
	s.mu.Lock()
	defer s.mu.Unlock()

	delete(s.users, tgId)
	return s.Save()
}

func (s *UserStore) GetByTelegramId(tgId int64) (*StoredUser, error) {
	return s.Get(tgId)
}

func NewGeneralBFFClient(cfg *config.Config) (*GeneralBFFClient, error) {
	store, err := NewUserStore("telegram_users.json")
	if err != nil {
		log.Printf("Warning: failed to create user store: %v", err)
		store = &UserStore{users: make(map[int64]*StoredUser)}
	}

	return &GeneralBFFClient{
		config: cfg,
		httpClient: &http.Client{
			Timeout: 30 * time.Second,
		},
		userStore: store,
	}, nil
}

func (c *GeneralBFFClient) CreateJobDone(tgId int64, description string, timeSpent int32) (*JobDoneResponse, error) {
	user, err := c.userStore.GetByTelegramId(tgId)
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

	err = c.userStore.Set(tgId, &StoredUser{
		UserUuid:   result.UserUuid,
		Email:      result.Email,
		Name:       result.Name,
		TelegramId: tgId,
		LinkedAt:   time.Now(),
	})
	if err != nil {
		log.Printf("Warning: failed to save user to store: %v", err)
	}

	return &result, nil
}

func (c *GeneralBFFClient) GetUserByTelegramId(tgId int64) (*StoredUser, error) {
	return c.userStore.GetByTelegramId(tgId)
}

func (c *GeneralBFFClient) GetBaseURL() string {
	return c.config.GeneralBFFBaseURL
}

func (c *GeneralBFFClient) UnlinkUser(tgId int64) error {
	url := fmt.Sprintf("%s/general/auth/telegram/unlink/%d", c.config.GeneralBFFBaseURL, tgId)
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

	return c.userStore.Remove(tgId)
}
