-- name: CreateWay :one
INSERT INTO ways(
    name,
    goal_description,
    updated_at,
    created_at,
    estimation_time,
    copied_from_way_uuid,
    is_private,
    is_completed,
    owner_uuid
) VALUES (
    @name, @goal_description, @updated_at, @created_at, @estimation_time, @copied_from_way_uuid, @is_private, @is_completed, @owner_uuid
) RETURNING
    *,
    (SELECT COUNT(*) FROM metrics WHERE metrics.way_uuid = @way_uuid) AS way_metrics_total,
    (SELECT COUNT(*) FROM metrics WHERE metrics.way_uuid = @way_uuid AND metrics.is_done = true) AS way_metrics_done,
    (SELECT COUNT(*) FROM favorite_users_ways WHERE favorite_users_ways.way_uuid = @way_uuid) AS way_favorite_for_users,
    (SELECT COUNT(*) FROM day_reports WHERE day_reports.way_uuid = @way_uuid) AS way_day_reports_amount,
    COALESCE(
        ARRAY(
            SELECT composite_ways.child_uuid
            FROM composite_ways
            WHERE composite_ways.parent_uuid = ways.uuid
        ),
        '{}'
    )::VARCHAR[] AS children_uuids;

-- name: GetWayById :one
SELECT
    ways.uuid,
    ways.name,
    ways.goal_description,
    ways.updated_at,
    ways.created_at,
    ways.estimation_time,
    ways.copied_from_way_uuid,
    ways.is_completed,
    ways.is_private,
    COALESCE(
        ARRAY(
            SELECT composite_ways.child_uuid
            FROM composite_ways
            WHERE composite_ways.parent_uuid = ways.uuid
        ),
        '{}'
    )::VARCHAR[] AS children_uuids,
    users.uuid AS owner_uuid,
    users.name AS owner_name,
    users.email AS owner_email,
    users.description AS owner_description,
    users.created_at AS owner_created_at,
    users.image_url AS owner_image_url,
    users.is_mentor AS owner_is_mentor,
    (SELECT COUNT(*) FROM metrics WHERE metrics.way_uuid = @way_uuid) AS way_metrics_total,
    (SELECT COUNT(*) FROM metrics WHERE metrics.way_uuid = @way_uuid AND metrics.is_done = true) AS way_metrics_done,
    (SELECT COUNT(*) FROM favorite_users_ways WHERE favorite_users_ways.way_uuid = @way_uuid) AS way_favorite_for_users,
    (SELECT COUNT(*) FROM day_reports WHERE day_reports.way_uuid = @way_uuid) AS way_day_reports_amount
FROM ways
JOIN users ON users.uuid = ways.owner_uuid
WHERE ways.uuid = @way_uuid
LIMIT 1;

-- name: GetWaysByCollectionId :many
SELECT
    ways.uuid,
    ways.name,
    ways.owner_uuid,
    ways.goal_description,
    ways.updated_at,
    ways.created_at,
    ways.estimation_time,
    ways.copied_from_way_uuid,
    ways.is_completed,
    ways.is_private,
    (SELECT COUNT(*) FROM metrics WHERE metrics.way_uuid = ways.uuid) AS way_metrics_total,
    (SELECT COUNT(*) FROM metrics WHERE metrics.way_uuid = ways.uuid AND metrics.is_done = true) AS way_metrics_done,
    (SELECT COUNT(*) FROM favorite_users_ways WHERE favorite_users_ways.way_uuid = ways.uuid) AS way_favorite_for_users,
    (SELECT COUNT(*) FROM day_reports WHERE day_reports.way_uuid = ways.uuid) AS way_day_reports_amount,
    COALESCE(
        ARRAY(
            SELECT composite_ways.child_uuid
            FROM composite_ways
            WHERE composite_ways.parent_uuid = ways.uuid
        ),
        '{}'
    )::VARCHAR[] AS children_uuids
FROM ways
JOIN way_collections_ways ON way_collections_ways.way_uuid = ways.uuid
WHERE way_collections_ways.way_collection_uuid = @way_collection_uuid
ORDER BY ways.updated_at DESC;

