SET TIMEZONE = 'UTC';

CREATE TABLE user_intro (
    "uuid" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "user_uuid" UUID NOT NULL,
    "device_uuid" UUID NOT NULL,
    "role" VARCHAR(255) NOT NULL,
    "preferred_interface_language" VARCHAR(255) NOT NULL,
    -- Основные цели: повышение квалификации, карьерный рост, смена профессии,
    "student_goals" VARCHAR(255) NOT NULL,
    -- Опыт в области, связанной с обучением (новичок, начинающий, продвинутый).
    "student_experience" VARCHAR(255) NOT NULL,
    -- Что побудило зарегистрироваться (интерес к теме, рекомендации друзей, потребности работы и т.д.).
    "why_registered" VARCHAR(255) NOT NULL,
    -- Как пользователь узнал о платформе (реклама, социальные сети, рекомендации, поисковые системы).
    "source" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "user_intro_pkey" PRIMARY KEY (uuid)
);

CREATE TABLE looking_for_mentor (
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
