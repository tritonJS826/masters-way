package services

import (
	"context"

	db "mwserver/db/sqlc"
	"mwserver/schemas"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgtype"
)

type IToUserMentoringRequestRepository interface {
	CreateToUserMentoringRequest(ctx context.Context, arg db.CreateToUserMentoringRequestParams) (db.ToUserMentoringRequest, error)
	DeleteToUserMentoringRequestByIds(ctx context.Context, arg db.DeleteToUserMentoringRequestByIdsParams) error
}

type ToUserMentoringRequestService struct {
	toUserMentoringRequestRepository IToUserMentoringRequestRepository
}

func NewToUserMentoringRequestService(toUserMentoringRequestRepository IToUserMentoringRequestRepository) *ToUserMentoringRequestService {
	return &ToUserMentoringRequestService{toUserMentoringRequestRepository}
}

func (ts *ToUserMentoringRequestService) CreateToUserMentoringRequest(ctx context.Context, payload *schemas.CreateUserMentoringRequestPayload) (*db.ToUserMentoringRequest, error) {
	args := db.CreateToUserMentoringRequestParams{
		UserUuid: pgtype.UUID{Bytes: uuid.MustParse(payload.UserUuid), Valid: true},
		WayUuid:  pgtype.UUID{Bytes: uuid.MustParse(payload.WayUuid), Valid: true},
	}

	toUserMentoringRequest, err := ts.toUserMentoringRequestRepository.CreateToUserMentoringRequest(ctx, args)
	if err != nil {
		return nil, err
	}

	return &toUserMentoringRequest, nil
}

func (ts *ToUserMentoringRequestService) DeleteToUserMentoringRequestById(ctx context.Context, userID, wayID string) error {
	return ts.toUserMentoringRequestRepository.DeleteToUserMentoringRequestByIds(ctx, db.DeleteToUserMentoringRequestByIdsParams{
		UserUuid: pgtype.UUID{Bytes: uuid.MustParse(userID), Valid: true},
		WayUuid:  pgtype.UUID{Bytes: uuid.MustParse(wayID), Valid: true},
	})
}
