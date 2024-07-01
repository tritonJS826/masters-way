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
    COALESCE(
        ARRAY(
            SELECT job_dones_job_tags.job_tag_uuid
            FROM job_dones_job_tags
            WHERE job_dones.uuid = job_dones_job_tags.job_done_uuid
        ),
    '{}'
    )::VARCHAR[] AS tag_uuids;
