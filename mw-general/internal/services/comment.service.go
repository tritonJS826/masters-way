package services

import (
	"context"
	db "mw-general/internal/db/sqlc"
	"mw-general/internal/schemas"
	"mw-general/pkg/util"

	"time"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgtype"
)

type ICommentRepository interface {
	CreateComment(ctx context.Context, arg db.CreateCommentParams) (db.CreateCommentRow, error)
	DeleteComment(ctx context.Context, commentUuid pgtype.UUID) error
	UpdateComment(ctx context.Context, arg db.UpdateCommentParams) (db.UpdateCommentRow, error)
}

type CommentService struct {
	ICommentRepository
}

func NewCommentService(commentRepository ICommentRepository) *CommentService {
	return &CommentService{commentRepository}
}

func (cs *CommentService) CreateComment(ctx context.Context, payload *schemas.CreateCommentPayload) (*schemas.CommentPopulatedResponse, error) {
	now := time.Now()
	args := db.CreateCommentParams{
		Description:   payload.Description,
		OwnerUuid:     pgtype.UUID{Bytes: uuid.MustParse(payload.OwnerUuid), Valid: true},
		DayReportUuid: pgtype.UUID{Bytes: uuid.MustParse(payload.DayReportUuid), Valid: true},
		UpdatedAt:     pgtype.Timestamp{Time: now, Valid: true},
		CreatedAt:     pgtype.Timestamp{Time: now, Valid: true},
	}

	comment, err := cs.ICommentRepository.CreateComment(ctx, args)
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
		WayUUID:       util.ConvertPgUUIDToUUID(comment.WayUuid).String(),
		WayName:       comment.WayName,
	}, nil
}

type UpdateCommentParams struct {
	CommentID   string
	Description *string
}

func (cs *CommentService) UpdateComment(ctx context.Context, params *UpdateCommentParams) (*schemas.CommentPopulatedResponse, error) {
	var descriptionPg pgtype.Text
	if params.Description != nil {
		descriptionPg = pgtype.Text{String: *params.Description, Valid: true}
	}

	now := time.Now()
	comment, err := cs.ICommentRepository.UpdateComment(ctx, db.UpdateCommentParams{
		CommentUuid: pgtype.UUID{Bytes: uuid.MustParse(params.CommentID), Valid: true},
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
		WayUUID:       util.ConvertPgUUIDToUUID(comment.WayUuid).String(),
		WayName:       comment.WayName,
	}, nil
}

func (cs *CommentService) DeleteCommentById(ctx context.Context, commentID string) error {
	return cs.ICommentRepository.DeleteComment(ctx, pgtype.UUID{Bytes: uuid.MustParse(commentID), Valid: true})
}
