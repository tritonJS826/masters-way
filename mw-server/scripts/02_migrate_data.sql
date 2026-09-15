-- ============================================================================
-- MIGRATE DATA: переносит данные из старых БД в mastersway_db
-- Требует установленного расширения postgres_fdw
-- Старые контейнеры должны быть запущены (названия из docker-compose)
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS postgres_fdw;

-- ==================== MW-MAIL (postgres-mail:5432) ====================
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_foreign_server WHERE srvname = 'fdw_mail') THEN
        CREATE SERVER fdw_mail FOREIGN DATA WRAPPER postgres_fdw
        OPTIONS (host 'postgres-mail', port '5432', dbname 'mastersway_mail_db');
        CREATE USER MAPPING FOR CURRENT_USER SERVER fdw_mail
        OPTIONS (user 'root', password 'secret');
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.foreign_tables WHERE foreign_table_name = 'mail_logs_old') THEN
        IMPORT FOREIGN SCHEMA public LIMIT TO (mail_logs) FROM SERVER fdw_mail INTO public;
        ALTER FOREIGN TABLE mail_logs RENAME TO mail_logs_old;
    END IF;
END $$;

INSERT INTO mail_logs SELECT * FROM mail_logs_old ON CONFLICT DO NOTHING;

-- ==================== MW-NOTIFICATION (postgres-notification:5432) ====================
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_foreign_server WHERE srvname = 'fdw_notification') THEN
        CREATE SERVER fdw_notification FOREIGN DATA WRAPPER postgres_fdw
        OPTIONS (host 'postgres-notification', port '5432', dbname 'mastersway_notification_db');
        CREATE USER MAPPING FOR CURRENT_USER SERVER fdw_notification
        OPTIONS (user 'root', password 'secret');
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.foreign_tables WHERE foreign_table_name = 'notifications_old') THEN
        IMPORT FOREIGN SCHEMA public LIMIT TO (notifications, notification_settings) FROM SERVER fdw_notification INTO public;
        ALTER FOREIGN TABLE notifications RENAME TO notifications_old;
        ALTER FOREIGN TABLE notification_settings RENAME TO notification_settings_old;
    END IF;
END $$;

INSERT INTO notifications SELECT * FROM notifications_old ON CONFLICT DO NOTHING;
INSERT INTO notification_settings SELECT * FROM notification_settings_old ON CONFLICT DO NOTHING;

-- ==================== MW-STORAGE (postgres-storage:5432) ====================
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_foreign_server WHERE srvname = 'fdw_storage') THEN
        CREATE SERVER fdw_storage FOREIGN DATA WRAPPER postgres_fdw
        OPTIONS (host 'postgres-storage', port '5432', dbname 'mastersway_storage_db');
        CREATE USER MAPPING FOR CURRENT_USER SERVER fdw_storage
        OPTIONS (user 'root', password 'secret');
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.foreign_tables WHERE foreign_table_name = 'files_old') THEN
        IMPORT FOREIGN SCHEMA public LIMIT TO (files) FROM SERVER fdw_storage INTO public;
        ALTER FOREIGN TABLE files RENAME TO files_old;
    END IF;
END $$;

INSERT INTO files SELECT * FROM files_old ON CONFLICT DO NOTHING;

-- ==================== MW-SURVEY (postgres-survey:5432) ====================
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_foreign_server WHERE srvname = 'fdw_survey') THEN
        CREATE SERVER fdw_survey FOREIGN DATA WRAPPER postgres_fdw
        OPTIONS (host 'postgres-survey', port '5432', dbname 'mastersway_survey_db');
        CREATE USER MAPPING FOR CURRENT_USER SERVER fdw_survey
        OPTIONS (user 'root', password 'secret');
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.foreign_tables WHERE foreign_table_name = 'user_intro_old') THEN
        IMPORT FOREIGN SCHEMA public LIMIT TO (user_intro, looking_for_mentor) FROM SERVER fdw_survey INTO public;
        ALTER FOREIGN TABLE user_intro RENAME TO user_intro_old;
        ALTER FOREIGN TABLE looking_for_mentor RENAME TO looking_for_mentor_old;
    END IF;
END $$;

INSERT INTO user_intro SELECT * FROM user_intro_old ON CONFLICT DO NOTHING;
INSERT INTO looking_for_mentor SELECT * FROM looking_for_mentor_old ON CONFLICT DO NOTHING;

