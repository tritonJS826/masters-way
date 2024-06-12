-- ways_way_tags.way_uuid
-- максимальное число тегов для одного пути
CREATE OR REPLACE FUNCTION check_ways_way_tags_way_uuid_limit()
RETURNS TRIGGER AS $$
BEGIN
    IF (SELECT COUNT(*) FROM ways_way_tags WHERE way_uuid = NEW.way_uuid) >= 20 THEN
        RAISE EXCEPTION 'Exceeded the limit of 20 tags for a way';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER check_ways_way_tags_way_uuid_limit_trigger
BEFORE INSERT ON ways_way_tags
FOR EACH ROW
EXECUTE FUNCTION check_ways_way_tags_way_uuid_limit();