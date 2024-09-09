SET TIMEZONE = 'UTC';

CREATE TABLE users(
    "uuid" UUID NOT NULL DEFAULT (uuid_generate_v4()),
    "name" VARCHAR(50) NOT NULL CHECK (LENGTH(name) > 0),
    "email" VARCHAR(128) NOT NULL,
    "description" VARCHAR(300) NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "image_url" VARCHAR(300) NOT NULL,
    "is_mentor" BOOLEAN NOT NULL,
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
    "name" VARCHAR(50) NOT NULL,
    "goal_description" VARCHAR(500) NOT NULL,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "estimation_time" INTEGER NOT NULL CHECK (estimation_time BETWEEN 0 AND 52560000),
    "owner_uuid" UUID NOT NULL REFERENCES users("uuid") ON UPDATE CASCADE ON DELETE CASCADE,
    "copied_from_way_uuid" UUID REFERENCES ways("uuid") ON UPDATE CASCADE,
    "is_completed" BOOLEAN NOT NULL,
    "is_private" BOOLEAN NOT NULL,
    CONSTRAINT "ways_pkey" PRIMARY KEY("uuid")
);

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
    CONSTRAINT "day_reports_pkey" PRIMARY KEY("uuid")
);

CREATE TABLE "metrics"(
    "uuid" UUID NOT NULL DEFAULT (uuid_generate_v4()),
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" VARCHAR(300) NOT NULL,
    "is_done" BOOLEAN NOT NULL,
    "done_date" TIMESTAMP,
    "metric_estimation" INTEGER NOT NULL CHECK (metric_estimation BETWEEN 0 AND 52560000),
    "way_uuid" UUID NOT NULL REFERENCES ways("uuid") ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT "metrics_pkey" PRIMARY KEY("uuid")
);

CREATE TABLE "job_tags"(
    "uuid" UUID NOT NULL DEFAULT (uuid_generate_v4()),
    "name" VARCHAR(30) NOT NULL,
    "description" VARCHAR(100) NOT NULL,
    "color" VARCHAR(8) NOT NULL,
    "way_uuid" UUID NOT NULL REFERENCES ways("uuid") ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT "job_tags_pkey" PRIMARY KEY("uuid")
);

CREATE TABLE "plans"(
    "uuid" UUID NOT NULL DEFAULT (uuid_generate_v4()),
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" VARCHAR(3000) NOT NULL,
    "time" INTEGER NOT NULL CHECK (time BETWEEN 0 AND 1440),
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
    "description" VARCHAR(3000) NOT NULL,
    "time" INTEGER NOT NULL CHECK (time BETWEEN 0 AND 1440),
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
    "description" VARCHAR(3000) NOT NULL,
    "is_done" BOOLEAN NOT NULL,
    "owner_uuid" UUID NOT NULL REFERENCES users("uuid") ON UPDATE CASCADE ON DELETE CASCADE,
    "day_report_uuid" UUID NOT NULL REFERENCES day_reports("uuid") ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT "problems_pkey" PRIMARY KEY("uuid")
);

CREATE TABLE "comments"(
    "uuid" UUID NOT NULL DEFAULT (uuid_generate_v4()),
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" VARCHAR(3000) NOT NULL,
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
    "name" VARCHAR(20) NOT NULL,
    CONSTRAINT "user_tags_pkey" PRIMARY KEY("uuid")
);
CREATE UNIQUE INDEX "user_tag_name_key" ON "user_tags"("name");

CREATE TABLE "users_user_tags"(
    "user_uuid" UUID NOT NULL REFERENCES users("uuid") ON UPDATE CASCADE ON DELETE CASCADE,
    "user_tag_uuid" UUID NOT NULL REFERENCES user_tags("uuid") ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT "user_uuid_user_tag_uuid_pkey" PRIMARY KEY (user_uuid, user_tag_uuid)
);

CREATE TYPE pricing_plan_type AS ENUM ('free', 'starter', 'pro');

CREATE TABLE "profile_settings" (
    "uuid" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "pricing_plan" pricing_plan_type NOT NULL,
    "expiration_date" TIMESTAMP NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "owner_uuid" UUID NOT NULL REFERENCES users("uuid") ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT "profile_settings_pkey" PRIMARY KEY("uuid")
);

-- triggers