-- name: GetOwnWaysByUserId :many
SELECT
    ways.uuid,
    ways.name,
    ways.owner_uuid,
    ways.goal_description,
    ways.updated_at,
    ways.created_at,
    ways.estimation_time,
    ways.copied_from_way_uuid,
    ways.is_completed,
    ways.is_private,
    (SELECT COUNT(*) FROM metrics WHERE metrics.way_uuid = ways.uuid) AS way_metrics_total,
    (SELECT COUNT(*) FROM metrics WHERE metrics.way_uuid = ways.uuid AND metrics.is_done = true) AS way_metrics_done,
    (SELECT COUNT(*) FROM favorite_users_ways WHERE favorite_users_ways.way_uuid = ways.uuid) AS way_favorite_for_users,
    (SELECT COUNT(*) FROM day_reports WHERE day_reports.way_uuid = ways.uuid) AS way_day_reports_amount,
    COALESCE(
        ARRAY(
            SELECT composite_ways.child_uuid
            FROM composite_ways
            WHERE composite_ways.parent_uuid = ways.uuid
        ),
        '{}'
    )::VARCHAR[] AS children_uuids
FROM ways
WHERE ways.owner_uuid = @owner_uuid
ORDER BY ways.updated_at DESC;

-- name: GetOwnWaysCountByUserId :one
SELECT
    COUNT(*) AS own_ways_count
FROM ways
WHERE owner_uuid = @user_uuid;

-- name: GetPrivateWaysCountByUserId :one
SELECT
    COUNT(*) AS private_ways_count
FROM ways
WHERE owner_uuid = @user_uuid AND is_private = TRUE;

-- name: GetMentoringWaysByMentorId :many
SELECT
    ways.uuid,
    ways.name,
    ways.owner_uuid,
    ways.goal_description,
    ways.updated_at,
    ways.created_at,
    ways.estimation_time,
    ways.copied_from_way_uuid,
    ways.is_completed,
    ways.is_private,
    (SELECT COUNT(*) FROM metrics WHERE metrics.way_uuid = ways.uuid) AS way_metrics_total,
    (SELECT COUNT(*) FROM metrics WHERE metrics.way_uuid = ways.uuid AND metrics.is_done = true) AS way_metrics_done,
    (SELECT COUNT(*) FROM favorite_users_ways WHERE favorite_users_ways.way_uuid = ways.uuid) AS way_favorite_for_users,
    (SELECT COUNT(*) FROM day_reports WHERE day_reports.way_uuid = ways.uuid) AS way_day_reports_amount,
    COALESCE(
        ARRAY(
            SELECT composite_ways.child_uuid
            FROM composite_ways
            WHERE composite_ways.parent_uuid = ways.uuid
        ),
        '{}'
    )::VARCHAR[] AS children_uuids
FROM ways
JOIN mentor_users_ways ON mentor_users_ways.way_uuid = ways.uuid
WHERE mentor_users_ways.user_uuid = @user_uuid
ORDER BY ways.updated_at DESC;

-- name: GetFavoriteWaysByUserId :many
SELECT
    ways.uuid,
    ways.name,
    ways.owner_uuid,
    ways.goal_description,
    ways.updated_at,
    ways.created_at,
    ways.estimation_time,
    ways.copied_from_way_uuid,
    ways.is_completed,
    ways.is_private,
    (SELECT COUNT(*) FROM metrics WHERE metrics.way_uuid = ways.uuid) AS way_metrics_total,
    (SELECT COUNT(*) FROM metrics WHERE metrics.way_uuid = ways.uuid AND metrics.is_done = true) AS way_metrics_done,
    (SELECT COUNT(*) FROM favorite_users_ways WHERE favorite_users_ways.way_uuid = ways.uuid) AS way_favorite_for_users,
    (SELECT COUNT(*) FROM day_reports WHERE day_reports.way_uuid = ways.uuid) AS way_day_reports_amount,
    COALESCE(
        ARRAY(
            SELECT composite_ways.child_uuid
            FROM composite_ways
            WHERE composite_ways.parent_uuid = ways.uuid
        ),
        '{}'
    )::VARCHAR[] AS children_uuids
FROM ways
JOIN favorite_users_ways ON favorite_users_ways.way_uuid = ways.uuid
WHERE favorite_users_ways.user_uuid = @user_uuid
ORDER BY ways.updated_at DESC;


