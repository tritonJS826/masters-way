package controllers

import (
	"encoding/json"
	"io"
	"net/http"
	"testing"

	"github.com/go-playground/assert/v2"
)

var BaseUrl string = "http://localhost:8000"

func MakeRequest[T interface{}](t *testing.T, method string, url string, body io.Reader, responseEmpty *T) {
	request, err := http.NewRequest(method, url, body)
	if err != nil {
		t.Fatalf("Failed to create request: %v", err)
	}
	request.Header.Add("Content-Type", "application/json")

	client := &http.Client{}
	responseRaw, err := client.Do(request)
	if err != nil {
		t.Fatalf("Failed to perform request: %v", err)
	}

	defer responseRaw.Body.Close()

	err = json.NewDecoder(responseRaw.Body).Decode(responseEmpty)
	if err != nil {
		t.Fatalf("Failed to decode response: %v", err)
	}

	responseStatus := responseRaw.Status
	if responseStatus != "200 OK" {
		t.Errorf("Unexpected status: %s", responseStatus)
	}
}

func TestMainHealth(t *testing.T) {
	t.Parallel()
	url := BaseUrl + "/api/healthcheck"

	type responseType struct {
		Message string `json:"message"`
	}

	response := &responseType{}
	MakeRequest(t, "GET", url, nil, response)

	okMessage := "The way APi is working fine"
	isMessageOk := response.Message == okMessage
	assert.Equal(t, isMessageOk, true)
}
