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
    'webapp',
    'telegram'
);

CREATE TABLE notifications (
    "uuid" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "user_uuid" UUID NOT NULL,
    "is_read" BOOLEAN NOT NULL DEFAULT FALSE,
    "description" VARCHAR(500),
    "url" VARCHAR(500),
    "nature" notification_nature NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "notifications_pkey" PRIMARY KEY (uuid)
);

CREATE UNIQUE INDEX "notifications_user_uuid_created_at_key" ON "notifications"("user_uuid", "created_at");

CREATE TABLE notification_settings (
    "uuid" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "user_uuid" UUID NOT NULL,
    "nature" notification_nature NOT NULL,
    "channel" notification_channel NOT NULL,
    "is_enabled" BOOLEAN NOT NULL,
    CONSTRAINT "notification_settings_pkey" PRIMARY KEY (uuid),
    CONSTRAINT "unique_user_notification" UNIQUE (user_uuid, nature, channel)
);