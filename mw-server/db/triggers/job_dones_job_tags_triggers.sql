-- job_dones_job_tags.job_tag_uuid
-- максимальное количество выполненных работ с определенный лейблом
CREATE OR REPLACE FUNCTION check_job_dones_job_tags_job_tag_uuid_limit()
RETURNS TRIGGER AS $$
BEGIN
    IF (SELECT COUNT(*) FROM job_dones_job_tags WHERE job_tag_uuid = NEW.job_tag_uuid) >= 182500 THEN
        RAISE EXCEPTION 'Exceeded the limit of 182500 completed tasks with a particular label';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER check_job_dones_job_tags_job_tag_uuid_limit_trigger
BEFORE INSERT ON job_dones_job_tags
FOR EACH ROW
EXECUTE FUNCTION check_job_dones_job_tags_job_tag_uuid_limit();


-- job_dones_job_tags.job_done_uuid
-- максимальное количество лейблов для одной выполненной работы
CREATE OR REPLACE FUNCTION check_job_dones_job_tags_job_done_uuid_limit()
RETURNS TRIGGER AS $$
BEGIN
    IF (SELECT COUNT(*) FROM job_dones_job_tags WHERE job_done_uuid = NEW.job_done_uuid) >= 10 THEN
        RAISE EXCEPTION 'Exceeded the limit of 10 labels for a completed task';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER check_job_dones_job_tags_job_done_uuid_limit_trigger
BEFORE INSERT ON job_dones_job_tags
FOR EACH ROW
EXECUTE FUNCTION check_job_dones_job_tags_job_done_uuid_limit();