package services

import (
	"context"

	db "mwmail/internal/db/sqlc"
	"mwmail/internal/schemas"
	"mwmail/pkg/utils"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgtype"
)

const emptyName = ""

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

func (ms *MailService) SaveMailResultToDB(ctx context.Context, smtpInfoParams *schemas.SendSmtpResponse) (*schemas.SendMailResponse, error) {

	createMailParams := db.CreateMailParams{
		SenderMail: smtpInfoParams.SenderMail,
		SenderName: pgtype.Text{String: smtpInfoParams.SenderName, Valid: true},
		Recipients: smtpInfoParams.Recipients,
		Cc:         smtpInfoParams.Cc,
		Bcc:        smtpInfoParams.Bcc,
		Subject:    smtpInfoParams.Subject,
		Message:    smtpInfoParams.Message,
		Log:        pgtype.Text{String: smtpInfoParams.Log, Valid: true},
	}

	result, err := ms.MailRepository.CreateMail(ctx, createMailParams)
	if err != nil {
		return nil, err
	}

	var senderName string
	if ptr := utils.MarshalPgText(result.SenderName); ptr != nil {
		senderName = *ptr
	} else {
		senderName = emptyName
	}

	return &schemas.SendMailResponse{
		ID:         utils.ConvertPgUUIDToUUID(result.Uuid).String(),
		SenderMail: result.SenderMail,
		SenderName: senderName,
		Recipients: result.Recipients,
		Cc:         result.Cc,
		Bcc:        result.Bcc,
		ReplyTo:    result.ReplyTo,
		Subject:    result.Subject,
		Message:    result.Message,
	}, nil
}
