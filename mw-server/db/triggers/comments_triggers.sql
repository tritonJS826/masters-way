-- comments.day_report_uuid
-- максимальное количество комментариев в одном отчете
CREATE OR REPLACE FUNCTION check_max_comments_in_report()
RETURNS TRIGGER AS $$
BEGIN
    IF (SELECT COUNT(*) FROM comments WHERE day_report_uuid = NEW.day_report_uuid) >= 200 THEN
        RAISE EXCEPTION 'Exceeded the limit of 200 comments in a report';
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER max_comments_in_report_trigger
BEFORE INSERT ON comments
FOR EACH ROW
EXECUTE FUNCTION check_max_comments_in_report();