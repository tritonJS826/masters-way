package util

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
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
	if err != nil {
		if err == sql.ErrNoRows {
			c.JSON(http.StatusNotFound, gin.H{"error": err.Error(), "message": "Failed to retrieve entity with this ID"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		log.Panic(err)
	}
}