CREATE OR REPLACE FUNCTION init_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO profile_settings (pricing_plan, expiration_date, owner_uuid)
    VALUES ('free', NULL, NEW.uuid);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER create_user_trigger
AFTER INSERT ON users
FOR EACH ROW
EXECUTE FUNCTION init_user();

-- максимально число тегов для одного юзера
CREATE OR REPLACE FUNCTION check_max_tags_to_user()
RETURNS TRIGGER AS $$
BEGIN
    IF (SELECT COUNT(*) FROM users_user_tags WHERE user_uuid = NEW.user_uuid) > 20 THEN
        RAISE EXCEPTION 'Exceeded the limit of 20 tags for a user';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER max_tags_to_user_trigger
BEFORE INSERT ON users_user_tags
FOR EACH ROW
EXECUTE FUNCTION check_max_tags_to_user();

-- максимальное число лайков которое пользователь может раздать другим пользователям
CREATE OR REPLACE FUNCTION check_max_likes_to_user() RETURNS TRIGGER AS $$
BEGIN
    IF (SELECT COUNT(*) FROM favorite_users WHERE donor_user_uuid = NEW.donor_user_uuid) > 999 THEN
        RAISE EXCEPTION 'Exceeded the limit of 1000 likes which a user can give other users;';
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER max_likes_to_user_trigger
BEFORE INSERT ON favorite_users
FOR EACH ROW
EXECUTE FUNCTION check_max_likes_to_user();

-- максимальное число лайков которое пользователь может получить от других пользователей
CREATE OR REPLACE FUNCTION check_max_likes_from_user() RETURNS TRIGGER AS $$
BEGIN
    IF (SELECT COUNT(*) FROM favorite_users WHERE acceptor_user_uuid = NEW.acceptor_user_uuid) > 20000 THEN
        RAISE EXCEPTION 'Exceeded the limit of 20000 like a user can receive from other users';
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER check_max_likes_from_user_trigger
BEFORE INSERT ON favorite_users
FOR EACH ROW
EXECUTE FUNCTION check_max_likes_from_user();

-- максимальное число запросов на менторство от путей на одного ментора (не реализовано)
CREATE OR REPLACE FUNCTION check_max_req_from_way_to_mentor_for_mentor()
RETURNS TRIGGER AS $$
BEGIN
    IF (SELECT COUNT(*) FROM to_user_mentoring_requests WHERE user_uuid = NEW.user_uuid) > 100 THEN
        RAISE EXCEPTION 'Mentor cannot receive more than 100 mentoring requests from a specific way';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER max_req_from_way_to_mentor_for_mentor_trigger
BEFORE INSERT ON to_user_mentoring_requests
FOR EACH ROW
EXECUTE FUNCTION check_max_req_from_way_to_mentor_for_mentor();

-- максимальное количество запросов на менторство от одного юзера на разные пути
CREATE OR REPLACE FUNCTION check_max_req_from_mentor_to_way()
RETURNS TRIGGER AS $$
BEGIN
    IF (SELECT COUNT(*) FROM from_user_mentoring_requests WHERE user_uuid = NEW.user_uuid) > 20 THEN
        RAISE EXCEPTION 'Exceeded the limit of 20 mentoring requests from one user';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER max_req_from_mentor_to_way_trigger
BEFORE INSERT ON from_user_mentoring_requests
FOR EACH ROW
EXECUTE FUNCTION check_max_req_from_mentor_to_way();

-- максимальное число лайков, которое пользователь может раздать путям
CREATE OR REPLACE FUNCTION check_max_likes_to_way()
RETURNS TRIGGER AS $$
BEGIN
    IF (SELECT COUNT(*) FROM favorite_users_ways WHERE user_uuid = NEW.user_uuid) >= 1000 THEN
        RAISE EXCEPTION 'Exceeded the limit of 1000 likes from a user';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER max_likes_to_way_trigger
BEFORE INSERT ON favorite_users_ways
FOR EACH ROW
EXECUTE FUNCTION check_max_likes_to_way();

-- максимальное число путей, в которых пользователь может числиться как бывший ментор
CREATE OR REPLACE FUNCTION check_max_ways_for_former_mentor()
RETURNS TRIGGER AS $$
BEGIN
    IF (SELECT COUNT(*) FROM former_mentors_ways WHERE former_mentor_uuid = NEW.former_mentor_uuid) > 100000 THEN
        RAISE EXCEPTION 'Exceeded the limit of 100000 ways in which a user can be named as a former mentor';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER max_ways_for_former_mentor_trigger
