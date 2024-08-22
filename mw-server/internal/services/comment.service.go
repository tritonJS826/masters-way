package services

import (
	"context"
	"mwserver/customErrors"
	db "mwserver/db/sqlc"
	"mwserver/schemas"
	"mwserver/util"
	"time"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgtype"
)

type ICommentRepository interface {
	CreateComment(ctx context.Context, arg db.CreateCommentParams) (db.CreateCommentRow, error)
	DeleteComment(ctx context.Context, commentUuid pgtype.UUID) error
	GetIsUserHavingPermissionsForComment(ctx context.Context, arg db.GetIsUserHavingPermissionsForCommentParams) (db.GetIsUserHavingPermissionsForCommentRow, error)
	GetIsUserHavingPermissionsForDayReport(ctx context.Context, arg db.GetIsUserHavingPermissionsForDayReportParams) (db.GetIsUserHavingPermissionsForDayReportRow, error)
	GetListCommentsByDayReportUuids(ctx context.Context, dayReportUuids []pgtype.UUID) ([]db.Comment, error)
	UpdateComment(ctx context.Context, arg db.UpdateCommentParams) (db.UpdateCommentRow, error)
}

type CommentService struct {
	ICommentRepository
}

func NewCommentService(commentRepository ICommentRepository) *CommentService {
	return &CommentService{commentRepository}
}

type CreateCommentParams struct {
	UserID      string
	Description string
	OwnerID     string
	DayReportID string
}

func (cs *CommentService) CreateComment(ctx context.Context, params *CreateCommentParams) (*schemas.CommentPopulatedResponse, error) {
	userPgUUID := pgtype.UUID{Bytes: uuid.MustParse(params.UserID), Valid: true}
	dayReportPgUUID := pgtype.UUID{Bytes: uuid.MustParse(params.DayReportID), Valid: true}

	userPermission, err := cs.ICommentRepository.GetIsUserHavingPermissionsForDayReport(ctx, db.GetIsUserHavingPermissionsForDayReportParams{
		UserUuid:      userPgUUID,
		DayReportUuid: dayReportPgUUID,
	})
	if err != nil {
		return nil, err
	}

	now := time.Now()
	args := &db.CreateCommentParams{
		Description:   params.Description,
		OwnerUuid:     pgtype.UUID{Bytes: uuid.MustParse(params.OwnerID), Valid: true},
		DayReportUuid: dayReportPgUUID,
		UpdatedAt:     pgtype.Timestamp{Time: now, Valid: true},
		CreatedAt:     pgtype.Timestamp{Time: now, Valid: true},
	}

	comment, err := cs.ICommentRepository.CreateComment(ctx, *args)
	if err != nil {
		return nil, err
	}

	return &schemas.CommentPopulatedResponse{
		Uuid:          util.ConvertPgUUIDToUUID(comment.Uuid).String(),
		Description:   comment.Description,
		OwnerUuid:     util.ConvertPgUUIDToUUID(comment.OwnerUuid).String(),
		OwnerName:     comment.OwnerName,
		CreatedAt:     comment.CreatedAt.Time.Format(util.DEFAULT_STRING_LAYOUT),
		UpdatedAt:     comment.UpdatedAt.Time.Format(util.DEFAULT_STRING_LAYOUT),
		DayReportUuid: util.ConvertPgUUIDToUUID(comment.DayReportUuid).String(),
		WayUUID:       util.ConvertPgUUIDToUUID(userPermission.WayUuid).String(),
		WayName:       userPermission.WayName,
	}, nil
}

type UpdateCommentParams struct {
	UserID      string
	CommentID   string
	Description *string
}

func (cs *CommentService) UpdateComment(ctx context.Context, params *UpdateCommentParams) (*schemas.CommentPopulatedResponse, error) {
	userPgUUID := pgtype.UUID{Bytes: uuid.MustParse(params.UserID), Valid: true}
	commentPgUUID := pgtype.UUID{Bytes: uuid.MustParse(params.CommentID), Valid: true}

	userPermission, err := cs.ICommentRepository.GetIsUserHavingPermissionsForComment(ctx, db.GetIsUserHavingPermissionsForCommentParams{
		UserUuid:    userPgUUID,
		CommentUuid: commentPgUUID,
	})
	if err != nil {
		return nil, err
	}

	if !userPermission.IsPermissionGiven.Bool {
		return nil, customErrors.MakeNoRightToChangeDayReportError(util.ConvertPgUUIDToUUID(userPermission.WayUuid).String())
	}

	var descriptionPg pgtype.Text
	if params.Description != nil {
		descriptionPg = pgtype.Text{String: *params.Description, Valid: true}
	}

	now := time.Now()
	comment, err := cs.ICommentRepository.UpdateComment(ctx, db.UpdateCommentParams{
		Uuid:        commentPgUUID,
		Description: descriptionPg,
		UpdatedAt:   pgtype.Timestamp{Time: now, Valid: true},
	})
	if err != nil {
		return nil, err
	}

	return &schemas.CommentPopulatedResponse{
		Uuid:          util.ConvertPgUUIDToUUID(comment.Uuid).String(),
		Description:   comment.Description,
		OwnerUuid:     util.ConvertPgUUIDToUUID(comment.OwnerUuid).String(),
		OwnerName:     comment.OwnerName,
		CreatedAt:     comment.CreatedAt.Time.Format(util.DEFAULT_STRING_LAYOUT),
		UpdatedAt:     comment.UpdatedAt.Time.Format(util.DEFAULT_STRING_LAYOUT),
		DayReportUuid: util.ConvertPgUUIDToUUID(comment.DayReportUuid).String(),
		WayUUID:       util.ConvertPgUUIDToUUID(userPermission.WayUuid).String(),
		WayName:       userPermission.WayName,
	}, nil
}

func (cs *CommentService) DeleteCommentById(ctx context.Context, userID, commentID string) error {
	userUUID := pgtype.UUID{Bytes: uuid.MustParse(userID), Valid: true}
	commentUUID := pgtype.UUID{Bytes: uuid.MustParse(commentID), Valid: true}

	userPermission, err := cs.ICommentRepository.GetIsUserHavingPermissionsForComment(ctx, db.GetIsUserHavingPermissionsForCommentParams{
		UserUuid:    userUUID,
		CommentUuid: commentUUID,
	})
	if err != nil {
		return err
	}

	if !userPermission.IsPermissionGiven.Bool {
		return customErrors.MakeNoRightToChangeDayReportError(util.ConvertPgUUIDToUUID(userPermission.WayUuid).String())
	}

	err = cs.ICommentRepository.DeleteComment(ctx, commentUUID)
	if err != nil {
		return err
	}

	return nil
}
