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

-- name: GetWayDetailsById :one
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
    users.uuid AS owner_uuid,
    users.name AS owner_name,
    users.email AS owner_email,
    users.description AS owner_description,
    users.created_at AS owner_created_at,
    users.image_url AS owner_image_url,
    users.is_mentor AS owner_is_mentor,

    (SELECT COUNT(*) FROM metrics WHERE metrics.way_uuid = ways.uuid) AS way_metrics_total,
    (SELECT COUNT(*) FROM metrics WHERE metrics.way_uuid = ways.uuid AND metrics.is_done = true) AS way_metrics_done,
    (SELECT COUNT(*) FROM favorite_users_ways WHERE favorite_users_ways.way_uuid = ways.uuid) AS way_favorite_for_users,
    (SELECT COUNT(*) FROM day_reports WHERE day_reports.way_uuid = ways.uuid) AS way_day_reports_amount,
    (ARRAY(
            SELECT composite_ways.child_uuid
            FROM composite_ways
            WHERE composite_ways.parent_uuid = ways.uuid
     )::VARCHAR[]) AS children_amount,
    (SELECT COALESCE(JSON_AGG(json_build_object(
                                      'uuid', users.uuid,
                                      'name', users.name,
                                      'email', users.email,
                                      'description', users.description,
                                      'created_at', users.created_at,
                                      'image_url', users.image_url,
                                      'is_mentor', users.is_mentor
                              ) ORDER BY users.uuid), '[]'::json)
     FROM users
              JOIN mentor_users_ways ON mentor_users_ways.user_uuid = users.uuid
     WHERE mentor_users_ways.way_uuid = ways.uuid) AS mentors,

    (SELECT COALESCE(JSON_AGG(json_build_object(
                                      'uuid', way_tags.uuid,
                                      'name', way_tags.name
                              ) ORDER BY way_tags.name), '[]'::json)
     FROM way_tags
              JOIN ways_way_tags ON ways_way_tags.way_tag_uuid = way_tags.uuid
     WHERE ways_way_tags.way_uuid = ways.uuid) AS way_tags

FROM ways
         JOIN users ON users.uuid = ways.owner_uuid
WHERE ways.uuid = $1;