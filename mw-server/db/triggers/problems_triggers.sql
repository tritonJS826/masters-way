-- problems.day_report_uuid
-- максимальное количество проблем в одном отчете
CREATE OR REPLACE FUNCTION check_problems_day_report_uuid_limits()
RETURNS TRIGGER AS $$
BEGIN
    IF (SELECT COUNT(*) FROM problems WHERE day_report_uuid = NEW.day_report_uuid) >= 30 THEN
        RAISE EXCEPTION 'Exceeded the limit of 30 problems in a report';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER check_problems_day_report_uuid_limits_trigger
BEFORE INSERT ON problems
FOR EACH ROW
EXECUTE FUNCTION check_problems_day_report_uuid_limits();