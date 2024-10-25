package services

import (
	"fmt"
	"mwmail/internal/config"
	"mwmail/internal/schemas"
	"net/smtp"

	"github.com/jordan-wright/email"
)

const identity = ""

type SmtpService struct {
	SenderName     string
	SenderMail     string
	SenderPassword string
	AuthAddress    string
	ServerAddress  string
	EnvType        string
}

func NewSmtpService(config *config.Config) *SmtpService {
	return &SmtpService{
		SenderName:     config.SenderName,
		SenderMail:     config.SenderEmail,
		SenderPassword: config.SenderPassword,
		AuthAddress:    config.SmtpAuthAddress,
		ServerAddress:  config.SmtpServerAddress,
		EnvType:        config.EnvType,
	}
}

func (ss *SmtpService) SendMail(dataMail *schemas.MailRequest) (*schemas.SendSmtpResponse, error) {
	if ss.EnvType != "prod" {
		return &schemas.SendSmtpResponse{
			SenderMail: "Stub sender mail",
			SenderName: "Stub sender name",
			Recipients: dataMail.Recipients,
			Cc:         dataMail.Cc,
			Bcc:        dataMail.Bcc,
			ReplyTo:    dataMail.ReplyTo,
			Subject:    dataMail.Subject,
			Message:    dataMail.Message,
		}, nil
	}

	mail := ss.CreateMail(dataMail)

	smtpAuth := smtp.PlainAuth(identity, ss.SenderMail, ss.SenderPassword, ss.AuthAddress)

	err := mail.Send(ss.ServerAddress, smtpAuth)
	if err != nil {
		return nil, err
	}

	mailResp := schemas.SendSmtpResponse{
		SenderMail: ss.SenderMail,
		SenderName: ss.SenderName,
		Recipients: dataMail.Recipients,
		Cc:         dataMail.Cc,
		Bcc:        dataMail.Bcc,
		ReplyTo:    dataMail.ReplyTo,
		Subject:    dataMail.Subject,
		Message:    dataMail.Message,
	}

	return &mailResp, nil

}

func (ss *SmtpService) CreateMail(dataMail *schemas.MailRequest) *email.Email {
	mail := email.NewEmail()

	mail.From = fmt.Sprintf("%s <%s>", ss.SenderName, ss.SenderMail)
	mail.Subject = dataMail.Subject
	mail.HTML = []byte(dataMail.Message)
	mail.Cc = dataMail.Cc
	mail.Bcc = dataMail.Bcc
	mail.ReplyTo = dataMail.ReplyTo
	mail.To = dataMail.Recipients

	return mail
}
