-- name: CreateFromUserMentoringRequest :one
INSERT INTO from_user_mentoring_requests(
    user_uuid,
    way_uuid
) VALUES (
    $1, $2
) RETURNING *;

-- name: DeleteFromUserMentoringRequest :exec
DELETE FROM from_user_mentoring_requests
WHERE user_uuid = $1 AND way_uuid = $2;


-- name: GetFromUserMentoringRequestWaysByUserId :many
SELECT 
    ways.uuid,
    ways.name,
    ways.goal_description,
    ways.updated_at,
    ways.created_at,
    ways.estimation_time,
    ways.owner_uuid,
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
FROM from_user_mentoring_requests
JOIN ways 
    ON $1 = from_user_mentoring_requests.user_uuid 
    AND from_user_mentoring_requests.way_uuid = ways.uuid;

-- name: GetFromUserMentoringRequestWaysByWayId :many
SELECT 
    users.*
FROM from_user_mentoring_requests
JOIN users ON from_user_mentoring_requests.user_uuid = users.uuid
WHERE from_user_mentoring_requests.way_uuid = $1;