package util

import (
	"database/sql"
	"errors"
	"log"
	"mw-general/internal/customErrors"
	"net/http"

	"github.com/gin-gonic/gin"
)

func HandleErrorGin(c *gin.Context, err error) {
	if err == nil {
		return
	}

	if err == sql.ErrNoRows {
		c.AbortWithStatusJSON(http.StatusNotFound, gin.H{"error": err.Error(), "message": "Failed to retrieve entity with this ID"})
		log.Panic(err)
	}

	var notWayOwnerError *customErrors.NoRightToChangeDayReportError
	if errors.As(err, &notWayOwnerError) {
		c.AbortWithStatusJSON(http.StatusForbidden, err)
		log.Panic(err)
	}

	c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
	log.Panic(err)
}
