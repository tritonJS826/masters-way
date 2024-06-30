-- name: CreatePlansJobTag :one
INSERT INTO plans_job_tags(
    plan_uuid,
    job_tag_uuid
) VALUES (
    $1, $2
) RETURNING *;

-- name: GetPlansByDayReportUuids :many
SELECT 
    *,
    COALESCE(
        ARRAY(
            SELECT plans_job_tags.job_tag_uuid 
            FROM plans_job_tags 
            WHERE plans.uuid = plans_job_tags.plan_uuid
    ), 
    '{}'
    )::VARCHAR[] AS tag_uuids
FROM plans WHERE plans.day_report_uuid = ANY($1::UUID[]);

-- name: DeletePlansJobTagByIds :exec
DELETE FROM plans_job_tags
WHERE plan_uuid = $1 AND job_tag_uuid = $2;