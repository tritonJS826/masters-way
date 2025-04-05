package services

import (
	"context"
	db "mw-server/internal/db/sqlc"
	"mw-server/internal/schemas"
	"mw-server/pkg/util"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgtype"
)

type IUserContactRepository interface {
	CreateUserContact(ctx context.Context, arg db.CreateUserContactParams) (db.UserContact, error)
	UpdateContactByID(ctx context.Context, arg db.UpdateContactByIDParams) (db.UserContact, error)
	DeleteUserContact(ctx context.Context, arg db.DeleteUserContactParams) error
}

type UserContactService struct {
	userContactRepository IUserContactRepository
}

func NewUserContactService(userContactRepository IUserContactRepository) *UserContactService {
	return &UserContactService{userContactRepository}
}

func (uc *UserContactService) CreateUserContact(ctx context.Context, userUuid uuid.UUID) (*schemas.UserContact, error) {
	userContact, err := uc.userContactRepository.CreateUserContact(ctx, db.CreateUserContactParams{
		UserUuid:    pgtype.UUID{Bytes: userUuid, Valid: true},
		ContactLink: "",
		Description: "",
	})
	if err != nil {
		return nil, err
	}

	return &schemas.UserContact{
		Uuid:        util.ConvertPgUUIDToUUID(userContact.Uuid).String(),
		ContactLink: userContact.ContactLink,
		Description: userContact.Description,
	}, nil
}

type UpdateUserContactParams struct {
	ContactId   uuid.UUID
	Description *string
	ContactLink *string
}

func (uc *UserContactService) UpdateUserContact(ctx context.Context, payload *UpdateUserContactParams) (*schemas.UserContact, error) {
	var description pgtype.Text
	if payload.Description != nil {
		description = pgtype.Text{String: *payload.Description, Valid: true}
	} else {
		description = pgtype.Text{Valid: false}
	}

	var contactLink pgtype.Text
	if payload.ContactLink != nil {
		contactLink = pgtype.Text{String: *payload.ContactLink, Valid: true}
	} else {
		contactLink = pgtype.Text{Valid: false}
	}

	userContact, err := uc.userContactRepository.UpdateContactByID(ctx, db.UpdateContactByIDParams{
		Description: description,
		ContactLink: contactLink,
		ContactUuid: pgtype.UUID{Bytes: payload.ContactId, Valid: true},
	})
	if err != nil {
		return nil, err
	}

	return &schemas.UserContact{
		ContactLink: userContact.ContactLink,
		Description: userContact.Description,
		Uuid:        util.ConvertPgUUIDToUUID(userContact.Uuid).String(),
	}, nil
}

func (us *UserContactService) DeleteUserContact(ctx context.Context, userID, userContactID string) error {
	return us.userContactRepository.DeleteUserContact(ctx, db.DeleteUserContactParams{
		ContactUuid: pgtype.UUID{Bytes: uuid.MustParse(userContactID), Valid: true},
		UserUuid:    pgtype.UUID{Bytes: uuid.MustParse(userID), Valid: true},
	})
}
