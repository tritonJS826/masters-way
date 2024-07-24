-- name: CreateMessageStatus :exec
INSERT INTO message_status (message_uuid, receiver_uuid)
VALUES (@message_uuid, @receiver_uuid);
