SET TIMEZONE = 'UTC';

CREATE TYPE file_extension AS ENUM ('webp', 'mp4', 'mp3');

CREATE TABLE files (
    "uuid" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "link" VARCHAR(500),
    "ownerId" UUID NOT NULL,
    "size" BIGINT NOT NULL CHECK (size BETWEEN 0 AND 10_737_418_240), -- 10Gb
    "type" file_extension NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "files_pkey" PRIMARY KEY (uuid)
);

