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
