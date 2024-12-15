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

CREATE TABLE notifications (
    "uuid" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "user_uuid" UUID NOT NULL,
    -- true if user interact with notification in any channel
    "is_read" BOOLEAN NOT NULL DEFAULT FALSE,
    "description" VARCHAR(500),
    "url" VARCHAR(500),
    "nature" notification_nature NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "notifications_pkey" PRIMARY KEY (uuid)
);
-- TODO: check does this index used in remove_old_notifications function
CREATE UNIQUE INDEX "user_uuid_key" ON "notifications"("user_uuid", "created_at");

CREATE TABLE notification_settings (
    "uuid" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "user_uuid" UUID NOT NULL,
    "nature" notification_nature NOT NULL,
    "channel" notification_channel NOT NULL,
    "is_enabled" BOOLEAN NOT NULL,
    CONSTRAINT "notification_settings_pkey" PRIMARY KEY (uuid),
    CONSTRAINT "unique_user_notification" UNIQUE (user_uuid, nature, channel)
);

CREATE OR REPLACE FUNCTION remove_old_notifications()
RETURNS TRIGGER AS $$
BEGIN
    -- Delete old notifications if there are more than 1000 for the user
    DELETE FROM notifications
    WHERE uuid IN (
        SELECT uuid FROM notifications
        WHERE user_uuid = NEW.user_uuid
        ORDER BY created_at DESC
        OFFSET 1000
    );

    -- Allow the new row to be inserted
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER remove_old_notifications_trigger
BEFORE INSERT ON notifications
FOR EACH ROW
EXECUTE FUNCTION remove_old_notifications();
