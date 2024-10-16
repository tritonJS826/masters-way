SET TIMEZONE = 'UTC';

CREATE TABLE mail_logs (
    "uuid" UUID NOT NULL DEFAULT uuid_generate_v4(),
    from_mail VARCHAR(250) NOT NULL,
    from_name VARCHAR(250),
    recipients TEXT[] NOT NULL,
    cc TEXT[],
    bcc TEXT[],
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    log TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
