package services

import (
	"fmt"
	"mwmail/internal/config"
	"mwmail/internal/schemas"
	"net/smtp"

	"github.com/jordan-wright/email"
)

type SmtpService struct {
	SenderName     string
	SenderMail     string
	SenderPassword string
	AuthAddress    string
	ServerAddress  string
}

func NewSmtpService(config *config.Config) *SmtpService {
	return &SmtpService{
		SenderName:     config.SenderName,
		SenderMail:     config.SenderEmail,
		SenderPassword: config.SenderPassword,
		AuthAddress:    config.SmtpAuthAddress,
		ServerAddress:  config.SmtpServerAddress,
	}
}

// Sending messages to recipients with Maileroo api
func (ss *SmtpService) SendMail(dataMail *schemas.EmailRequest) (*schemas.SendSmtpResponse, error) {
	var emailResp schemas.SendSmtpResponse

	//Formatting the data received from the request.
	e := email.NewEmail()
	e.From = fmt.Sprintf("%s <%s>", ss.SenderName, ss.SenderMail)
	e.Subject = dataMail.Subject
	e.HTML = []byte(dataMail.HtmlMessage)
	e.Text = []byte(dataMail.Message)
	e.Cc = dataMail.Cc
	e.Bcc = dataMail.Bcc
	e.ReplyTo = dataMail.ReplyTo
	e.To = dataMail.To

	smtpAuth := smtp.PlainAuth("", ss.SenderMail, ss.SenderPassword, ss.AuthAddress)

	err := e.Send(ss.ServerAddress, smtpAuth)
	if err != nil {
		//formating data struct for save response log
		emailResp.FromEmail = ss.SenderMail
		emailResp.FromName = ss.SenderName
		emailResp.Recipients = dataMail.To
		emailResp.Cc = dataMail.Cc
		emailResp.Bcc = dataMail.Bcc
		emailResp.ReplyTo = dataMail.ReplyTo
		emailResp.Subject = dataMail.Subject
		emailResp.Message = dataMail.Message
		emailResp.HtmlMessage = dataMail.HtmlMessage
		emailResp.Err = err.Error()

		return &emailResp, err
	}

	//formating data struct for save response log
	emailResp.FromEmail = ss.SenderMail
	emailResp.FromName = ss.SenderName
	emailResp.Recipients = dataMail.To
	emailResp.Cc = dataMail.Cc
	emailResp.Bcc = dataMail.Bcc
	emailResp.ReplyTo = dataMail.ReplyTo
	emailResp.Subject = dataMail.Subject
	emailResp.Message = dataMail.Message
	emailResp.HtmlMessage = dataMail.HtmlMessage
	emailResp.Err = ""

	return &emailResp, nil

}