BEFORE INSERT ON former_mentors_ways
FOR EACH ROW
EXECUTE FUNCTION check_max_ways_for_former_mentor();

-- максимальное число менторов в одном пути
CREATE OR REPLACE FUNCTION check_max_mentors_in_way()
RETURNS TRIGGER AS $$
BEGIN
    IF (SELECT COUNT(*) FROM mentor_users_ways WHERE way_uuid = NEW.way_uuid) > 30 THEN
        RAISE EXCEPTION 'Exceeded a limit of 30 mentors in a single way';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER max_mentors_in_way_trigger
BEFORE INSERT ON mentor_users_ways
FOR EACH ROW
EXECUTE FUNCTION check_max_mentors_in_way();

-- максимальное число путей в одной коллекции
CREATE OR REPLACE FUNCTION check_ways_in_collection()
RETURNS TRIGGER AS $$
BEGIN
    IF (SELECT COUNT(*) FROM way_collections_ways WHERE way_collection_uuid = NEW.way_collection_uuid) > 100 THEN
        RAISE EXCEPTION 'Exceeded the limit of 100 ways in a collection';
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER max_ways_in_collection_trigger
BEFORE INSERT ON way_collections_ways
FOR EACH ROW
EXECUTE FUNCTION check_ways_in_collection();

-- максимальное число детей на одном верхнем  уровне
CREATE OR REPLACE FUNCTION check_max_children_ways_on_level()
RETURNS TRIGGER AS $$
BEGIN
    IF (SELECT COUNT(*) FROM composite_ways WHERE parent_uuid = NEW.parent_uuid) >= 20 THEN
        RAISE EXCEPTION 'Exceeded the limit of 20 children on a level';
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER max_children_ways_on_level_trigger
BEFORE INSERT ON composite_ways
FOR EACH ROW
EXECUTE FUNCTION check_max_children_ways_on_level();

-- максимальное число тегов для одного пути
CREATE OR REPLACE FUNCTION check_max_way_tags_in_way()
RETURNS TRIGGER AS $$
BEGIN
    IF (SELECT COUNT(*) FROM ways_way_tags WHERE way_uuid = NEW.way_uuid) > 20 THEN
        RAISE EXCEPTION 'Exceeded the limit of 20 tags for a way';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER max_way_tags_in_way_trigger
BEFORE INSERT ON ways_way_tags
FOR EACH ROW
EXECUTE FUNCTION check_max_way_tags_in_way();

-- максимально количество labels для одного пути
CREATE OR REPLACE FUNCTION check_max_labels_in_way()
RETURNS TRIGGER AS $$
BEGIN
    IF (SELECT COUNT(*) FROM job_tags WHERE way_uuid = NEW.way_uuid) > 30 THEN
        RAISE EXCEPTION 'Exceeded the limit of 30 labes for a way';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER max_labels_in_way_trigger
BEFORE INSERT ON job_tags
FOR EACH ROW
EXECUTE FUNCTION check_max_labels_in_way();

-- максимальное количество отчетов в одном пути
CREATE OR REPLACE FUNCTION check_max_reports_in_way()
RETURNS TRIGGER AS $$
BEGIN
    IF (SELECT COUNT(*) FROM day_reports WHERE way_uuid = NEW.way_uuid) > 36500 THEN
        RAISE EXCEPTION 'Exceeded the limit of 36500 reports in a way';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER max_reports_in_way_trigger
BEFORE INSERT ON day_reports
FOR EACH ROW
EXECUTE FUNCTION check_max_reports_in_way();

-- максимальное число метрик
CREATE OR REPLACE FUNCTION check_max_metrics_in_way()
RETURNS TRIGGER AS $$
BEGIN
    IF (SELECT COUNT(*) FROM metrics WHERE way_uuid = NEW.way_uuid) > 50 THEN
        RAISE EXCEPTION 'Exceeded the limit of 50 metrics for a way';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER max_metrics_in_way_trigger
BEFORE INSERT ON metrics
FOR EACH ROW
EXECUTE FUNCTION check_max_metrics_in_way();

