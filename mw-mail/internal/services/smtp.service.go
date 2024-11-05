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
	Config *config.Config
}

func NewSmtpService(config *config.Config) *SmtpService {
	return &SmtpService{
		Config: config,
	}
}

func (ss *SmtpService) SendMail(dataMail *schemas.MailRequest) (*schemas.SendSmtpResponse, error) {
	if ss.Config.EnvType != "prod" {
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

	smtpAuth := smtp.PlainAuth(identity, ss.Config.SenderMail, ss.Config.SenderPassword, ss.Config.SmtpAuthAddress)

	err := mail.Send(ss.Config.SmtpServerAddress, smtpAuth)
	if err != nil {
		return nil, err
	}

	mailResp := schemas.SendSmtpResponse{
		SenderMail: ss.Config.SenderMail,
		SenderName: ss.Config.SenderName,
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

	mail.From = fmt.Sprintf("%s <%s>", ss.Config.SenderName, ss.Config.SenderMail)
	mail.Subject = dataMail.Subject
	mail.HTML = []byte(dataMail.Message)
	mail.Cc = dataMail.Cc
	mail.Bcc = dataMail.Bcc
	mail.ReplyTo = dataMail.ReplyTo
	mail.To = dataMail.Recipients

	return mail
}
