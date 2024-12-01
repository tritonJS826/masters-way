package utils

import (
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5"
)

type ResponseError struct {
	Error string `json:"error"`
}

func ExtractErrorMessageFromResponse(response *http.Response) (string, error) {
	var message ResponseError
	decodeErr := json.NewDecoder(response.Body).Decode(&message)
	if decodeErr != nil {
		return "", fmt.Errorf("failed to decode response body: %w", decodeErr)
	}
	return message.Error, nil
}

func HandleErrorGin(c *gin.Context, err error) {
	if err == nil {
		return
	}

	if errors.Is(err, pgx.ErrNoRows) {
		c.AbortWithStatusJSON(http.StatusNotFound, gin.H{"error": err.Error(), "message": "Failed to retrieve entity with this ID"})
		log.Panic(err)
	}

	c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
	log.Panic(err)
}
