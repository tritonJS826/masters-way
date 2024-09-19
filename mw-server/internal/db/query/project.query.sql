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
            ),
            '{}'
    )::VARCHAR[] AS user_uuids;

-- name: AddUserToProject :one
INSERT INTO users_projects(
    user_uuid,
    project_uuid
) VALUES (
    @user_uuid,
    @project_uuid
) RETURNING *;

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
                WHERE ways.project_uuid = uuid
            ),
            '{}'
    )::VARCHAR[] AS way_uuids,
    COALESCE(
            ARRAY(
                SELECT user_uuid
                FROM users_projects
                WHERE users_projects.project_uuid = uuid
            ),
            '{}'
    )::VARCHAR[] AS user_uuids
FROM projects
WHERE projects.uuid = @project_uuid;

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
                WHERE ways.project_uuid = uuid
            ),
            '{}'
    )::VARCHAR[] AS way_uuids,
    COALESCE(
            ARRAY(
                SELECT user_uuid
                FROM users_projects
                WHERE users_projects.project_uuid = uuid
            ),
            '{}'
    )::VARCHAR[] AS user_uuids;
