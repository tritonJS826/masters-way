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

// Sending messages to recipients with smtp
func (ss *SmtpService) SendMail(dataMail *schemas.MailRequest) (*schemas.SendSmtpResponse, error) {

	mail := ss.CreateMail(dataMail)

	smtpAuth := smtp.PlainAuth("", ss.SenderMail, ss.SenderPassword, ss.AuthAddress)

	err := mail.Send(ss.ServerAddress, smtpAuth)
	if err != nil {

		return nil, err
	}

	mailResp := schemas.SendSmtpResponse{
		FromEmail:   ss.SenderMail,
		FromName:    ss.SenderName,
		Recipients:  dataMail.To,
		Cc:          dataMail.Cc,
		Bcc:         dataMail.Bcc,
		ReplyTo:     dataMail.ReplyTo,
		Subject:     dataMail.Subject,
		Message:     dataMail.Message,
		HtmlMessage: dataMail.HtmlMessage,
	}

	return &mailResp, nil

}

func (ss *SmtpService) CreateMail(dataMail *schemas.MailRequest) *email.Email {
	mail := email.NewEmail()

	mail.From = fmt.Sprintf("%s <%s>", ss.SenderName, ss.SenderMail)
	mail.Subject = dataMail.Subject
	mail.HTML = []byte(dataMail.HtmlMessage)
	mail.Text = []byte(dataMail.Message)
	mail.Cc = dataMail.Cc
	mail.Bcc = dataMail.Bcc
	mail.ReplyTo = dataMail.ReplyTo
	mail.To = dataMail.To

	return mail
}
