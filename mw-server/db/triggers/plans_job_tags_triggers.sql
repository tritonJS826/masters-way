-- plans_job_tags.plan_uuid
-- максимальное количество лейблов для одного плана
CREATE OR REPLACE FUNCTION check_max_labels_for_plans()
RETURNS TRIGGER AS $$
BEGIN
    IF (SELECT COUNT(*) FROM plans_job_tags WHERE plan_uuid = NEW.plan_uuid) >= 10 THEN
        RAISE EXCEPTION 'Exceeded the limit of 10 labels for one plan';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER max_labels_for_plans_trigger
BEFORE INSERT ON plans_job_tags
FOR EACH ROW
EXECUTE FUNCTION check_max_labels_for_plans();

-- plans_job_tags.job_tag_uuid
-- максимальное количество планов с определенный лейблом
CREATE OR REPLACE FUNCTION check_max_plans_for_label()
RETURNS TRIGGER AS $$
BEGIN
    IF (SELECT COUNT(*) FROM plans_job_tags WHERE job_tag_uuid = NEW.job_tag_uuid) >= 182500 THEN
        RAISE EXCEPTION 'Exceeded the limit of 182500 plans with a particular label';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER max_plans_for_label_trigger
BEFORE INSERT ON plans_job_tags
FOR EACH ROW
EXECUTE FUNCTION check_max_plans_for_label()