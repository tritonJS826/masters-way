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
FROM plans WHERE plans.day_report_uuid = ANY(@day_report_uuids::UUID[]);

-- name: DeletePlansJobTagByIds :exec
DELETE FROM plans_job_tags
WHERE plan_uuid = @plan_uuid AND job_tag_uuid = @job_tag_uuid;
