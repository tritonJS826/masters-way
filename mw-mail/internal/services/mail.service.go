package services

import (
	"context"

	db "mwmail/internal/db/sqlc"
	"mwmail/internal/schemas"
	"mwmail/pkg/utils"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgtype"
)

const mailSuccessSent = "mail successfully sent"

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

	var log string
	if smtpInfoParams.Log == "" {
		log = mailSuccessSent
	} else {
		log = smtpInfoParams.Log
	}

	createMailParams := db.CreateMailParams{
		FromMail:   smtpInfoParams.FromMail,
		FromName:   pgtype.Text{String: smtpInfoParams.FromName, Valid: true},
		Recipients: smtpInfoParams.Recipients,
		Cc:         smtpInfoParams.Cc,
		Bcc:        smtpInfoParams.Bcc,
		Subject:    smtpInfoParams.Subject,
		Message:    smtpInfoParams.Message,
		Log:        log,
	}

	result, err := ms.MailRepository.CreateMail(ctx, createMailParams)
	if err != nil {
		return nil, err
	}

	return &schemas.SendMailResponse{
		ID:         utils.ConvertPgUUIDToUUID(result.Uuid).String(),
		FromMail:   result.FromMail,
		Recipients: result.Recipients,
		Subject:    result.Subject,
		Message:    result.Message,
	}, nil
}
