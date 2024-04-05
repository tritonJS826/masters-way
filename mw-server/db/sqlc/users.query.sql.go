// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.26.0
// source: users.query.sql

package db

import (
	"context"
	"database/sql"
	"time"

	"github.com/google/uuid"
	"github.com/lib/pq"
)

const countUsers = `-- name: CountUsers :one
SELECT COUNT(*) FROM users
WHERE ((users.email LIKE '%' || $1 || '%') OR ($1 = ''))
    AND ((users.name LIKE '%' || $2 || '%') OR ($2 = ''))
`

type CountUsersParams struct {
	Column1 sql.NullString `json:"column_1"`
	Column2 sql.NullString `json:"column_2"`
}

func (q *Queries) CountUsers(ctx context.Context, arg CountUsersParams) (int64, error) {
	row := q.queryRow(ctx, q.countUsersStmt, countUsers, arg.Column1, arg.Column2)
	var count int64
	err := row.Scan(&count)
	return count, err
}

const createUser = `-- name: CreateUser :one
INSERT INTO users(
    name,
    email,
    description,
    created_at,
    image_url,
    is_mentor,
    firebase_id
) VALUES (
    $1, $2, $3, $4, $5, $6, $7
) RETURNING uuid, name, email, description, created_at, image_url, is_mentor, firebase_id
`

type CreateUserParams struct {
	Name        string         `json:"name"`
	Email       string         `json:"email"`
	Description string         `json:"description"`
	CreatedAt   time.Time      `json:"created_at"`
	ImageUrl    sql.NullString `json:"image_url"`
	IsMentor    bool           `json:"is_mentor"`
	FirebaseID  string         `json:"firebase_id"`
}

func (q *Queries) CreateUser(ctx context.Context, arg CreateUserParams) (User, error) {
	row := q.queryRow(ctx, q.createUserStmt, createUser,
		arg.Name,
		arg.Email,
		arg.Description,
		arg.CreatedAt,
		arg.ImageUrl,
		arg.IsMentor,
		arg.FirebaseID,
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
		&i.FirebaseID,
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

const getUserByFirebaseId = `-- name: GetUserByFirebaseId :one
SELECT uuid, name, email, description, created_at, image_url, is_mentor, firebase_id FROM users
WHERE firebase_id = $1
LIMIT 1
`

func (q *Queries) GetUserByFirebaseId(ctx context.Context, firebaseID string) (User, error) {
	row := q.queryRow(ctx, q.getUserByFirebaseIdStmt, getUserByFirebaseId, firebaseID)
	var i User
	err := row.Scan(
		&i.Uuid,
		&i.Name,
		&i.Email,
		&i.Description,
		&i.CreatedAt,
		&i.ImageUrl,
		&i.IsMentor,
		&i.FirebaseID,
	)
	return i, err
}

const getUserById = `-- name: GetUserById :one
SELECT uuid, name, email, description, created_at, image_url, is_mentor, firebase_id FROM users
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
		&i.FirebaseID,
	)
	return i, err
}

const getUserByIds = `-- name: GetUserByIds :many
SELECT uuid, name, email, description, created_at, image_url, is_mentor, firebase_id FROM users
WHERE uuid = ANY($1::UUID[])
`

func (q *Queries) GetUserByIds(ctx context.Context, dollar_1 []uuid.UUID) ([]User, error) {
	rows, err := q.query(ctx, q.getUserByIdsStmt, getUserByIds, pq.Array(dollar_1))
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
			&i.FirebaseID,
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

const listUsers = `-- name: ListUsers :many
SELECT 
    users.uuid,
    users.name,
    users.email,
    users.description,
    users.created_at,
    users.image_url,
    users.is_mentor,
    (SELECT COUNT(*) FROM ways WHERE ways.owner_uuid = users.uuid) AS own_ways_amount,
    (SELECT COUNT(*) FROM favorite_users_ways WHERE favorite_users_ways.user_uuid = users.uuid) AS favorite_ways,
    (SELECT COUNT(*) FROM mentor_users_ways WHERE mentor_users_ways.user_uuid = users.uuid) AS mentoring_ways_amount,
    (SELECT COUNT(*) FROM favorite_users WHERE favorite_users.acceptor_user_uuid = users.uuid) AS favorite_for_users_amount,
    -- get user tag uuids
    ARRAY(
        SELECT user_tags.uuid 
        FROM user_tags 
        INNER JOIN users_user_tags ON user_tags.uuid = users_user_tags.user_tag_uuid
        WHERE users_user_tags.user_uuid = users.uuid
    )::VARCHAR[] AS tag_uuids,
    -- get user tag names
    ARRAY(
        SELECT user_tags.name 
        FROM user_tags 
        INNER JOIN users_user_tags ON user_tags.uuid = users_user_tags.user_tag_uuid
        WHERE users_user_tags.user_uuid = users.uuid
    )::VARCHAR[] AS tag_names,
    (SELECT COUNT(*) FROM users) AS users_size
FROM users
WHERE (LOWER(users.email) LIKE '%' || LOWER($3) || '%' OR $3 = '')
    AND (LOWER(users.name) LIKE '%' || LOWER($4) || '%' OR $4 = '')
ORDER BY created_at DESC
LIMIT $1
OFFSET $2
`

type ListUsersParams struct {
	Limit   int32  `json:"limit"`
	Offset  int32  `json:"offset"`
	Lower   string `json:"lower"`
	Lower_2 string `json:"lower_2"`
}

type ListUsersRow struct {
	Uuid                   uuid.UUID      `json:"uuid"`
	Name                   string         `json:"name"`
	Email                  string         `json:"email"`
	Description            string         `json:"description"`
	CreatedAt              time.Time      `json:"created_at"`
	ImageUrl               sql.NullString `json:"image_url"`
	IsMentor               bool           `json:"is_mentor"`
	OwnWaysAmount          int64          `json:"own_ways_amount"`
	FavoriteWays           int64          `json:"favorite_ways"`
	MentoringWaysAmount    int64          `json:"mentoring_ways_amount"`
	FavoriteForUsersAmount int64          `json:"favorite_for_users_amount"`
	TagUuids               []string       `json:"tag_uuids"`
	TagNames               []string       `json:"tag_names"`
	UsersSize              int64          `json:"users_size"`
}

// TODO: add filter and sorters
func (q *Queries) ListUsers(ctx context.Context, arg ListUsersParams) ([]ListUsersRow, error) {
	rows, err := q.query(ctx, q.listUsersStmt, listUsers,
		arg.Limit,
		arg.Offset,
		arg.Lower,
		arg.Lower_2,
	)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	items := []ListUsersRow{}
	for rows.Next() {
		var i ListUsersRow
		if err := rows.Scan(
			&i.Uuid,
			&i.Name,
			&i.Email,
			&i.Description,
			&i.CreatedAt,
			&i.ImageUrl,
			&i.IsMentor,
			&i.OwnWaysAmount,
			&i.FavoriteWays,
			&i.MentoringWaysAmount,
			&i.FavoriteForUsersAmount,
			pq.Array(&i.TagUuids),
			pq.Array(&i.TagNames),
			&i.UsersSize,
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
RETURNING uuid, name, email, description, created_at, image_url, is_mentor, firebase_id
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
		&i.FirebaseID,
	)
	return i, err
}
