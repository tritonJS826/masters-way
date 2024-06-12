-- comments.day_report_uuid
-- максимальное количество комментариев в одном отчете
CREATE OR REPLACE FUNCTION check_comments_day_report_uuid_limit()
RETURNS TRIGGER AS $$
BEGIN
    IF (SELECT COUNT(*) FROM comments WHERE way_collection_uuid = NEW.way_collection_uuid) >= 200 THEN
        RAISE EXCEPTION 'Exceeded the limit of 200 comments in a report';
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER check_comments_day_report_uuid_limit_trigger
BEFORE INSERT ON comments
FOR EACH ROW
EXECUTE FUNCTION check_comments_day_report_uuid_limit();