SET TIMEZONE = 'UTC';

CREATE TYPE storage_type AS ENUM ('google_drive');

CREATE TABLE files (
    "uuid" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "name" VARCHAR(255) NOT NULL,
    "src_url" VARCHAR(500) NOT NULL,
    "preview_url" VARCHAR(500),
    "storage_type" storage_type NOT NULL,
    "google_drive_id" VARCHAR(500), -- technical field used for optimization
    "owner_uuid" UUID NOT NULL,
    "size" BIGINT NOT NULL CHECK (size BETWEEN 0 AND 10_737_418_240), -- 10Gb
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "files_pkey" PRIMARY KEY (uuid)
);
