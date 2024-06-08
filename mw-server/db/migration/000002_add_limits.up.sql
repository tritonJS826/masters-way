ALTER TABLE users
    ALTER COLUMN name TYPE VARCHAR(50),
    ALTER COLUMN email TYPE VARCHAR(128),
    ALTER COLUMN description TYPE VARCHAR(300),
    ALTER COLUMN image_url TYPE VARCHAR(300),
    DROP COLUMN firebase_id;
    
UPDATE user_tags 
SET name = LEFT(name, 20)
WHERE LENGTH(name) > 20;

ALTER TABLE user_tags
    ALTER COLUMN name TYPE VARCHAR(20);

UPDATE way_collections
SET name = LEFT(name, 50)
WHERE LENGTH(name) > 50;

ALTER TABLE way_collections
    ALTER COLUMN name TYPE VARCHAR(50),
    ALTER COLUMN type TYPE VARCHAR(20);

UPDATE ways
SET goal_description = CASE
   WHEN LENGTH(goal_description) > 500 THEN LEFT(goal_description, 500)
   ELSE goal_description
END,
name = CASE
   WHEN LENGTH(name) > 50 THEN LEFT(name, 50)
   ELSE name
END
WHERE LENGTH(goal_description) > 500 OR LENGTH(name) > 50;

ALTER TABLE ways
    ALTER COLUMN name TYPE VARCHAR(50),
    ALTER COLUMN goal_description TYPE VARCHAR(500); 

ALTER TABLE metrics
    ALTER COLUMN description TYPE VARCHAR(300),
    ALTER COLUMN metric_estimation TYPE INTEGER; -- 52,560,000 min(100 years)

UPDATE job_tags
SET name = LEFT(name, 20)
WHERE LENGTH(name) > 20;

ALTER TABLE job_tags
    ALTER COLUMN name TYPE VARCHAR(20),
    ALTER COLUMN description TYPE VARCHAR(100),
    ALTER COLUMN color TYPE VARCHAR(8);

ALTER TABLE plans
    ALTER COLUMN description TYPE VARCHAR(1000),
    ALTER COLUMN time TYPE INTEGER; -- 1440 min(1 day)

UPDATE job_dones
SET description = LEFT(description, 1000)
WHERE LENGTH(description) > 1000;

ALTER TABLE job_dones
    ALTER COLUMN description TYPE VARCHAR(1000),
    ALTER COLUMN time TYPE INTEGER; -- 1440 min (1 day)

UPDATE problems
SET description = LEFT(description, 1000)
WHERE LENGTH(description) > 1000;

ALTER TABLE problems
    ALTER COLUMN description TYPE VARCHAR(1000);

UPDATE comments
SET description = LEFT(description, 1000)
WHERE LENGTH(description) > 1000;

ALTER TABLE comments
    ALTER COLUMN description TYPE VARCHAR(1000);
