package services

// import (
// 	"context"
// 	db "mwserver/internal/db/sqlc"
// 	"mwserver/internal/schemas"

// 	"github.com/jackc/pgx/v5/pgtype"
// )

// type IProblemRepository interface {
// 	CreateProblem(ctx context.Context, arg db.CreateProblemParams) (db.CreateProblemRow, error)
// 	UpdateProblem(ctx context.Context, arg db.UpdateProblemParams) (db.UpdateProblemRow, error)
// 	DeleteProblem(ctx context.Context, problemUuid pgtype.UUID) error
// }

// type ProblemService struct {
// 	problemRepository IProblemRepository
// }

// func NewProblemService(problemRepository IProblemRepository) *ProblemService {
// 	return &ProblemService{problemRepository}
// }

// func (ps *ProblemService) CreateProblem(ctx context.Context, payload *schemas.CreateProblemPayload) (*schemas.ProblemPopulatedResponse, error) {
// }

// type UpdateProblemParams struct {
// 	ProblemID   string
// 	Description *string
// 	IsDone      *bool
// }

// func (ps *ProblemService) UpdateProblem(ctx context.Context, params *UpdateProblemParams) (*schemas.ProblemPopulatedResponse, error) {
// }

// func (ps *ProblemService) DeleteProblemById(ctx context.Context, problemID string) error {
// }
