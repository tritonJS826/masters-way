-- name: CreateFile :one
INSERT INTO files (name, src_url, preview_url, storage_type, google_drive_id, owner_uuid, size)
VALUES (@name, @src_url, @preview_url, @storage_type, @google_drive_id, @owner_uuid, @size)
RETURNING uuid, name, src_url, preview_url, owner_uuid;