-- максимальное единовременное количество запросов с одного пути на менторство к разным юзерам
CREATE OR REPLACE FUNCTION check_max_req_from_way_to_mentor_for_way()
RETURNS TRIGGER AS $$
BEGIN
    IF (SELECT COUNT(*) FROM to_user_mentoring_requests WHERE way_uuid = NEW.way_uuid) > 5 THEN
        RAISE EXCEPTION 'Exceeded the limit of 5 mentoring requests (5) from a single way to different users';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER max_req_from_way_to_mentor_for_way_trigger
BEFORE INSERT ON to_user_mentoring_requests
FOR EACH ROW
EXECUTE FUNCTION check_max_req_from_way_to_mentor_for_way();

-- максимальное количество запросов на менторство от разных юзеров на один путь
CREATE OR REPLACE FUNCTION check_max_req_from_mentor_to_way_for_way()
RETURNS TRIGGER AS $$
BEGIN
    IF (SELECT COUNT(*) FROM from_user_mentoring_requests WHERE way_uuid = NEW.way_uuid) > 10 THEN
        RAISE EXCEPTION 'Exceeded the limit of 5 mentoring requests for a single way_uuid';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER max_req_from_mentor_to_way_for_way_trigger
BEFORE INSERT ON from_user_mentoring_requests
FOR EACH ROW
EXECUTE FUNCTION check_max_req_from_mentor_to_way_for_way();

-- максимальное число лайков, которое получить путь
CREATE OR REPLACE FUNCTION check_max_likes_in_way()
RETURNS TRIGGER AS $$
BEGIN
    IF (SELECT COUNT(*) FROM favorite_users_ways WHERE way_uuid = NEW.way_uuid) > 20000 THEN
        RAISE EXCEPTION 'Exceeded the limit of 20000 likes for a single way';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER max_likes_in_way_trigger
BEFORE INSERT ON favorite_users_ways
FOR EACH ROW
EXECUTE FUNCTION check_max_likes_in_way();

-- максимальное количество бывших менторов в одном пути
CREATE OR REPLACE FUNCTION check_max_foremer_mentors_in_way()
RETURNS TRIGGER AS $$
BEGIN
    IF (SELECT COUNT(*) FROM former_mentors_ways WHERE way_uuid = NEW.way_uuid) > 100000 THEN
        RAISE EXCEPTION 'Exceeded the limit of 100000 former mentors for a single way';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER max_foremer_mentors_in_way_trigger
BEFORE INSERT ON former_mentors_ways
FOR EACH ROW
EXECUTE FUNCTION check_max_foremer_mentors_in_way();

-- максимальное число путей, где пользователь может быть ментором
CREATE OR REPLACE FUNCTION check_max_mentoring_ways_for_user()
RETURNS TRIGGER AS $$
BEGIN
    IF (SELECT COUNT(*) FROM mentor_users_ways WHERE user_uuid = NEW.user_uuid) > 50000 THEN
        RAISE EXCEPTION 'Exceeded a limit of 50000 ways where a used can be named a mentor';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER max_mentoring_ways_for_user_trigger
BEFORE INSERT ON mentor_users_ways
FOR EACH ROW
EXECUTE FUNCTION check_max_mentoring_ways_for_user();

-- максимальное количество планов с определенный лейблом
CREATE OR REPLACE FUNCTION check_max_plans_for_label()
RETURNS TRIGGER AS $$
BEGIN
    IF (SELECT COUNT(*) FROM plans_job_tags WHERE job_tag_uuid = NEW.job_tag_uuid) > 182500 THEN
        RAISE EXCEPTION 'Exceeded the limit of 182500 plans with a particular label';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER max_plans_for_label_trigger
BEFORE INSERT ON plans_job_tags
FOR EACH ROW
EXECUTE FUNCTION check_max_plans_for_label();

-- максимальное количество лейблов для одного плана
CREATE OR REPLACE FUNCTION check_max_labels_for_plans()
RETURNS TRIGGER AS $$
BEGIN
    IF (SELECT COUNT(*) FROM plans_job_tags WHERE plan_uuid = NEW.plan_uuid) > 10 THEN
        RAISE EXCEPTION 'Exceeded the limit of 10 labels for one plan';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER max_labels_for_plans_trigger
BEFORE INSERT ON plans_job_tags
FOR EACH ROW
EXECUTE FUNCTION check_max_labels_for_plans();

