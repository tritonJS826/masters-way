package services

import (
	"context"

	db "mwserver/db/sqlc"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgtype"
)

type IFromUserMentoringRequestRepository interface {
	CreateFromUserMentoringRequest(ctx context.Context, arg db.CreateFromUserMentoringRequestParams) (db.FromUserMentoringRequest, error)
	DeleteFromUserMentoringRequest(ctx context.Context, arg db.DeleteFromUserMentoringRequestParams) error
}

type FromUserMentoringRequestService struct {
	fromUserMentoringRequestRepository IFromUserMentoringRequestRepository
}

func NewFromUserMentoringRequestService(fromUserMentoringRequestRepository IFromUserMentoringRequestRepository) *FromUserMentoringRequestService {
	return &FromUserMentoringRequestService{fromUserMentoringRequestRepository}
}

func (fumrs *FromUserMentoringRequestService) CreateFromUserMentoringRequest(ctx context.Context, userID, wayID string) (*db.FromUserMentoringRequest, error) {
	fromUserMentoringRequest, err := fumrs.fromUserMentoringRequestRepository.CreateFromUserMentoringRequest(ctx, db.CreateFromUserMentoringRequestParams{
		UserUuid: pgtype.UUID{Bytes: uuid.MustParse(userID), Valid: true},
		WayUuid:  pgtype.UUID{Bytes: uuid.MustParse(wayID), Valid: true},
	})
	if err != nil {
		return nil, err
	}

	return &fromUserMentoringRequest, nil
}

func (fumrs *FromUserMentoringRequestService) DeleteFromUserMentoringRequestById(ctx context.Context, userID, wayID string) error {
	return fumrs.fromUserMentoringRequestRepository.DeleteFromUserMentoringRequest(ctx, db.DeleteFromUserMentoringRequestParams{
		UserUuid: pgtype.UUID{Bytes: uuid.MustParse(userID), Valid: true},
		WayUuid:  pgtype.UUID{Bytes: uuid.MustParse(wayID), Valid: true},
	})
}
