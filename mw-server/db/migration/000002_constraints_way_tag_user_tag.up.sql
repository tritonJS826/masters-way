-- remove duplicate pairs
DELETE FROM "users_user_tags"
WHERE ctid NOT IN (
    SELECT ctid
    FROM (
        SELECT ctid,
               ROW_NUMBER() OVER (PARTITION BY user_uuid, user_tag_uuid ORDER BY ctid) AS rn
        FROM "users_user_tags"
    ) AS t
    WHERE rn = 1
);

-- remove duplicate pairs
DELETE FROM "ways_way_tags"
WHERE ctid NOT IN (
    SELECT ctid
    FROM (
        SELECT ctid,
               ROW_NUMBER() OVER (PARTITION BY way_uuid, way_tag_uuid ORDER BY ctid) AS rn
        FROM "ways_way_tags"
    ) AS t
    WHERE rn = 1
);

ALTER TABLE "ways_way_tags"
ADD CONSTRAINT "way_uuid_way_tag_uuid_pkey" PRIMARY KEY (way_uuid, way_tag_uuid);


ALTER TABLE "users_user_tags"
ADD CONSTRAINT "user_uuid_user_tag_uuid_pkey" PRIMARY KEY (user_uuid, user_tag_uuid);