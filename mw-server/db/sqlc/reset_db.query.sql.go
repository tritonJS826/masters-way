// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.27.0
// source: reset_db.query.sql

package db

import (
	"context"
)

const regenerateDbData = `-- name: RegenerateDbData :exec
DO $$
BEGIN
INSERT INTO "users" ("uuid", "name", "email", "description", "image_url", "is_mentor")
VALUES
    ('7cdb041b-4574-4f7b-a500-c53e74c72e94', 'John Doe', 'john.doe@example.com', 'A brief description about John.', 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fyandex.com%2Fimages%2F%3Flr%3D87%26redircnt%3D1694438178.1&psig=AOvVaw2zWpFWOHXwuTI0x6EM4vXB&ust=1719409370844000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCID3x67x9oYDFQAAAAAdAAAAABAE', false),
    ('8e77b89d-57c4-4b7f-8cd4-8dfc6bcb7d1b', 'Jane Smith', 'jane.smith@example.com', 'A brief description about Jane.','https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.gettyimages.com%2F&psig=AOvVaw2zWpFWOHXwuTI0x6EM4vXB&ust=1719409370844000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCID3x67x9oYDFQAAAAAdAAAAABAT', true),
    ('3d922e8a-5d58-4b82-9a3d-83e2e73b3f91', 'Alice Johnson', 'alice.johnson@example.com', 'A brief description about Alice.','https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.gettyimages.com%2F&psig=AOvVaw2zWpFWOHXwuTI0x6EM4vXB&ust=1719409370844000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCID3x67x9oYDFQAAAAAdAAAAABAT', true),
    ('d2cb5e1b-44df-48d3-b7a1-34f3d7a5b7e2', 'Bob Brown', 'bob.brown@example.com', 'A brief description about Bob.','https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.gettyimages.com%2F&psig=AOvVaw2zWpFWOHXwuTI0x6EM4vXB&ust=1719409370844000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCID3x67x9oYDFQAAAAAdAAAAABAT', false),
    ('5a31e3cb-7e9a-41e5-9a3b-1f1e5d6b7c3e', 'Charlie Davis', 'charlie.davis@example.com', 'A brief description about Charlie.','https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.gettyimages.com%2F&psig=AOvVaw2zWpFWOHXwuTI0x6EM4vXB&ust=1719409370844000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCID3x67x9oYDFQAAAAAdAAAAABAT', true),
    ('d63d2f89-6412-4324-8587-7061bf02dca4', 'Ronnie Stanton', 'ronnie.stanton@example.com', 'A brief description about Ronnie.','https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.gettyimages.com%2F&psig=AOvVaw2zWpFWOHXwuTI0x6EM4vXB&ust=1719409370844000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCID3x67x9oYDFQAAAAAdAAAAABAN', false),
    ('1b3d5e7f-5a1e-4d3a-b1a5-d1a1d5b7a7e1', 'Dana Evans', 'dana.evans@example.com', 'A brief description about Dana.','https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.gettyimages.com%2F&psig=AOvVaw2zWpFWOHXwuTI0x6EM4vXB&ust=1719409370844000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCID3x67x9oYDFQAAAAAdAAAAABAT', true),
    ('956d5d97-a977-433a-b872-a2fcf76f3876', 'Simon Abramowitz', 'simon.abramowitz@example.com', 'A brief description about Simon.','https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.gettyimages.com%2F&psig=AOvVaw2zWpFWOHXwuTI0x6EM4vXB&ust=1719409370844000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCID3x67x9oYDFQAAAAAdAAAAABAD', false),
    ('c31384a6-b811-4a1f-befa-95dd53e3f4b9', 'Celine Vinje', 'celine.vinje@example.com', 'A brief description about Celine.','https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.gettyimages.com%2F&psig=AOvVaw2zWpFWOHXwuTI0x6EM4vXB&ust=1719409370844000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCID3x67x9oYDFQAAAAAdAAAAABAF', false),
    ('45bf9107-83fd-4fc4-8173-a13b8a100f2a', 'Bernardo Fallaci', 'bernardo.fallaci@example.com', 'A brief description about Bernardo.','https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.gettyimages.com%2F&psig=AOvVaw2zWpFWOHXwuTI0x6EM4vXB&ust=1719409370844000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCID3x67x9oYDFQAAAAAdAAAAABAG', false),
    ('2acf611e-a814-49c0-9bed-7aecc25c8f8f', 'Huỳnh Xuân Chung', 'huỳnh.chung@example.com', 'A brief description about Huỳnh.','https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.gettyimages.com%2F&psig=AOvVaw2zWpFWOHXwuTI0x6EM4vXB&ust=1719409370844000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCID3x67x9oYDFQAAAAAdAAAAABAH', true),
    ('8a3d1fe1-42da-499a-bf64-248297fd670a', 'Genowefa Kwiatkowska', 'genowefa.kwiatkowska@example.com', 'A brief description about Genowefa.','https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.gettyimages.com%2F&psig=AOvVaw2zWpFWOHXwuTI0x6EM4vXB&ust=1719409370844000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCID3x67x9oYDFQAAAAAdAAAAABAJ', true);

INSERT INTO "favorite_users" ("donor_user_uuid", "acceptor_user_uuid")
VALUES
    ('7cdb041b-4574-4f7b-a500-c53e74c72e94', '8e77b89d-57c4-4b7f-8cd4-8dfc6bcb7d1b'),
    ('3d922e8a-5d58-4b82-9a3d-83e2e73b3f91', 'd2cb5e1b-44df-48d3-b7a1-34f3d7a5b7e2'),
    ('5a31e3cb-7e9a-41e5-9a3b-1f1e5d6b7c3e','1b3d5e7f-5a1e-4d3a-b1a5-d1a1d5b7a7e1');

INSERT INTO "ways" ("uuid", "name", "goal_description", "estimation_time", "owner_uuid", "is_completed", "is_private")
VALUES
    ('9972552a-c0b3-41f3-b464-284d36a36964', 'ronnie stanton way', 'ronnie stanton goal', 40404040, 'd63d2f89-6412-4324-8587-7061bf02dca4', false, false),
    ('550e8400-e29b-41d4-a716-446655440000', 'john doe way', 'john doe goal', 10101010, '7cdb041b-4574-4f7b-a500-c53e74c72e94', false, false),
    ('d689c31b-167f-4745-bfbd-c1461cb28be8', 'john doe way 1', 'john doe goal 1', 10101010, '7cdb041b-4574-4f7b-a500-c53e74c72e94', false, false),
    ('9e77b89d-57c4-4b7f-8cd4-8dfc6bcb7d1b', 'jane smith way', 'jane smith goal', 20202020, '8e77b89d-57c4-4b7f-8cd4-8dfc6bcb7d1b', true, false),
    ('dce03ca6-f626-4c33-a44b-5a1b4ff62aa7', 'jane smith way 1', 'jane smith goal 1', 20202020, '8e77b89d-57c4-4b7f-8cd4-8dfc6bcb7d1b', false, false),
    ('1d922e8a-5d58-4b82-9a3d-83e2e73b3f91', 'alice johnson', 'alice johnson goal', 30303030, '3d922e8a-5d58-4b82-9a3d-83e2e73b3f91', false, true),
    ('5cc724a0-383f-45ad-99a1-8514f51717f2', 'alice johnson 1', 'alice johnson goal 1', 30303030, '3d922e8a-5d58-4b82-9a3d-83e2e73b3f91', false, false),
    ('78f86c77-2018-4511-90dc-d96df77f496a', 'alice johnson 2', 'alice johnson goal 2', 30303030, '3d922e8a-5d58-4b82-9a3d-83e2e73b3f91', false, false),
    ('32cb5e1b-44df-48d3-b7a1-34f3d7a5b7e2', 'bob brown way', 'bob brown goal', 40404040, 'd2cb5e1b-44df-48d3-b7a1-34f3d7a5b7e2', true, true),
    ('77482c3f-cae6-494d-be1d-d06c1e84450b', 'bob brown way 1', 'bob brown goal 1', 40404040, 'd2cb5e1b-44df-48d3-b7a1-34f3d7a5b7e2', false, false),
    ('77a9e7c4-edb4-4b61-8065-cfd0c5c2506d', 'bob brown way 2', 'bob brown goal 2', 40404040, 'd2cb5e1b-44df-48d3-b7a1-34f3d7a5b7e2', false, false),
    ('e030b296-fa2d-48aa-af0d-c43aa138ee46', 'dana evans way', 'dana evans goal', 40404040, '1b3d5e7f-5a1e-4d3a-b1a5-d1a1d5b7a7e1', true, true),
    ('a2cb5e1b-44df-48d3-b7a1-34f3d7a5b7e2', 'dana evans way 1', 'dana evans goal 1', 40404040, '1b3d5e7f-5a1e-4d3a-b1a5-d1a1d5b7a7e1', false, false),
    ('aa13eee9-7dca-46ed-a3f7-21d8b7ae3b72', 'dana evans way 2', 'dana evans goal 2', 40404040, '1b3d5e7f-5a1e-4d3a-b1a5-d1a1d5b7a7e1', false, false),
    ('9230479a-a481-4f83-b770-138ef4f3139c', 'dana evans way 3', 'dana evans goal 3', 40404040, '1b3d5e7f-5a1e-4d3a-b1a5-d1a1d5b7a7e1', true, false);

INSERT INTO "composite_ways" ("child_uuid", "parent_uuid")
VALUES
    ('550e8400-e29b-41d4-a716-446655440000', '9e77b89d-57c4-4b7f-8cd4-8dfc6bcb7d1b');

INSERT INTO "former_mentors_ways" ("former_mentor_uuid", "way_uuid")
VALUES
    ('1b3d5e7f-5a1e-4d3a-b1a5-d1a1d5b7a7e1', '1d922e8a-5d58-4b82-9a3d-83e2e73b3f91');

INSERT INTO "mentor_users_ways" ("user_uuid", "way_uuid")
VALUES
    ('8e77b89d-57c4-4b7f-8cd4-8dfc6bcb7d1b', '77482c3f-cae6-494d-be1d-d06c1e84450b'),
    ('1b3d5e7f-5a1e-4d3a-b1a5-d1a1d5b7a7e1', '77482c3f-cae6-494d-be1d-d06c1e84450b'),
    ('8e77b89d-57c4-4b7f-8cd4-8dfc6bcb7d1b', 'dce03ca6-f626-4c33-a44b-5a1b4ff62aa7'),
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
END $$
`

