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
