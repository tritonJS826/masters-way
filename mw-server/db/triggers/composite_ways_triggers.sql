-- composite_ways.parent_uuid
-- максимальное число детей на одном уровне
CREATE OR REPLACE FUNCTION check_max_children_ways_on_level()
RETURNS TRIGGER AS $$
BEGIN
    IF (SELECT COUNT(*) FROM composite_ways WHERE parent_uuid = NEW.parent_uuid) >= 20 THEN
        RAISE EXCEPTION 'Exceeded the limit of 20 children on a level';
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER max_children_ways_on_level_trigger
BEFORE INSERT ON composite_ways
FOR EACH ROW
EXECUTE FUNCTION check_max_children_ways_on_level();