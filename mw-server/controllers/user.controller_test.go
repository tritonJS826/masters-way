package controllers

import (
	"bytes"
	"encoding/json"
	"mwserver/schemas"
	"testing"
	"time"

	"github.com/go-playground/assert/v2"
	"github.com/google/uuid"
)

func TestCreateUser2(t *testing.T) {
	t.Parallel()
	randomString := time.Now().String()
	inputData := schemas.CreateUserPayload{
		Name:        "test" + randomString,
		Email:       "testemail1" + randomString + "@gmail.com",
		Description: "test description",
		ImageUrl:    "http://site.com/test-image",
		IsMentor:    false,
	}
	jsonValue, _ := json.Marshal(inputData)
	url := BaseUrl + "/api/users"

	type responseType struct {
		User   schemas.UserPlainResponse `json:"user"`
		Status string                    `json:"status"`
	}

	response := &responseType{}
	MakeRequest(t, "POST", url, bytes.NewBuffer(jsonValue), response)

	uuid.MustParse(response.User.Uuid)
	assert.Equal(t, response.User.Name, inputData.Name)
	assert.Equal(t, response.User.Email, inputData.Email)
	assert.Equal(t, response.User.Description, inputData.Description)
	assert.Equal(t, response.User.ImageUrl, inputData.ImageUrl)
	assert.Equal(t, response.User.IsMentor, inputData.IsMentor)
}
