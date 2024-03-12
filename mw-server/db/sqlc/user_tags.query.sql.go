// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.25.0
// source: user_tags.query.sql

package db

import (
	"context"

	"github.com/google/uuid"
)

const createUserTag = `-- name: CreateUserTag :one
INSERT INTO user_tags(
    name
) VALUES (
    $1
) RETURNING uuid, name
`

func (q *Queries) CreateUserTag(ctx context.Context, name string) (UserTag, error) {
	row := q.queryRow(ctx, q.createUserTagStmt, createUserTag, name)
	var i UserTag
	err := row.Scan(&i.Uuid, &i.Name)
	return i, err
}

const getListUserTagsByUserId = `-- name: GetListUserTagsByUserId :many
SELECT 
    user_tags.uuid AS uuid, 
    user_tags.name AS name
FROM user_tags
JOIN users_user_tags ON users_user_tags.user_tag_uuid = user_tags.uuid
WHERE users_user_tags.user_uuid = $1
ORDER BY user_tags.name
`

func (q *Queries) GetListUserTagsByUserId(ctx context.Context, userUuid uuid.UUID) ([]UserTag, error) {
	rows, err := q.query(ctx, q.getListUserTagsByUserIdStmt, getListUserTagsByUserId, userUuid)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	items := []UserTag{}
	for rows.Next() {
		var i UserTag
		if err := rows.Scan(&i.Uuid, &i.Name); err != nil {
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

const getUserTagByName = `-- name: GetUserTagByName :one
SELECT uuid, name FROM user_tags
WHERE user_tags.name = $1
`

func (q *Queries) GetUserTagByName(ctx context.Context, name string) (UserTag, error) {
	row := q.queryRow(ctx, q.getUserTagByNameStmt, getUserTagByName, name)
	var i UserTag
	err := row.Scan(&i.Uuid, &i.Name)
	return i, err
}
