-- name: CreateMail :one
INSERT INTO mail_logs (
    from_mail,
    from_name,
    recipients,
    cc,
    bcc,
    subject,
    message,
    log
)
VALUES (
    @from_mail,
    @from_name,
    @recipients,
    @cc,
    @bcc,
    @subject,
    @message,
    @log
)
RETURNING
    uuid,
    from_mail,
    recipients,
    subject,
    message;
