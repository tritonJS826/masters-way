package server

import (
	"bytes"
	"encoding/json"
	"io"
	"mwchat/internal/auth"
	"mwchat/internal/config"
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
		t.Fatalf("Failed to load config: : %v", err)
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
		newConfig.ChatBaseUrl+"/chat/rooms",
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
		t.Fatalf("Failed to load config: : %v", err)
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
		newConfig.ChatBaseUrl+"/chat/rooms/"+roomID+"/messages",
		bytes.NewBuffer(jsonCreateMessageInputData),
		&roomPopulatedResponse,
		userID,
	)
}

// Tests
func TestGetRoomById(t *testing.T) {
	newConfig, err := config.LoadConfig("../../")
	if err != nil {
		t.Fatalf("Failed to load config: : %v", err)
	}
	MakeTestRequestWithJWT[struct{}](t, http.MethodGet, newConfig.ChatBaseUrl+"/chat/dev/reset-db", nil, nil, "")

	roomCreatorID := "7211da6f-6404-4a7e-868b-b473e95444e1"
	userID := "f71d2758-581b-4565-8a92-ff663a99939b"

	roomID := createPrivateRoom(t, roomCreatorID, userID)

	userMessage := "User message"
	sendMessage(t, roomID, userID, userMessage)

	creatorMessage1 := "Creator message 1"
	creatorMessage2 := "Creator message 2"
	sendMessage(t, roomID, roomCreatorID, creatorMessage1)
	sendMessage(t, roomID, roomCreatorID, creatorMessage2)

	t.Run("should return private room with populated messages and users", func(t *testing.T) {
		var roomPopulatedResponse schemas.RoomPopulatedResponse
		statusCode := MakeTestRequestWithJWT(t,
			http.MethodGet,
			newConfig.ChatBaseUrl+"/chat/rooms/"+roomID,
			nil,
			&roomPopulatedResponse,
			roomCreatorID,
		)

		expectedData := schemas.RoomPopulatedResponse{
			RoomID:    roomID,
			Name:      nil,
			RoomType:  "private",
			IsBlocked: false,
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
			Messages: []schemas.MessageResponse{
				{
					OwnerID: userID,
					Message: userMessage,
					Readers: []schemas.MessageReaders{},
				},
				{
					OwnerID: roomCreatorID,
					Message: creatorMessage1,
					Readers: []schemas.MessageReaders{},
				},
				{
					OwnerID: roomCreatorID,
					Message: creatorMessage2,
					Readers: []schemas.MessageReaders{},
				},
			},
		}

		assert.Equal(t, http.StatusOK, statusCode)
		assert.Equal(t, expectedData, roomPopulatedResponse)
	})
}

func TestGetChatPreview(t *testing.T) {
	newConfig, err := config.LoadConfig("../../")
	if err != nil {
		t.Fatalf("Failed to load config: : %v", err)
	}
	MakeTestRequestWithJWT[struct{}](t, http.MethodGet, newConfig.ChatBaseUrl+"/chat/dev/reset-db", nil, nil, "")

	// users
	roomCreatorID := "10ffb9af-3031-4078-a3a6-55286b6d9bcf"
	user1ID := "c17c4df9-1df4-44eb-af5b-a7140ede7b5f"
	user2ID := "bf548e0a-e9a2-466c-a741-b6e35c230aef"

	// rooms
	room1ID := createPrivateRoom(t, roomCreatorID, user1ID)
	room2ID := createPrivateRoom(t, roomCreatorID, user2ID)

	// roomCreator's messages in room 1
	room1CreatorMessage1 := "Room 1 roomCreator's message 1"
	room1CreatorMessage2 := "Room 1 roomCreator's message 2"
	sendMessage(t, room1ID, roomCreatorID, room1CreatorMessage1)
	sendMessage(t, room1ID, roomCreatorID, room1CreatorMessage2)

	// roomCreator's messages in room 2
	room2CreatorMessage1 := "Room 2 roomCreator's message 1"
	room2CreatorMessage2 := "Room 2 roomCreator's message 2"
	sendMessage(t, room2ID, roomCreatorID, room2CreatorMessage1)
	sendMessage(t, room2ID, roomCreatorID, room2CreatorMessage2)

	// user1's messages in room 1
	room1User1Message1 := "Room 1 user1's message 1"
	room1User1Message2 := "Room 1 user1's message 2"
	sendMessage(t, room1ID, user1ID, room1User1Message1)
	sendMessage(t, room1ID, user1ID, room1User1Message2)

	// user2's messages in room 2
	user2Message1 := "Room 2 user2's message 1"
	user2Message2 := "Room 2 user2's message 2"
	user2Message3 := "Room 2 user2's message 3"
	sendMessage(t, room2ID, user2ID, user2Message1)
	sendMessage(t, room2ID, user2ID, user2Message2)
	sendMessage(t, room2ID, user2ID, user2Message3)

	t.Run("should return chat preview with correct unread messages amount", func(t *testing.T) {
		var getChatPreviewResponse schemas.GetChatPreviewResponse
		statusCode := MakeTestRequestWithJWT(t,
			http.MethodGet,
			newConfig.ChatBaseUrl+"/chat/rooms/preview",
			nil,
			&getChatPreviewResponse,
			roomCreatorID,
		)

		expectedData := schemas.GetChatPreviewResponse{
			UnreadMessagesAmount: 5,
		}

		assert.Equal(t, http.StatusOK, statusCode)
		assert.Equal(t, expectedData.UnreadMessagesAmount, getChatPreviewResponse.UnreadMessagesAmount)
	})
}

