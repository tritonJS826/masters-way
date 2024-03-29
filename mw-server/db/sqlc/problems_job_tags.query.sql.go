// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.25.0
// source: problems_job_tags.query.sql

package db

import (
	"context"
	"time"

	"github.com/google/uuid"
)

const createProblemsJobTag = `-- name: CreateProblemsJobTag :one
INSERT INTO problems_job_tags(
    problem_uuid,
    job_tag_uuid
) VALUES (
    $1, $2
) RETURNING problem_uuid, job_tag_uuid
`

type CreateProblemsJobTagParams struct {
	ProblemUuid uuid.UUID `json:"problem_uuid"`
	JobTagUuid  uuid.UUID `json:"job_tag_uuid"`
}

func (q *Queries) CreateProblemsJobTag(ctx context.Context, arg CreateProblemsJobTagParams) (ProblemsJobTag, error) {
	row := q.queryRow(ctx, q.createProblemsJobTagStmt, createProblemsJobTag, arg.ProblemUuid, arg.JobTagUuid)
	var i ProblemsJobTag
	err := row.Scan(&i.ProblemUuid, &i.JobTagUuid)
	return i, err
}

const deleteProblemsJobTagByIds = `-- name: DeleteProblemsJobTagByIds :exec
DELETE FROM problems_job_tags
WHERE problem_uuid = $1 AND job_tag_uuid = $2
`

type DeleteProblemsJobTagByIdsParams struct {
	ProblemUuid uuid.UUID `json:"problem_uuid"`
	JobTagUuid  uuid.UUID `json:"job_tag_uuid"`
}

func (q *Queries) DeleteProblemsJobTagByIds(ctx context.Context, arg DeleteProblemsJobTagByIdsParams) error {
	_, err := q.exec(ctx, q.deleteProblemsJobTagByIdsStmt, deleteProblemsJobTagByIds, arg.ProblemUuid, arg.JobTagUuid)
	return err
}

const getProblemsJoinJobTags = `-- name: GetProblemsJoinJobTags :many
SELECT problems.uuid, created_at, updated_at, problems.description, is_done, owner_uuid, day_report_uuid, problem_uuid, job_tag_uuid, job_tags.uuid, name, job_tags.description, color, way_uuid FROM problems
JOIN problems_job_tags ON problems.uuid = problems_job_tags.problem_uuid
JOIN job_tags ON problems_job_tags.problem_uuid = job_tags.uuid
WHERE problems.uuid IN (
    -- problems uuids for day report 
    SELECT problems.uuid FROM problems 
    WHERE problems.day_report_uuid = $1
)
`

type GetProblemsJoinJobTagsRow struct {
	Uuid          uuid.UUID `json:"uuid"`
	CreatedAt     time.Time `json:"created_at"`
	UpdatedAt     time.Time `json:"updated_at"`
	Description   string    `json:"description"`
	IsDone        bool      `json:"is_done"`
	OwnerUuid     uuid.UUID `json:"owner_uuid"`
	DayReportUuid uuid.UUID `json:"day_report_uuid"`
	ProblemUuid   uuid.UUID `json:"problem_uuid"`
	JobTagUuid    uuid.UUID `json:"job_tag_uuid"`
	Uuid_2        uuid.UUID `json:"uuid_2"`
	Name          string    `json:"name"`
	Description_2 string    `json:"description_2"`
	Color         string    `json:"color"`
	WayUuid       uuid.UUID `json:"way_uuid"`
}

func (q *Queries) GetProblemsJoinJobTags(ctx context.Context, dayReportUuid uuid.UUID) ([]GetProblemsJoinJobTagsRow, error) {
	rows, err := q.query(ctx, q.getProblemsJoinJobTagsStmt, getProblemsJoinJobTags, dayReportUuid)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	items := []GetProblemsJoinJobTagsRow{}
	for rows.Next() {
		var i GetProblemsJoinJobTagsRow
		if err := rows.Scan(
			&i.Uuid,
			&i.CreatedAt,
			&i.UpdatedAt,
			&i.Description,
			&i.IsDone,
			&i.OwnerUuid,
			&i.DayReportUuid,
			&i.ProblemUuid,
			&i.JobTagUuid,
			&i.Uuid_2,
			&i.Name,
			&i.Description_2,
			&i.Color,
			&i.WayUuid,
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