-- максимальное количество лейблов для одной выполненной работы
CREATE OR REPLACE FUNCTION check_max_labels_for_job_done()
RETURNS TRIGGER AS $$
BEGIN
    IF (SELECT COUNT(*) FROM job_dones_job_tags WHERE job_done_uuid = NEW.job_done_uuid) > 10 THEN
        RAISE EXCEPTION 'Exceeded the limit of 10 labels for a completed task';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER max_labels_for_job_done_trigger
BEFORE INSERT ON job_dones_job_tags
FOR EACH ROW
EXECUTE FUNCTION check_max_labels_for_job_done();

-- максимальное количество планов в одном отчете
CREATE OR REPLACE FUNCTION check_max_plans_in_report()
RETURNS TRIGGER AS $$
BEGIN
    IF (SELECT COUNT(*) FROM plans WHERE day_report_uuid = NEW.day_report_uuid) > 30 THEN
        RAISE EXCEPTION 'Exceeded the limit of 30 plans in a report';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER max_plans_in_report_trigger
BEFORE INSERT ON plans
FOR EACH ROW
EXECUTE FUNCTION check_max_plans_in_report();

-- максимальное количество выполненных работ в одном отчете
CREATE OR REPLACE FUNCTION check_max_job_dones_in_report()
RETURNS TRIGGER AS $$
BEGIN
    IF (SELECT COUNT(*) FROM job_dones WHERE day_report_uuid = NEW.day_report_uuid) > 30 THEN
        RAISE EXCEPTION 'Exceeded the limit of 30 completed tasks in a report';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER max_job_dones_in_report_trigger
BEFORE INSERT ON job_dones
FOR EACH ROW
EXECUTE FUNCTION check_max_job_dones_in_report();

-- максимальное количество проблем в одном отчете
CREATE OR REPLACE FUNCTION check_max_pronlems_in_report()
RETURNS TRIGGER AS $$
BEGIN
    IF (SELECT COUNT(*) FROM problems WHERE day_report_uuid = NEW.day_report_uuid) > 30 THEN
        RAISE EXCEPTION 'Exceeded the limit of 30 problems in a report';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER max_pronlems_in_report_trigger
BEFORE INSERT ON problems
FOR EACH ROW
EXECUTE FUNCTION check_max_pronlems_in_report();

-- максимальное количество комментариев в одном отчете
CREATE OR REPLACE FUNCTION check_max_comments_in_report()
RETURNS TRIGGER AS $$
BEGIN
    IF (SELECT COUNT(*) FROM comments WHERE day_report_uuid = NEW.day_report_uuid) > 200 THEN
        RAISE EXCEPTION 'Exceeded the limit of 200 comments in a report';
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER max_comments_in_report_trigger
BEFORE INSERT ON comments
FOR EACH ROW
EXECUTE FUNCTION check_max_comments_in_report();

-- максимальное количество выполненных работ с определенный лейблом
CREATE OR REPLACE FUNCTION check_max_job_dones_for_label()
RETURNS TRIGGER AS $$
BEGIN
    IF (SELECT COUNT(*) FROM job_dones_job_tags WHERE job_tag_uuid = NEW.job_tag_uuid) > 182500 THEN
        RAISE EXCEPTION 'Exceeded the limit of 182500 completed tasks with a particular label';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER max_job_dones_for_label_trigger
BEFORE INSERT ON job_dones_job_tags
FOR EACH ROW
EXECUTE FUNCTION check_max_job_dones_for_label();

-- Проверка на наличие дубликата отчета за сегодняшний день перед созданием нового отчета.
CREATE OR REPLACE FUNCTION check_duplicate_today_report()
RETURNS TRIGGER AS $$
BEGIN
    IF EXISTS (
        SELECT 1
        FROM day_reports
        WHERE
            way_uuid = NEW.way_uuid AND
            DATE_TRUNC('day', created_at AT TIME ZONE concat(
                'UTC',
                to_char(NEW.created_at AT TIME ZONE 'UTC', 'OF'
            ))) = DATE_TRUNC('day', NEW.created_at)
    ) THEN
        RAISE EXCEPTION 'A report for this way_uuid already exists for today';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER duplicate_today_report_trigger
BEFORE INSERT ON day_reports
FOR EACH ROW
EXECUTE FUNCTION check_duplicate_today_report();
