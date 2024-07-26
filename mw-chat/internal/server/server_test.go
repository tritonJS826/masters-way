package server

import (
	"bytes"
	"encoding/json"
	"io"
	"mwchat/internal/auth"
	"mwchat/internal/schemas"
	"net/http"
	"testing"

	"github.com/stretchr/testify/assert"
)

var ChatBaseUrl string = "http://localhost:8001"

func MakeRequest(method string, url string, body io.Reader) (*http.Response, error) {
	request, err := http.NewRequest(method, url, body)
	if err != nil {
		return nil, err
	}

	token, err := auth.GenerateTestJWT("ef9b3a5c-2676-4eb4-a21d-cc0a9fb34f1e")
	if err != nil {
		return nil, err
	}

	request.Header.Set("Content-Type", "application/json")
	request.Header.Set("Authorization", "Bearer "+token)

	client := &http.Client{}
	response, err := client.Do(request)
	if err != nil {
		return nil, err
	}

	return response, nil
}

func resetDatabase() error {
	_, err := MakeRequest(http.MethodGet, ChatBaseUrl+"/chat/dev/reset-db", nil)
	if err != nil {
		return err
	}
	return nil
}

func TestCreateRoom(t *testing.T) {
	err := resetDatabase()
	if err != nil {
		t.Fatalf("could not create request: %v", err)
	}

	t.Run("CreatePrivateRoom_Success", func(t *testing.T) {
		expectedData := schemas.RoomPopulatedResponse{
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
		}

		userID := "2d0f5ddb-0713-4d02-b193-871518496a0e"
		inputData := schemas.CreateRoomPayload{
			UserID:   &userID,
			Name:     nil,
			RoomType: "private",
		}
		jsonInputData, _ := json.Marshal(inputData)
		response, err := MakeRequest(http.MethodPost, ChatBaseUrl+"/chat/rooms", bytes.NewBuffer(jsonInputData))
		if err != nil {
			t.Fatalf("could not create request: %v", err)
		}
		defer response.Body.Close()

		var respBody schemas.RoomPopulatedResponse
		err = json.NewDecoder(response.Body).Decode(&respBody)
		if err != nil {
			t.Fatalf("could not decode response body: %v", err)
		}

		assert.Equal(t, http.StatusOK, response.StatusCode)

		assert.Equal(t, expectedData.Users, respBody.Users)
		assert.Equal(t, expectedData.Name, respBody.Name)
		assert.Equal(t, expectedData.Messages, respBody.Messages)
		assert.Equal(t, expectedData.IsBlocked, respBody.IsBlocked)
	})

	t.Run("CreatePrivateRoom_PrivateRoomAlreadyExists", func(t *testing.T) {
		userID := "2d0f5ddb-0713-4d02-b193-871518496a0e"
		inputData := schemas.CreateRoomPayload{
			UserID:   &userID,
			Name:     nil,
			RoomType: "private",
		}
		jsonInputData, _ := json.Marshal(inputData)
		response, err := MakeRequest(http.MethodPost, ChatBaseUrl+"/chat/rooms", bytes.NewBuffer(jsonInputData))
		if err != nil {
			t.Fatalf("could not create request: %v", err)
		}
		defer response.Body.Close()

		assert.Equal(t, http.StatusInternalServerError, response.StatusCode)
	})
}

func TestCreateMessage(t *testing.T) {
	err := resetDatabase()
	if err != nil {
		t.Fatalf("could not create request: %v", err)
	}

	userID := "009360e6-81ba-4075-a3b6-1eaa908e5a2a"
	createRoomInputData := schemas.CreateRoomPayload{
		UserID:   &userID,
		Name:     nil,
		RoomType: "private",
	}
	jsonCreateRoomInputData, _ := json.Marshal(createRoomInputData)
	createRoomResponse, err := MakeRequest(http.MethodPost, ChatBaseUrl+"/chat/rooms", bytes.NewBuffer(jsonCreateRoomInputData))
	if err != nil {
		t.Fatalf("could not create request: %v", err)
	}
	defer createRoomResponse.Body.Close()

	var respBody schemas.RoomPopulatedResponse
	err = json.NewDecoder(createRoomResponse.Body).Decode(&respBody)
	if err != nil {
		t.Fatalf("could not decode response body: %v", err)
	}

	t.Run("CreateMessageInPrivateRoom_Success", func(t *testing.T) {
		expectedData := schemas.MessageResponse{
			OwnerID: "ef9b3a5c-2676-4eb4-a21d-cc0a9fb34f1e",
			Message: "Hello!",
			Readers: []schemas.MessageReaders{},
		}

		createMessageInputData := schemas.CreateMessagePayload{
			Message: "Hello!",
		}
		jsonCreateMessageInputData, _ := json.Marshal(createMessageInputData)
		createMessageResponse, err := MakeRequest(http.MethodPost, ChatBaseUrl+"/chat/rooms/"+respBody.RoomID+"/messages", bytes.NewBuffer(jsonCreateMessageInputData))
		if err != nil {
			t.Fatalf("could not create request: %v", err)
		}
		defer createMessageResponse.Body.Close()

		var createMessageResponseBody schemas.MessageResponse
		err = json.NewDecoder(createMessageResponse.Body).Decode(&createMessageResponseBody)
		if err != nil {
			t.Fatalf("could not decode response body: %v", err)
		}

		assert.Equal(t, http.StatusOK, createMessageResponse.StatusCode)

		assert.Equal(t, expectedData.OwnerID, createMessageResponseBody.OwnerID)
		assert.Equal(t, expectedData.Message, createMessageResponseBody.Message)
		assert.Equal(t, expectedData.Readers, createMessageResponseBody.Readers)
	})
}
