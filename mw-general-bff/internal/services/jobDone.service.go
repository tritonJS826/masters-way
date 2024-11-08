package services

// import (
// 	"context"
// 	db "mwserver/internal/db/sqlc"
// 	"mwserver/internal/schemas"

// 	"github.com/jackc/pgx/v5/pgtype"
// )

// type IJobDoneRepository interface {
// 	CreateJobDone(ctx context.Context, arg db.CreateJobDoneParams) (db.CreateJobDoneRow, error)
// 	UpdateJobDone(ctx context.Context, arg db.UpdateJobDoneParams) (db.UpdateJobDoneRow, error)
// 	DeleteJobDone(ctx context.Context, jobDoneUuid pgtype.UUID) error
// }

// type JobDoneService struct {
// 	jobDoneRepository IJobDoneRepository
// }

// func NewJobDoneService(jobDoneRepository IJobDoneRepository) *JobDoneService {
// 	return &JobDoneService{jobDoneRepository}
// }

// type JobDone struct {
// 	ID          string
// 	CreatedAt   string
// 	UpdatedAt   string
// 	Description string
// 	Time        int32
// 	OwnerUuid   string
// 	OwnerName   string
// 	DayReportID string
// 	WayUUID     string
// 	WayName     string
// 	TagIDs      []string
// }

// func (js *JobDoneService) CreateJobDone(ctx context.Context, payload *schemas.CreateJobDonePayload) (*JobDone, error) {
// }

// type UpdateJobDoneParams struct {
// 	JobDoneID   string
// 	Description *string
// 	Time        *int32
// }

// func (js *JobDoneService) UpdateJobDone(ctx context.Context, params *UpdateJobDoneParams) (*JobDone, error) {
// }

// func (js *JobDoneService) DeleteJobDoneByID(ctx context.Context, jobDoneID string) error {
// }
