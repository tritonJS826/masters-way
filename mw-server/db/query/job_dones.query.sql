-- name: CreateJobDone :one
INSERT INTO job_dones(
    created_at,
    updated_at,
    description,
    time,
    owner_uuid,
    day_report_uuid
) VALUES (
    $1, $2, $3, $4, $5, $6
) RETURNING *,
    (SELECT name FROM users WHERE uuid = $5) AS owner_name,
    -- get tag uuids
    ARRAY(
        SELECT problems_job_tags.job_tag_uuid 
        FROM problems_job_tags 
        WHERE problems.uuid = problems_job_tags.problem_uuid
    )::VARCHAR[] AS tag_uuids;

-- name: GetListJobsDoneByDayReportId :many
SELECT * FROM job_dones
WHERE job_dones.day_report_uuid = $1
ORDER BY created_at;

-- name: UpdateJobDone :one
UPDATE job_dones
SET
updated_at = coalesce(sqlc.narg('updated_at'), updated_at),
description = coalesce(sqlc.narg('description'), description),
time = coalesce(sqlc.narg('time'), time)
WHERE uuid = sqlc.arg('uuid')
RETURNING *;


-- name: DeleteJobDone :exec
DELETE FROM job_dones
WHERE uuid = $1;