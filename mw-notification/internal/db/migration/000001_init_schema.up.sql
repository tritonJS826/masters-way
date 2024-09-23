SET TIMEZONE = 'UTC';

CREATE TABLE notifications (
    "uuid" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "user_uuid" UUID NOT NULL,
    "is_visited" BOOLEAN NOT NULL,
    "description" VARCHAR(500),
    "type" room_type NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "rooms_pkey" PRIMARY KEY (uuid)
);