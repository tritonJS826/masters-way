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
    $1, $2, $3, $4, $5, $6, $7, $8, $9
) RETURNING
    *,
    (SELECT COUNT(*) FROM metrics WHERE metrics.way_uuid = @way_uuid) AS way_metrics_total,
    (SELECT COUNT(*) FROM metrics WHERE metrics.way_uuid = @way_uuid AND metrics.is_done = true) AS way_metrics_done,
    (SELECT COUNT(*) FROM favorite_users_ways WHERE favorite_users_ways.way_uuid = @way_uuid) AS way_favorite_for_users,
    (SELECT COUNT(*) FROM day_reports WHERE day_reports.way_uuid = @way_uuid) AS way_day_reports_amount,
    (ARRAY(
        SELECT composite_ways.child_uuid
        FROM composite_ways
        WHERE composite_ways.parent_uuid = ways.uuid
    )::VARCHAR[]) AS children_uuids;


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
    (ARRAY(
        SELECT composite_ways.child_uuid
        FROM composite_ways
        WHERE composite_ways.parent_uuid = ways.uuid
    )::VARCHAR[]) AS children_uuids,
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
    (SELECT COUNT(*) FROM day_reports WHERE day_reports.way_uuid = @way_uuid) AS way_day_reports_amount,
    (ARRAY(
        SELECT composite_ways.child_uuid
        FROM composite_ways
        WHERE composite_ways.parent_uuid = ways.uuid
    )::VARCHAR[]) AS children_uuids
FROM ways
JOIN users ON users.uuid = ways.owner_uuid
WHERE ways.uuid = @way_uuid
LIMIT 1;

-- name: GetBasePopulatedWayByID :one
WITH favorite_count AS (
    SELECT way_uuid, COUNT(*) AS favorite_for_users_amount
    FROM favorite_users_ways
    WHERE way_uuid = $1
    GROUP BY way_uuid
),
mentors_data AS (
    SELECT users.uuid, users.name, users.email, users.description, users.created_at, users.image_url, users.is_mentor
    FROM mentor_users_ways
    JOIN users ON mentor_users_ways.user_uuid = users.uuid
    WHERE mentor_users_ways.way_uuid = $1
),
way_tags_data AS (
    SELECT way_tags.uuid, way_tags.name
    FROM ways_way_tags
    JOIN way_tags ON ways_way_tags.way_tag_uuid = way_tags.uuid
    WHERE ways_way_tags.way_uuid = $1
),
job_tags_data AS (
    SELECT job_tags.uuid, job_tags.name, job_tags.description, job_tags.color
    FROM job_tags
    WHERE job_tags.way_uuid = $1
),
former_mentors_data AS (
    SELECT users.uuid, users.name, users.email, users.description, users.created_at, users.image_url, users.is_mentor
    FROM former_mentors_ways
    JOIN users ON former_mentors_ways.former_mentor_uuid = users.uuid
    WHERE former_mentors_ways.way_uuid = $1
),
from_user_requests_data AS (
    SELECT users.uuid, users.name, users.email, users.description, users.created_at, users.image_url, users.is_mentor
    FROM from_user_mentoring_requests
    JOIN users ON from_user_mentoring_requests.user_uuid = users.uuid
    WHERE from_user_mentoring_requests.way_uuid = $1
),
metrics_data AS (
    SELECT uuid, description, is_done, done_date, metric_estimation
    FROM metrics
    WHERE way_uuid = $1
    ORDER BY created_at
),
day_reports_data AS (
    SELECT uuid, created_at, updated_at, is_day_off
    FROM day_reports
    WHERE way_uuid = $1
    ORDER BY created_at DESC
)
SELECT
    ways.uuid,
    ways.name,
    ways.goal_description,
    ways.updated_at,
    ways.created_at,
    ways.estimation_time,
    ways.is_completed,
    ways.is_private,
    ways.copied_from_way_uuid,
    u.uuid AS owner_uuid,
    u.name AS owner_name,
    u.email AS owner_email,
    u.description AS owner_description,
    u.created_at AS owner_created_at,
    u.image_url AS owner_image_url,
    u.is_mentor AS owner_is_mentor,
    COALESCE(fc.favorite_for_users_amount, 0) AS favorite_for_users_amount,
    ARRAY(
        SELECT composite_ways.child_uuid
        FROM composite_ways
        WHERE composite_ways.parent_uuid = ways.uuid
    )::UUID[] AS children_uuids,
    COALESCE(
        (SELECT JSON_AGG(json_build_object(
            'uuid', md.uuid,
            'name', md.name,
            'email', md.email,
            'description', md.description,
            'created_at', md.created_at,
            'image_url', md.image_url,
            'is_mentor', md.is_mentor
        ) ORDER BY md.uuid)
        FROM mentors_data md), '[]'::json) AS mentors,
    COALESCE(
        (SELECT JSON_AGG(json_build_object(
            'uuid', wt.uuid,
            'name', wt.name
        ) ORDER BY wt.name)
        FROM way_tags_data wt), '[]'::json) AS way_tags,
    COALESCE(
        (SELECT JSON_AGG(json_build_object(
            'uuid', jt.uuid,
            'name', jt.name,
            'description', jt.description,
            'color', jt.color
        ) ORDER BY jt.uuid)
        FROM job_tags_data jt), '[]'::json) AS job_tags,
    COALESCE(
        (SELECT JSON_AGG(json_build_object(
            'uuid', fm.uuid,
            'name', fm.name,
            'email', fm.email,
            'description', fm.description,
            'created_at', fm.created_at,
            'image_url', fm.image_url,
            'is_mentor', fm.is_mentor
        ) ORDER BY fm.uuid)
        FROM former_mentors_data fm), '[]'::json) AS former_mentors,
    COALESCE(
        (SELECT JSON_AGG(json_build_object(
            'uuid', fur.uuid,
            'name', fur.name,
            'email', fur.email,
            'description', fur.description,
            'created_at', fur.created_at,
            'image_url', fur.image_url,
            'is_mentor', fur.is_mentor
        ) ORDER BY fur.uuid)
        FROM from_user_requests_data fur), '[]'::json) AS from_user_mentoring_requests,
    COALESCE(
        (SELECT JSON_AGG(json_build_object(
            'uuid', md.uuid,
            'description', md.description,
            'is_done', md.is_done,
            'done_date', md.done_date,
            'metric_estimation', md.metric_estimation
        ))
        FROM metrics_data md), '[]'::json) AS metrics,
    COALESCE(
        (SELECT JSON_AGG(json_build_object(
            'uuid', dr.uuid,
            'created_at', dr.created_at,
            'updated_at', dr.updated_at,
            'is_day_off', dr.is_day_off
        ))
        FROM day_reports_data dr), '[]'::json) AS day_reports
