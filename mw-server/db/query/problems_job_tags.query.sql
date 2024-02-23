-- name: CreateProblemsJobTag :one
INSERT INTO problems_job_tags(
    problem_uuid,
    job_tag_uuid
) VALUES (
    $1, $2
) RETURNING *;

-- name: GetProblemsJoinJobTags :many
SELECT * FROM problems
JOIN problems_job_tags ON problems.uuid = problems_job_tags.problem_uuid
JOIN job_tags ON problems_job_tags.problem_uuid = job_tags.uuid
WHERE problems.uuid IN (
    -- problems uuids for day report 
    SELECT problems.uuid FROM problems 
    WHERE problems.day_report_uuid = $1
);

-- name: DeleteProblemsJobTagByIds :exec
DELETE FROM problems_job_tags
WHERE problem_uuid = $1 AND job_tag_uuid = $2;