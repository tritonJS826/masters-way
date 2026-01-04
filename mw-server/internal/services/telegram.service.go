package services

import (
	"context"
	"fmt"
	"log"
	"time"

	db "mw-server/internal/db/sqlc"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgtype"
)

type TelegramService struct {
	queries *db.Queries
}

func NewTelegramService(queries *db.Queries) *TelegramService {
	return &TelegramService{
		queries: queries,
	}
}

func (ts *TelegramService) CreatePendingTelegramUser(ctx context.Context, telegramID int64, telegramName string, authCode string, expiresIn time.Duration) (db.TelegramUser, error) {
	var telegramNamePg pgtype.Text
	if telegramName != "" {
		telegramNamePg.String = telegramName
		telegramNamePg.Valid = true
	}

	log.Printf("CreatePendingTelegramUser: telegramID=%d, authCode=%s", telegramID, authCode)

	return ts.queries.CreatePendingTelegramUser(ctx, db.CreatePendingTelegramUserParams{
		TelegramID:        telegramID,
		TelegramName:      telegramNamePg,
		AuthCode:          authCode,
		AuthCodeExpiresAt: pgtype.Timestamp{Time: time.Now().Add(expiresIn), Valid: true},
	})
}

func (ts *TelegramService) GetPendingTelegramUserByAuthCode(ctx context.Context, authCode string) (db.TelegramUser, error) {
	return ts.queries.GetPendingTelegramUserByAuthCode(ctx, authCode)
}

func (ts *TelegramService) LinkTelegramUserByAuthCode(ctx context.Context, authCode string, userUuid uuid.UUID) error {
	return ts.queries.LinkTelegramUserByAuthCode(ctx, db.LinkTelegramUserByAuthCodeParams{
		UserUuid: pgtype.UUID{Bytes: userUuid, Valid: true},
		AuthCode: authCode,
	})
}

func (ts *TelegramService) GetLinkedUserByTelegramId(ctx context.Context, telegramID int64) (db.GetLinkedUserByTelegramIdRow, error) {
	return ts.queries.GetLinkedUserByTelegramId(ctx, telegramID)
}

func (ts *TelegramService) GetTelegramUserByAuthCode(ctx context.Context, authCode string) (db.TelegramUser, error) {
	return ts.queries.GetTelegramUserByAuthCode(ctx, authCode)
}

func (ts *TelegramService) LinkTelegramUser(ctx context.Context, telegramID int64, authCode string, userUuid string) error {
	var userUuidPg pgtype.UUID
	if userUuid != "" {
		uidBytes, err := uuid.Parse(userUuid)
		if err != nil {
			return fmt.Errorf("invalid user_uuid: %w", err)
		}
		userUuidPg = pgtype.UUID{Bytes: uidBytes, Valid: true}
	}

	return ts.queries.LinkTelegramUser(ctx, db.LinkTelegramUserParams{
		TelegramID:   telegramID,
		UserUuid:     userUuidPg,
		TelegramName: pgtype.Text{Valid: false},
		AuthCode:     authCode,
	})
}

func (ts *TelegramService) CleanupExpiredCodes(ctx context.Context) error {
	return ts.queries.CleanupExpiredTelegramCodes(ctx)
}

func (ts *TelegramService) UnlinkTelegramUser(ctx context.Context, telegramID int64) error {
	return ts.queries.DeleteTelegramUserByTelegramId(ctx, telegramID)
}
