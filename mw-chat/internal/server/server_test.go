package server

import (
	"bytes"
	"encoding/json"
	"io"
	"mwchat/internal/auth"
	"mwchat/internal/config"
	db "mwchat/internal/db/sqlc"
	"mwchat/internal/schemas"
	"net/http"
	"testing"

	"github.com/stretchr/testify/assert"
)

type responseError struct {
	Error string `json:"error"`
}

type TestRequestParams struct {
	method string
	url    string
	body   io.Reader
	userID string
	jwtKey string
}

func MakeTestRequestWithJWT[T interface{}](t *testing.T, responseEmpty *T, params *TestRequestParams) int {
	request, err := http.NewRequest(params.method, params.url, params.body)
	if err != nil {
		t.Fatalf("Failed to create new HTTP request: %v", err)
	}

	request.Header.Set("Content-Type", "application/json")
	if params.userID != "" {
		token, err := auth.GenerateTestJWT(params.jwtKey, params.userID)
		if err != nil {
			t.Fatalf("Failed to generate test JWT: %v", err)
		}
		request.Header.Set("Authorization", "Bearer "+token)
	}

	client := &http.Client{}
	response, err := client.Do(request)
	if err != nil {
		t.Fatalf("Failed to execute HTTP request: %v", err)
	}
	defer response.Body.Close()

	if responseEmpty != nil {
		err = json.NewDecoder(response.Body).Decode(responseEmpty)
		if err != nil {
			t.Fatalf("Failed to decode response: %v", err)
		}
	}

	return response.StatusCode
}

func RequestResetChatDB(t *testing.T, cfg *config.Config) {
	requestResetChatDBParams := &TestRequestParams{
		method: http.MethodGet,
		url:    cfg.ChatBaseURL + "/chat/dev/reset-db",
		body:   nil,
		userID: "",
		jwtKey: cfg.SecretSessionKey,
	}
	MakeTestRequestWithJWT[struct{}](t, nil, requestResetChatDBParams)
}

// Tests
func TestGetRoomById(t *testing.T) {
	newConfig, err := config.LoadConfig("../../")
	if err != nil {
		t.Fatalf("Failed to load config: %v", err)
	}

	RequestResetChatDB(t, &newConfig)

	currentUserID := "d2cb5e1b-44df-48d3-b7a1-34f3d7a5b7e2"
	userID := "3d922e8a-5d58-4b82-9a3d-83e2e73b3f91"
	roomID := "78bdf878-3b83-4f97-8d2e-928c132a10cd"

	t.Run("should return private room by room id with messages and users", func(t *testing.T) {
		roomPopulatedResponse := new(schemas.RoomPopulatedResponse)
		testRequestParams := &TestRequestParams{
			method: http.MethodGet,
			url:    newConfig.ChatBaseURL + "/chat/rooms/" + roomID,
			body:   nil,
			userID: currentUserID,
			jwtKey: "",
		}

		statusCode := MakeTestRequestWithJWT(t, roomPopulatedResponse, testRequestParams)

		expectedData := schemas.RoomPopulatedResponse{
			RoomID:    roomID,
			Name:      nil,
			RoomType:  "private",
			IsBlocked: false,
			Users: []schemas.UserResponse{
				{
					UserID: currentUserID,
					Role:   "regular",
				},
				{
					UserID: userID,
					Role:   "regular",
				},
			},
			Messages: []schemas.MessageResponse{
				{
					OwnerID: currentUserID,
					Message: "Test message 1",
					Readers: []schemas.MessageReader{},
				},
				{
					OwnerID: userID,
					Message: "Test message 2",
					Readers: []schemas.MessageReader{
						{
							UserID: currentUserID,
						},
					},
				},
				{
					OwnerID: currentUserID,
					Message: "Test message 3",
					Readers: []schemas.MessageReader{},
				},
				{
					OwnerID: userID,
					Message: "Test message 4",
					Readers: []schemas.MessageReader{
						{
							UserID: currentUserID,
						},
					},
				},
			},
		}

		assert.Equal(t, http.StatusOK, statusCode)

		assert.Equal(t, expectedData.RoomID, roomPopulatedResponse.RoomID)
		assert.Equal(t, expectedData.Name, roomPopulatedResponse.Name)
		assert.Equal(t, expectedData.RoomType, roomPopulatedResponse.RoomType)
		assert.Equal(t, expectedData.IsBlocked, roomPopulatedResponse.IsBlocked)
		assert.Equal(t, expectedData.Users, roomPopulatedResponse.Users)

		for i, expectedMessage := range expectedData.Messages {
			actualMessage := roomPopulatedResponse.Messages[i]
			assert.Equal(t, expectedMessage.OwnerID, actualMessage.OwnerID)
			assert.Equal(t, expectedMessage.Message, actualMessage.Message)

			for j, expectedReader := range expectedMessage.Readers {
				actualReader := actualMessage.Readers[j]
				assert.Equal(t, expectedReader.UserID, actualReader.UserID)
			}
		}
	})
}

