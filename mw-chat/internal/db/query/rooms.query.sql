-- name: CreateRoom :one
INSERT INTO rooms (created_at, name, type)
VALUES (@created_at, @name, @type)
RETURNING uuid, name, type;

-- name: GetPrivateRoomByUserUUIDs :one
SELECT rooms.uuid
FROM rooms
	JOIN users_rooms AS user1 on user1.room_uuid = rooms.uuid
		and user1.user_uuid = @user_1
	JOIN users_rooms AS user2 on user2.room_uuid = rooms.uuid
		and user2.user_uuid = @user_2
WHERE rooms.type = 'private';

-- name: GetRoomsByUserUUID :many
SELECT
    rooms.uuid,
    rooms.name,
    rooms.type,
    users_rooms.is_room_blocked,
    ARRAY(
        SELECT
            users_rooms.user_uuid
        FROM users_rooms
        WHERE users_rooms.room_uuid = rooms.uuid
        ORDER BY updated_at DESC
    )::UUID[] AS user_uuids,
    ARRAY(
        SELECT
            users_rooms.user_role
        FROM users_rooms
        WHERE users_rooms.room_uuid = rooms.uuid
        ORDER BY updated_at DESC
    )::VARCHAR[] AS user_roles,
    COALESCE(message_counts.unread_message_count, 0) AS unread_message_count                                          
FROM rooms                                                                
JOIN users_rooms ON rooms.uuid = users_rooms.room_uuid                    
LEFT JOIN (                                                                    
    SELECT room_uuid, COUNT(*) AS unread_message_count                           
    FROM messages
    LEFT JOIN message_status ON message_status.message_uuid = messages.uuid
    WHERE message_status.is_read = false
        AND messages.owner_uuid <> @user_uuid
    GROUP BY room_uuid
) AS message_counts ON rooms.uuid = message_counts.room_uuid              
WHERE users_rooms.user_uuid = @user_uuid AND rooms.type = @room_type      
GROUP BY rooms.uuid, rooms.name, rooms.type, users_rooms.is_room_blocked, message_counts.unread_message_count                                                
ORDER BY MAX(users_rooms.updated_at) DESC;

-- name: GetRoomByUUID :one
SELECT
    rooms.uuid,
    rooms.name,
    rooms.type,
    users_rooms.is_room_blocked,
    ARRAY(
        SELECT
            users_rooms.user_uuid
        FROM users_rooms
        WHERE users_rooms.room_uuid = rooms.uuid
        ORDER BY updated_at DESC
    )::UUID[] AS user_uuids,
    ARRAY(
        SELECT
            users_rooms.user_role
        FROM users_rooms
        WHERE users_rooms.room_uuid = rooms.uuid
        ORDER BY updated_at DESC
    )::VARCHAR[] AS user_roles
FROM rooms
JOIN users_rooms ON rooms.uuid = users_rooms.room_uuid
WHERE rooms.uuid = @room_uuid;