-- name: ListWays :many
SELECT
    ways.*,
    (SELECT COUNT(*) FROM metrics WHERE metrics.way_uuid = ways.uuid) AS way_metrics_total,
    (SELECT COUNT(*) FROM metrics WHERE metrics.way_uuid = ways.uuid AND metrics.is_done = true) AS way_metrics_done,
    (SELECT COUNT(*) FROM favorite_users_ways WHERE favorite_users_ways.way_uuid = ways.uuid) AS way_favorite_for_users,
    (SELECT COUNT(*) FROM day_reports WHERE day_reports.way_uuid = ways.uuid) AS way_day_reports_amount,
    COALESCE(
        ARRAY(
            SELECT composite_ways.child_uuid
            FROM composite_ways
            WHERE composite_ways.parent_uuid = ways.uuid
        ),
        '{}'
    )::VARCHAR[] AS children_uuids
FROM ways
WHERE ways.is_private = false
    AND (
        (@status = 'inProgress' AND ways.is_completed = false AND ways.updated_at > (@date)::timestamp - interval '14 days')
        OR (@status = 'completed' AND ways.is_completed = true)
        OR (@status = 'abandoned' AND ways.is_completed = false AND ways.updated_at < (@date)::timestamp - interval '14 days')
        OR (@status = 'all')
    )
    AND ((
        SELECT COUNT(*)
        FROM day_reports
        WHERE day_reports.way_uuid = ways.uuid
    ) >= @min_day_reports_amount::integer)
    AND (LOWER(ways.name) LIKE '%' || LOWER(@way_name) || '%' OR @way_name = '')
ORDER BY ways.created_at DESC
LIMIT @request_limit
OFFSET @request_offset;


-- name: CountWaysByType :one
SELECT COUNT(*) FROM ways
WHERE ways.is_private = false
    AND (
        (@way_status = 'inProgress'
            AND ways.is_completed = false
            AND ways.updated_at > ((@date)::timestamp - interval '14 days'))
        OR (@way_status = 'completed' AND ways.is_completed = true)
        OR (@way_status = 'abandoned'
            AND (ways.is_completed = false)
            AND (ways.updated_at < ((@date)::timestamp - interval '14 days'))
        )
        OR (@way_status = 'all')
    )
    AND (
        (SELECT COUNT(day_reports.uuid)
            FROM day_reports
            WHERE day_reports.way_uuid = ways.uuid
        ) >= @min_day_reports_amount::integer
    ) AND (LOWER(ways.name) LIKE '%' || LOWER(@way_name) || '%' OR @way_name = '');

-- name: UpdateWay :one
UPDATE ways
SET
name = coalesce(sqlc.narg('name'), name),
goal_description = coalesce(sqlc.narg('goal_description'), goal_description),
updated_at = coalesce(sqlc.narg('updated_at'), updated_at),
estimation_time = coalesce(sqlc.narg('estimation_time'), estimation_time),
is_private = coalesce(sqlc.narg('is_private'), is_private),
is_completed = coalesce(sqlc.narg('is_completed'), is_completed)

WHERE ways.uuid = sqlc.arg('uuid')
RETURNING *,
    (SELECT COUNT(*) FROM metrics WHERE metrics.way_uuid = sqlc.arg('uuid')) AS way_metrics_total,
    (SELECT COUNT(*) FROM metrics WHERE metrics.way_uuid = sqlc.arg('uuid') AND metrics.is_done = true) AS way_metrics_done,
    (SELECT COUNT(*) FROM favorite_users_ways WHERE favorite_users_ways.way_uuid = sqlc.arg('uuid')) AS way_favorite_for_users,
    (SELECT COUNT(*) FROM day_reports WHERE day_reports.way_uuid = sqlc.arg('uuid')) AS way_day_reports_amount,
    COALESCE(
        ARRAY(
            SELECT composite_ways.child_uuid
            FROM composite_ways
            WHERE composite_ways.parent_uuid = ways.uuid
        ),
        '{}'
    )::VARCHAR[] AS children_uuids;

-- name: DeleteWay :exec
DELETE FROM ways
WHERE uuid = @way_uuid;

