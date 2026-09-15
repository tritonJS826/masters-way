CREATE TABLE user_intro (
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