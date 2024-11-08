package services

// import (
// 	"context"
// 	db "mwserver/internal/db/sqlc"
// 	"mwserver/internal/schemas"

// 	"github.com/jackc/pgx/v5/pgtype"
// )

// type IJobTagRepository interface {
// 	CreateJobTag(ctx context.Context, arg db.CreateJobTagParams) (db.JobTag, error)
// 	GetLabelsByIDs(ctx context.Context, jobTagUuids []pgtype.UUID) ([]db.JobTag, error)
// 	UpdateJobTag(ctx context.Context, arg db.UpdateJobTagParams) (db.JobTag, error)
// 	DeleteJobTagById(ctx context.Context, jobTagUuid pgtype.UUID) error
// }

// type JobTagService struct {
// 	jobTagRepository IJobTagRepository
// }

// func NewJobTagService(jobTagRepository IJobTagRepository) *JobTagService {
// 	return &JobTagService{jobTagRepository}
// }

// func (js *JobTagService) CreateJobTag(ctx context.Context, payload *schemas.CreateJobTagPayload) (*schemas.JobTagResponse, error) {
// }

// func (js *JobTagService) GetLabelsByIDs(ctx context.Context, jobTagIDs []string) ([]schemas.JobTagResponse, error) {
// }

// type UpdateJobTagParams struct {
// 	JobTagID    string
// 	Name        string
// 	Description string
// 	Color       string
// }

// func (jc *JobTagService) UpdateJobTag(ctx context.Context, params *UpdateJobTagParams) (*schemas.JobTagResponse, error) {
// }

// func (jc *JobTagService) DeleteJobTagById(ctx context.Context, jobTagID string) error {
// }
