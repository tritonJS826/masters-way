-- mentor_users_ways.user_uuid
-- ммаксимальное число менторов в одном пути
CREATE OR REPLACE FUNCTION check_mentor_users_ways_user_uuid_limit()
RETURNS TRIGGER AS $$
BEGIN
    IF (SELECT COUNT(*) FROM mentor_users_ways WHERE user_uuid = NEW.user_uuid) >= 30 THEN
        RAISE EXCEPTION 'Exceeded a limit of 30 mentors in a single way';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER check_mentor_users_ways_user_uuid_limit_trigger
BEFORE INSERT ON mentor_users_ways
FOR EACH ROW
EXECUTE FUNCTION check_mentor_users_ways_user_uuid_limit();

-- mentor_users_ways.way_uuid
-- максимальное число путей, где пользователь может быть ментором
CREATE OR REPLACE FUNCTION check_mentor_users_ways_way_uuid_limit()
RETURNS TRIGGER AS $$
BEGIN
    IF (SELECT COUNT(*) FROM mentor_users_ways WHERE way_uuid = NEW.way_uuid) >= 50000 THEN
        RAISE EXCEPTION 'Exceeded a limit of 50000 ways where a used can be named a mentor';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER check_mentor_users_ways_way_uuid_limit_trigger
BEFORE INSERT ON mentor_users_ways
FOR EACH ROW
EXECUTE FUNCTION check_mentor_users_ways_way_uuid_limit()