-- name: CreateProject :one
INSERT INTO projects(
    name,
    owner_uuid
) VALUES (
    @name,
    @owner_uuid
) RETURNING
    uuid,
    name,
    owner_uuid,
    is_private,
    COALESCE(
        ARRAY(
            SELECT user_uuid
            FROM users_projects
            WHERE users_projects.project_uuid = uuid
	    ORDER BY created_at
        ),
        '{}'
    )::VARCHAR[] AS user_uuids;

-- name: GetProjectByID :one
SELECT
    uuid,
    name,
    owner_uuid,
    is_private,
    COALESCE(
        ARRAY(
            SELECT uuid
            FROM ways
            WHERE ways.project_uuid = projects.uuid
        ),
        '{}'
    )::VARCHAR[] AS way_uuids,
    COALESCE(
        ARRAY(
            SELECT user_uuid
            FROM users_projects
            WHERE users_projects.project_uuid = projects.uuid
	    ORDER BY created_at
        ),
        '{}'
    )::VARCHAR[] AS user_uuids
FROM projects
WHERE projects.uuid = @project_uuid AND projects.is_deleted = FALSE;

-- name: GetProjectsByUserID :many
SELECT
    uuid,
    name,
    is_private,
    COALESCE(
        ARRAY(
            SELECT user_uuid
            FROM users_projects
            WHERE users_projects.project_uuid = projects.uuid
	    ORDER BY created_at
        ),
        '{}'
        )::VARCHAR[] AS user_uuids
FROM projects
WHERE projects.uuid IN (
    SELECT project_uuid
    FROM users_projects
    WHERE users_projects.user_uuid = @user_uuid
) AND projects.is_deleted = FALSE;

-- name: UpdateProject :one
UPDATE projects
SET name = coalesce(sqlc.narg('name'), name),
    is_private = coalesce(sqlc.narg('is_private'), is_private),
    is_deleted = coalesce(sqlc.narg('is_deleted'), is_deleted)
WHERE projects.uuid = @project_uuid
RETURNING
    uuid,
    name,
    owner_uuid,
    is_private,
    COALESCE(
        ARRAY(
            SELECT uuid
            FROM ways
            WHERE ways.project_uuid = projects.uuid
        ),
        '{}'
    )::VARCHAR[] AS way_uuids,
    COALESCE(
        ARRAY(
            SELECT user_uuid
            FROM users_projects
            WHERE users_projects.project_uuid = projects.uuid
	    ORDER BY created_at
        ),
        '{}'
    )::VARCHAR[] AS user_uuids;
