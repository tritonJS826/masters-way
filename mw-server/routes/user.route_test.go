package routes

import (
	"bytes"
	"encoding/json"
	"io"
	"mwserver/schemas"
	"net/http"
	"testing"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/stretchr/testify/assert"
)

var jwtTestKey = []byte("")

type Claims struct {
	UserID string `json:"userID"`
	jwt.StandardClaims
}

func GenerateTestJWT(userID string) (string, error) {
	expirationTime := time.Now().Add(24 * time.Hour)
	claims := &Claims{
		UserID: userID,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: expirationTime.Unix(),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(jwtTestKey)
}

// type responseError struct {
// 	Error string `json:"error"`
// }

func MakeTestRequestWithJWT[T interface{}](t *testing.T, method string, url string, body io.Reader, responseEmpty *T, userID string) int {
	request, err := http.NewRequest(method, url, body)
	if err != nil {
		t.Fatalf("Failed to create new HTTP request: %v", err)
	}

	request.Header.Set("Content-Type", "application/json")
	if userID != "" {
		token, err := GenerateTestJWT(userID)
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

func TestGetUsersByIDs(t *testing.T) {

	currentUserID := "d2cb5e1b-44df-48d3-b7a1-34f3d7a5b7e2"
	user1ID := "3d922e8a-5d58-4b82-9a3d-83e2e73b3f91"

	t.Run("", func(t *testing.T) {
		inputData := []string{
			currentUserID,
			user1ID,
		}
		jsonInputData, err := json.Marshal(inputData)
		if err != nil {
			t.Fatalf("Failed to marshal create room payload: %v", err)
		}

		var getUsersByIDsResponse schemas.GetUsersByIDsResponse
		statusCode := MakeTestRequestWithJWT(
			t,
			http.MethodPost,
			"http://localhost:8000/api/users/list-by-ids",
			bytes.NewBuffer(jsonInputData),
			&getUsersByIDsResponse,
			currentUserID,
		)

		expectedData := []schemas.GetUsersByIDsResponse{
			{
				UserID:   currentUserID,
				Name:     "Bob Brown",
				ImageURL: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.gettyimages.com%2F&psig=AOvVaw2zWpFWOHXwuTI0x6EM4vXB&ust=1719409370844000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCID3x67x9oYDFQAAAAAdAAAAABAT",
			},
			{
				UserID:   user1ID,
				Name:     "Alice Johnson",
				ImageURL: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.gettyimages.com%2F&psig=AOvVaw2zWpFWOHXwuTI0x6EM4vXB&ust=1719409370844000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCID3x67x9oYDFQAAAAAdAAAAABAT",
			},
		}

		assert.Equal(t, http.StatusOK, statusCode)
		assert.Equal(t, expectedData, getUsersByIDsResponse)
	})

	// t.Run("should return error if private room contains a nonexistent user", func(t *testing.T) {
	// 	var responseError responseError
	// 	statusCode := MakeTestRequestWithJWT(t,
	// 		http.MethodGet,
	// 		newConfig.ChatBffBaseURL+"/chat/rooms/"+roomID,
	// 		nil,
	// 		&responseError,
	// 		currentUserID,
	// 	)

	// 	fmt.Println(responseError.Error)

	// 	assert.Equal(t, http.StatusInternalServerError, statusCode)
	// 	assert.Equal(t, "User with ID "+invalidUserID+" not found in the general service", responseError.Error)
	// })
}
