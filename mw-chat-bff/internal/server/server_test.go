package server

import (
	"bytes"
	"encoding/json"
	"io"
	"mw-chat-bff/internal/auth"
	"mw-chat-bff/internal/config"
	"mw-chat-bff/internal/controllers"
	"mw-chat-bff/internal/schemas"
	utils "mw-chat-bff/internal/utils"
	"net/http"
	"testing"

	"github.com/stretchr/testify/assert"
)

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

func TestGetRoomById(t *testing.T) {
	newConfig, err := config.LoadConfig("../../")
	if err != nil {
		t.Fatalf("Failed to load config: %v", err)
	}

	MakeTestRequestWithJWT[struct{}](t, http.MethodGet, "http://localhost:8001/chat/dev/reset-db", nil, nil, "")

	currentUserID := "d2cb5e1b-44df-48d3-b7a1-34f3d7a5b7e2"
	userID := "3d922e8a-5d58-4b82-9a3d-83e2e73b3f91"
	roomID := "78bdf878-3b83-4f97-8d2e-928c132a10cd"

	t.Run("should return populated private room by room id with populated messages and users", func(t *testing.T) {
		var roomPopulatedResponse schemas.RoomPopulatedResponse
		statusCode := MakeTestRequestWithJWT(t,
			http.MethodGet,
			newConfig.ChatBffBaseURL+"/chat/rooms/"+roomID,
			nil,
			&roomPopulatedResponse,
			currentUserID,
		)

		expectedData := schemas.RoomPopulatedResponse{
			RoomID:    roomID,
			Name:      "Alice Johnson",
			RoomType:  controllers.RoomTypePrivate,
			ImageURL:  "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.gettyimages.com%2F&psig=AOvVaw2zWpFWOHXwuTI0x6EM4vXB&ust=1719409370844000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCID3x67x9oYDFQAAAAAdAAAAABAT",
			IsBlocked: false,
			Users: []schemas.UserResponse{
				{
					UserID:   currentUserID,
					Name:     "Bob Brown",
					ImageURL: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.gettyimages.com%2F&psig=AOvVaw2zWpFWOHXwuTI0x6EM4vXB&ust=1719409370844000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCID3x67x9oYDFQAAAAAdAAAAABAT",
					Role:     "regular",
				},
				{
					UserID:   userID,
					Name:     "Alice Johnson",
					ImageURL: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.gettyimages.com%2F&psig=AOvVaw2zWpFWOHXwuTI0x6EM4vXB&ust=1719409370844000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCID3x67x9oYDFQAAAAAdAAAAABAT",
					Role:     "regular",
				},
			},
			Messages: []schemas.MessageResponse{
				{
					OwnerID:       currentUserID,
					OwnerName:     "Bob Brown",
					OwnerImageURL: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.gettyimages.com%2F&psig=AOvVaw2zWpFWOHXwuTI0x6EM4vXB&ust=1719409370844000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCID3x67x9oYDFQAAAAAdAAAAABAT",
					Message:       "Test message 1",
					Readers:       []schemas.MessageReader{},
				},
				{
					OwnerID:       userID,
					OwnerName:     "Alice Johnson",
					OwnerImageURL: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.gettyimages.com%2F&psig=AOvVaw2zWpFWOHXwuTI0x6EM4vXB&ust=1719409370844000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCID3x67x9oYDFQAAAAAdAAAAABAT",
					Message:       "Test message 2",
					Readers: []schemas.MessageReader{
						{
							UserID: currentUserID,
						},
					},
				},
				{
					OwnerID:       currentUserID,
					OwnerName:     "Bob Brown",
					OwnerImageURL: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.gettyimages.com%2F&psig=AOvVaw2zWpFWOHXwuTI0x6EM4vXB&ust=1719409370844000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCID3x67x9oYDFQAAAAAdAAAAABAT",
					Message:       "Test message 3",
					Readers:       []schemas.MessageReader{},
				},
				{
					OwnerID:       userID,
					OwnerName:     "Alice Johnson",
					OwnerImageURL: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.gettyimages.com%2F&psig=AOvVaw2zWpFWOHXwuTI0x6EM4vXB&ust=1719409370844000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCID3x67x9oYDFQAAAAAdAAAAABAT",
					Message:       "Test message 4",
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
		assert.Equal(t, expectedData.ImageURL, roomPopulatedResponse.ImageURL)
		assert.Equal(t, expectedData.RoomType, roomPopulatedResponse.RoomType)
		assert.Equal(t, expectedData.IsBlocked, roomPopulatedResponse.IsBlocked)
		assert.Equal(t, expectedData.Users, roomPopulatedResponse.Users)

		for i, expectedMessage := range expectedData.Messages {
			actualMessage := roomPopulatedResponse.Messages[i]
			assert.Equal(t, expectedMessage.OwnerID, actualMessage.OwnerID)
			assert.Equal(t, expectedMessage.OwnerName, actualMessage.OwnerName)
			assert.Equal(t, expectedMessage.OwnerImageURL, actualMessage.OwnerImageURL)
			assert.Equal(t, expectedMessage.Message, actualMessage.Message)

			for j, expectedReader := range expectedMessage.Readers {
				actualReader := actualMessage.Readers[j]
				assert.Equal(t, expectedReader.UserID, actualReader.UserID)
			}
		}
	})
}

func TestGetRooms(t *testing.T) {
	newConfig, err := config.LoadConfig("../../")
	if err != nil {
		t.Fatalf("Failed to load config: %v", err)
	}

	MakeTestRequestWithJWT[struct{}](t, http.MethodGet, "http://localhost:8001/chat/dev/reset-db", nil, nil, "")
	MakeTestRequestWithJWT[struct{}](t, http.MethodGet, "http://localhost:8000/api/dev/reset-db", nil, nil, "")

	currentUserID := "d2cb5e1b-44df-48d3-b7a1-34f3d7a5b7e2"
	user1ID := "3d922e8a-5d58-4b82-9a3d-83e2e73b3f91"
	user2ID := "1b3d5e7f-5a1e-4d3a-b1a5-d1a1d5b7a7e1"

	t.Run("should return list of populated private rooms successfully", func(t *testing.T) {
		var getRoomsResponse schemas.GetRoomsResponse
		statusCode := MakeTestRequestWithJWT(
			t,
			http.MethodGet,
			newConfig.ChatBffBaseURL+"/chat/rooms/list/private",
			nil,
			&getRoomsResponse,
			currentUserID,
		)

		expectedData := schemas.GetRoomsResponse{
			Size: 2,
			Rooms: []schemas.RoomPreviewResponse{
				{
					RoomID:    "78bdf878-3b83-4f97-8d2e-928c132a10cd",
					Name:      "Alice Johnson",
					ImageURL:  "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.gettyimages.com%2F&psig=AOvVaw2zWpFWOHXwuTI0x6EM4vXB&ust=1719409370844000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCID3x67x9oYDFQAAAAAdAAAAABAT",
					RoomType:  controllers.RoomTypePrivate,
					IsBlocked: false,
					Users: []schemas.UserResponse{
						{
							UserID:   currentUserID,
							Name:     "Bob Brown",
							ImageURL: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.gettyimages.com%2F&psig=AOvVaw2zWpFWOHXwuTI0x6EM4vXB&ust=1719409370844000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCID3x67x9oYDFQAAAAAdAAAAABAT",
							Role:     "regular",
						},
						{
							UserID:   user1ID,
							Name:     "Alice Johnson",
							ImageURL: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.gettyimages.com%2F&psig=AOvVaw2zWpFWOHXwuTI0x6EM4vXB&ust=1719409370844000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCID3x67x9oYDFQAAAAAdAAAAABAT",
							Role:     "regular",
						},
					},
				},
				{
					RoomID:    "7c3a2511-c938-4a60-a9db-406e18bfeec0",
					Name:      "Dana Evans",
					ImageURL:  "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.gettyimages.com%2F&psig=AOvVaw2zWpFWOHXwuTI0x6EM4vXB&ust=1719409370844000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCID3x67x9oYDFQAAAAAdAAAAABAT",
					RoomType:  controllers.RoomTypePrivate,
					IsBlocked: false,
					Users: []schemas.UserResponse{
						{
							UserID:   currentUserID,
							Name:     "Bob Brown",
							ImageURL: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.gettyimages.com%2F&psig=AOvVaw2zWpFWOHXwuTI0x6EM4vXB&ust=1719409370844000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCID3x67x9oYDFQAAAAAdAAAAABAT",
							Role:     "regular",
						},
						{
							UserID:   user2ID,
							Name:     "Dana Evans",
							ImageURL: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.gettyimages.com%2F&psig=AOvVaw2zWpFWOHXwuTI0x6EM4vXB&ust=1719409370844000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCID3x67x9oYDFQAAAAAdAAAAABAT",
							Role:     "regular",
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

	MakeTestRequestWithJWT[struct{}](t, http.MethodGet, "http://localhost:8001/chat/dev/reset-db", nil, nil, "")
	MakeTestRequestWithJWT[struct{}](t, http.MethodGet, "http://localhost:8000/api/dev/reset-db", nil, nil, "")

	roomCreatorID := "d2cb5e1b-44df-48d3-b7a1-34f3d7a5b7e2"

	t.Run("should create a populated private room and return it with populated users successfully", func(t *testing.T) {
		userID := "7cdb041b-4574-4f7b-a500-c53e74c72e94"

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
			newConfig.ChatBffBaseURL+"/chat/rooms",
			bytes.NewBuffer(jsonInputData),
			&roomPopulatedResponse,
			roomCreatorID,
		)

		expectedData := schemas.RoomPopulatedResponse{
			Name:      "John Doe",
			ImageURL:  "https://www.google.com/url?sa=i&url=https%3A%2F%2Fyandex.com%2Fimages%2F%3Flr%3D87%26redircnt%3D1694438178.1&psig=AOvVaw2zWpFWOHXwuTI0x6EM4vXB&ust=1719409370844000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCID3x67x9oYDFQAAAAAdAAAAABAE",
			RoomType:  controllers.RoomTypePrivate,
			Messages:  []schemas.MessageResponse{},
			IsBlocked: false,
			Users: []schemas.UserResponse{
				{
					UserID:   roomCreatorID,
					Name:     "Bob Brown",
					ImageURL: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.gettyimages.com%2F&psig=AOvVaw2zWpFWOHXwuTI0x6EM4vXB&ust=1719409370844000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCID3x67x9oYDFQAAAAAdAAAAABAT",
					Role:     "regular",
				},
				{
					UserID:   userID,
					Name:     "John Doe",
					ImageURL: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fyandex.com%2Fimages%2F%3Flr%3D87%26redircnt%3D1694438178.1&psig=AOvVaw2zWpFWOHXwuTI0x6EM4vXB&ust=1719409370844000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCID3x67x9oYDFQAAAAAdAAAAABAE",
					Role:     "regular",
				},
			},
		}

		assert.Equal(t, http.StatusOK, statusCode)

		assert.Equal(t, expectedData.Users, roomPopulatedResponse.Users)
		assert.Equal(t, expectedData.RoomType, roomPopulatedResponse.RoomType)
		assert.Equal(t, expectedData.Name, roomPopulatedResponse.Name)
		assert.Equal(t, expectedData.ImageURL, roomPopulatedResponse.ImageURL)
		assert.Equal(t, expectedData.Messages, roomPopulatedResponse.Messages)
		assert.Equal(t, expectedData.IsBlocked, roomPopulatedResponse.IsBlocked)
	})

	t.Run("should return error if private room already exists", func(t *testing.T) {
		userID := "3d922e8a-5d58-4b82-9a3d-83e2e73b3f91"

		inputData := schemas.CreateRoomPayload{
			UserID:   &userID,
			Name:     nil,
			RoomType: "private",
		}
		jsonInputData, err := json.Marshal(inputData)
		if err != nil {
			t.Fatalf("Failed to marshal create room payload: %v", err)
		}

		var response utils.ResponseError
		statusCode := MakeTestRequestWithJWT(
			t,
			http.MethodPost,
			newConfig.ChatBffBaseURL+"/chat/rooms",
			bytes.NewBuffer(jsonInputData),
			&response,
			roomCreatorID,
		)

		assert.Equal(t, http.StatusInternalServerError, statusCode)
		assert.Equal(t, "chat service error: A private room for these users already exists", response.Error)
	})

	t.Run("should return error if private room is created with a non-existent user", func(t *testing.T) {
		invalidUserID := "10378803-f8cb-4bb9-b948-a5a017b51738"

		inputData := schemas.CreateRoomPayload{
			UserID:   &invalidUserID,
			Name:     nil,
			RoomType: "private",
		}
		jsonInputData, err := json.Marshal(inputData)
		if err != nil {
			t.Fatalf("Failed to marshal create room payload: %v", err)
		}

		var response utils.ResponseError
		statusCode := MakeTestRequestWithJWT(
			t,
			http.MethodPost,
			newConfig.ChatBffBaseURL+"/chat/rooms",
			bytes.NewBuffer(jsonInputData),
			&response,
			roomCreatorID,
		)

		assert.Equal(t, http.StatusInternalServerError, statusCode)
		assert.Equal(t, "general service error: User ID "+invalidUserID+" not found in the database", response.Error)
	})
}

func TestCreateMessage(t *testing.T) {
	newConfig, err := config.LoadConfig("../../")
	if err != nil {
		t.Fatalf("Failed to load config: %v", err)
	}

	MakeTestRequestWithJWT[struct{}](t, http.MethodGet, "http://localhost:8001/chat/dev/reset-db", nil, nil, "")

	roomCreatorID := "d2cb5e1b-44df-48d3-b7a1-34f3d7a5b7e2"
	userID := "3d922e8a-5d58-4b82-9a3d-83e2e73b3f91"
	roomID := "78bdf878-3b83-4f97-8d2e-928c132a10cd"

	t.Run("should create a message in populated private room and return it with populated messageReaders successfully", func(t *testing.T) {
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
			newConfig.ChatBffBaseURL+"/chat/rooms/"+roomID+"/messages",
			bytes.NewBuffer(jsonCreateMessageInputData),
			&messageResponse,
			roomCreatorID,
		)

		expectedData := schemas.CreateMessageResponse{
			Users: []string{roomCreatorID, userID},
			Message: schemas.MessageResponse{
				OwnerID:       roomCreatorID,
				OwnerName:     "Bob Brown",
				OwnerImageURL: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.gettyimages.com%2F&psig=AOvVaw2zWpFWOHXwuTI0x6EM4vXB&ust=1719409370844000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCID3x67x9oYDFQAAAAAdAAAAABAT",
				Message:       "roomCreator's message",
				Readers:       []schemas.MessageReader{},
			},
		}

		assert.Equal(t, http.StatusOK, statusCode)
		assert.Equal(t, expectedData, messageResponse)
	})
}
