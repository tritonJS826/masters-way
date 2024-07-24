SET TIMEZONE = 'UTC';

CREATE TYPE room_type AS ENUM ('private', 'group');
CREATE TABLE rooms (
    "uuid" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "name" VARCHAR(50) NOT NULL,
    "type" room_type NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "rooms_pkey" PRIMARY KEY (uuid)
);

CREATE TYPE user_role_type AS ENUM ('admin', 'regular');
CREATE TABLE users_rooms (
    "user_uuid" UUID NOT NULL,
    "room_uuid" UUID NOT NULL REFERENCES rooms("uuid") ON UPDATE CASCADE ON DELETE CASCADE,
    "user_role" user_role_type NOT NULL,
    "is_room_blocked" BOOLEAN NOT NULL DEFAULT FALSE,
    "joined_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "users_rooms_pkey" PRIMARY KEY ("user_uuid", "room_uuid")
);

CREATE TABLE messages (
    "uuid" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "owner_uuid" UUID NOT NULL,
    "room_uuid" UUID NOT NULL REFERENCES rooms("uuid") ON UPDATE CASCADE ON DELETE CASCADE,
    "text" VARCHAR(3000) NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "messages_pkey" PRIMARY KEY ("uuid")
);

CREATE TABLE message_status (
    "message_uuid" UUID NOT NULL REFERENCES messages("uuid") ON UPDATE CASCADE ON DELETE CASCADE,
    "receiver_uuid" UUID NOT NULL,
    "is_read" bool NOT NULL DEFAULT FALSE,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "message_status_pkey" PRIMARY KEY ("message_uuid", "receiver_uuid")
);
