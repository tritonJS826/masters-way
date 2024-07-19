SET TIMEZONE = 'UTC';

CREATE TABLE p2p_rooms (
  "uuid" UUID NOT NULL DEFAULT uuid_generate_v4(),
  "user_1_uuid" UUID NOT NULL,
  "user_2_uuid" UUID NOT NULL,
  "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "is_blocked" BOOLEAN,
  CONSTRAINT "p2p_rooms_pkey" PRIMARY KEY ("uuid")
);

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

CREATE TABLE users_group_rooms (
  "user_uuid" UUID NOT NULL,
  "room_uuid" UUID NOT NULL REFERENCES group_rooms("uuid") ON UPDATE CASCADE ON DELETE CASCADE,
  "role" VARCHAR(50) NOT NULL,
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
