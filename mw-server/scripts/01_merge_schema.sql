-- ============================================================================
-- MERGE SCHEMA: добавляет все таблицы из бывших микросервисов в mastersway_db
-- Запускать на базе mastersway_db (mw-server)
-- ============================================================================

BEGIN;

-- === MW-MAIL ===
CREATE TABLE IF NOT EXISTS mail_logs (
    "uuid" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "sender_mail" VARCHAR(128) NOT NULL,
    "sender_name" VARCHAR(50),
    "recipients" VARCHAR(500)[] NOT NULL,
    "cc" VARCHAR(500)[],
    "bcc" VARCHAR(500)[],
    "reply_to" VARCHAR(500)[],
    "subject" VARCHAR(150) NOT NULL,
    "message" VARCHAR(1000) NOT NULL,
    "log" VARCHAR(150),
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- === MW-NOTIFICATION ===
DO $$ BEGIN
    CREATE TYPE notification_nature AS ENUM (
        'private_chat', 'group_chat', 'own_way',
        'mentoring_way', 'mentoring_request', 'favorite_way'
    );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
    CREATE TYPE notification_channel AS ENUM ('mail', 'webapp', 'telegram');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

CREATE TABLE IF NOT EXISTS notifications (
    "uuid" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "user_uuid" UUID NOT NULL,
    "is_read" BOOLEAN NOT NULL DEFAULT FALSE,
    "description" VARCHAR(500),
    "url" VARCHAR(500),
    "nature" notification_nature NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "notifications_pkey" PRIMARY KEY (uuid)
);

CREATE UNIQUE INDEX IF NOT EXISTS "notifications_user_uuid_created_at_key" ON "notifications"("user_uuid", "created_at");

CREATE TABLE IF NOT EXISTS notification_settings (
    "uuid" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "user_uuid" UUID NOT NULL,
    "nature" notification_nature NOT NULL,
    "channel" notification_channel NOT NULL,
    "is_enabled" BOOLEAN NOT NULL,
    CONSTRAINT "notification_settings_pkey" PRIMARY KEY (uuid),
    CONSTRAINT "unique_user_notification" UNIQUE (user_uuid, nature, channel)
);

CREATE OR REPLACE FUNCTION remove_old_notifications()
RETURNS TRIGGER AS $$
BEGIN
    DELETE FROM notifications
    WHERE uuid IN (
        SELECT uuid FROM notifications
        WHERE user_uuid = NEW.user_uuid
        ORDER BY created_at DESC
        OFFSET 1000
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS remove_old_notifications_trigger ON notifications;
CREATE TRIGGER remove_old_notifications_trigger
BEFORE INSERT ON notifications
FOR EACH ROW
EXECUTE FUNCTION remove_old_notifications();

-- === MW-STORAGE ===
DO $$ BEGIN
    CREATE TYPE storage_type AS ENUM ('google_drive');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

CREATE TABLE IF NOT EXISTS files (
    "uuid" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "name" VARCHAR(255) NOT NULL,
    "src_url" VARCHAR(500) NOT NULL,
    "preview_url" VARCHAR(500),
    "storage_type" storage_type NOT NULL,
    "google_drive_id" VARCHAR(500),
    "owner_uuid" UUID NOT NULL,
    "size" BIGINT NOT NULL CHECK (size BETWEEN 0 AND 10_737_418_240),
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "files_pkey" PRIMARY KEY (uuid)
);

-- === MW-SURVEY ===
CREATE TABLE IF NOT EXISTS user_intro (
    "uuid" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "user_uuid" UUID NOT NULL,
    "device_uuid" UUID NOT NULL,
    "role" VARCHAR(255) NOT NULL,
    "preferred_interface_language" VARCHAR(255) NOT NULL,
    "student_goals" VARCHAR(255) NOT NULL,
    "student_experience" VARCHAR(255) NOT NULL,
    "why_registered" VARCHAR(255) NOT NULL,
    "source" VARCHAR(255) NOT NULL,
    "promo_code" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "user_intro_pkey" PRIMARY KEY (uuid)
);

CREATE TABLE IF NOT EXISTS looking_for_mentor (
    "uuid" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "user_uuid" UUID NOT NULL,
    "user_email" VARCHAR(128) NOT NULL,
    "skills_to_learn" VARCHAR(255) NOT NULL,
    "current_experience" VARCHAR(255) NOT NULL,
    "mentor_description" VARCHAR(255) NOT NULL,
    "handled_date" TIMESTAMP,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "looking_for_mentor_pkey" PRIMARY KEY (uuid)
);

-- === MW-TRAINING ===
CREATE TABLE IF NOT EXISTS trainings (
    "uuid" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "name" VARCHAR(50) NOT NULL,
    "description" VARCHAR(4096) NOT NULL,
    "is_private" BOOLEAN NOT NULL DEFAULT FALSE,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "owner_uuid" UUID NOT NULL,
    CONSTRAINT "trainings_pkey" PRIMARY KEY (uuid)
);

CREATE TABLE IF NOT EXISTS training_tags (
    "uuid" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "name" VARCHAR NOT NULL,
    CONSTRAINT "training_tags_pkey" PRIMARY KEY("uuid")
);
CREATE UNIQUE INDEX IF NOT EXISTS "training_tags_name_key" ON "training_tags"("name");

CREATE TABLE IF NOT EXISTS trainings_training_tags (
    "training_uuid" UUID NOT NULL REFERENCES trainings("uuid") ON UPDATE CASCADE ON DELETE CASCADE,
    "tag_uuid" UUID NOT NULL REFERENCES training_tags("uuid") ON UPDATE CASCADE ON DELETE CASCADE,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "trainings_training_tags_pkey" PRIMARY KEY (training_uuid, tag_uuid)
);

CREATE TABLE IF NOT EXISTS favorite_users_trainings (
    "training_uuid" UUID NOT NULL REFERENCES trainings("uuid") ON UPDATE CASCADE ON DELETE CASCADE,
    "user_uuid" UUID NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "favorite_users_trainings_pkey" PRIMARY KEY (training_uuid, user_uuid)
);

CREATE TABLE IF NOT EXISTS trainings_mentors (
    "training_uuid" UUID NOT NULL REFERENCES trainings("uuid") ON UPDATE CASCADE ON DELETE CASCADE,
    "mentor_uuid" UUID NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "trainings_mentors_pkey" PRIMARY KEY ("training_uuid", "mentor_uuid")
);

CREATE TABLE IF NOT EXISTS trainings_students (
    "training_uuid" UUID NOT NULL REFERENCES trainings("uuid") ON UPDATE CASCADE ON DELETE CASCADE,
    "student_uuid" UUID NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "trainings_students_pkey" PRIMARY KEY ("training_uuid", "student_uuid")
);

CREATE TABLE IF NOT EXISTS topics (
    "uuid" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "name" VARCHAR(300),
    "training_uuid" UUID NOT NULL REFERENCES trainings("uuid") ON UPDATE CASCADE ON DELETE CASCADE,
    "topic_order" INTEGER NOT NULL CHECK (topic_order BETWEEN 0 AND 52560000) DEFAULT 0,
    "parent" UUID REFERENCES topics("uuid") ON UPDATE CASCADE ON DELETE CASCADE,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "topic_pkey" PRIMARY KEY ("uuid")
);

CREATE TABLE IF NOT EXISTS theory_materials (
    "uuid" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "topic_uuid" UUID NOT NULL REFERENCES topics("uuid") ON UPDATE CASCADE ON DELETE CASCADE,
    "name" VARCHAR(128),
    "theory_material_order" INTEGER NOT NULL CHECK (theory_material_order BETWEEN 0 AND 10000) DEFAULT 0,
    "description" VARCHAR(10000),
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "theory_materials_pkey" PRIMARY KEY (uuid)
);

DO $$ BEGIN
    CREATE TYPE practice_type AS ENUM ('input_word');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

CREATE TABLE IF NOT EXISTS practice_materials (
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

DO $$ BEGIN
    CREATE TYPE generated_item_type AS ENUM ('theory_material', 'practice_material, topic');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

CREATE TABLE IF NOT EXISTS messages_to_generate_with_ai (
    "uuid" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "message" VARCHAR NOT NULL,
    "dataToUseAfterGeneration" JSONB NOT NULL,
    "item_type" generated_item_type NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "messages_to_generate_with_ai_pkey" PRIMARY KEY (uuid)
);

CREATE TABLE IF NOT EXISTS tests (
    "uuid" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "name" VARCHAR(50) NOT NULL,
    "description" VARCHAR(4096) NOT NULL,
    "is_private" BOOLEAN NOT NULL DEFAULT FALSE,
    "owner_uuid" UUID NOT NULL,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "tests_pkey" PRIMARY KEY (uuid)
);

CREATE TABLE IF NOT EXISTS trainings_tests (
    "training_uuid" UUID NOT NULL REFERENCES trainings("uuid") ON UPDATE CASCADE ON DELETE CASCADE,
    "test_uuid" UUID NOT NULL REFERENCES tests("uuid") ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT trainings_tests_pkey PRIMARY KEY("training_uuid", "test_uuid")
);

CREATE TABLE IF NOT EXISTS test_sessions (
    "uuid" UUID NOT NULL DEFAULT uuid_generate_v4(),
    CONSTRAINT "test_sessions_pkey" PRIMARY KEY (uuid)
);

CREATE TABLE IF NOT EXISTS questions (
    "uuid" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "name" VARCHAR(128),
    "practice_type" practice_type NOT NULL,
    "test_uuid" UUID NOT NULL REFERENCES tests("uuid") ON UPDATE CASCADE ON DELETE CASCADE,
    "question_text" VARCHAR(4096) NOT NULL,
    "question_order" INTEGER NOT NULL CHECK (question_order BETWEEN 0 AND 10000) DEFAULT 0,
    "time_to_answer" INTEGER NOT NULL CHECK (time_to_answer BETWEEN 0 AND 100000) DEFAULT 0,
    "answer" VARCHAR(10000) NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT TRUE,
    "is_private" BOOLEAN NOT NULL DEFAULT FALSE,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "questions_pkey" PRIMARY KEY (uuid)
);

CREATE TABLE IF NOT EXISTS tests_questions (
    "test_uuid" UUID NOT NULL REFERENCES tests("uuid") ON UPDATE CASCADE ON DELETE CASCADE,
    "question_uuid" UUID NOT NULL REFERENCES questions("uuid") ON UPDATE CASCADE ON DELETE CASCADE,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "tests_questions_pkey" PRIMARY KEY (test_uuid, question_uuid)
);

CREATE TABLE IF NOT EXISTS question_results (
    "uuid" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "question_uuid" UUID NOT NULL REFERENCES questions("uuid") ON UPDATE CASCADE ON DELETE CASCADE,
    "user_uuid" UUID NOT NULL,
    "test_uuid" UUID NOT NULL REFERENCES tests("uuid") ON UPDATE CASCADE ON DELETE CASCADE,
    "test_session_uuid" UUID NOT NULL REFERENCES test_sessions("uuid") ON UPDATE CASCADE ON DELETE CASCADE,
    "is_ok" BOOLEAN NOT NULL DEFAULT FALSE,
    "user_answer" VARCHAR(4096) NOT NULL DEFAULT '',
    "result_description" VARCHAR(4096) NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "question_results_pkey" PRIMARY KEY (uuid)
);

CREATE TABLE IF NOT EXISTS test_session_results (
    "uuid" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "test_uuid" UUID NOT NULL REFERENCES tests("uuid") ON UPDATE CASCADE ON DELETE CASCADE,
    "session_uuid" UUID NOT NULL REFERENCES test_sessions("uuid") ON UPDATE CASCADE ON DELETE CASCADE,
    "user_uuid" UUID NOT NULL,
    "result_description" VARCHAR(4096) NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "tests_results_pkey" PRIMARY KEY (uuid)
);

-- === MW-CHAT ===
DO $$ BEGIN
    CREATE TYPE room_type AS ENUM ('private', 'group');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

CREATE TABLE IF NOT EXISTS rooms (
    "uuid" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "name" VARCHAR(50),
    "type" room_type NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "rooms_pkey" PRIMARY KEY (uuid)
);

DO $$ BEGIN
    CREATE TYPE user_role_type AS ENUM ('admin', 'regular');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

CREATE TABLE IF NOT EXISTS users_rooms (
    "user_uuid" UUID NOT NULL,
    "room_uuid" UUID NOT NULL REFERENCES rooms("uuid") ON UPDATE CASCADE ON DELETE CASCADE,
    "user_role" user_role_type NOT NULL,
    "is_room_blocked" BOOLEAN NOT NULL DEFAULT FALSE,
    "joined_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "users_rooms_pkey" PRIMARY KEY ("user_uuid", "room_uuid")
);

CREATE TABLE IF NOT EXISTS messages (
    "uuid" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "owner_uuid" UUID NOT NULL,
    "room_uuid" UUID NOT NULL REFERENCES rooms("uuid") ON UPDATE CASCADE ON DELETE CASCADE,
    "text" VARCHAR(4096) NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "messages_pkey" PRIMARY KEY ("uuid")
);

CREATE TABLE IF NOT EXISTS message_status (
    "message_uuid" UUID NOT NULL REFERENCES messages("uuid") ON UPDATE CASCADE ON DELETE CASCADE,
    "receiver_uuid" UUID NOT NULL,
    "is_read" bool NOT NULL DEFAULT FALSE,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "message_status_pkey" PRIMARY KEY ("message_uuid", "receiver_uuid")
);

CREATE OR REPLACE FUNCTION remove_old_messages()
RETURNS TRIGGER AS $$
BEGIN
    DELETE FROM messages
    WHERE uuid IN (
        SELECT uuid FROM messages
        WHERE room_uuid = NEW.room_uuid
        ORDER BY created_at DESC
        OFFSET 1000
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS remove_old_messages_trigger ON messages;
CREATE TRIGGER remove_old_messages_trigger
BEFORE INSERT ON messages
FOR EACH ROW
EXECUTE FUNCTION remove_old_messages();

COMMIT;