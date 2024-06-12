-- way_collections_ways.way_collection_uuid
-- максимальное число путей в одной коллекции
CREATE OR REPLACE FUNCTION check_way_collections_ways_way_collection_uuid_limit()
RETURNS TRIGGER AS $$
BEGIN
    IF (SELECT COUNT(*) FROM way_collections_ways WHERE way_collection_uuid = NEW.way_collection_uuid) >= 100 THEN
        RAISE EXCEPTION 'Exceeded the limit of 100 ways in a collection';
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER check_way_collections_ways_way_collection_uuid_limit_trigger
BEFORE INSERT ON way_collections_ways
FOR EACH ROW
EXECUTE FUNCTION check_way_collections_ways_way_collection_uuid_limit();