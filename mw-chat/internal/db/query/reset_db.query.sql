-- name: TruncateAllTables :exec
TRUNCATE TABLE message_status, messages, users_rooms, rooms CASCADE;
