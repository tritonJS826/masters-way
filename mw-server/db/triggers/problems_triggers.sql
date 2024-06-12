-- problems.day_report_uuid
-- максимальное количество проблем в одном отчете
CREATE OR REPLACE FUNCTION check_max_pronlems_in_report()
RETURNS TRIGGER AS $$
BEGIN
    IF (SELECT COUNT(*) FROM problems WHERE day_report_uuid = NEW.day_report_uuid) >= 30 THEN
        RAISE EXCEPTION 'Exceeded the limit of 30 problems in a report';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER max_pronlems_in_report_trigger
BEFORE INSERT ON problems
FOR EACH ROW
EXECUTE FUNCTION check_max_pronlems_in_report();