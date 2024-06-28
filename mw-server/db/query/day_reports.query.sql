-- name: CreateDayReport :one
INSERT INTO day_reports(
    way_uuid,
    created_at,
    updated_at,
    is_day_off
) VALUES (
    $1, $2, $3, $4
) RETURNING *;

-- name: GetListDayReportsByWayUuid :many
SELECT * FROM day_reports
WHERE day_reports.way_uuid = $1
ORDER BY day_reports.created_at DESC;

-- name: GetDayReportsCountByWayId :one
SELECT
    COUNT(*) AS day_reports_count
FROM day_reports
WHERE way_uuid = @way_uuid;

-- name: UpdateDayReport :one
UPDATE day_reports
SET
updated_at = coalesce(sqlc.narg('updated_at'), updated_at),
is_day_off = coalesce(sqlc.narg('is_day_off'), is_day_off)
WHERE uuid = sqlc.arg('uuid')
RETURNING *;

-- name: GetNestedEntitiesForDayReports :one
WITH job_dones_data AS (
    SELECT
        job_dones.uuid,
        job_dones.created_at,
        job_dones.updated_at,
        job_dones.description,
        job_dones.time,
        job_dones.owner_uuid,
        job_dones.day_report_uuid,
        ARRAY_AGG(job_dones_job_tags.job_tag_uuid)::UUID[] AS tag_uuids
    FROM job_dones
    LEFT JOIN job_dones_job_tags ON job_dones.uuid = job_dones_job_tags.job_done_uuid
    WHERE job_dones.day_report_uuid = ANY($1::UUID[])
    GROUP BY job_dones.uuid
),
plans_data AS (
    SELECT
        plans.uuid,
        plans.created_at,
        plans.updated_at,
        plans.description,
        plans.time,
        plans.owner_uuid,
        plans.is_done,
        plans.day_report_uuid,
        ARRAY_AGG(plans_job_tags.job_tag_uuid)::UUID[] AS tag_uuids
    FROM plans
    LEFT JOIN plans_job_tags ON plans.uuid = plans_job_tags.plan_uuid
    WHERE plans.day_report_uuid = ANY($1::UUID[])
    GROUP BY plans.uuid
),
problems_data AS (
    SELECT
        problems.uuid,
        problems.created_at,
        problems.updated_at,
        problems.description,
        problems.is_done,
        problems.owner_uuid,
        problems.day_report_uuid,
        ARRAY_AGG(problems_job_tags.job_tag_uuid)::UUID[] AS tag_uuids
    FROM problems
    LEFT JOIN problems_job_tags ON problems.uuid = problems_job_tags.job_tag_uuid
    WHERE problems.day_report_uuid = ANY($1::UUID[])
    GROUP BY problems.uuid
),
comments_data AS (
    SELECT
        comments.uuid,
        comments.created_at,
        comments.updated_at,
        comments.description,
        comments.owner_uuid,
        comments.day_report_uuid
    FROM comments
    WHERE comments.day_report_uuid = ANY($1::UUID[])
)
SELECT
    COALESCE(
        (SELECT JSON_AGG(json_build_object(
            'uuid', jd.uuid,
            'created_at', jd.created_at,
            'updated_at', jd.updated_at,
            'description', jd.description,
            'time', jd.time,
            'owner_uuid', jd.owner_uuid,
            'day_report_uuid', jd.day_report_uuid,
            'tag_uuids', jd.tag_uuids
        ) ORDER BY jd.created_at)
        FROM job_dones_data jd), '[]'::json
    ) AS job_dones_array,
    COALESCE(
        (SELECT JSON_AGG(json_build_object(
            'uuid', p.uuid,
            'created_at', p.created_at,
            'updated_at', p.updated_at,
            'description', p.description,
            'time', p.time,
            'owner_uuid', p.owner_uuid,
            'is_done', p.is_done,
            'day_report_uuid', p.day_report_uuid,
            'tag_uuids', p.tag_uuids
        ) ORDER BY p.created_at)
        FROM plans_data p), '[]'::json
    ) AS plans_array,
    COALESCE(
        (SELECT JSON_AGG(json_build_object(
            'uuid', pr.uuid,
            'created_at', pr.created_at,
            'updated_at', pr.updated_at,
            'description', pr.description,
            'is_done', pr.is_done,
            'owner_uuid', pr.owner_uuid,
            'day_report_uuid', pr.day_report_uuid,
            'tag_uuids', pr.tag_uuids
        ) ORDER BY pr.created_at)
        FROM problems_data pr), '[]'::json
    ) AS problems_array,
    COALESCE(
        (SELECT JSON_AGG(json_build_object(
            'uuid', c.uuid,
            'created_at', c.created_at,
            'updated_at', c.updated_at,
            'description', c.description,
            'owner_uuid', c.owner_uuid,
            'day_report_uuid', c.day_report_uuid
        ) ORDER BY c.created_at)
        FROM comments_data c), '[]'::json
    ) AS comments_array;
