package services

import (
	"context"
	db "mw-server/internal/db/sqlc"
	"mw-server/internal/schemas"
	"mw-server/pkg/util"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgtype"
	"github.com/jackc/pgx/v5/pgxpool"
)

type IProjectRepository interface {
	CreateProject(ctx context.Context, arg db.CreateProjectParams) (db.CreateProjectRow, error)
	CreateUsersProjects(ctx context.Context, arg db.CreateUsersProjectsParams) (db.UsersProject, error)
	GetProjectsByUserID(ctx context.Context, userUuid pgtype.UUID) ([]db.GetProjectsByUserIDRow, error)
	GetProjectByID(ctx context.Context, projectUuid pgtype.UUID) (db.GetProjectByIDRow, error)
	UpdateProject(ctx context.Context, arg db.UpdateProjectParams) (db.UpdateProjectRow, error)
	WithTx(tx pgx.Tx) *db.Queries
}

type ProjectService struct {
	pool              *pgxpool.Pool
	projectRepository IProjectRepository
}

func NewProjectService(pool *pgxpool.Pool, projectRepository IProjectRepository) *ProjectService {
	return &ProjectService{pool, projectRepository}
}

type ProjectResponse struct {
	ID        string
	Name      string
	OwnerID   string
	IsPrivate bool
	WayIDs    []string
	UserIDs   []string
}

func (ps *ProjectService) CreateProject(ctx context.Context, payload *schemas.CreateProjectPayload) (*ProjectResponse, error) {
	tx, err := ps.pool.Begin(ctx)
	if err != nil {
		return nil, err
	}
	defer tx.Rollback(ctx)

	var projectRepositoryTx IProjectRepository = ps.projectRepository.WithTx(tx)

	params := db.CreateProjectParams{
		Name:      payload.Name,
		OwnerUuid: pgtype.UUID{Bytes: uuid.MustParse(payload.OwnerID), Valid: true},
	}
	project, err := projectRepositoryTx.CreateProject(ctx, params)
	if err != nil {
		return nil, err
	}

	createUserToProjectParams := db.CreateUsersProjectsParams{
		UserUuid:    project.OwnerUuid,
		ProjectUuid: project.Uuid,
	}
	addedUser, err := projectRepositoryTx.CreateUsersProjects(ctx, createUserToProjectParams)
	if err != nil {
		return nil, err
	}

	tx.Commit(ctx)

	return &ProjectResponse{
		ID:        util.ConvertPgUUIDToUUID(project.Uuid).String(),
		Name:      project.Name,
		OwnerID:   util.ConvertPgUUIDToUUID(project.OwnerUuid).String(),
		IsPrivate: project.IsPrivate,
		UserIDs:   []string{util.ConvertPgUUIDToUUID(addedUser.UserUuid).String()},
	}, nil
}

type UpdateProjectParams struct {
	ID        string
	Name      *string
	IsPrivate *bool
}

func (ps *ProjectService) UpdateProject(ctx context.Context, params *UpdateProjectParams) (*ProjectResponse, error) {
	var name pgtype.Text
	if params.Name != nil {
		name = pgtype.Text{String: *params.Name, Valid: *params.Name != ""}
	}

	var isPrivate pgtype.Bool
	if params.IsPrivate != nil {
		isPrivate = pgtype.Bool{Bool: *params.IsPrivate, Valid: true}
	}

	updateProjectParams := db.UpdateProjectParams{
		Name:        name,
		IsPrivate:   isPrivate,
		IsDeleted:   pgtype.Bool{},
		ProjectUuid: pgtype.UUID{Bytes: uuid.MustParse(params.ID), Valid: true},
	}
	project, err := ps.projectRepository.UpdateProject(ctx, updateProjectParams)
	if err != nil {
		return nil, err
	}

	return &ProjectResponse{
		ID:        util.ConvertPgUUIDToUUID(project.Uuid).String(),
		Name:      project.Name,
		OwnerID:   util.ConvertPgUUIDToUUID(project.OwnerUuid).String(),
		IsPrivate: project.IsPrivate,
		WayIDs:    project.WayUuids,
		UserIDs:   project.UserUuids,
	}, nil
}

func (ps *ProjectService) GetProjectByID(ctx context.Context, projectID string) (*ProjectResponse, error) {
	project, err := ps.projectRepository.GetProjectByID(ctx, pgtype.UUID{Bytes: uuid.MustParse(projectID), Valid: true})
	if err != nil {
		return nil, err
	}

	return &ProjectResponse{
		ID:        util.ConvertPgUUIDToUUID(project.Uuid).String(),
		Name:      project.Name,
		OwnerID:   util.ConvertPgUUIDToUUID(project.OwnerUuid).String(),
		IsPrivate: project.IsPrivate,
		WayIDs:    project.WayUuids,
		UserIDs:   project.UserUuids,
	}, nil
}

func (ps *ProjectService) DeleteProjectByID(ctx context.Context, projectID string) error {
	updateProjectParams := db.UpdateProjectParams{
		Name:        pgtype.Text{},
		IsPrivate:   pgtype.Bool{},
		IsDeleted:   pgtype.Bool{Bool: true, Valid: true},
		ProjectUuid: pgtype.UUID{Bytes: uuid.MustParse(projectID), Valid: true},
	}
	_, err := ps.projectRepository.UpdateProject(ctx, updateProjectParams)
	if err != nil {
		return err
	}

	return nil
}
