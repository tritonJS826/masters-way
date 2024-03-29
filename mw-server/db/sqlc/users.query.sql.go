// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.25.0
// source: users.query.sql

package db

import (
	"context"
	"database/sql"
	"time"

	"github.com/google/uuid"
)

const createUser = `-- name: CreateUser :one
INSERT INTO users(
    name,
    email,
    description,
    created_at,
    image_url,
    is_mentor
) VALUES (
    $1, $2, $3, $4, $5, $6
) RETURNING uuid, name, email, description, created_at, image_url, is_mentor
`

type CreateUserParams struct {
	Name        string         `json:"name"`
	Email       string         `json:"email"`
	Description string         `json:"description"`
	CreatedAt   time.Time      `json:"created_at"`
	ImageUrl    sql.NullString `json:"image_url"`
	IsMentor    bool           `json:"is_mentor"`
}

func (q *Queries) CreateUser(ctx context.Context, arg CreateUserParams) (User, error) {
	row := q.queryRow(ctx, q.createUserStmt, createUser,
		arg.Name,
		arg.Email,
		arg.Description,
		arg.CreatedAt,
		arg.ImageUrl,
		arg.IsMentor,
	)
	var i User
	err := row.Scan(
		&i.Uuid,
		&i.Name,
		&i.Email,
		&i.Description,
		&i.CreatedAt,
		&i.ImageUrl,
		&i.IsMentor,
	)
	return i, err
}

const deleteUser = `-- name: DeleteUser :exec
DELETE FROM users
WHERE uuid = $1
`

func (q *Queries) DeleteUser(ctx context.Context, argUuid uuid.UUID) error {
	_, err := q.exec(ctx, q.deleteUserStmt, deleteUser, argUuid)
	return err
}

const getUserById = `-- name: GetUserById :one
SELECT uuid, name, email, description, created_at, image_url, is_mentor FROM users
WHERE uuid = $1
LIMIT 1
`

func (q *Queries) GetUserById(ctx context.Context, argUuid uuid.UUID) (User, error) {
	row := q.queryRow(ctx, q.getUserByIdStmt, getUserById, argUuid)
	var i User
	err := row.Scan(
		&i.Uuid,
		&i.Name,
		&i.Email,
		&i.Description,
		&i.CreatedAt,
		&i.ImageUrl,
		&i.IsMentor,
	)
	return i, err
}

const listUsers = `-- name: ListUsers :many
SELECT uuid, name, email, description, created_at, image_url, is_mentor FROM users
ORDER BY created_at
LIMIT $1
OFFSET $2
`

type ListUsersParams struct {
	Limit  int32 `json:"limit"`
	Offset int32 `json:"offset"`
}

// TODO: add filter and sorters
func (q *Queries) ListUsers(ctx context.Context, arg ListUsersParams) ([]User, error) {
	rows, err := q.query(ctx, q.listUsersStmt, listUsers, arg.Limit, arg.Offset)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	items := []User{}
	for rows.Next() {
		var i User
		if err := rows.Scan(
			&i.Uuid,
			&i.Name,
			&i.Email,
			&i.Description,
			&i.CreatedAt,
			&i.ImageUrl,
			&i.IsMentor,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Close(); err != nil {
		return nil, err
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

const updateUser = `-- name: UpdateUser :one
UPDATE users
SET
name = coalesce($1, name),
email = coalesce($2, email),
description = coalesce($3, description),
image_url = coalesce($4, image_url),
is_mentor = coalesce($5, is_mentor)

WHERE uuid = $6
RETURNING uuid, name, email, description, created_at, image_url, is_mentor
`

type UpdateUserParams struct {
	Name        sql.NullString `json:"name"`
	Email       sql.NullString `json:"email"`
	Description sql.NullString `json:"description"`
	ImageUrl    sql.NullString `json:"image_url"`
	IsMentor    sql.NullBool   `json:"is_mentor"`
	Uuid        uuid.UUID      `json:"uuid"`
}

func (q *Queries) UpdateUser(ctx context.Context, arg UpdateUserParams) (User, error) {
	row := q.queryRow(ctx, q.updateUserStmt, updateUser,
		arg.Name,
		arg.Email,
		arg.Description,
		arg.ImageUrl,
		arg.IsMentor,
		arg.Uuid,
	)
	var i User
	err := row.Scan(
		&i.Uuid,
		&i.Name,
		&i.Email,
		&i.Description,
		&i.CreatedAt,
		&i.ImageUrl,
		&i.IsMentor,
	)
	return i, err
}
