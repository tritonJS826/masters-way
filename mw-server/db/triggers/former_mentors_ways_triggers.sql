-- former_mentors_ways.former_mentor_uuid
-- максимальное число путей, в которых пользователь может числиться как бывший ментор
CREATE OR REPLACE FUNCTION check_former_mentors_ways_former_mentor_uuid_limit()
RETURNS TRIGGER AS $$
BEGIN
    IF (SELECT COUNT(*) FROM former_mentors_ways WHERE former_mentor_uuid = NEW.former_mentor_uuid) >= 100000 THEN
        RAISE EXCEPTION 'Exceeded the limit of 100000 ways in which a user can be named as a former mentor';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER check_former_mentors_ways_former_mentor_uuid_limit_trigger
BEFORE INSERT ON former_mentors_ways
FOR EACH ROW
EXECUTE FUNCTION check_former_mentors_ways_former_mentor_uuid_limit();


-- former_mentors_ways.way_uuid
-- максимальное количество бывших менторов в одном пути
CREATE OR REPLACE FUNCTION check_former_mentors_ways_way_uuid_limit()
RETURNS TRIGGER AS $$
BEGIN
    IF (SELECT COUNT(*) FROM former_mentors_ways WHERE way_uuid = NEW.way_uuid) >= 100000 THEN
        RAISE EXCEPTION 'Exceeded the limit of 100000 former mentors for a single way';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER check_former_mentors_ways_way_uuid_limit_trigger
BEFORE INSERT ON former_mentors_ways
FOR EACH ROW
EXECUTE FUNCTION check_former_mentors_ways_way_uuid_limit();

