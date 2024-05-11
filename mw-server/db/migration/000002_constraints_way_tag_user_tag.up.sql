ALTER TABLE "ways_way_tags"
ADD CONSTRAINT "way_uuid_way_tag_uuid_pkey" PRIMARY KEY (way_uuid, way_tag_uuid);


ALTER TABLE "users_user_tags"
ADD CONSTRAINT "user_uuid_user_tag_uuid_pkey" PRIMARY KEY (user_uuid, user_tag_uuid);