func TestGetChatPreview(t *testing.T) {
	newConfig, err := config.LoadConfig("../../")
	if err != nil {
		t.Fatalf("Failed to load config: %v", err)
	}

	RequestResetChatDB(t, &newConfig)

	currentUserID := "d2cb5e1b-44df-48d3-b7a1-34f3d7a5b7e2"

	t.Run("should return chat preview with correct unread messages amount", func(t *testing.T) {
		getChatPreviewResponse := new(schemas.GetChatPreviewResponse)
		testRequestParams := &TestRequestParams{
			method: http.MethodGet,
			url:    newConfig.ChatBaseURL + "/chat/rooms/preview",
			body:   nil,
			userID: currentUserID,
			jwtKey: newConfig.SecretSessionKey,
		}

		statusCode := MakeTestRequestWithJWT(t, getChatPreviewResponse, testRequestParams)

		expectedData := schemas.GetChatPreviewResponse{
			UnreadMessagesAmount: 3,
		}

		assert.Equal(t, http.StatusOK, statusCode)
		assert.Equal(t, expectedData.UnreadMessagesAmount, getChatPreviewResponse.UnreadMessagesAmount)
	})
}

func TestGetRooms(t *testing.T) {
	newConfig, err := config.LoadConfig("../../")
	if err != nil {
		t.Fatalf("Failed to load config: %v", err)
	}

	RequestResetChatDB(t, &newConfig)

	roomCreatorID := "d63d2f89-6412-4324-8587-7061bf02dca4"

	user1ID := "c31384a6-b811-4a1f-befa-95dd53e3f4b9"
	room1ID := "e57fc491-69f7-4b30-9979-78879c8873bf"

	user2ID := "5a31e3cb-7e9a-41e5-9a3b-1f1e5d6b7c3e"
	room2ID := "897f4a0f-fe31-4036-8358-f89a19c9bda6"

	user3ID := "8a3d1fe1-42da-499a-bf64-248297fd670a"
	room3ID := "85f610df-9f86-4c55-8ee1-02485d42defb"

	t.Run("should return list of private rooms successfully", func(t *testing.T) {

		getRoomsResponse := new(schemas.GetRoomsResponse)
		testRequestParams := &TestRequestParams{
			method: http.MethodGet,
			url:    newConfig.ChatBaseURL + "/chat/rooms/list/private",
			body:   nil,
			userID: roomCreatorID,
			jwtKey: newConfig.SecretSessionKey,
		}
		statusCode := MakeTestRequestWithJWT(t, getRoomsResponse, testRequestParams)

		expectedData := schemas.GetRoomsResponse{
			Size: 3,
			Rooms: []schemas.RoomPreviewResponse{
				{
					RoomID:    room1ID,
					Name:      "",
					RoomType:  string(db.RoomTypePrivate),
					IsBlocked: false,
					Users: []schemas.UserResponse{
						{
							UserID: roomCreatorID,
							Role:   "regular",
						},
						{
							UserID: user1ID,
							Role:   "regular",
						},
					},
				},
				{
					RoomID:    room2ID,
					Name:      "",
					RoomType:  string(db.RoomTypePrivate),
					IsBlocked: false,
					Users: []schemas.UserResponse{
						{
							UserID: roomCreatorID,
							Role:   "regular",
						},
						{
							UserID: user2ID,
							Role:   "regular",
						},
					},
				},
				{
					RoomID:    room3ID,
					Name:      "",
					RoomType:  string(db.RoomTypePrivate),
					IsBlocked: false,
					Users: []schemas.UserResponse{
						{
							UserID: roomCreatorID,
							Role:   "regular",
						},
						{
							UserID: user3ID,
							Role:   "regular",
						},
					},
				},
			},
		}

		assert.Equal(t, http.StatusOK, statusCode)
		assert.Equal(t, expectedData.Size, getRoomsResponse.Size)
		assert.ElementsMatch(t, expectedData.Rooms, getRoomsResponse.Rooms)
	})
}

