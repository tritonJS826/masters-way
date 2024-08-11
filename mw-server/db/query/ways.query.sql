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
    CAST(COALESCE(SUM(job_dones.time), 0) AS INT) AS total_time,
    CAST(COUNT(day_reports.*) AS INT) AS total_reports,
    CAST(COUNT(job_dones.*) AS INT) AS finished_jobs,
    CAST(
        CASE
            WHEN COUNT(day_reports.*) = 0 THEN 0
            ELSE
                ROUND(COALESCE(SUM(job_dones.time), 0) / (
                    SELECT
                        COALESCE(EXTRACT(DAY FROM (MAX(day_reports.created_at) - ways.created_at)), 1)
                    FROM
                        ways
                    JOIN
                        day_reports ON ways.uuid = day_reports.way_uuid
                    WHERE
                        ways.uuid = @way_uuid
                    GROUP BY
                        ways.created_at
                ), 0)
        END AS INT
    ) AS average_time_per_calendar_day,
    CAST(
        CASE
            WHEN COUNT(day_reports.*) > 0 THEN
                ROUND(COALESCE(SUM(job_dones.time), 0) / COUNT(day_reports.*), 0)
            ELSE
                0
        END AS INT
    ) AS average_time_per_working_day,
    CAST(COALESCE(ROUND(AVG(job_dones.time), 0), 0) AS INT) AS average_job_time
FROM
    day_reports
LEFT JOIN
    job_dones ON job_dones.day_report_uuid = day_reports.uuid
WHERE
    day_reports.way_uuid = @way_uuid;

-- name: GetTimeSpentByDayChart :many
SELECT
	day_reports.created_at as point_date,
	CAST(COALESCE(SUM(job_dones.time), 0) AS INT) as point_value
FROM
    day_reports
LEFT JOIN
    job_dones ON job_dones.day_report_uuid = day_reports.uuid
WHERE
    day_reports.way_uuid = @way_uuid
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
    FROM
        day_reports
    LEFT JOIN
        job_dones ON job_dones.day_report_uuid = day_reports.uuid
    INNER JOIN
        job_dones_job_tags ON job_dones.uuid = job_dones_job_tags.job_done_uuid
    INNER JOIN
        job_tags ON job_tags.uuid = job_dones_job_tags.job_tag_uuid
    WHERE
        day_reports.way_uuid = $1
)
SELECT
    label_uuid,
    label_name,
    label_color,
    label_description,
    COUNT(*) AS jobs_amount,
    CASE
        WHEN (SELECT COUNT(*) FROM job_done_data) = 0 THEN 0
        ELSE CAST(COUNT(*) * 100 / (SELECT COUNT(*) FROM job_done_data) AS INT)
    END AS jobs_amount_percentage,
    SUM(time) AS jobs_time,
    CASE
        WHEN (SELECT SUM(time) FROM job_done_data) = 0 THEN 0
        ELSE CAST(SUM(time) * 100 / (SELECT SUM(time) FROM job_done_data) AS INT)
    END AS jobs_time_percentage
FROM
    job_done_data
GROUP BY
    label_uuid, label_name, label_color, label_description;
