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
