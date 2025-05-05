-- name: CreateUserContact :one
INSERT INTO user_contacts(
    user_uuid,
    contact_link,
    description
) VALUES (
    @user_uuid,
    @contact_link,
    @description
) RETURNING *;

-- name: UpdateContactByID :one
UPDATE user_contacts
SET
    description = coalesce(sqlc.narg('description'), description),
    contact_link = coalesce(sqlc.narg('contact_link'), contact_link)
WHERE user_contacts.uuid = @contact_uuid
RETURNING *;

-- name: GetUserContactsByUserUuid :many
SELECT * FROM user_contacts
WHERE user_contacts.user_uuid = @user_uuid;

-- name: DeleteUserContact :exec
DELETE FROM user_contacts
WHERE user_uuid = @user_uuid AND uuid = @contact_uuid;