FROM ways
JOIN users u ON u.uuid = ways.owner_uuid
LEFT JOIN favorite_count fc ON fc.way_uuid = ways.uuid
WHERE ways.uuid = $1
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
    (ARRAY(
        SELECT composite_ways.child_uuid
        FROM composite_ways
        WHERE composite_ways.parent_uuid = ways.uuid
    )::VARCHAR[]) AS children_uuids
FROM ways
JOIN way_collections_ways ON way_collections_ways.way_uuid = ways.uuid
WHERE way_collections_ways.way_collection_uuid = $1
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
    (ARRAY(
        SELECT composite_ways.child_uuid
        FROM composite_ways
        WHERE composite_ways.parent_uuid = ways.uuid
    )::VARCHAR[]) AS children_uuids
FROM ways
WHERE ways.owner_uuid = $1
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
    (ARRAY(
        SELECT composite_ways.child_uuid
        FROM composite_ways
        WHERE composite_ways.parent_uuid = ways.uuid
    )::VARCHAR[]) AS children_uuids
FROM ways
JOIN mentor_users_ways ON mentor_users_ways.way_uuid = ways.uuid
WHERE mentor_users_ways.user_uuid = $1
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
    (ARRAY(
        SELECT composite_ways.child_uuid
        FROM composite_ways
        WHERE composite_ways.parent_uuid = ways.uuid
    )::VARCHAR[]) AS children_uuids
FROM ways
JOIN favorite_users_ways ON favorite_users_ways.way_uuid = ways.uuid
WHERE favorite_users_ways.user_uuid = $1
ORDER BY ways.updated_at DESC;


-- name: ListWays :many
SELECT
    *,
    (SELECT COUNT(*) FROM metrics WHERE metrics.way_uuid = ways.uuid) AS way_metrics_total,
    (SELECT COUNT(*) FROM metrics WHERE metrics.way_uuid = ways.uuid AND metrics.is_done = true) AS way_metrics_done,
    (SELECT COUNT(*) FROM favorite_users_ways WHERE favorite_users_ways.way_uuid = ways.uuid) AS way_favorite_for_users,
    (SELECT COUNT(*) FROM day_reports WHERE day_reports.way_uuid = ways.uuid) AS way_day_reports_amount,
    (ARRAY(
        SELECT composite_ways.child_uuid
        FROM composite_ways
        WHERE composite_ways.parent_uuid = ways.uuid
    )::VARCHAR[]) AS children_uuids
FROM ways
WHERE ways.is_private = false AND
    (
        ($3 = 'inProgress' AND ways.is_completed = false AND ways.updated_at > $4::timestamp - interval '14 days')
    OR ($3 = 'completed' AND ways.is_completed = true)
    OR ($3 = 'abandoned' AND ways.is_completed = false AND ways.updated_at < $4::timestamp - interval '14 days')
    OR ($3 = 'all')
    )
ORDER BY created_at DESC
LIMIT $1
OFFSET $2;

-- name: CountWaysByType :one
SELECT COUNT(*) FROM ways
WHERE ways.is_private = false AND (
    (@way_status = 'inProgress'
        AND ways.is_completed = false
        AND ways.updated_at > ($1::timestamp - interval '14 days'))
    OR (@way_status = 'completed' AND ways.is_completed = true)
    OR (@way_status = 'abandoned'
        AND (ways.is_completed = false)
        AND (ways.updated_at < ($1::timestamp - interval '14 days'))
    )
    OR (@way_status = 'all')
);

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
    (ARRAY(
        SELECT composite_ways.child_uuid
        FROM composite_ways
        WHERE composite_ways.parent_uuid = ways.uuid
    )::VARCHAR[]) AS children_uuids;

-- name: DeleteWay :exec
DELETE FROM ways
WHERE uuid = $1;
