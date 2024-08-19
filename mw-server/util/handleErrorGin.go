package util

import (
	"database/sql"
	"errors"
	"fmt"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

type NoRightToChangeDayReportError struct {
	Err   string `json:"error" validate:"required"`
	ErrID string `json:"errorId" validate:"required"`
}

func MakeNoRightToChangeDayReportError(wayID string) *NoRightToChangeDayReportError {
	return &NoRightToChangeDayReportError{
		Err:   fmt.Sprintf("Not enough rights! You can request editing rights on the way %s.", wayID),
		ErrID: "no-access-rights",
	}
}

func (err *NoRightToChangeDayReportError) Error() string {
	return err.Err
}

func HandleErrorGin(c *gin.Context, err error) {
	if err == nil {
		return
	}

	if err == sql.ErrNoRows {
		c.AbortWithStatusJSON(http.StatusNotFound, gin.H{"error": err.Error(), "message": "Failed to retrieve entity with this ID"})
		log.Panic(err)
	}

	var notWayOwnerError *NoRightToChangeDayReportError
	if errors.As(err, &notWayOwnerError) {
		c.AbortWithStatusJSON(http.StatusForbidden, err)
		log.Panic(err)
	}

	c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
	log.Panic(err)
}
