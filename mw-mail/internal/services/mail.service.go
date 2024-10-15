package services

import (
	"context"

	db "mwmail/internal/db/sqlc"
	"mwmail/internal/schemas"
	"mwmail/pkg/utils"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgtype"
)

type IMailRepository interface {
	CreateMail(ctx context.Context, arg db.CreateMailParams) (db.CreateMailRow, error)
	WithTx(tx pgx.Tx) *db.Queries
}

type MailService struct {
	MailRepository IMailRepository
}

func NewMailService(mailRepository IMailRepository) *MailService {
	return &MailService{mailRepository}
}

// Save response log after sending message to recipients
func (ms *MailService) SaveMail(ctx context.Context, smtpInfoParams *schemas.SendSmtpResponse) (*schemas.SendMailResponse, error) {
	var createMailParams db.CreateMailParams

	if smtpInfoParams.Log == "" {
		createMailParams.Log = "mail successfully sent"
	} else {
		createMailParams.Log = smtpInfoParams.Log
	}

	createMailParams = db.CreateMailParams{
		FromEmail:   smtpInfoParams.FromEmail,
		FromName:    pgtype.Text{String: smtpInfoParams.FromName, Valid: true},
		Recipients:  smtpInfoParams.Recipients,
		Cc:          smtpInfoParams.Cc,
		Bcc:         smtpInfoParams.Bcc,
		Subject:     smtpInfoParams.Subject,
		Message:     pgtype.Text{String: smtpInfoParams.Message, Valid: true},
		HtmlMessage: pgtype.Text{String: smtpInfoParams.HtmlMessage, Valid: true},
	}

	result, err := ms.MailRepository.CreateMail(ctx, createMailParams)
	if err != nil {
		return nil, err
	}

	return &schemas.SendMailResponse{
		ID:          utils.ConvertPgUUIDToUUID(result.Uuid).String(),
		FromEmail:   result.FromEmail,
		Recipients:  result.Recipients,
		Subject:     result.Subject,
		Message:     *utils.MarshalPgText(result.Message),
		HtmlMessage: *utils.MarshalPgText(result.HtmlMessage),
	}, nil
}
