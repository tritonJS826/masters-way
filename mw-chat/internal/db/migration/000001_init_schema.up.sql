SET TIMEZONE = 'UTC';

CREATE TABLE p2p_rooms (
  "uuid" UUID NOT NULL DEFAULT uuid_generate_v4(),
  "user_x_uuid" UUID NOT NULL,
  "user_y_uuid" UUID NOT NULL,
  "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "blocked_by_user_uuid" UUID,
  -- CONSTRAINT "user_uuids_not_equal" CHECK ("user_1_uuid" <> "user_2_uuid"),
  CONSTRAINT "p2p_rooms_pkey" PRIMARY KEY ("uuid")
);

-- TODO: Refactor for p2p_rooms (limit 2);
-- CREATE TABLE users_group_rooms (
--   "user_uuid" UUID NOT NULL,
--   "room_uuid" UUID NOT NULL REFERENCES group_rooms("uuid") ON UPDATE CASCADE ON DELETE CASCADE,
--   "role" group_user_role NOT NULL,
--   "joined_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
--   "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
--   CONSTRAINT "users_group_rooms_pkey" PRIMARY KEY ("user_uuid", "room_uuid")
-- );

CREATE TABLE p2p_messages (
  "uuid" UUID NOT NULL DEFAULT uuid_generate_v4(),
  "owner_uuid" UUID NOT NULL,
  "room_uuid" UUID NOT NULL REFERENCES p2p_rooms("uuid") ON UPDATE CASCADE ON DELETE CASCADE,
  "text" VARCHAR(3000),
  "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "p2p_messages_pkey" PRIMARY KEY ("uuid")
);

CREATE TABLE group_rooms (
  "uuid" UUID NOT NULL DEFAULT uuid_generate_v4(),
  "name" VARCHAR(50) NOT NULL,
  "is_blocked" BOOLEAN NOT NULL DEFAULT FALSE,
  "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "group_rooms_pkey" PRIMARY KEY ("uuid")
);

CREATE TYPE group_user_role AS ENUM ('admin', 'regular');
CREATE TABLE users_group_rooms (
  "user_uuid" UUID NOT NULL,
  "room_uuid" UUID NOT NULL REFERENCES group_rooms("uuid") ON UPDATE CASCADE ON DELETE CASCADE,
  "role" group_user_role NOT NULL,
  "joined_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "users_group_rooms_pkey" PRIMARY KEY ("user_uuid", "room_uuid")
);

CREATE TABLE users_group_room_requests (
  "sender_uuid" UUID NOT NULL,
  "receiver_uuid" UUID NOT NULL,
  "room_uuid" UUID NOT NULL REFERENCES group_rooms("uuid") ON UPDATE CASCADE ON DELETE CASCADE,
  "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "users_group_room_requests_pkey" PRIMARY KEY ("sender_uuid", "receiver_uuid", "room_uuid")
);

CREATE TABLE group_messages (
  "uuid" UUID NOT NULL DEFAULT uuid_generate_v4(),
  "owner_uuid" UUID NOT NULL,
  "room_uuid" UUID NOT NULL REFERENCES group_rooms("uuid") ON UPDATE CASCADE ON DELETE CASCADE,
  "text" VARCHAR(3000) NOT NULL,
  "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "group_messages_pkey" PRIMARY KEY ("uuid")
);
