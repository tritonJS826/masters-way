-- name: CreateUsersProjects :one
INSERT INTO users_projects(
    user_uuid,
    project_uuid
) VALUES (
    @user_uuid,
    @project_uuid
) RETURNING *;

-- name: DeleteUsersProjects :exec
DELETE FROM users_projects
WHERE user_uuid = @user_uuid AND project_uuid = @project_uuid;

-- name: GetIsUserProjectOwner :one
SELECT
    EXISTS (
        SELECT 1
        FROM projects
        WHERE projects.uuid = @project_uuid AND projects.owner_uuid = @user_uuid
    );
