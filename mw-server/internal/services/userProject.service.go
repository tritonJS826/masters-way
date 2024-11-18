package services

import (
	"context"
	db "mw-server/internal/db/sqlc"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgtype"
)

type IUserProjectRepository interface {
	CreateUsersProjects(ctx context.Context, arg db.CreateUsersProjectsParams) (db.UsersProject, error)
	DeleteUsersProjects(ctx context.Context, arg db.DeleteUsersProjectsParams) error
}

type UserProjectService struct {
	userProjectRepository IUserProjectRepository
}

func NewUserProjectService(userProjectRepository IUserProjectRepository) *UserProjectService {
	return &UserProjectService{userProjectRepository}
}

func (us *UserProjectService) CreateUserProject(ctx context.Context, userID, projectID string) error {
	params := db.CreateUsersProjectsParams{
		UserUuid:    pgtype.UUID{Bytes: uuid.MustParse(userID), Valid: true},
		ProjectUuid: pgtype.UUID{Bytes: uuid.MustParse(projectID), Valid: true},
	}

	_, err := us.userProjectRepository.CreateUsersProjects(ctx, params)
	if err != nil {
		return nil
	}

	return nil
}

func (us *UserProjectService) DeleteUserProject(ctx context.Context, userID, projectID string) error {
	return us.userProjectRepository.DeleteUsersProjects(ctx, db.DeleteUsersProjectsParams{
		UserUuid:    pgtype.UUID{Bytes: uuid.MustParse(userID), Valid: true},
		ProjectUuid: pgtype.UUID{Bytes: uuid.MustParse(projectID), Valid: true},
	})
}
