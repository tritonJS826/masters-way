package utils

import (
	"log"
	"mwmail/internal/schemas"
	"net/http"

	"github.com/gin-gonic/gin"
)

func SendMsgErrorGin(c *gin.Context, err error, mailReq *schemas.EmailRequest, fromEmail string) {

	resp := BuildResponse(mailReq, err, fromEmail)
	c.JSON(http.StatusInternalServerError, resp)

	log.Panic(err)
}

func HandleErrorGin(c *gin.Context, err error) {

	c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
	log.Panic(err)
}
