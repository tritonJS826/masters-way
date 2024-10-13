SET TIMEZONE = 'UTC';

CREATE TABLE mail_logs (
    "uuid" UUID NOT NULL DEFAULT uuid_generate_v4(),
    from_email TEXT NOT NULL,
    from_name TEXT,
    recipients TEXT[] NOT NULL,
    cc TEXT[],
    bcc TEXT[],
    subject TEXT NOT NULL,
    message TEXT,
    html_message TEXT,
    err TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