func (q *Queries) RegenerateDbData(ctx context.Context) error {
	_, err := q.db.Exec(ctx, regenerateDbData)
	return err
}

const removeEverything = `-- name: RemoveEverything :exec
DO $$ DECLARE
    obj_name text;
    obj_type text;
    -- Exclude functions related to extension uuid-ossp
    exclude_functions text[] := ARRAY[
        'uuid_nil',
        'uuid_ns_dns',
        'uuid_ns_url',
        'uuid_ns_oid',
        'uuid_ns_x500',
        'uuid_generate_v1',
        'uuid_generate_v1mc',
        'uuid_generate_v3',
        'uuid_generate_v4',
        'uuid_generate_v5'
    ];
BEGIN
    -- Drop all tables
    FOR obj_name IN (SELECT tablename FROM pg_tables WHERE schemaname = 'public' AND tablename != 'schema_migrations') LOOP
        EXECUTE 'DROP TABLE IF EXISTS ' || obj_name || ' CASCADE;';
    END LOOP;

    -- Drop all sequences
    FOR obj_name IN (SELECT sequencename FROM pg_sequences WHERE schemaname = 'public') LOOP
        EXECUTE 'DROP SEQUENCE IF EXISTS ' || obj_name || ' CASCADE;';
    END LOOP;

    -- Drop all views
    FOR obj_name IN (SELECT viewname FROM pg_views WHERE schemaname = 'public') LOOP
        EXECUTE 'DROP VIEW IF EXISTS ' || obj_name || ' CASCADE;';
    END LOOP;

    -- Drop all materialized views
    FOR obj_name IN (SELECT matviewname FROM pg_matviews WHERE schemaname = 'public') LOOP
        EXECUTE 'DROP MATERIALIZED VIEW IF EXISTS ' || obj_name || ' CASCADE;';
    END LOOP;

   -- Drop all functions except 'uuid_nil'
    FOR obj_name, obj_type IN
        SELECT proname, 'FUNCTION'
        FROM pg_proc
        JOIN pg_namespace ON pg_proc.pronamespace = pg_namespace.oid
        WHERE nspname = 'public' AND proname NOT IN (SELECT unnest(exclude_functions))
    LOOP
        EXECUTE 'DROP FUNCTION IF EXISTS ' || obj_name || ' CASCADE;';
    END LOOP;

    -- Drop all types except 'schema_migrations' and 'schema_migrations[]'
    FOR obj_name IN (SELECT typname FROM pg_type WHERE typnamespace = 'public'::regnamespace AND typname NOT IN ('schema_migrations', 'schema_migrations[]')) LOOP
        BEGIN
            EXECUTE 'DROP TYPE IF EXISTS ' || obj_name || ' CASCADE;';
        EXCEPTION
            WHEN others THEN
                RAISE NOTICE 'Could not drop type %', obj_name;
        END;
    END LOOP;

    -- Drop all domains
    FOR obj_name IN (SELECT domain_name FROM information_schema.domains WHERE domain_schema = 'public') LOOP
        EXECUTE 'DROP DOMAIN IF EXISTS ' || obj_name || ' CASCADE;';
    END LOOP;

    -- Drop all foreign tables
    FOR obj_name IN (SELECT foreign_table_name FROM information_schema.foreign_tables WHERE foreign_table_schema = 'public') LOOP
        EXECUTE 'DROP FOREIGN TABLE IF EXISTS ' || obj_name || ' CASCADE;';
    END LOOP;
END $$
`

func (q *Queries) RemoveEverything(ctx context.Context) error {
	_, err := q.db.Exec(ctx, removeEverything)
	return err
}
