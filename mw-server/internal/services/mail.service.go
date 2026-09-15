package services

import (
	"context"

	db "mw-server/internal/db/sqlc"
	"mw-server/internal/schemas"
	"mw-server/pkg/util"

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

func (ms *MailService) SaveMailResultToDB(ctx context.Context, smtpResult *MailSmtpResult) (*schemas.SendMailResponse, error) {
	createMailParams := db.CreateMailParams{
		SenderMail: smtpResult.SenderMail,
		SenderName: pgtype.Text{String: smtpResult.SenderName, Valid: true},
		Recipients: smtpResult.Recipients,
		Cc:         smtpResult.Cc,
		Bcc:        smtpResult.Bcc,
		Subject:    smtpResult.Subject,
		Message:    smtpResult.Message,
		Log:        pgtype.Text{String: smtpResult.Log, Valid: true},
	}

	result, err := ms.MailRepository.CreateMail(ctx, createMailParams)
	if err != nil {
		return nil, err
	}

	senderName := ""
	if ptr := util.MarshalPgText(result.SenderName); ptr != nil {
		senderName = *ptr
	}

	return &schemas.SendMailResponse{
		ID:         util.ConvertPgUUIDToUUID(result.Uuid).String(),
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