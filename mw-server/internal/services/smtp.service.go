package services

import (
	"fmt"
	"mw-server/internal/config"
	"net/smtp"

	"github.com/jordan-wright/email"
)

const smtpIdentity = ""

type SmtpService struct {
	Config *config.Config
}

func NewSmtpService(config *config.Config) *SmtpService {
	return &SmtpService{
		Config: config,
	}
}

func (ss *SmtpService) SendMail(dataMail *MailSendParams) (*MailSmtpResult, error) {
	if ss.Config.EnvType != "prod" {
		return &MailSmtpResult{
			SenderMail: "Stub sender mail",
			SenderName: "Stub sender name",
			Recipients: dataMail.Recipients,
			Cc:         dataMail.Cc,
			Bcc:        dataMail.Bcc,
			ReplyTo:    dataMail.Reply,
			Subject:    dataMail.Subject,
			Message:    dataMail.Message,
		}, nil
	}

	mail := ss.CreateMail(dataMail)

	smtpAuth := smtp.PlainAuth(smtpIdentity, ss.Config.SenderEmail, ss.Config.SenderPassword, ss.Config.SmtpAuthAddress)

	err := mail.Send(ss.Config.SmtpServerAddress, smtpAuth)
	if err != nil {
		return nil, err
	}

	mailResp := MailSmtpResult{
		SenderMail: ss.Config.SenderEmail,
		SenderName: ss.Config.SenderName,
		Recipients: dataMail.Recipients,
		Cc:         dataMail.Cc,
		Bcc:        dataMail.Bcc,
		ReplyTo:    dataMail.Reply,
		Subject:    dataMail.Subject,
		Message:    dataMail.Message,
	}

	return &mailResp, nil
}

func (ss *SmtpService) CreateMail(dataMail *MailSendParams) *email.Email {
	mail := email.NewEmail()

	mail.From = fmt.Sprintf("%s <%s>", ss.Config.SenderName, ss.Config.SenderEmail)
	mail.Subject = dataMail.Subject
	mail.HTML = []byte(dataMail.Message)
	mail.Cc = dataMail.Cc
	mail.Bcc = dataMail.Bcc
	mail.ReplyTo = dataMail.Reply
	mail.To = dataMail.Recipients

	return mail
}

type MailSendParams struct {
	Subject    string
	Recipients []string
	Cc         []string
	Bcc        []string
	Reply      []string
	Message    string
}

type MailSmtpResult struct {
	SenderMail string
	SenderName string
	Recipients []string
	Cc         []string
	Bcc        []string
	ReplyTo    []string
	Subject    string
	Message    string
	Log        string
}