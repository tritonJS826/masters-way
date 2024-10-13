package utils

import (
	"mwmail/internal/schemas"
)

func BuildResponse(mailReq *schemas.EmailRequest, err error, fromEmail string) *schemas.SendMailResponse {
	return &schemas.SendMailResponse{
		ID:          "",
		FromEmail:   fromEmail,
		Recipients:  mailReq.To,
		Subject:     mailReq.Subject,
		Message:     mailReq.Message,
		HtmlMessage: mailReq.HtmlMessage,
		Err:         err.Error(),
	}
}
