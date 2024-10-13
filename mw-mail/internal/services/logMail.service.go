package services

import (
	"context"

	db "mwmail/internal/db/sqlc"
	"mwmail/internal/schemas"
	"mwmail/pkg/utils"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgtype"
)

type ILogMailRepository interface {
	CreateLogMail(ctx context.Context, arg db.CreateLogMailParams) (db.CreateLogMailRow, error)
	WithTx(tx pgx.Tx) *db.Queries
}

type LogMailService struct {
	MailRepository ILogMailRepository
}

func NewLogMailService(mailRepository ILogMailRepository) *LogMailService {
	return &LogMailService{mailRepository}
}

// Save response log after sending message to recipients
func (ms *LogMailService) SaveLogMail(ctx context.Context, smtpInfoParams *schemas.SendSmtpResponse) (*schemas.SendMailResponse, error) {
	// db data struct
	createMailParams := db.CreateLogMailParams{
		FromEmail:   smtpInfoParams.FromEmail,
		FromName:    pgtype.Text{String: smtpInfoParams.FromName, Valid: true},
		Recipients:  smtpInfoParams.Recipients,
		Cc:          smtpInfoParams.Cc,
		Bcc:         smtpInfoParams.Bcc,
		Subject:     smtpInfoParams.Subject,
		Message:     pgtype.Text{String: smtpInfoParams.Message, Valid: true},
		HtmlMessage: pgtype.Text{String: smtpInfoParams.HtmlMessage, Valid: true},
		Err:         pgtype.Text{String: smtpInfoParams.Err, Valid: true},
	}

	//result data from db
	result, err := ms.MailRepository.CreateLogMail(ctx, createMailParams)
	if err != nil {
		return nil, err
	}

	// struct for response
	return &schemas.SendMailResponse{
		ID:          utils.ConvertPgUUIDToUUID(result.Uuid).String(),
		FromEmail:   result.FromEmail,
		Recipients:  result.Recipients,
		Subject:     result.Subject,
		Message:     *utils.MarshalPgText(result.Message),
		HtmlMessage: *utils.MarshalPgText(result.HtmlMessage),
	}, nil
}
