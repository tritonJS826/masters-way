-- users_user_tags.user_uuid
-- максимально число тегов для одного юзера
CREATE OR REPLACE FUNCTION check_max_tags_to_user()
RETURNS TRIGGER AS $$
BEGIN
    IF (SELECT COUNT(*) FROM users_user_tags WHERE user_uuid = NEW.user_uuid) >= 20 THEN
        RAISE EXCEPTION 'Exceeded the limit of 20 tags for a user';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER max_tags_to_user_trigger
BEFORE INSERT ON users_user_tags
FOR EACH ROW
EXECUTE FUNCTION check_max_tags_to_user();