-- name: GetOverallInformation :one
SELECT
    COALESCE(SUM(job_dones.time), 0)::INTEGER AS total_time,
    COUNT(DISTINCT day_reports.uuid) AS total_reports,
    COUNT(job_dones.uuid) AS finished_jobs,
    COALESCE(
        SUM(job_dones.time) /
        NULLIF(EXTRACT(day FROM (INTERVAL '1 day' + (@end_date)::timestamp - (@start_date)::timestamp)), 0)
    , 0)::INTEGER AS average_time_per_calendar_day,
    COALESCE(
        SUM(job_dones.time) /
        NULLIF(COUNT(DISTINCT day_reports.uuid), 0)
    , 0)::INTEGER AS average_time_per_working_day,
    COALESCE(AVG(job_dones.time), 0)::INTEGER AS average_job_time
FROM day_reports
LEFT JOIN job_dones ON job_dones.day_report_uuid = day_reports.uuid
WHERE day_reports.way_uuid = ANY(@way_uuids::UUID[])
  AND day_reports.created_at BETWEEN @start_date AND @end_date;

-- name: GetTimeSpentByDayChart :many
SELECT
	day_reports.created_at as point_date,
	COALESCE(SUM(job_dones.time), 0)::INTEGER AS point_value
FROM day_reports
LEFT JOIN job_dones ON job_dones.day_report_uuid = day_reports.uuid
WHERE day_reports.way_uuid = ANY(@way_uuids::UUID[]) AND day_reports.created_at BETWEEN @start_date AND @end_date
GROUP BY point_date;

-- name: GetLabelStatistics :many
WITH job_done_data AS (
    SELECT
        job_dones.*,
        job_dones_job_tags.job_tag_uuid,
        job_tags.uuid AS label_uuid,
        job_tags.name AS label_name,
        job_tags.color AS label_color,
        job_tags.description AS label_description
    FROM day_reports
    LEFT JOIN job_dones ON job_dones.day_report_uuid = day_reports.uuid
    INNER JOIN job_dones_job_tags ON job_dones.uuid = job_dones_job_tags.job_done_uuid
    INNER JOIN job_tags ON job_tags.uuid = job_dones_job_tags.job_tag_uuid
    WHERE day_reports.way_uuid = ANY(@way_uuids::UUID[]) AND day_reports.created_at BETWEEN @start_date AND @end_date
)
SELECT
    label_uuid,
    label_name,
    label_color,
    label_description,
    COUNT(*) AS jobs_amount,
    COALESCE(COUNT(*) * 100 / NULLIF((SELECT COUNT(*) FROM job_done_data), 0), 0)::INTEGER AS jobs_amount_percentage,
    COALESCE(SUM(time), 0)::INTEGER AS jobs_time,
    COALESCE(SUM(time) * 100 / NULLIF((SELECT SUM(time) FROM job_done_data), 0), 0)::INTEGER AS jobs_time_percentage
FROM job_done_data
GROUP BY label_uuid, label_name, label_color, label_description;

-- name: GetLastDayReportDate :one
WITH way_min_date AS (
    SELECT
        MIN(created_at) AS oldest_way_date
    FROM ways
    WHERE uuid = ANY(@way_uuids::UUID[])
),
way_max_report AS (
    SELECT
        MAX(created_at) AS youngest_report_date
    FROM day_reports
    WHERE way_uuid = ANY(@way_uuids::UUID[])
)
SELECT
    (way_max_report.youngest_report_date IS NOT NULL)::BOOLEAN AS is_valid,
    way_min_date.oldest_way_date::TIMESTAMP AS total_start_date,
    way_max_report.youngest_report_date::TIMESTAMP AS end_date
FROM way_min_date
CROSS JOIN way_max_report;

-- name: GetWayChildren :many
SELECT composite_ways.child_uuid
FROM composite_ways
WHERE composite_ways.parent_uuid = @way_uuid;

-- name: GetWayRelatedUsers :many
SELECT
    users.*
FROM ways
LEFT JOIN mentor_users_ways ON mentor_users_ways.way_uuid = ways.uuid
LEFT JOIN former_mentors_ways ON former_mentors_ways.way_uuid = ways.uuid
LEFT JOIN users ON users.uuid = mentor_users_ways.user_uuid
	OR users.uuid = former_mentors_ways.former_mentor_uuid
	OR users.uuid = ways.owner_uuid
WHERE ways.uuid = ANY(@way_uuids::UUID[]);
