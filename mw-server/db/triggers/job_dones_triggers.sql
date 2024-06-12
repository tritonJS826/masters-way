-- job_dones.day_report_uuid
-- максимальное количество выполненных работ в одном отчете
CREATE OR REPLACE FUNCTION check_job_dones_day_report_uuid_limit()
RETURNS TRIGGER AS $$
BEGIN
    IF (SELECT COUNT(*) FROM job_dones WHERE day_report_uuid = NEW.day_report_uuid) >= 30 THEN
        RAISE EXCEPTION 'Exceeded the limit of 30 completed tasks in a report';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER check_job_dones_day_report_uuid_limit_trigger
BEFORE INSERT ON job_dones
FOR EACH ROW
EXECUTE FUNCTION check_job_dones_day_report_uuid_limit();