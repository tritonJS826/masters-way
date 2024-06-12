-- metrics.way_uuid
-- максимальное число метрик
CREATE OR REPLACE FUNCTION check_max_metrics_in_way()
RETURNS TRIGGER AS $$
BEGIN
    IF (SELECT COUNT(*) FROM metrics WHERE way_uuid = NEW.way_uuid) >= 50 THEN
        RAISE EXCEPTION 'Exceeded the limit of 50 metrics for a way';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER max_metrics_in_way_trigger
BEFORE INSERT ON metrics
FOR EACH ROW
EXECUTE FUNCTION check_max_metrics_in_way();
