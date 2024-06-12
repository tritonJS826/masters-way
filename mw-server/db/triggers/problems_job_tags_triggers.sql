-- problems_job_tags.job_tag_uuid
-- максимальное количество проблем с определенный лейблом
CREATE OR REPLACE FUNCTION check_max_problems_for_label()
RETURNS TRIGGER AS $$
BEGIN
    IF (SELECT COUNT(*) FROM problems_job_tags WHERE job_tag_uuid = NEW.job_tag_uuid) >= 182500 THEN
        RAISE EXCEPTION 'Exceeded the limit of 182500 problems with a particular label';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER max_problems_for_label_trigger
BEFORE INSERT ON problems_job_tags
FOR EACH ROW
EXECUTE FUNCTION check_max_problems_for_label();


-- problems_job_tags.problem_uuid
-- максимальное количество лейблов для одной проблемы
CREATE OR REPLACE FUNCTION check_max_labels_for_problem()
RETURNS TRIGGER AS $$
BEGIN
    IF (SELECT COUNT(*) FROM problems_job_tags WHERE problem_uuid = NEW.problem_uuid) >= 10 THEN
        RAISE EXCEPTION 'Exceeded the limit of 10 labels for a problem';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER max_labels_for_problem_trigger
BEFORE INSERT ON problems_job_tags
FOR EACH ROW
EXECUTE FUNCTION check_max_labels_for_problem();