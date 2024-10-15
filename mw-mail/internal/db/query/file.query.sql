-- name: CreateMail :one
INSERT INTO mail_logs (
    from_email,
    from_name,
    recipients,
    cc,
    bcc,
    subject,
    message,
    html_message,
    log
)
VALUES (
    @from_email,
    @from_name,
    @recipients,
    @cc,
    @bcc,
    @subject,
    @message,
    @html_message,
    @log
)
RETURNING
    uuid,
    from_email,
    recipients,
    subject,
    message,
    html_message;
