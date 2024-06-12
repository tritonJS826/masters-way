-- plans.day_report_uuid
-- максимальное количество планов в одном отчете
CREATE OR REPLACE FUNCTION check_max_plans_in_report()
RETURNS TRIGGER AS $$
BEGIN
    IF (SELECT COUNT(*) FROM plans WHERE day_report_uuid = NEW.day_report_uuid) >= 30 THEN
        RAISE EXCEPTION 'Exceeded the limit of 30 plans in a report';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER max_plans_in_report_trigger
BEFORE INSERT ON plans
FOR EACH ROW
EXECUTE FUNCTION check_max_plans_in_report();
