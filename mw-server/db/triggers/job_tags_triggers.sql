-- job_tags.way_uuid
-- максимально количество labels для одного пути
CREATE OR REPLACE FUNCTION check_job_tags_way_uuid_limit()
RETURNS TRIGGER AS $$
BEGIN
    IF (SELECT COUNT(*) FROM job_tags WHERE way_uuid = NEW.way_uuid) >= 30 THEN
        RAISE EXCEPTION 'Exceeded the limit of 30 labes for a way';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER check_job_tags_way_uuid_limit_trigger
BEFORE INSERT ON job_tags
FOR EACH ROW
EXECUTE FUNCTION check_job_tags_way_uuid_limit();
