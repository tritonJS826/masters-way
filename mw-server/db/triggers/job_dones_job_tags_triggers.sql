-- job_dones_job_tags.job_tag_uuid
-- максимальное количество выполненных работ с определенный лейблом
CREATE OR REPLACE FUNCTION check_max_job_dones_for_label()
RETURNS TRIGGER AS $$
BEGIN
    IF (SELECT COUNT(*) FROM job_dones_job_tags WHERE job_tag_uuid = NEW.job_tag_uuid) >= 182500 THEN
        RAISE EXCEPTION 'Exceeded the limit of 182500 completed tasks with a particular label';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER max_job_dones_for_label_trigger
BEFORE INSERT ON job_dones_job_tags
FOR EACH ROW
EXECUTE FUNCTION check_max_job_dones_for_label();


-- job_dones_job_tags.job_done_uuid
-- максимальное количество лейблов для одной выполненной работы
CREATE OR REPLACE FUNCTION check_max_labels_for_job_done()
RETURNS TRIGGER AS $$
BEGIN
    IF (SELECT COUNT(*) FROM job_dones_job_tags WHERE job_done_uuid = NEW.job_done_uuid) >= 10 THEN
        RAISE EXCEPTION 'Exceeded the limit of 10 labels for a completed task';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER max_labels_for_job_done_trigger
BEFORE INSERT ON job_dones_job_tags
FOR EACH ROW
EXECUTE FUNCTION check_max_labels_for_job_done();