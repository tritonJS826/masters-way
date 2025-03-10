SET TIMEZONE = 'UTC';

CREATE TABLE trainings (
    "uuid" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "name" VARCHAR(50) NOT NULL,
    "description" VARCHAR(4096) NOT NULL,
    "is_private" BOOLEAN NOT NULL DEFAULT FALSE,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "owner_uuid" UUID NOT NULL,
    CONSTRAINT "trainings_pkey" PRIMARY KEY (uuid)
);

CREATE TABLE "training_tags"(
    "uuid" UUID NOT NULL DEFAULT (uuid_generate_v4()),
    "name" VARCHAR NOT NULL,
    CONSTRAINT "training_tags_pkey" PRIMARY KEY("uuid")
);
CREATE UNIQUE INDEX "training_tags_name_key" ON "training_tags"("name");

CREATE TABLE trainings_training_tags (
    "training_uuid" UUID NOT NULL REFERENCES trainings("uuid") ON UPDATE CASCADE ON DELETE CASCADE,
    "tag_uuid" UUID NOT NULL REFERENCES training_tags("uuid") ON UPDATE CASCADE ON DELETE CASCADE,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "trainings_training_tags_pkey" PRIMARY KEY (training_uuid, tag_uuid)
);

CREATE TABLE favorite_users_trainings (
    "training_uuid" UUID NOT NULL REFERENCES trainings("uuid") ON UPDATE CASCADE ON DELETE CASCADE,
    "user_uuid" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "favorite_users_trainings_pkey" PRIMARY KEY (training_uuid, user_uuid)
);

CREATE TABLE "trainings_mentors" (
    "training_uuid" UUID NOT NULL REFERENCES trainings("uuid") ON UPDATE CASCADE ON DELETE CASCADE,
    "mentor_uuid" UUID NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "trainings_mentors_pkey" PRIMARY KEY ("training_uuid", "mentor_uuid")
);

CREATE TABLE "trainings_students" (
    "training_uuid" UUID NOT NULL REFERENCES trainings("uuid") ON UPDATE CASCADE ON DELETE CASCADE,
    "student_uuid" UUID NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "trainings_students_pkey" PRIMARY KEY ("training_uuid", "student_uuid")
);

CREATE TABLE topics (
    "uuid" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "name" VARCHAR (300),
    "training_uuid" UUID NOT NULL REFERENCES trainings("uuid") ON UPDATE CASCADE ON DELETE CASCADE,
    "topic_order" INTEGER NOT NULL CHECK (topic_order BETWEEN 0 AND 52560000) DEFAULT 0,
    "parent" UUID REFERENCES topics("uuid") ON UPDATE CASCADE ON DELETE CASCADE,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "topic_pkey" PRIMARY KEY ("uuid")
);

CREATE TABLE theory_materials (
    "uuid" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "topic_uuid" UUID NOT NULL REFERENCES topics("uuid") ON UPDATE CASCADE ON DELETE CASCADE,
    "name" VARCHAR(128),
    "theory_material_order" INTEGER NOT NULL CHECK (theory_material_order BETWEEN 0 AND 10000) DEFAULT 0,
    "description" VARCHAR(10000),
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "theory_materials_pkey" PRIMARY KEY (uuid)
);

-- probably I will add 'variants' to render 'test' question different way later
CREATE TYPE practice_type AS ENUM ('input_word');

CREATE TABLE practice_materials (
    "uuid" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "topic_uuid" UUID NOT NULL REFERENCES topics("uuid") ON UPDATE CASCADE ON DELETE CASCADE,
    "name" VARCHAR(128),
    "practice_material_order" INTEGER NOT NULL CHECK (practice_material_order BETWEEN 0 AND 10000) DEFAULT 0,
    "task_description" VARCHAR(10000),
    "answer" VARCHAR(10000),
    "practice_type" practice_type NOT NULL,
    "time_to_answer" INTEGER NOT NULL CHECK (time_to_answer BETWEEN 0 AND 100000) DEFAULT 0,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "practice_materials_pkey" PRIMARY KEY (uuid)
);


CREATE TYPE generated_item_type AS ENUM ('theory_material', 'practice_material, topic');
CREATE TABLE messages_to_generate_with_ai (
    "uuid" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "message" VARCHAR NOT NULL,
    "dataToUseAfterGeneration" JSONB NOT NULL,
    "item_type" generated_item_type NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "messages_to_generate_with_ai_pkey" PRIMARY KEY (uuid)
);