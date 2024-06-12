-- from_user_mentoring_requests.user_uuid
-- максимальное количество запросов на менторство от одного юзера на разные пути
CREATE OR REPLACE FUNCTION check_max_req_from_mentor_to_way()
RETURNS TRIGGER AS $$
BEGIN
    IF (SELECT COUNT(*) FROM from_user_mentoring_requests WHERE user_uuid = NEW.user_uuid) >= 20 THEN
        RAISE EXCEPTION 'Exceeded the limit of 20 mentoring requests from one user';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER max_req_from_mentor_to_way_trigger
BEFORE INSERT ON from_user_mentoring_requests
FOR EACH ROW
EXECUTE FUNCTION check_max_req_from_mentor_to_way();


-- from_user_mentoring_requests, way_uuid
-- максимальное количество запросов на менторство от разных юзеров на один путь
CREATE OR REPLACE FUNCTION check_max_req_from_mentor_to_way_for_way()
RETURNS TRIGGER AS $$
BEGIN
    IF (SELECT COUNT(*) FROM from_user_mentoring_requests WHERE way_uuid = NEW.way_uuid) >= 5 THEN
        RAISE EXCEPTION 'Exceeded the limit of 5 mentoring requests for a single way_uuid';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER max_req_from_mentor_to_way_for_way_trigger
BEFORE INSERT ON from_user_mentoring_requests
FOR EACH ROW
EXECUTE FUNCTION check_max_req_from_mentor_to_way_for_way();