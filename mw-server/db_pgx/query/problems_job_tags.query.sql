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
