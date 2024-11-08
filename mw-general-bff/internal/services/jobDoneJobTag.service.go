package services

// import (
// 	"context"
// 	db "mwserver/internal/db/sqlc"
// 	"mwserver/internal/schemas"
// )

// type IJobDoneJobTagRepository interface {
// 	CreateJobDonesJobTag(ctx context.Context, arg db.CreateJobDonesJobTagParams) (db.JobDonesJobTag, error)
// 	DeleteJobDonesJobTagByJobDoneId(ctx context.Context, arg db.DeleteJobDonesJobTagByJobDoneIdParams) error
// }

// type JobDoneJobTagService struct {
// 	jobDoneJobTagRepository IJobDoneJobTagRepository
// }

// func NewJobDoneJobTagService(jobDoneJobTagRepository IJobDoneJobTagRepository) *JobDoneJobTagService {
// 	return &JobDoneJobTagService{jobDoneJobTagRepository}
// }

// func (js *JobDoneJobTagService) CreateJobDoneJobTag(ctx context.Context, payload *schemas.CreateJobDoneJobTagPayload) (*db.JobDonesJobTag, error) {
// }

// func (js *JobDoneJobTagService) DeleteJobDoneJobTagById(ctx context.Context, jobDoneID, jobTagID string) error {
// }
