SET TIMEZONE = 'UTC';

CREATE TABLE courses (
    "uuid" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "name" VARCHAR(50),
    "description" VARCHAR(4096),
    "is_private" BOOLEAN NOT NULL DEFAULT FALSE,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "owner_uuid" UUID NOT NULL,
    CONSTRAINT "cources_pkey" PRIMARY KEY (uuid)
);

CREATE TABLE "course_tags"(
    "uuid" UUID NOT NULL DEFAULT (uuid_generate_v4()),
    "name" VARCHAR NOT NULL,
    CONSTRAINT "way_tags_pkey" PRIMARY KEY("uuid")
);
CREATE UNIQUE INDEX "course_tags_name_key" ON "way_tags"("name");

CREATE TABLE courses_tags (
    "course_uuid" UUID NOT NULL REFERENCES courses("uuid") ON UPDATE CASCADE ON DELETE CASCADE,
    "tag_uuid" UUID NOT NULL REFERENCES course_tags("uuid") ON UPDATE CASCADE ON DELETE CASCADE,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "courses_pkey" PRIMARY KEY (uuid)
);

CREATE TABLE favorite_users_cources (
    "course_uuid" UUID NOT NULL REFERENCES courses("uuid") ON UPDATE CASCADE ON DELETE CASCADE,
    "user_uuid" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "cources_pkey" PRIMARY KEY (uuid)
);

CREATE TABLE "courses_mentors" (
    "course_uuid" UUID NOT NULL REFERENCES courses("uuid") ON UPDATE CASCADE ON DELETE CASCADE,
    "mentor_uuid" UUID NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "courses_mentors_pkey" PRIMARY KEY ("course_uuid", "mentor_uuid")
);

CREATE TABLE "courses_students" (
    "course_uuid" UUID NOT NULL REFERENCES courses("uuid") ON UPDATE CASCADE ON DELETE CASCADE,
    "student_uuid" UUID NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "courses_students_pkey" PRIMARY KEY ("course_uuid", "student_uuid")
);

CREATE TABLE topics (
    "uuid" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "name" VARCHAR (512),
    "course_uuid" UUID NOT NULL REFERENCES courses("uuid") ON UPDATE CASCADE ON DELETE CASCADE,
    "topic_order" INTEGER NOT NULL CHECK (topic_order BETWEEN 0 AND 52560000) DEFAULT 0,
    "parent" UUID NOT NULL REFERENCES topics("uuid") ON UPDATE CASCADE ON DELETE CASCADE,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "topic_pkey" PRIMARY KEY ("uuid")
);

CREATE TABLE theory_materials (
    "uuid" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "topic_uuid" UUID NOT NULL REFERENCES topics("uuid") ON UPDATE CASCADE ON DELETE CASCADE,
    "name" VARCHAR(50),
    "description" VARCHAR(10000),
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "theory_materials_pkey" PRIMARY KEY (uuid)
);

-- probably I will add 'variants' to render 'test' question different way later
CREATE TYPE practice_type AS ENUM ('input_word');

CREATE TABLE practice_materials (
    "uuid" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "topic_uuid" UUID NOT NULL REFERENCES topics("uuid") ON UPDATE CASCADE ON DELETE CASCADE,
    "name" VARCHAR(50),
    "practice_material_order" INTEGER NOT NULL CHECK (practice_material_order BETWEEN 0 AND 10000) DEFAULT 0,
    "task_description" VARCHAR(10000),
    "answer" VARCHAR(10000),
    "practice_type" practice_type NOT NULL,
    "time_to_answer" INTEGER NOT NULL CHECK (time_to_answer BETWEEN 0 AND 100000) DEFAULT 0,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "practice_materials_pkey" PRIMARY KEY (uuid)
);