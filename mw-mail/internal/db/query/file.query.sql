-- name: CreateMail :one
INSERT INTO mail_logs (
    sender_mail,
    sender_name,
    recipients,
    cc,
    bcc,
    reply_to,
    subject,
    message,
    log
) VALUES (
    @sender_mail,
    @sender_name,
    @recipients,
    @cc,
    @bcc,
    @reply_to,
    @subject,
    @message,
    @log
) RETURNING
    uuid,
    sender_mail,
    sender_name,
    recipients,
    cc,
    bcc,
    reply_to,
    subject,
    message;
