-- from_user_mentoring_requests.user_uuid
-- максимальное количество запросов на менторство от одного юзера на разные пути
CREATE OR REPLACE FUNCTION check_from_user_mentoring_requests_user_uuid_limit()
RETURNS TRIGGER AS $$
BEGIN
    IF (SELECT COUNT(*) FROM from_user_mentoring_requests WHERE user_uuid = NEW.user_uuid) >= 20 THEN
        RAISE EXCEPTION 'Exceeded the limit of 20 mentoring requests from one user';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER check_from_user_mentoring_requests_user_uuid_limit_trigger
BEFORE INSERT ON from_user_mentoring_requests
FOR EACH ROW
EXECUTE FUNCTION check_from_user_mentoring_requests_user_uuid_limit();


-- from_user_mentoring_requests, way_uuid
-- максимальное количество запросов на менторство от разных юзеров на один путь
CREATE OR REPLACE FUNCTION check_from_user_mentoring_requests_way_uuid_limit()
RETURNS TRIGGER AS $$
BEGIN
    IF (SELECT COUNT(*) FROM from_user_mentoring_requests WHERE way_uuid = NEW.way_uuid) >= 5 THEN
        RAISE EXCEPTION 'Exceeded the limit of 5 mentoring requests for a single way_uuid';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER check_from_user_mentoring_requests_way_uuid_limit_trigger
BEFORE INSERT ON from_user_mentoring_requests
FOR EACH ROW
EXECUTE FUNCTION check_from_user_mentoring_requests_way_uuid_limit();