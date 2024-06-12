-- favorite_users_ways.user_uuid
-- максимальное число лайков, которое пользователь может раздать путям
CREATE OR REPLACE FUNCTION check_max_likes_to_way()
RETURNS TRIGGER AS $$
BEGIN
    IF (SELECT COUNT(*) FROM favorite_users_ways WHERE user_uuid = NEW.user_uuid) >= 1000 THEN
        RAISE EXCEPTION 'Exceeded the limit of 1000 likes from a user';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER max_likes_to_way_trigger
BEFORE INSERT ON favorite_users_ways
FOR EACH ROW
EXECUTE FUNCTION check_max_likes_to_way();


-- favorite_users_ways.way_uuid
-- максимальное число лайков, которое получить путь
CREATE OR REPLACE FUNCTION check_max_likes_in_way()
RETURNS TRIGGER AS $$
BEGIN
    IF (SELECT COUNT(*) FROM favorite_users_ways WHERE way_uuid = NEW.way_uuid) >= 20000 THEN
        RAISE EXCEPTION 'Exceeded the limit of 20000 likes for a single way';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER max_likes_in_way_trigger
BEFORE INSERT ON favorite_users_ways
FOR EACH ROW
EXECUTE FUNCTION check_max_likes_in_way();