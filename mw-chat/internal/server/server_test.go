package server

import (
	"bytes"
	"encoding/json"
	"fmt"
	"log"
	"mwchat/internal/auth"
	"mwchat/internal/config"
	"mwchat/internal/controllers"
	"mwchat/internal/schemas"
	"mwchat/internal/services"
	"mwchat/pkg/database"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/go-playground/assert/v2"
	"github.com/jackc/pgx/v5/pgxpool"
)

func setupTestDB(newConfig *config.Config) *pgxpool.Pool {
	newPool, err := database.NewPostgresDB(newConfig)
	if err != nil {
		log.Fatal("cannot load config:", err)
	}
	return newPool
}

func setupTestServer(newConfig *config.Config, newPool *pgxpool.Pool) *Server {
	newService := services.NewService(newPool)
	newController := controllers.NewController(newService)

	newServer := NewServer(newConfig)
	newServer.SetRoutes(newController)
	return newServer
}

func createTestRequest(method, url, body, token string) (*http.Request, error) {
	req, err := http.NewRequest(method, url, bytes.NewBufferString(body))
	if err != nil {
		return nil, err
	}
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", "Bearer "+token)
	return req, nil
}

func TestCreateRoom(t *testing.T) {
	newConfig, err := config.LoadConfig("../../")
	if err != nil {
		log.Fatal("cannot load config:", err)
	}
	newPool := setupTestDB(&newConfig)
	defer newPool.Close()

	newServer := setupTestServer(&newConfig, newPool)

	token, err := auth.GenerateTestJWT("ef9b3a5c-2676-4eb4-a21d-cc0a9fb34f1e")
	if err != nil {
		t.Fatalf("could not generate token: %v", err)
	}

	tests := []struct {
		name             string
		requestBody      string
		expectedStatus   int
		expectedResponse schemas.RoomPopulatedResponse
		expectedError    string
	}{
		{
			name:           "CreatePrivateRoom_Success",
			requestBody:    `{"userID": "2d0f5ddb-0713-4d02-b193-871518496a0e", "roomType": "private"}`,
			expectedStatus: http.StatusOK,
			expectedResponse: schemas.RoomPopulatedResponse{
				Users: []schemas.UserResponse{
					{
						UserID: "ef9b3a5c-2676-4eb4-a21d-cc0a9fb34f1e",
						Role:   "regular",
					},
					{
						UserID: "2d0f5ddb-0713-4d02-b193-871518496a0e",
						Role:   "regular",
					},
				},
				Name:      nil,
				Messages:  []schemas.MessageResponse{},
				IsBlocked: false,
			},
		},
		{
			name:             "CreatePrivateRoom_PrivateRoomAlreadyExists",
			requestBody:      `{"userID": "2d0f5ddb-0713-4d02-b193-871518496a0e", "roomType": "private"}`,
			expectedStatus:   http.StatusInternalServerError,
			expectedResponse: schemas.RoomPopulatedResponse{},
			expectedError:    services.ErrPrivateRoomAlreadyExists.Error(),
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			recorder := httptest.NewRecorder()
			request, err := createTestRequest(http.MethodPost, "/chat/rooms", tt.requestBody, token)
			if err != nil {
				t.Fatalf("could not create request: %v", err)
			}
			newServer.GinServer.ServeHTTP(recorder, request)

			assert.Equal(t, tt.expectedStatus, recorder.Code)

			if tt.expectedStatus == http.StatusOK {
				var response schemas.RoomPopulatedResponse
				err = json.Unmarshal(recorder.Body.Bytes(), &response)
				if err != nil {
					t.Fatalf("could not unmarshal response: %v", err)
				}

				assert.Equal(t, tt.expectedResponse.Users, response.Users)
				assert.Equal(t, tt.expectedResponse.Name, response.Name)
				assert.Equal(t, tt.expectedResponse.Messages, response.Messages)
				assert.Equal(t, tt.expectedResponse.IsBlocked, response.IsBlocked)
			}
		})
	}
}

func TestCreateMessage(t *testing.T) {
	newConfig, err := config.LoadConfig("../../")
	if err != nil {
		log.Fatal("cannot load config:", err)
	}
	newPool := setupTestDB(&newConfig)
	defer newPool.Close()

	newServer := setupTestServer(&newConfig, newPool)

	token, err := auth.GenerateTestJWT("ef9b3a5c-2676-4eb4-a21d-cc0a9fb34f1e")
	if err != nil {
		t.Fatalf("could not generate token: %v", err)
	}

	tests := []struct {
		name             string
		requestBody      string
		expectedStatus   int
		expectedResponse schemas.MessageResponse
		expectedError    string
	}{
		{
			name:           "CreateMessageInPrivateRoom_Success",
			requestBody:    `{"message": "Hello!"}`,
			expectedStatus: http.StatusOK,
			expectedResponse: schemas.MessageResponse{
				OwnerID: "ef9b3a5c-2676-4eb4-a21d-cc0a9fb34f1e",
				Message: "Hello!",
				Readers: []schemas.MessageReaders{},
			},
		},
	}

	roomRecorder := httptest.NewRecorder()
	roomRequestBody := `{"userID": "800948ad-c652-44d3-adfa-f28384da1f40", "roomType": "private"}`
	roomRequest, err := createTestRequest(http.MethodPost, "/chat/rooms", roomRequestBody, token)
	if err != nil {
		t.Fatalf("could not create request: %v", err)
	}
	newServer.GinServer.ServeHTTP(roomRecorder, roomRequest)

	var createRoomResponse schemas.RoomPopulatedResponse
	err = json.Unmarshal(roomRecorder.Body.Bytes(), &createRoomResponse)
	if err != nil {
		t.Fatalf("could not unmarshal response: %v", err)
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			recorder := httptest.NewRecorder()

			createMessagePath := fmt.Sprintf("/chat/rooms/" + createRoomResponse.RoomID + "/messages")
			request, err := createTestRequest(http.MethodPost, createMessagePath, tt.requestBody, token)
			if err != nil {
				t.Fatalf("could not create request: %v", err)
			}
			newServer.GinServer.ServeHTTP(recorder, request)

			assert.Equal(t, tt.expectedStatus, recorder.Code)

			if tt.expectedStatus == http.StatusOK {
				var response schemas.MessageResponse
				err = json.Unmarshal(recorder.Body.Bytes(), &response)
				if err != nil {
					t.Fatalf("could not unmarshal response: %v", err)
				}

				assert.Equal(t, tt.expectedResponse.OwnerID, response.OwnerID)
				assert.Equal(t, tt.expectedResponse.Message, response.Message)
				assert.Equal(t, tt.expectedResponse.Readers, response.Readers)
			}
		})
	}
}
