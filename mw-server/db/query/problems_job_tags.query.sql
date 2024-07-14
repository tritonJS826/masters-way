


-- name: CreateProblemsJobTag :one
INSERT INTO problems_job_tags(
    problem_uuid,
    job_tag_uuid
) VALUES (
    @problem_uuid,
    @job_tag_uuid
) RETURNING *;

-- name: GetProblemsByDayReportUuids :many
SELECT
    *,
    COALESCE(
    ARRAY(
            SELECT problems_job_tags.job_tag_uuid
            FROM problems_job_tags
            WHERE problems.uuid = problems_job_tags.job_tag_uuid
        ),
        '{}'
    )::VARCHAR[] AS tag_uuids
FROM problems
WHERE problems.day_report_uuid = ANY(@day_report_uuids::UUID[]);

-- name: DeleteProblemsJobTagByIds :exec
DELETE FROM problems_job_tags
WHERE problem_uuid = @problem_uuid  AND job_tag_uuid = @job_tag_uuid;
