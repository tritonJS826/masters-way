-- plans.day_report_uuid
-- максимальное количество планов в одном отчете
CREATE OR REPLACE FUNCTION check_plans_day_report_uuid_limit()
RETURNS TRIGGER AS $$
BEGIN
    IF (SELECT COUNT(*) FROM plans WHERE day_report_uuid = NEW.day_report_uuid) >= 30 THEN
        RAISE EXCEPTION 'Exceeded the limit of 30 plans in a report';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER check_plans_day_report_uuid_limit_trigger
BEFORE INSERT ON plans
FOR EACH ROW
EXECUTE FUNCTION check_plans_day_report_uuid_limit();
