-- name: GetNextMessageToAI :one
SELECT 
    *
FROM 
    messages_to_generate_with_ai
LIMIT 1;


-- name: GetMessageToAIById :one
SELECT 
    *
FROM
    messages_to_generate_with_ai
WHERE
    messages_to_generate_with_ai.uuid = @message_to_generate_with_ai_uuid
LIMIT 1;


-- name: DeleteMessageToAI :exec
DELETE FROM messages_to_generate_with_ai
WHERE uuid = @message_to_generate_with_ai_uuid;