func TestGetRooms(t *testing.T) {
	newConfig, err := config.LoadConfig("../../")
	if err != nil {
		t.Fatalf("Failed to load config: : %v", err)
	}
	MakeTestRequestWithJWT[struct{}](t, http.MethodGet, newConfig.ChatBaseUrl+"/chat/dev/reset-db", nil, nil, "")

	roomCreatorID := "10ffb9af-3031-4078-a3a6-55286b6d9bcf"

	user1ID := "16919db5-fff0-4719-a322-f39ef1af4a72"
	room1ID := createPrivateRoom(t, roomCreatorID, user1ID)

	user2ID := "59869e70-f0d6-4604-8367-b849bf252a04"
	room2ID := createPrivateRoom(t, roomCreatorID, user2ID)

	t.Run("should return list of private rooms successfully", func(t *testing.T) {
		var getRoomsResponse schemas.GetRoomsResponse
		statusCode := MakeTestRequestWithJWT(
			t,
			http.MethodGet,
			newConfig.ChatBaseUrl+"/chat/rooms/list/private",
			nil,
			&getRoomsResponse,
			roomCreatorID,
		)

		expectedData := schemas.GetRoomsResponse{
			Size: 2,
			Rooms: []schemas.RoomPreviewResponse{
				{
					RoomID: room1ID,
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
					Name:      "",
					IsBlocked: false,
				},
				{
					RoomID: room2ID,
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
					Name:      "",
					IsBlocked: false,
				},
			},
		}

		assert.Equal(t, http.StatusOK, statusCode)

		assert.Equal(t, expectedData.Size, getRoomsResponse.Size)
		assert.Equal(t, expectedData.Rooms, getRoomsResponse.Rooms)
	})
}

func TestCreateRoom(t *testing.T) {
	newConfig, err := config.LoadConfig("../../")
	if err != nil {
		t.Fatalf("Failed to load config: : %v", err)
	}
	MakeTestRequestWithJWT[struct{}](t, http.MethodGet, newConfig.ChatBaseUrl+"/chat/dev/reset-db", nil, nil, "")

	roomCreatorID := "5bee7465-220d-40e7-82d7-b9b607fff21c"
	userID := "f4cbdb32-0fc0-4704-a6d9-9cf357e5cd3e"

	t.Run("should create a private room successfully", func(t *testing.T) {
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
			newConfig.ChatBaseUrl+"/chat/rooms",
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
			newConfig.ChatBaseUrl+"/chat/rooms",
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
		t.Fatalf("Failed to load config: : %v", err)
	}
	MakeTestRequestWithJWT[struct{}](t, http.MethodGet, newConfig.ChatBaseUrl+"/chat/dev/reset-db", nil, nil, "")

	roomCreatorID := "cf09bb5d-8803-4ce6-b19f-c3e613442055"
	user1ID := "acb612b9-5a09-452e-8221-7a5dfc2a2f08"
	roomID := createPrivateRoom(t, roomCreatorID, user1ID)

	t.Run("should create a message in private room successfully", func(t *testing.T) {
		createMessageInputData := schemas.CreateMessagePayload{
			Message: "roomCreator's message",
		}
		jsonCreateMessageInputData, err := json.Marshal(createMessageInputData)
		if err != nil {
			t.Fatalf("Failed to marshal create room payload: %v", err)
		}
		var messageResponse schemas.MessageResponse
		statusCode := MakeTestRequestWithJWT(
			t,
			http.MethodPost,
			newConfig.ChatBaseUrl+"/chat/rooms/"+roomID+"/messages",
			bytes.NewBuffer(jsonCreateMessageInputData),
			&messageResponse,
			roomCreatorID,
		)

		expectedData := schemas.MessageResponse{
			OwnerID: roomCreatorID,
			Message: "roomCreator's message",
			Readers: []schemas.MessageReaders{},
		}

		assert.Equal(t, http.StatusOK, statusCode)

		assert.Equal(t, expectedData.OwnerID, messageResponse.OwnerID)
		assert.Equal(t, expectedData.Message, messageResponse.Message)
		assert.Equal(t, expectedData.Readers, messageResponse.Readers)
	})
}
