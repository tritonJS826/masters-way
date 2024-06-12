-- It is not implemented
-- to_user_mentoring_requests.user_uuid
-- максимальное число запросов на менторство от путей на одного ментора (не реализовано)
-- CREATE OR REPLACE FUNCTION check_to_user_mentoring_requests_user_uuid_limit()
-- RETURNS TRIGGER AS $$
-- BEGIN
--     IF (SELECT COUNT(*) FROM to_user_mentoring_requests WHERE user_uuid = NEW.user_uuid) >= 20 THEN
--         RAISE EXCEPTION 'Mentor cannot receive more than 20 mentoring requests from a specific way';
--     END IF;
--     RETURN NEW;
-- END;
-- $$ LANGUAGE plpgsql;

-- CREATE TRIGGER check_to_user_mentoring_requests_user_uuid_limit_trigger
-- BEFORE INSERT ON to_user_mentoring_requests
-- FOR EACH ROW
-- EXECUTE FUNCTION check_to_user_mentoring_requests_user_uuid_limit();


-- to_user_mentoring_requests.way_uuid
-- максимальное единовременное количество запросов с одного пути на менторство к разным юзерам
CREATE OR REPLACE FUNCTION check_to_user_mentoring_requests_way_uuid_limit()
RETURNS TRIGGER AS $$
BEGIN
    IF (SELECT COUNT(*) FROM to_user_mentoring_requests WHERE way_uuid = NEW.way_uuid) >= 5 THEN
        RAISE EXCEPTION 'Exceeded the limit of 5 mentoring requests (5) from a single way to different users';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER check_to_user_mentoring_requests_way_uuid_limit_trigger
BEFORE INSERT ON to_user_mentoring_requests
FOR EACH ROW
EXECUTE FUNCTION check_to_user_mentoring_requests_way_uuid_limit();

