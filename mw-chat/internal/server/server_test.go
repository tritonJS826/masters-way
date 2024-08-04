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

func MakeTestRequestWithJWT[T interface{}](t *testing.T, method string, url string, body io.Reader, responseEmpty *T, userID string) int {
	request, err := http.NewRequest(method, url, body)
	if err != nil {
		t.Fatalf("Failed to create new HTTP request: %v", err)
	}

	request.Header.Set("Content-Type", "application/json")
	if userID != "" {
		token, err := auth.GenerateTestJWT(userID)
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

func createPrivateRoom(t *testing.T, roomCreatorID, userID string) string {
	newConfig, err := config.LoadConfig("../../")
	if err != nil {
		t.Fatalf("Failed to load config: %v", err)
	}
	createRoomInputData := schemas.CreateRoomPayload{
		UserID:   &userID,
		Name:     nil,
		RoomType: "private",
	}
	jsonCreateRoomInputData, err := json.Marshal(createRoomInputData)
	if err != nil {
		t.Fatalf("Failed to marshal create room payload: %v", err)
	}
	var roomPopulatedResponse schemas.RoomPopulatedResponse
	MakeTestRequestWithJWT(t,
		http.MethodPost,
		newConfig.ChatBaseURL+"/chat/rooms",
		bytes.NewBuffer(jsonCreateRoomInputData),
		&roomPopulatedResponse,
		roomCreatorID,
	)
	if roomPopulatedResponse.RoomID == "" {
		t.Fatalf("Failed to create room")
	}

	return roomPopulatedResponse.RoomID
}

func sendMessage(t *testing.T, roomID, userID, message string) {
	if roomID == "" || userID == "" {
		t.Fatalf("Failed to create message: roomID or userID are nil")
	}
	newConfig, err := config.LoadConfig("../../")
	if err != nil {
		t.Fatalf("Failed to load config: %v", err)
	}
	createMessageInputData := schemas.CreateMessagePayload{
		Message: message,
	}
	jsonCreateMessageInputData, err := json.Marshal(createMessageInputData)
	if err != nil {
		t.Fatalf("Failed to marshal create message payload: %v", err)
	}

	var roomPopulatedResponse schemas.MessageResponse
	MakeTestRequestWithJWT(t,
		http.MethodPost,
		newConfig.ChatBaseURL+"/chat/rooms/"+roomID+"/messages",
		bytes.NewBuffer(jsonCreateMessageInputData),
		&roomPopulatedResponse,
		userID,
	)
}

// Tests
func TestGetRoomById(t *testing.T) {
	newConfig, err := config.LoadConfig("../../")
	if err != nil {
		t.Fatalf("Failed to load config: %v", err)
	}

	MakeTestRequestWithJWT[struct{}](t, http.MethodGet, newConfig.ChatBaseURL+"/chat/dev/reset-db", nil, nil, "")

	currentUserID := "d2cb5e1b-44df-48d3-b7a1-34f3d7a5b7e2"
	userID := "3d922e8a-5d58-4b82-9a3d-83e2e73b3f91"
	roomID := "78bdf878-3b83-4f97-8d2e-928c132a10cd"

	t.Run("should return private room by room id with messages and users", func(t *testing.T) {
		var roomPopulatedResponse schemas.RoomPopulatedResponse
		statusCode := MakeTestRequestWithJWT(t,
			http.MethodGet,
			newConfig.ChatBaseURL+"/chat/rooms/"+roomID,
			nil,
			&roomPopulatedResponse,
			currentUserID,
		)

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

	MakeTestRequestWithJWT[struct{}](t, http.MethodGet, newConfig.ChatBaseURL+"/chat/dev/reset-db", nil, nil, "")

	currentUserID := "d2cb5e1b-44df-48d3-b7a1-34f3d7a5b7e2"

	t.Run("should return chat preview with correct unread messages amount", func(t *testing.T) {
		var getChatPreviewResponse schemas.GetChatPreviewResponse
		statusCode := MakeTestRequestWithJWT(t,
			http.MethodGet,
			newConfig.ChatBaseURL+"/chat/rooms/preview",
			nil,
			&getChatPreviewResponse,
			currentUserID,
		)

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

	MakeTestRequestWithJWT[struct{}](t, http.MethodGet, newConfig.ChatBaseURL+"/chat/dev/reset-db", nil, nil, "")

	roomCreatorID := "d63d2f89-6412-4324-8587-7061bf02dca4"

	user1ID := "c31384a6-b811-4a1f-befa-95dd53e3f4b9"
	room1ID := "e57fc491-69f7-4b30-9979-78879c8873bf"

	user2ID := "5a31e3cb-7e9a-41e5-9a3b-1f1e5d6b7c3e"
	room2ID := "897f4a0f-fe31-4036-8358-f89a19c9bda6"

	user3ID := "8a3d1fe1-42da-499a-bf64-248297fd670a"
	room3ID := "85f610df-9f86-4c55-8ee1-02485d42defb"

	t.Run("should return list of private rooms successfully", func(t *testing.T) {
		var getRoomsResponse schemas.GetRoomsResponse
		statusCode := MakeTestRequestWithJWT(
			t,
			http.MethodGet,
			newConfig.ChatBaseURL+"/chat/rooms/list/private",
			nil,
			&getRoomsResponse,
			roomCreatorID,
		)

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
	MakeTestRequestWithJWT[struct{}](t, http.MethodGet, newConfig.ChatBaseURL+"/chat/dev/reset-db", nil, nil, "")

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

		var roomPopulatedResponse schemas.RoomPopulatedResponse
		statusCode := MakeTestRequestWithJWT(
			t,
			http.MethodPost,
			newConfig.ChatBaseURL+"/chat/rooms",
			bytes.NewBuffer(jsonInputData),
			&roomPopulatedResponse,
			roomCreatorID,
		)

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

		var responseError responseError
		statusCode := MakeTestRequestWithJWT(
			t,
			http.MethodPost,
			newConfig.ChatBaseURL+"/chat/rooms",
			bytes.NewBuffer(jsonInputData),
			&responseError,
			roomCreatorID,
		)

		assert.Equal(t, http.StatusInternalServerError, statusCode)
		assert.Equal(t, "A private room for these users already exists", responseError.Error)
	})
}

func TestCreateMessage(t *testing.T) {
	newConfig, err := config.LoadConfig("../../")
	if err != nil {
		t.Fatalf("Failed to load config: %v", err)
	}
	MakeTestRequestWithJWT[struct{}](t, http.MethodGet, newConfig.ChatBaseURL+"/chat/dev/reset-db", nil, nil, "")

	currentUserID := "cf09bb5d-8803-4ce6-b19f-c3e613442055"
	userID := "acb612b9-5a09-452e-8221-7a5dfc2a2f08"
	roomID := createPrivateRoom(t, currentUserID, userID)

	t.Run("should create a message in private room and return it successfully", func(t *testing.T) {
		createMessageInputData := schemas.CreateMessagePayload{
			Message: "roomCreator's message",
		}
		jsonCreateMessageInputData, err := json.Marshal(createMessageInputData)
		if err != nil {
			t.Fatalf("Failed to marshal create room payload: %v", err)
		}
		var messageResponse schemas.CreateMessageResponse
		statusCode := MakeTestRequestWithJWT(
			t,
			http.MethodPost,
			newConfig.ChatBaseURL+"/chat/rooms/"+roomID+"/messages",
			bytes.NewBuffer(jsonCreateMessageInputData),
			&messageResponse,
			currentUserID,
		)

		expectedData := schemas.CreateMessageResponse{
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
