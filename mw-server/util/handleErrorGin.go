package util

import (
	"database/sql"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

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
