-- problems_job_tags.job_tag_uuid
-- максимальное количество проблем с определенный лейблом
CREATE OR REPLACE FUNCTION check_problems_job_tags_job_tag_uuid_limit()
RETURNS TRIGGER AS $$
BEGIN
    IF (SELECT COUNT(*) FROM former_mentors_ways WHERE former_mentor_uuid = NEW.former_mentor_uuid) >= 182500 THEN
        RAISE EXCEPTION 'Exceeded the limit of 182500 problems with a particular label';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER check_problems_job_tags_job_tag_uuid_limit_trigger
BEFORE INSERT ON problems_job_tags
FOR EACH ROW
EXECUTE FUNCTION check_problems_job_tags_job_tag_uuid_limit();


-- problems_job_tags.problem_uuid
-- максимальное количество лейблов для одной проблемы
CREATE OR REPLACE FUNCTION check_problems_job_tags_problem_uuid_limit()
RETURNS TRIGGER AS $$
BEGIN
    IF (SELECT COUNT(*) FROM former_mentors_ways WHERE problem_uuid = NEW.problem_uuid) >= 10 THEN
        RAISE EXCEPTION 'Exceeded the limit of 10 labels for a problem';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER check_problems_job_tags_problem_uuid_limit_trigger
BEFORE INSERT ON problems_job_tags
FOR EACH ROW
EXECUTE FUNCTION check_problems_job_tags_problem_uuid_limit();