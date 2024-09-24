SET TIMEZONE = 'UTC';

CREATE TYPE notification_nature AS ENUM (
    'private_chat',
    'group_chat',
    'own_way',
    'mentoring_way',
    'mentoring_request',
    'favorite_way'
);

CREATE TYPE notification_channel AS ENUM (
    'mail',
    'webapp'
);

-- TODO remove 5000 more than 5000+ oldest notifications
CREATE TABLE notifications (
    "uuid" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "user_uuid" UUID NOT NULL,
    -- true if user interact with notification in any channel
    "is_read" BOOLEAN NOT NULL,
    "description" VARCHAR(500),
    "url" VARCHAR(500),
    "nature" notification_nature NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "notifications_pkey" PRIMARY KEY (uuid)
);
-- TODO: check does this index used in remove_old_notifications function
CREATE UNIQUE INDEX "user_uuid_key" ON "notifications"("user_uuid", "created_at");

CREATE TABLE enabled_notifications (
    "uuid" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "user_uuid" UUID NOT NULL,
    "nature" notification_nature NOT NULL,
    "channel" notification_channel NOT NULL,
    "is_enabled" BOOLEAN NOT NULL,
    CONSTRAINT "enabled_notifications_pkey" PRIMARY KEY (uuid)
);

CREATE OR REPLACE FUNCTION remove_old_notifications() 
RETURNS TRIGGER AS $$
BEGIN
    -- Delete old notifications if there are more than 5000 for the user
    DELETE FROM notification
    WHERE uuid IN (
        SELECT uuid FROM notification
        WHERE user_uuid = NEW.user_uuid
        ORDER BY created_at ASC
        OFFSET 1000
    );
    
    -- Allow the new row to be inserted
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER cleanup_notifications_trigger
BEFORE INSERT ON notification
FOR EACH ROW
EXECUTE FUNCTION clean_up_old_notifications();

