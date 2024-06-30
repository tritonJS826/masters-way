-- name: PopulateDb :exec
DO $$
BEGIN
INSERT INTO "users" ("uuid", "name", "email", "description", "image_url", "is_mentor", "firebase_id")
VALUES
    ('7cdb041b-4574-4f7b-a500-c53e74c72e94', 'John Doe', 'john.doe@example.com', 'A brief description about John.', 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fyandex.com%2Fimages%2F%3Flr%3D87%26redircnt%3D1694438178.1&psig=AOvVaw2zWpFWOHXwuTI0x6EM4vXB&ust=1719409370844000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCID3x67x9oYDFQAAAAAdAAAAABAE', false, '1'),
    ('8e77b89d-57c4-4b7f-8cd4-8dfc6bcb7d1b', 'Jane Smith', 'jane.smith@example.com', 'A brief description about Jane.','https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.gettyimages.com%2F&psig=AOvVaw2zWpFWOHXwuTI0x6EM4vXB&ust=1719409370844000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCID3x67x9oYDFQAAAAAdAAAAABAT', false, '2'),
    ('3d922e8a-5d58-4b82-9a3d-83e2e73b3f91', 'Alice Johnson', 'alice.johnson@example.com', 'A brief description about Alice.','https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.gettyimages.com%2F&psig=AOvVaw2zWpFWOHXwuTI0x6EM4vXB&ust=1719409370844000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCID3x67x9oYDFQAAAAAdAAAAABAT', true, '3'),
    ('d2cb5e1b-44df-48d3-b7a1-34f3d7a5b7e2', 'Bob Brown', 'bob.brown@example.com', 'A brief description about Bob.','https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.gettyimages.com%2F&psig=AOvVaw2zWpFWOHXwuTI0x6EM4vXB&ust=1719409370844000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCID3x67x9oYDFQAAAAAdAAAAABAT', false, '4'),
    ('5a31e3cb-7e9a-41e5-9a3b-1f1e5d6b7c3e', 'Charlie Davis', 'charlie.davis@example.com', 'A brief description about Charlie.','https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.gettyimages.com%2F&psig=AOvVaw2zWpFWOHXwuTI0x6EM4vXB&ust=1719409370844000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCID3x67x9oYDFQAAAAAdAAAAABAT', true, '5'),
    ('1b3d5e7f-5a1e-4d3a-b1a5-d1a1d5b7a7e1', 'Dana Evans', 'dana.evans@example.com', 'A brief description about Dana.','https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.gettyimages.com%2F&psig=AOvVaw2zWpFWOHXwuTI0x6EM4vXB&ust=1719409370844000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCID3x67x9oYDFQAAAAAdAAAAABAT', false, '6');

INSERT INTO "favorite_users" ("donor_user_uuid", "acceptor_user_uuid")
VALUES
    ('7cdb041b-4574-4f7b-a500-c53e74c72e94', '8e77b89d-57c4-4b7f-8cd4-8dfc6bcb7d1b'),
    ('3d922e8a-5d58-4b82-9a3d-83e2e73b3f91', 'd2cb5e1b-44df-48d3-b7a1-34f3d7a5b7e2'),
    ('5a31e3cb-7e9a-41e5-9a3b-1f1e5d6b7c3e','1b3d5e7f-5a1e-4d3a-b1a5-d1a1d5b7a7e1');

INSERT INTO "ways" ("uuid", "name", "goal_description", "estimation_time", "owner_uuid", "is_completed", "is_private")
VALUES
    ('550e8400-e29b-41d4-a716-446655440000', 'john doe way', 'john doe goal', 10101010, '7cdb041b-4574-4f7b-a500-c53e74c72e94', false, false),
    ('9e77b89d-57c4-4b7f-8cd4-8dfc6bcb7d1b', 'jane smith way', 'jane smith goal', 20202020, '8e77b89d-57c4-4b7f-8cd4-8dfc6bcb7d1b', true, false),
    ('1d922e8a-5d58-4b82-9a3d-83e2e73b3f91', 'alice johnson', 'alice johnson goal', 30303030, '3d922e8a-5d58-4b82-9a3d-83e2e73b3f91', false, true),
    ('32cb5e1b-44df-48d3-b7a1-34f3d7a5b7e2', 'bob brown way', 'bob brown goal', 40404040, 'd2cb5e1b-44df-48d3-b7a1-34f3d7a5b7e2', true, true),
    ('a2cb5e1b-44df-48d3-b7a1-34f3d7a5b7e2', 'dana evans way', 'dana evans goal', 40404040, '1b3d5e7f-5a1e-4d3a-b1a5-d1a1d5b7a7e1', true, true);

INSERT INTO "composite_ways" ("child_uuid", "parent_uuid")
VALUES
    ('550e8400-e29b-41d4-a716-446655440000', '9e77b89d-57c4-4b7f-8cd4-8dfc6bcb7d1b');

INSERT INTO "former_mentors_ways" ("former_mentor_uuid", "way_uuid")
VALUES
    ('1b3d5e7f-5a1e-4d3a-b1a5-d1a1d5b7a7e1', '1d922e8a-5d58-4b82-9a3d-83e2e73b3f91');

INSERT INTO "mentor_users_ways" ("user_uuid", "way_uuid")
VALUES
    ('3d922e8a-5d58-4b82-9a3d-83e2e73b3f91', '9e77b89d-57c4-4b7f-8cd4-8dfc6bcb7d1b');

INSERT INTO "favorite_users_ways" ("user_uuid", "way_uuid")
VALUES
    ('3d922e8a-5d58-4b82-9a3d-83e2e73b3f91', '9e77b89d-57c4-4b7f-8cd4-8dfc6bcb7d1b');

INSERT INTO "to_user_mentoring_requests" ("user_uuid", "way_uuid")
VALUES
    ('3d922e8a-5d58-4b82-9a3d-83e2e73b3f91', '9e77b89d-57c4-4b7f-8cd4-8dfc6bcb7d1b');

INSERT INTO "from_user_mentoring_requests" ("user_uuid", "way_uuid")
VALUES
    ('3d922e8a-5d58-4b82-9a3d-83e2e73b3f91', '9e77b89d-57c4-4b7f-8cd4-8dfc6bcb7d1b');

INSERT INTO "day_reports" ("uuid", "way_uuid", "is_day_off")
VALUES
    ('25ceb64e-7a57-4ce0-a4fd-45982d9fce38', '1d922e8a-5d58-4b82-9a3d-83e2e73b3f91', false),
    ('9b6e313a-b1be-46c2-a476-baa7c920918d', '550e8400-e29b-41d4-a716-446655440000', true);

INSERT INTO "job_tags" ("uuid", "name", "description", "color", "way_uuid")
VALUES
    ('d569aa06-452c-4602-a788-2ffca4c959a8', 'super tag', 'this is my testing tag','black', '32cb5e1b-44df-48d3-b7a1-34f3d7a5b7e2'),
    ('bf63a158-c3d9-40aa-bc0f-e6686e96de2c', 'super puper tag', 'this is not my testing tag', 'yellow', '32cb5e1b-44df-48d3-b7a1-34f3d7a5b7e2'),
    ('32cb5e1b-44df-48d3-b7a1-34f3d7a5b7e2', 'my tag', 'this is not my tag', 'green', '550e8400-e29b-41d4-a716-446655440000'),
    ('c73ff20b-e64e-4e5f-b270-1a40ba1bd81b', 'tttag', 'this is not my tag', 'blue', 'a2cb5e1b-44df-48d3-b7a1-34f3d7a5b7e2');

INSERT INTO "plans" ("uuid", "description", "time", "owner_uuid", "is_done", "day_report_uuid")
VALUES
    ('18cbbee6-5071-4608-b349-ffad514711cb', 'i want to eat', 400, '1b3d5e7f-5a1e-4d3a-b1a5-d1a1d5b7a7e1', false, '25ceb64e-7a57-4ce0-a4fd-45982d9fce38');

INSERT INTO "plans_job_tags" ("plan_uuid", "job_tag_uuid")
VALUES
    ('18cbbee6-5071-4608-b349-ffad514711cb', '32cb5e1b-44df-48d3-b7a1-34f3d7a5b7e2');

INSERT INTO "job_dones" ("uuid", "description", "time", "owner_uuid", "day_report_uuid")
VALUES
    ('8563a330-eedb-4e71-9abc-4db6fbabd13b', 'this is finished job description', 1000, '1b3d5e7f-5a1e-4d3a-b1a5-d1a1d5b7a7e1', '25ceb64e-7a57-4ce0-a4fd-45982d9fce38');

INSERT INTO "job_dones_job_tags" ("job_done_uuid", "job_tag_uuid")
VALUES
    ('8563a330-eedb-4e71-9abc-4db6fbabd13b', 'c73ff20b-e64e-4e5f-b270-1a40ba1bd81b');

INSERT INTO "problems" ("uuid", "description", "is_done", "owner_uuid", "day_report_uuid")
VALUES
    ('47ff13e9-aedc-47aa-9dad-d219fb92b694', 'this is the biggest problem we have faced so far', false, '1b3d5e7f-5a1e-4d3a-b1a5-d1a1d5b7a7e1', '25ceb64e-7a57-4ce0-a4fd-45982d9fce38');

INSERT INTO "problems_job_tags" ("problem_uuid", "job_tag_uuid")
VALUES
    ('47ff13e9-aedc-47aa-9dad-d219fb92b694', 'c73ff20b-e64e-4e5f-b270-1a40ba1bd81b');

INSERT INTO "comments" ("uuid", "description", "owner_uuid", "day_report_uuid")
VALUES
    ('f6334156-b08b-434b-b983-f8b11e422804', 'this is amazing!!', '1b3d5e7f-5a1e-4d3a-b1a5-d1a1d5b7a7e1', '25ceb64e-7a57-4ce0-a4fd-45982d9fce38');

INSERT INTO "way_collections" ("uuid", "owner_uuid", "name", "type")
VALUES
    ('30dbf616-b055-4d65-8c0c-e6a913fc119a', '1b3d5e7f-5a1e-4d3a-b1a5-d1a1d5b7a7e1', 'new collection', 'sometype');

INSERT INTO "way_collections_ways" ("way_collection_uuid", "way_uuid")
VALUES
    ('30dbf616-b055-4d65-8c0c-e6a913fc119a', 'a2cb5e1b-44df-48d3-b7a1-34f3d7a5b7e2');

INSERT INTO "way_tags" ("uuid", "name")
VALUES
    ('46d5dd00-75fc-4563-9616-5252a6fa05d3', 'some tag');

INSERT INTO "ways_way_tags" ("way_uuid", "way_tag_uuid")
VALUES
    ('a2cb5e1b-44df-48d3-b7a1-34f3d7a5b7e2', '46d5dd00-75fc-4563-9616-5252a6fa05d3');

INSERT INTO "user_tags" ("uuid", "name")
VALUES
    ('8749d799-0a89-4ffd-b1bd-02ada9234e5a', 'some tag');

INSERT INTO "users_user_tags" ("user_uuid", "user_tag_uuid")
VALUES
    ('1b3d5e7f-5a1e-4d3a-b1a5-d1a1d5b7a7e1', '8749d799-0a89-4ffd-b1bd-02ada9234e5a');

INSERT INTO "profile_settings" ("uuid", "pricing_plan", "owner_uuid")
VALUES
    ('07dfa820-a4b2-4a42-b079-405376b240e7', 'pro', '1b3d5e7f-5a1e-4d3a-b1a5-d1a1d5b7a7e1');
END $$;
