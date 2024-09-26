package services

import (
	"context"
	db "mwgeneral/internal/db/sqlc"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgtype"
)

type IMentorUserWayRepository interface {
	CreateMentorUserWay(ctx context.Context, arg db.CreateMentorUserWayParams) (db.MentorUsersWay, error)
	CreateFormerMentorsWay(ctx context.Context, arg db.CreateFormerMentorsWayParams) (db.FormerMentorsWay, error)
	DeleteFormerMentorWayIfExist(ctx context.Context, arg db.DeleteFormerMentorWayIfExistParams) error
	DeleteFromUserMentoringRequest(ctx context.Context, arg db.DeleteFromUserMentoringRequestParams) error
	DeleteMentorUserWayByIds(ctx context.Context, arg db.DeleteMentorUserWayByIdsParams) error
}

type MentorUserWayService struct {
	mentorUserWayRepository IMentorUserWayRepository
}

func NewMentorUserWayService(mentorUserWayRepository IMentorUserWayRepository) *MentorUserWayService {
	return &MentorUserWayService{mentorUserWayRepository}
}

func (ms *MentorUserWayService) AddMentorUserWay(ctx context.Context, userID, wayID string) error {
	userPgUUID := pgtype.UUID{Bytes: uuid.MustParse(userID), Valid: true}
	wayPgUUID := pgtype.UUID{Bytes: uuid.MustParse(wayID), Valid: true}

	args0 := db.DeleteFormerMentorWayIfExistParams{
		FormerMentorUuid: userPgUUID,
		WayUuid:          wayPgUUID,
	}
	err0 := ms.mentorUserWayRepository.DeleteFormerMentorWayIfExist(ctx, args0)
	if err0 != nil {
		return err0
	}

	args := db.CreateMentorUserWayParams{
		WayUuid:  wayPgUUID,
		UserUuid: userPgUUID,
	}
	_, err := ms.mentorUserWayRepository.CreateMentorUserWay(ctx, args)
	if err != nil {
		return err
	}

	args4 := db.DeleteFromUserMentoringRequestParams{
		UserUuid: userPgUUID,
		WayUuid:  wayPgUUID,
	}
	err4 := ms.mentorUserWayRepository.DeleteFromUserMentoringRequest(ctx, args4)
	if err4 != nil {
		return err4
	}

	return nil
}

func (ms *MentorUserWayService) DeleteMentorUserWay(ctx context.Context, userID, wayID string) error {
	userPgUUID := pgtype.UUID{Bytes: uuid.MustParse(userID), Valid: true}
	wayPgUUID := pgtype.UUID{Bytes: uuid.MustParse(wayID), Valid: true}

	args := db.DeleteMentorUserWayByIdsParams{
		WayUuid:  wayPgUUID,
		UserUuid: userPgUUID,
	}
	err := ms.mentorUserWayRepository.DeleteMentorUserWayByIds(ctx, args)
	if err != nil {
		return err
	}

	args2 := db.CreateFormerMentorsWayParams{
		FormerMentorUuid: userPgUUID,
		WayUuid:          wayPgUUID,
	}
	_, err2 := ms.mentorUserWayRepository.CreateFormerMentorsWay(ctx, args2)
	if err2 != nil {
		return err2
	}

	return nil
}
