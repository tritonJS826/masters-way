-- name: CreateFromUserMentoringRequest :one
INSERT INTO from_user_mentoring_requests(
    user_uuid,
    way_uuid
) VALUES (
    $1, $2
) RETURNING *;

-- name: DeleteFromUserMentoringRequestByIds :exec
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
    ways.status,
    ways.is_private
FROM from_user_mentoring_requests
JOIN ways 
    ON $1 = from_user_mentoring_requests.user_uuid 
    AND from_user_mentoring_requests.way_uuid = ways.uuid;

-- name: GetFromUserMentoringRequestWaysByWayId :many
SELECT 
    users.*
FROM from_user_mentoring_requests
JOIN users
    ON $1 = from_user_mentoring_requests.way_uuid 
    AND from_user_mentoring_requests.user_uuid = users.uuid
WHERE ways.uuid = $1;