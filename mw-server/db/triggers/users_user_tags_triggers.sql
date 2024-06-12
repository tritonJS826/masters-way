-- users_user_tags.user_uuid
-- максимально число тегов для одного юзера
CREATE OR REPLACE FUNCTION check_users_user_tags_user_uuid_limit()
RETURNS TRIGGER AS $$
BEGIN
    IF (SELECT COUNT(*) FROM users_user_tags WHERE user_uuid = NEW.user_uuid) >= 20 THEN
        RAISE EXCEPTION 'Exceeded the limit of 20 tags for a user';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER check_users_user_tags_user_uuid_limit_trigger
BEFORE INSERT ON users_user_tags
FOR EACH ROW
EXECUTE FUNCTION check_users_user_tags_user_uuid_limit();