-- ==================== MW-TRAINING (postgres-training:5432) ====================
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_foreign_server WHERE srvname = 'fdw_training') THEN
        CREATE SERVER fdw_training FOREIGN DATA WRAPPER postgres_fdw
        OPTIONS (host 'postgres-training', port '5432', dbname 'mastersway_training_db');
        CREATE USER MAPPING FOR CURRENT_USER SERVER fdw_training
        OPTIONS (user 'root', password 'secret');
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.foreign_tables WHERE foreign_table_name = 'trainings_old') THEN
        IMPORT FOREIGN SCHEMA public LIMIT TO (
            trainings, training_tags, trainings_training_tags,
            favorite_users_trainings, trainings_mentors, trainings_students,
            topics, theory_materials, practice_materials,
            messages_to_generate_with_ai, tests, trainings_tests,
            test_sessions, questions, tests_questions,
            question_results, test_session_results
        ) FROM SERVER fdw_training INTO public;

        ALTER FOREIGN TABLE trainings RENAME TO trainings_old;
        ALTER FOREIGN TABLE training_tags RENAME TO training_tags_old;
        ALTER FOREIGN TABLE trainings_training_tags RENAME TO trainings_training_tags_old;
        ALTER FOREIGN TABLE favorite_users_trainings RENAME TO favorite_users_trainings_old;
        ALTER FOREIGN TABLE trainings_mentors RENAME TO trainings_mentors_old;
        ALTER FOREIGN TABLE trainings_students RENAME TO trainings_students_old;
        ALTER FOREIGN TABLE topics RENAME TO topics_old;
        ALTER FOREIGN TABLE theory_materials RENAME TO theory_materials_old;
        ALTER FOREIGN TABLE practice_materials RENAME TO practice_materials_old;
        ALTER FOREIGN TABLE messages_to_generate_with_ai RENAME TO messages_to_generate_with_ai_old;
        ALTER FOREIGN TABLE tests RENAME TO tests_old;
        ALTER FOREIGN TABLE trainings_tests RENAME TO trainings_tests_old;
        ALTER FOREIGN TABLE test_sessions RENAME TO test_sessions_old;
        ALTER FOREIGN TABLE questions RENAME TO questions_old;
        ALTER FOREIGN TABLE tests_questions RENAME TO tests_questions_old;
        ALTER FOREIGN TABLE question_results RENAME TO question_results_old;
        ALTER FOREIGN TABLE test_session_results RENAME TO test_session_results_old;
    END IF;
END $$;

INSERT INTO trainings SELECT * FROM trainings_old ON CONFLICT DO NOTHING;
INSERT INTO training_tags SELECT * FROM training_tags_old ON CONFLICT DO NOTHING;
INSERT INTO trainings_training_tags SELECT * FROM trainings_training_tags_old ON CONFLICT DO NOTHING;
INSERT INTO favorite_users_trainings SELECT * FROM favorite_users_trainings_old ON CONFLICT DO NOTHING;
INSERT INTO trainings_mentors SELECT * FROM trainings_mentors_old ON CONFLICT DO NOTHING;
INSERT INTO trainings_students SELECT * FROM trainings_students_old ON CONFLICT DO NOTHING;
INSERT INTO topics SELECT * FROM topics_old ON CONFLICT DO NOTHING;
INSERT INTO theory_materials SELECT * FROM theory_materials_old ON CONFLICT DO NOTHING;
INSERT INTO practice_materials SELECT * FROM practice_materials_old ON CONFLICT DO NOTHING;
INSERT INTO messages_to_generate_with_ai SELECT * FROM messages_to_generate_with_ai_old ON CONFLICT DO NOTHING;
INSERT INTO tests SELECT * FROM tests_old ON CONFLICT DO NOTHING;
INSERT INTO trainings_tests SELECT * FROM trainings_tests_old ON CONFLICT DO NOTHING;
INSERT INTO test_sessions SELECT * FROM test_sessions_old ON CONFLICT DO NOTHING;
INSERT INTO questions SELECT * FROM questions_old ON CONFLICT DO NOTHING;
INSERT INTO tests_questions SELECT * FROM tests_questions_old ON CONFLICT DO NOTHING;
INSERT INTO question_results SELECT * FROM question_results_old ON CONFLICT DO NOTHING;
INSERT INTO test_session_results SELECT * FROM test_session_results_old ON CONFLICT DO NOTHING;

-- ==================== MW-CHAT (postgres-chat:5432) ====================
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_foreign_server WHERE srvname = 'fdw_chat') THEN
        CREATE SERVER fdw_chat FOREIGN DATA WRAPPER postgres_fdw
        OPTIONS (host 'postgres-chat', port '5432', dbname 'mastersway_chat_db');
        CREATE USER MAPPING FOR CURRENT_USER SERVER fdw_chat
        OPTIONS (user 'root', password 'secret');
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.foreign_tables WHERE foreign_table_name = 'rooms_old') THEN
        IMPORT FOREIGN SCHEMA public LIMIT TO (rooms, users_rooms, messages, message_status) FROM SERVER fdw_chat INTO public;
        ALTER FOREIGN TABLE rooms RENAME TO rooms_old;
        ALTER FOREIGN TABLE users_rooms RENAME TO users_rooms_old;
        ALTER FOREIGN TABLE messages RENAME TO messages_old;
        ALTER FOREIGN TABLE message_status RENAME TO message_status_old;
    END IF;
END $$;

INSERT INTO rooms SELECT * FROM rooms_old ON CONFLICT DO NOTHING;
INSERT INTO users_rooms SELECT * FROM users_rooms_old ON CONFLICT DO NOTHING;
INSERT INTO messages SELECT * FROM messages_old ON CONFLICT DO NOTHING;
INSERT INTO message_status SELECT * FROM message_status_old ON CONFLICT DO NOTHING;

-- ============================================================================
-- ОЧИСТКА (запустить после проверки данных):
-- DROP FOREIGN TABLE IF EXISTS mail_logs_old, notifications_old, notification_settings_old, files_old, user_intro_old, looking_for_mentor_old, trainings_old, training_tags_old, trainings_training_tags_old, favorite_users_trainings_old, trainings_mentors_old, trainings_students_old, topics_old, theory_materials_old, practice_materials_old, messages_to_generate_with_ai_old, tests_old, trainings_tests_old, test_sessions_old, questions_old, tests_questions_old, question_results_old, test_session_results_old, rooms_old, users_rooms_old, messages_old, message_status_old CASCADE;
-- DROP SERVER IF EXISTS fdw_mail, fdw_notification, fdw_storage, fdw_survey, fdw_training, fdw_chat CASCADE;
-- ============================================================================