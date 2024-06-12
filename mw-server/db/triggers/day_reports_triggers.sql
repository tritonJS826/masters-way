-- day_reports.way_uuid 
-- максимальное количество отчетов в одном пути
CREATE OR REPLACE FUNCTION check_day_reports_way_uuid_limit()
RETURNS TRIGGER AS $$
BEGIN
    IF (SELECT COUNT(*) FROM day_reports WHERE way_uuid = NEW.way_uuid) >= 36500 THEN
        RAISE EXCEPTION 'Exceeded the limit of 36500 reports in a way';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER check_day_reports_way_uuid_limit_trigger
BEFORE INSERT ON day_reports
FOR EACH ROW
EXECUTE FUNCTION check_day_reports_way_uuid_limit();
