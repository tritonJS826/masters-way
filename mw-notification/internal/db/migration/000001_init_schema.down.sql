DROP TRIGGER IF EXISTS remove_old_notifications_trigger ON notifications;
DROP FUNCTION IF EXISTS remove_old_notifications();

DROP TABLE IF EXISTS enabled_notifications;
DROP TABLE IF EXISTS notifications;
DROP INDEX IF EXISTS user_uuid_key;
DROP TYPE IF EXISTS notification_nature;
DROP TYPE IF EXISTS notification_channel;
