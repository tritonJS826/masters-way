CREATE TABLE users(
    "uuid" UUID NOT NULL DEFAULT (uuid_generate_v4()),
    "name" VARCHAR NOT NULL,
    "email" VARCHAR NOT NULL,
    "description" VARCHAR NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, 
    "image_url" VARCHAR,
    "is_mentor" BOOLEAN NOT NULL,
    "firebase_id" VARCHAR NOT NULL,
    CONSTRAINT "users_pkey" PRIMARY KEY("uuid")
);
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

CREATE TABLE favorite_users(
    "donor_user_uuid" UUID NOT NULL REFERENCES users("uuid") ON UPDATE CASCADE ON DELETE CASCADE,
    "acceptor_user_uuid" UUID NOT NULL REFERENCES users("uuid") ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT favorite_users_pkey PRIMARY KEY (donor_user_uuid, acceptor_user_uuid)
);

CREATE TABLE ways(
    "uuid" UUID NOT NULL DEFAULT (uuid_generate_v4()),
    "name" VARCHAR NOT NULL,
    "goal_description" VARCHAR NOT NULL,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "estimation_time" INTEGER NOT NULL,
    "owner_uuid" UUID NOT NULL REFERENCES users("uuid") ON UPDATE CASCADE ON DELETE CASCADE,
    "copied_from_way_uuid" UUID REFERENCES ways("uuid") ON UPDATE CASCADE,
    "is_completed" BOOLEAN NOT NULL,
    "is_private" BOOLEAN NOT NULL,
    CONSTRAINT "ways_pkey" PRIMARY KEY("uuid")
);
CREATE UNIQUE INDEX "way_uuid_key" ON "ways"("uuid");

CREATE TABLE composite_ways(
    "child_uuid" UUID NOT NULL REFERENCES ways("uuid") ON UPDATE CASCADE ON DELETE CASCADE,
    "parent_uuid" UUID NOT NULL REFERENCES ways("uuid") ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT child_uuid_parent_uuid_pkey PRIMARY KEY (child_uuid, parent_uuid) 
);

CREATE TABLE former_mentors_ways(
    "former_mentor_uuid" UUID NOT NULL REFERENCES users("uuid") ON UPDATE CASCADE ON DELETE CASCADE,
    "way_uuid" UUID NOT NULL REFERENCES ways("uuid") ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT former_mentors_ways_pkey PRIMARY KEY (former_mentor_uuid, way_uuid)
);

CREATE TABLE mentor_users_ways(
    "user_uuid" UUID NOT NULL REFERENCES users("uuid") ON UPDATE CASCADE ON DELETE CASCADE,
    "way_uuid" UUID NOT NULL REFERENCES ways("uuid") ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT mentor_users_ways_pkey PRIMARY KEY (user_uuid, way_uuid)
);

CREATE TABLE favorite_users_ways(
    "user_uuid" UUID NOT NULL REFERENCES users("uuid") ON UPDATE CASCADE ON DELETE CASCADE,
    "way_uuid" UUID NOT NULL REFERENCES ways("uuid") ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT "favorite_users_ways_pkey" PRIMARY KEY (user_uuid, way_uuid)
);

CREATE TABLE to_user_mentoring_requests(
    "user_uuid" UUID NOT NULL REFERENCES users("uuid") ON UPDATE CASCADE ON DELETE CASCADE,
    "way_uuid" UUID NOT NULL REFERENCES ways("uuid") ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT to_user_mentoring_requests_pkey PRIMARY KEY (user_uuid, way_uuid)
);

CREATE TABLE from_user_mentoring_requests(
    "user_uuid" UUID NOT NULL REFERENCES users("uuid") ON UPDATE CASCADE ON DELETE CASCADE,
    "way_uuid" UUID NOT NULL REFERENCES ways("uuid") ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT from_user_mentoring_requests_pkey PRIMARY KEY (user_uuid, way_uuid)
);


CREATE TABLE "day_reports"(
    "uuid" UUID NOT NULL DEFAULT (uuid_generate_v4()),
    "way_uuid" UUID NOT NULL REFERENCES ways("uuid") ON UPDATE CASCADE ON DELETE CASCADE,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_day_off" BOOLEAN NOT NULL,
    CONSTRAINT "day_reports_pkey" PRIMARY KEY("uuid")
);

CREATE TABLE "metrics"(
    "uuid" UUID NOT NULL DEFAULT (uuid_generate_v4()),
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" VARCHAR NOT NULL,
    "is_done" BOOLEAN NOT NULL,
    "done_date" TIMESTAMP,
    "metric_estimation" INTEGER NOT NULL,
    "way_uuid" UUID NOT NULL REFERENCES ways("uuid") ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT "metrics_pkey" PRIMARY KEY("uuid")
);

CREATE TABLE "job_tags"(
    "uuid" UUID NOT NULL DEFAULT (uuid_generate_v4()),
    "name" VARCHAR NOT NULL,
    "description" VARCHAR NOT NULL,
    "color" VARCHAR NOT NULL,
    "way_uuid" UUID NOT NULL REFERENCES ways("uuid") ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT "job_tags_pkey" PRIMARY KEY("uuid")
);

