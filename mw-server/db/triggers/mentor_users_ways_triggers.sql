-- mentor_users_ways.user_uuid
-- ммаксимальное число менторов в одном пути
CREATE OR REPLACE FUNCTION check_max_mentors_in_way_limit()
RETURNS TRIGGER AS $$
BEGIN
    IF (SELECT COUNT(*) FROM mentor_users_ways WHERE user_uuid = NEW.user_uuid) >= 30 THEN
        RAISE EXCEPTION 'Exceeded a limit of 30 mentors in a single way';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER max_mentors_in_way_trigger
BEFORE INSERT ON mentor_users_ways
FOR EACH ROW
EXECUTE FUNCTION check_max_mentors_in_way_limit();

-- mentor_users_ways.way_uuid
-- максимальное число путей, где пользователь может быть ментором
CREATE OR REPLACE FUNCTION check_max_mentoring_ways_for_user()
RETURNS TRIGGER AS $$
BEGIN
    IF (SELECT COUNT(*) FROM mentor_users_ways WHERE way_uuid = NEW.way_uuid) >= 50000 THEN
        RAISE EXCEPTION 'Exceeded a limit of 50000 ways where a used can be named a mentor';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER max_mentoring_ways_for_user_trigger
BEFORE INSERT ON mentor_users_ways
FOR EACH ROW
EXECUTE FUNCTION check_max_mentoring_ways_for_user()