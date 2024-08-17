package util

import (
	"database/sql"
	"errors"
	"fmt"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

type NotWayOwnerError struct {
	WayUUID string
}

func (e *NotWayOwnerError) Error() string {
	return fmt.Sprintf("Not enough rights! You can request editing rights on the way \"%s\".", e.WayUUID)
}

func HandleErrorGin(c *gin.Context, err error) {
	if err != nil {
		if err == sql.ErrNoRows {
			c.JSON(http.StatusNotFound, gin.H{"error": err.Error(), "message": "Failed to retrieve entity with this ID"})
			return
		}

		var notWayOwnerError *NotWayOwnerError
		if errors.As(err, &notWayOwnerError) {
			c.JSON(http.StatusForbidden, gin.H{"error": err.Error()})
		}

		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		log.Panic(err)
	}
}
