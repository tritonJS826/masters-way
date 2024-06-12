-- favorite_users_ways.user_uuid
-- максимальное число лайков, которое пользователь может раздать путям
CREATE OR REPLACE FUNCTION check_favorite_users_ways_user_uuid_limit()
RETURNS TRIGGER AS $$
BEGIN
    IF (SELECT COUNT(*) FROM favorite_users_ways WHERE user_uuid = NEW.user_uuid) >= 1000 THEN
        RAISE EXCEPTION 'Exceeded the limit of 1000 likes from a user';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER check_favorite_users_ways_user_uuid_limit_trigger
BEFORE INSERT ON favorite_users_ways
FOR EACH ROW
EXECUTE FUNCTION check_favorite_users_ways_user_uuid_limit();


-- favorite_users_ways.way_uuid
-- максимальное число лайков, которое получить путь
CREATE OR REPLACE FUNCTION check_favorite_users_ways_way_uuid_limit()
RETURNS TRIGGER AS $$
BEGIN
    IF (SELECT COUNT(*) FROM favorite_users_ways WHERE way_uuid = NEW.way_uuid) >= 20000 THEN
        RAISE EXCEPTION 'Exceeded the limit of 20000 likes for a single way';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER check_favorite_users_ways_way_uuid_limit_trigger
BEFORE INSERT ON favorite_users_ways
FOR EACH ROW
EXECUTE FUNCTION check_favorite_users_ways_way_uuid_limit();