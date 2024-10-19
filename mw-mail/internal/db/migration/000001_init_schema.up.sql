SET TIMEZONE = 'UTC';

CREATE TABLE mail_logs (
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