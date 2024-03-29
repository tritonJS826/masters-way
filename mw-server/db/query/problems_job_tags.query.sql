-- name: CreateProblemsJobTag :one
INSERT INTO problems_job_tags(
    problem_uuid,
    job_tag_uuid
) VALUES (
    $1, $2
) RETURNING *;

-- name: GetProblemsByDayReportUuids :many
SELECT 
    *,
    ARRAY(
        SELECT job_dones_job_tags.job_tag_uuid 
        FROM job_dones_job_tags 
        WHERE job_dones.uuid = job_dones_job_tags.job_done_uuid
    )::VARCHAR[] AS tag_uuids
FROM problems
WHERE problems.uuid IN (
    -- problems uuids for day report 
    SELECT problems.uuid FROM problems 
    WHERE problems.day_report_uuid = ANY($1::UUID[])
);

-- name: DeleteProblemsJobTagByIds :exec
DELETE FROM problems_job_tags
WHERE problem_uuid = $1 AND job_tag_uuid = $2;