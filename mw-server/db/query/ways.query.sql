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
    COALESCE(
        ARRAY(
            SELECT composite_ways.child_uuid
            FROM composite_ways
            WHERE composite_ways.parent_uuid = ways.uuid
        ),
        '{}'
    )::VARCHAR[] AS children_uuids
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
WHERE favorite_users_ways.user_uuid = $1
ORDER BY ways.updated_at DESC;


-- name: ListWays :many
SELECT
    *,
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
WHERE uuid = $1;