CREATE TABLE "plans"(
    "uuid" UUID NOT NULL DEFAULT (uuid_generate_v4()),
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" VARCHAR NOT NULL,
    "time" INTEGER NOT NULL,
    "owner_uuid" UUID NOT NULL REFERENCES users("uuid") ON UPDATE CASCADE ON DELETE CASCADE,
    "is_done" BOOLEAN NOT NULL,
    "day_report_uuid" UUID NOT NULL REFERENCES day_reports("uuid") ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT "plans_pkey" PRIMARY KEY("uuid")
);

CREATE TABLE "plans_job_tags"(
    "plan_uuid" UUID NOT NULL REFERENCES plans("uuid") ON UPDATE CASCADE ON DELETE CASCADE,
    "job_tag_uuid" UUID NOT NULL REFERENCES job_tags("uuid") ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT "plans_job_tags_pkey" PRIMARY KEY (plan_uuid, job_tag_uuid)
);

CREATE TABLE "job_dones"(
    "uuid" UUID NOT NULL DEFAULT (uuid_generate_v4()),
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" VARCHAR NOT NULL,
    "time" INTEGER NOT NULL,
    "owner_uuid" UUID NOT NULL REFERENCES users("uuid") ON UPDATE CASCADE ON DELETE CASCADE,
    "day_report_uuid" UUID NOT NULL REFERENCES day_reports("uuid") ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT "job_dones_pkey" PRIMARY KEY("uuid")
);

CREATE TABLE "job_dones_job_tags"(
    "job_done_uuid" UUID NOT NULL REFERENCES job_dones("uuid") ON UPDATE CASCADE ON DELETE CASCADE,
    "job_tag_uuid" UUID NOT NULL REFERENCES job_tags("uuid") ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT "job_dones_job_tags_pkey" PRIMARY KEY (job_done_uuid, job_tag_uuid)
);

CREATE TABLE "problems"(
    "uuid" UUID NOT NULL DEFAULT (uuid_generate_v4()),
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" VARCHAR NOT NULL,
    "is_done" BOOLEAN NOT NULL,
    "owner_uuid" UUID NOT NULL REFERENCES users("uuid") ON UPDATE CASCADE ON DELETE CASCADE,
    "day_report_uuid" UUID NOT NULL REFERENCES day_reports("uuid") ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT "problems_pkey" PRIMARY KEY("uuid")
);

CREATE TABLE "problems_job_tags"(
    "problem_uuid" UUID NOT NULL REFERENCES problems("uuid") ON UPDATE CASCADE ON DELETE CASCADE,
    "job_tag_uuid" UUID NOT NULL REFERENCES job_tags("uuid") ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT "problems_job_tags_pkey" PRIMARY KEY (problem_uuid, job_tag_uuid)
);

CREATE TABLE "comments"(
    "uuid" UUID NOT NULL DEFAULT (uuid_generate_v4()),
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" VARCHAR NOT NULL,
    "owner_uuid" UUID NOT NULL REFERENCES users("uuid") ON UPDATE CASCADE ON DELETE CASCADE,
    "day_report_uuid" UUID NOT NULL REFERENCES day_reports("uuid") ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT "comments_pkey" PRIMARY KEY("uuid")
);

CREATE TABLE "way_collections"(
    "uuid" UUID NOT NULL DEFAULT (uuid_generate_v4()),
    "owner_uuid" UUID NOT NULL REFERENCES users("uuid") ON UPDATE CASCADE ON DELETE CASCADE,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" VARCHAR(50) NOT NULL,
    "type" VARCHAR(20) NOT NULL,
    CONSTRAINT "way_collections_pkey" PRIMARY KEY("uuid")
);

CREATE TABLE "way_collections_ways"(
    "way_collection_uuid" UUID NOT NULL REFERENCES way_collections("uuid") ON UPDATE CASCADE ON DELETE CASCADE,
    "way_uuid" UUID NOT NULL REFERENCES ways("uuid") ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT "way_collections_ways_pkey" PRIMARY KEY (way_collection_uuid, way_uuid)
);

CREATE TABLE "way_tags"(
    "uuid" UUID NOT NULL DEFAULT (uuid_generate_v4()),
    "name" VARCHAR NOT NULL,
    CONSTRAINT "way_tags_pkey" PRIMARY KEY("uuid")
);
CREATE UNIQUE INDEX "way_tag_name_key" ON "way_tags"("name");

CREATE TABLE "ways_way_tags"(
    "way_uuid" UUID NOT NULL REFERENCES ways("uuid") ON UPDATE CASCADE ON DELETE CASCADE,
    "way_tag_uuid" UUID NOT NULL REFERENCES way_tags("uuid") ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT "way_uuid_way_tag_uuid_pkey" PRIMARY KEY (way_uuid, way_tag_uuid)
);

CREATE TABLE "user_tags"(
    "uuid" UUID NOT NULL DEFAULT (uuid_generate_v4()),
    "name" VARCHAR NOT NULL,
    CONSTRAINT "user_tags_pkey" PRIMARY KEY("uuid")
);
CREATE UNIQUE INDEX "user_tag_name_key" ON "user_tags"("name");

CREATE TABLE "users_user_tags"(
    "user_uuid" UUID NOT NULL REFERENCES users("uuid") ON UPDATE CASCADE ON DELETE CASCADE,
    "user_tag_uuid" UUID NOT NULL REFERENCES user_tags("uuid") ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT "user_uuid_user_tag_uuid_pkey" PRIMARY KEY (user_uuid, user_tag_uuid) 
);