func TestCreateRoom(t *testing.T) {
	newConfig, err := config.LoadConfig("../../")
	if err != nil {
		t.Fatalf("Failed to load config: %v", err)
	}

	RequestResetChatDB(t, &newConfig)

	roomCreatorID := "5bee7465-220d-40e7-82d7-b9b607fff21c"
	userID := "f4cbdb32-0fc0-4704-a6d9-9cf357e5cd3e"

	t.Run("should create a private room and return it successfully", func(t *testing.T) {
		inputData := schemas.CreateRoomPayload{
			UserID:   &userID,
			Name:     nil,
			RoomType: "private",
		}
		jsonInputData, err := json.Marshal(inputData)
		if err != nil {
			t.Fatalf("Failed to marshal create room payload: %v", err)
		}

		roomPopulatedResponse := new(schemas.RoomPopulatedResponse)
		testRequestParams := &TestRequestParams{
			method: http.MethodPost,
			url:    newConfig.ChatBaseURL + "/chat/rooms",
			body:   bytes.NewBuffer(jsonInputData),
			userID: roomCreatorID,
			jwtKey: newConfig.SecretSessionKey,
		}
		statusCode := MakeTestRequestWithJWT(t, roomPopulatedResponse, testRequestParams)

		expectedData := schemas.RoomPopulatedResponse{
			Users: []schemas.UserResponse{
				{
					UserID: roomCreatorID,
					Role:   "regular",
				},
				{
					UserID: userID,
					Role:   "regular",
				},
			},
			Name:      nil,
			Messages:  []schemas.MessageResponse{},
			IsBlocked: false,
		}

		assert.Equal(t, http.StatusOK, statusCode)

		assert.Equal(t, expectedData.Users, roomPopulatedResponse.Users)
		assert.Equal(t, expectedData.Name, roomPopulatedResponse.Name)
		assert.Equal(t, expectedData.Messages, roomPopulatedResponse.Messages)
		assert.Equal(t, expectedData.IsBlocked, roomPopulatedResponse.IsBlocked)
	})

	t.Run("should return error if private room already exists", func(t *testing.T) {
		inputData := schemas.CreateRoomPayload{
			UserID:   &userID,
			Name:     nil,
			RoomType: "private",
		}
		jsonInputData, err := json.Marshal(inputData)
		if err != nil {
			t.Fatalf("Failed to marshal create room payload: %v", err)
		}

		responseError := new(responseError)
		testRequestParams := &TestRequestParams{
			method: http.MethodPost,
			url:    newConfig.ChatBaseURL + "/chat/rooms",
			body:   bytes.NewBuffer(jsonInputData),
			userID: roomCreatorID,
			jwtKey: newConfig.SecretSessionKey,
		}
		statusCode := MakeTestRequestWithJWT(t, responseError, testRequestParams)

		assert.Equal(t, http.StatusInternalServerError, statusCode)
		assert.Equal(t, "A private room for these users already exists", responseError.Error)
	})
}

func TestCreateMessage(t *testing.T) {
	newConfig, err := config.LoadConfig("../../")
	if err != nil {
		t.Fatalf("Failed to load config: %v", err)
	}

	RequestResetChatDB(t, &newConfig)

	currentUserID := "d2cb5e1b-44df-48d3-b7a1-34f3d7a5b7e2"
	userID := "3d922e8a-5d58-4b82-9a3d-83e2e73b3f91"
	roomID := "78bdf878-3b83-4f97-8d2e-928c132a10cd"

	t.Run("should create a message in private room and return it successfully", func(t *testing.T) {
		inputData := schemas.CreateMessagePayload{
			Message: "roomCreator's message",
		}
		jsonInputData, err := json.Marshal(inputData)
		if err != nil {
			t.Fatalf("Failed to marshal create room payload: %v", err)
		}

		messageResponse := new(schemas.CreateMessageResponse)
		testRequestParams := &TestRequestParams{
			method: http.MethodPost,
			url:    newConfig.ChatBaseURL + "/chat/rooms/" + roomID + "/messages",
			body:   bytes.NewBuffer(jsonInputData),
			userID: currentUserID,
			jwtKey: newConfig.SecretSessionKey,
		}
		statusCode := MakeTestRequestWithJWT(t, messageResponse, testRequestParams)

		expectedData := &schemas.CreateMessageResponse{
			Users: []string{currentUserID, userID},
			Message: schemas.MessageResponse{
				OwnerID: currentUserID,
				Message: "roomCreator's message",
				Readers: []schemas.MessageReader{},
			},
		}

		assert.Equal(t, http.StatusOK, statusCode)
		assert.Equal(t, expectedData, messageResponse)
	})
}
