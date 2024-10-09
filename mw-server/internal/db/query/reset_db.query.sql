-- name: RemoveEverything :exec
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
END $$;

-- name: RegenerateDbData :exec
DO $$
BEGIN
INSERT INTO "users" ("uuid", "name", "email", "description", "image_url", "is_mentor", "created_at")
VALUES
    ('7cdb041b-4574-4f7b-a500-c53e74c72e94', 'John Doe', 'john.doe@example.com', 'A brief description about John.', 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fyandex.com%2Fimages%2F%3Flr%3D87%26redircnt%3D1694438178.1&psig=AOvVaw2zWpFWOHXwuTI0x6EM4vXB&ust=1719409370844000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCID3x67x9oYDFQAAAAAdAAAAABAE', false , '2024-07-08 10:00:00'),
    ('8e77b89d-57c4-4b7f-8cd4-8dfc6bcb7d1b', 'Jane Smith', 'jane.smith@example.com', 'A brief description about Jane.','https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.gettyimages.com%2F&psig=AOvVaw2zWpFWOHXwuTI0x6EM4vXB&ust=1719409370844000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCID3x67x9oYDFQAAAAAdAAAAABAT', true, '2024-07-08 05:50:00'),
    ('3d922e8a-5d58-4b82-9a3d-83e2e73b3f91', 'Alice Johnson', 'alice.johnson@example.com', 'A brief description about Alice.','https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.gettyimages.com%2F&psig=AOvVaw2zWpFWOHXwuTI0x6EM4vXB&ust=1719409370844000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCID3x67x9oYDFQAAAAAdAAAAABAT', true, '2024-07-08 05:10:00'),
    ('d2cb5e1b-44df-48d3-b7a1-34f3d7a5b7e2', 'Bob Brown', 'bob.brown@example.com', 'A brief description about Bob.','https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.gettyimages.com%2F&psig=AOvVaw2zWpFWOHXwuTI0x6EM4vXB&ust=1719409370844000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCID3x67x9oYDFQAAAAAdAAAAABAT', false, '2024-07-07 00:40:00'),
    ('5a31e3cb-7e9a-41e5-9a3b-1f1e5d6b7c3e', 'Charlie Davis', 'charlie.davis@example.com', 'A brief description about Charlie.','https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.gettyimages.com%2F&psig=AOvVaw2zWpFWOHXwuTI0x6EM4vXB&ust=1719409370844000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCID3x67x9oYDFQAAAAAdAAAAABAT', true, '2024-07-06 21:00:00'),
    ('d63d2f89-6412-4324-8587-7061bf02dca4', 'Ronnie Stanton', 'ronnie.stanton@example.com', 'A brief description about Ronnie.','https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.gettyimages.com%2F&psig=AOvVaw2zWpFWOHXwuTI0x6EM4vXB&ust=1719409370844000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCID3x67x9oYDFQAAAAAdAAAAABAN', false, '2024-07-06 10:00:00'),
    ('1b3d5e7f-5a1e-4d3a-b1a5-d1a1d5b7a7e1', 'Dana Evans', 'dana.evans@example.com', 'A brief description about Dana.','https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.gettyimages.com%2F&psig=AOvVaw2zWpFWOHXwuTI0x6EM4vXB&ust=1719409370844000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCID3x67x9oYDFQAAAAAdAAAAABAT', true, '2024-07-06 05:00:00'),
    ('956d5d97-a977-433a-b872-a2fcf76f3876', 'Simon Abramowitz', 'simon.abramowitz@example.com', 'A brief description about Simon.','https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.gettyimages.com%2F&psig=AOvVaw2zWpFWOHXwuTI0x6EM4vXB&ust=1719409370844000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCID3x67x9oYDFQAAAAAdAAAAABAD', false, '2024-07-05 04:00:00'),
    ('c31384a6-b811-4a1f-befa-95dd53e3f4b9', 'Celine Vinje', 'celine.vinje@example.com', 'A brief description about Celine.','https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.gettyimages.com%2F&psig=AOvVaw2zWpFWOHXwuTI0x6EM4vXB&ust=1719409370844000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCID3x67x9oYDFQAAAAAdAAAAABAF', false, '2024-07-04 03:00:00'),
    ('45bf9107-83fd-4fc4-8173-a13b8a100f2a', 'Bernardo Fallaci', 'bernardo.fallaci@example.com', 'A brief description about Bernardo.','https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.gettyimages.com%2F&psig=AOvVaw2zWpFWOHXwuTI0x6EM4vXB&ust=1719409370844000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCID3x67x9oYDFQAAAAAdAAAAABAG', false, '2024-07-03 01:00:00'),
    ('2acf611e-a814-49c0-9bed-7aecc25c8f8f', 'Huỳnh Xuân Chung', 'huỳnh.chung@example.com', 'A brief description about Huỳnh.','https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.gettyimages.com%2F&psig=AOvVaw2zWpFWOHXwuTI0x6EM4vXB&ust=1719409370844000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCID3x67x9oYDFQAAAAAdAAAAABAH', true, '2024-07-02 00:50:00'),
    ('8a3d1fe1-42da-499a-bf64-248297fd670a', 'Genowefa Kwiatkowska', 'genowefa.kwiatkowska@example.com', 'A brief description about Genowefa.','https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.gettyimages.com%2F&psig=AOvVaw2zWpFWOHXwuTI0x6EM4vXB&ust=1719409370844000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCID3x67x9oYDFQAAAAAdAAAAABAJ', true, '2024-07-01 10:10:00');

INSERT INTO "favorite_users" ("donor_user_uuid", "acceptor_user_uuid")
VALUES
    ('7cdb041b-4574-4f7b-a500-c53e74c72e94', '8e77b89d-57c4-4b7f-8cd4-8dfc6bcb7d1b'),
    ('3d922e8a-5d58-4b82-9a3d-83e2e73b3f91', 'd2cb5e1b-44df-48d3-b7a1-34f3d7a5b7e2'),
    ('5a31e3cb-7e9a-41e5-9a3b-1f1e5d6b7c3e','1b3d5e7f-5a1e-4d3a-b1a5-d1a1d5b7a7e1');

INSERT INTO "ways" ("uuid", "name", "goal_description", "estimation_time", "owner_uuid", "is_completed", "is_private", "created_at", "updated_at")
VALUES
    ('9972552a-c0b3-41f3-b464-284d36a36964', 'ronnie stanton way', 'ronnie stanton goal', 40404040, 'd63d2f89-6412-4324-8587-7061bf02dca4', false, false, '2024-07-09 00:00:00', '2024-07-09 00:00:00'),
    ('550e8400-e29b-41d4-a716-446655440000', 'john doe way', 'john doe goal', 10101010, '7cdb041b-4574-4f7b-a500-c53e74c72e94', false, false, '2024-07-09 00:00:00', '2024-07-09 00:00:00'),
    ('54910bd4-ad28-44f4-a669-f233861cf816', 'john doe way 1', 'john doe goal 1', 10101010, '7cdb041b-4574-4f7b-a500-c53e74c72e94', false, false, '2024-07-09 00:00:00', '2024-07-09 00:00:00'),
    ('d6d46085-8ce6-4df1-8463-3e469c240076', 'john doe composite way 1', 'john doe composite way', 10101010, '7cdb041b-4574-4f7b-a500-c53e74c72e94', false, false, '2024-07-09 00:00:00', '2024-07-09 00:00:00'),
    ('a73c4484-0a44-4e57-8183-aea93a4ccbbb', 'john doe composite way', 'john doe composite way', 10101010, '7cdb041b-4574-4f7b-a500-c53e74c72e94', false, false, '2024-07-09 00:00:00', '2024-07-09 00:00:00'),
    ('9e77b89d-57c4-4b7f-8cd4-8dfc6bcb7d1b', 'jane smith way', 'jane smith goal', 20202020, '8e77b89d-57c4-4b7f-8cd4-8dfc6bcb7d1b', true, false, '2024-07-09 00:00:00', '2024-07-09 00:00:00'),
    ('dce03ca6-f626-4c33-a44b-5a1b4ff62aa7', 'jane smith way 1', 'jane smith goal 1', 20202020, '8e77b89d-57c4-4b7f-8cd4-8dfc6bcb7d1b', false, false, '2024-07-09 00:00:00', '2024-07-09 00:00:00'),
    ('32cb5e1b-44df-48d3-b7a1-34f3d7a5b7e2', 'bob brown way', 'bob brown goal', 40404040, 'd2cb5e1b-44df-48d3-b7a1-34f3d7a5b7e2', true, true, '2024-07-09 00:00:00', '2024-07-09 00:00:00'),
    ('77482c3f-cae6-494d-be1d-d06c1e84450b', 'bob brown way 1', 'bob brown goal 1', 40404040, 'd2cb5e1b-44df-48d3-b7a1-34f3d7a5b7e2', false, false, '2024-07-09 00:00:00', '2024-07-09 00:00:00'),
    ('77a9e7c4-edb4-4b61-8065-cfd0c5c2506d', 'bob brown way 2', 'bob brown goal 2', 40404040, 'd2cb5e1b-44df-48d3-b7a1-34f3d7a5b7e2', false, false, '2024-07-09 00:00:00', '2024-07-09 00:00:00'),
    ('e030b296-fa2d-48aa-af0d-c43aa138ee46', 'dana evans way', 'dana evans goal', 40404040, '1b3d5e7f-5a1e-4d3a-b1a5-d1a1d5b7a7e1', true, true, '2024-07-09 00:00:00', '2024-07-09 00:00:00'),
    ('1d922e8a-5d58-4b82-9a3d-83e2e73b3f91', 'alice johnson', 'alice johnson goal', 30303030, '3d922e8a-5d58-4b82-9a3d-83e2e73b3f91', false, true, '2024-07-22 00:00:00', '2024-07-22 00:00:00'),
    ('5cc724a0-383f-45ad-99a1-8514f51717f2', 'alice johnson 1', 'alice johnson goal 1', 30303030, '3d922e8a-5d58-4b82-9a3d-83e2e73b3f91', false, false, '2024-07-22 00:00:00', '2024-07-22 00:00:00'),
    ('78f86c77-2018-4511-90dc-d96df77f496a', 'alice johnson 2', 'alice johnson goal 2', 30303030, '3d922e8a-5d58-4b82-9a3d-83e2e73b3f91', false, false, '2024-07-22 00:00:00', '2024-07-22 00:00:00'),
    ('a2cb5e1b-44df-48d3-b7a1-34f3d7a5b7e2', 'dana evans way 1', 'dana evans goal 1', 40404040, '1b3d5e7f-5a1e-4d3a-b1a5-d1a1d5b7a7e1', false, false, '2024-08-10 00:00:00', '2024-08-10 00:00:00'),
    ('aa13eee9-7dca-46ed-a3f7-21d8b7ae3b72', 'dana evans way 2', 'dana evans goal 2', 40404040, '1b3d5e7f-5a1e-4d3a-b1a5-d1a1d5b7a7e1', false, false, '2024-08-10 00:00:00', '2024-08-10 00:00:00'),
    ('9230479a-a481-4f83-b770-138ef4f3139c', 'dana evans way 3', 'dana evans goal 3', 40404040, '1b3d5e7f-5a1e-4d3a-b1a5-d1a1d5b7a7e1', true, false, '2024-08-10 00:00:00', '2024-08-10 00:00:00');

INSERT INTO "composite_ways" ("child_uuid", "parent_uuid")
VALUES
    ('550e8400-e29b-41d4-a716-446655440000', '9e77b89d-57c4-4b7f-8cd4-8dfc6bcb7d1b'),
    ('550e8400-e29b-41d4-a716-446655440000', 'd6d46085-8ce6-4df1-8463-3e469c240076'),
    ('54910bd4-ad28-44f4-a669-f233861cf816', 'd6d46085-8ce6-4df1-8463-3e469c240076');


INSERT INTO "former_mentors_ways" ("former_mentor_uuid", "way_uuid")
VALUES
    ('45bf9107-83fd-4fc4-8173-a13b8a100f2a', '550e8400-e29b-41d4-a716-446655440000'),
    ('1b3d5e7f-5a1e-4d3a-b1a5-d1a1d5b7a7e1', '1d922e8a-5d58-4b82-9a3d-83e2e73b3f91');

INSERT INTO "mentor_users_ways" ("user_uuid", "way_uuid")
VALUES
    ('8e77b89d-57c4-4b7f-8cd4-8dfc6bcb7d1b', '77482c3f-cae6-494d-be1d-d06c1e84450b'),
    ('d63d2f89-6412-4324-8587-7061bf02dca4', '550e8400-e29b-41d4-a716-446655440000'),
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
    ('3d922e8a-5d58-4b82-9a3d-83e2e73b3f91', '32cb5e1b-44df-48d3-b7a1-34f3d7a5b7e2');

INSERT INTO "day_reports" ("uuid", "way_uuid", "created_at", "updated_at")
VALUES
    ('25ceb64e-7a57-4ce0-a4fd-45982d9fce38', '1d922e8a-5d58-4b82-9a3d-83e2e73b3f91', '2024-08-01 00:00:00', '2024-08-01 00:00:00'),

    ('f69235e1-41bc-41cc-b856-6dd21092c708', '54910bd4-ad28-44f4-a669-f233861cf816', '2024-07-18 09:20:00', '2024-07-18 09:20:00'),
    ('8079ab4b-23eb-4af6-9be5-d8565b9403b1', '54910bd4-ad28-44f4-a669-f233861cf816', '2024-07-19 10:10:00', '2024-07-19 10:10:00'),
    ('bad7eb6a-74ee-4362-b9f3-98ea85088879', '54910bd4-ad28-44f4-a669-f233861cf816', '2024-07-20 18:50:00', '2024-07-20 18:50:00'),
    ('87df94c2-a6f3-483d-9170-61eee19d4bfa', '54910bd4-ad28-44f4-a669-f233861cf816', '2024-07-21 19:05:00', '2024-07-21 19:05:00'),
    ('9b8ef40c-6907-43de-84eb-789ee87789a7', '54910bd4-ad28-44f4-a669-f233861cf816', '2024-08-01 00:00:00', '2024-08-01 00:00:00'),
    ('aaeb7ef1-5a23-4be3-8df7-0f1357329879', '54910bd4-ad28-44f4-a669-f233861cf816', '2024-08-03 00:00:00', '2024-08-03 00:00:00'),
    ('a3a4f61b-2f96-403e-8f66-bfa83e66aad6', '54910bd4-ad28-44f4-a669-f233861cf816', '2024-08-05 00:00:00', '2024-08-05 00:00:00'),
    ('5fe76d7d-5954-4f2d-bce8-4b3839c26832', '54910bd4-ad28-44f4-a669-f233861cf816', '2024-08-16 00:00:00', '2024-08-16 00:00:00'),

    ('8a3c9946-0933-4444-a456-0972adc2a25b', '550e8400-e29b-41d4-a716-446655440000', '2024-08-01 00:00:00', '2024-08-01 00:00:00'),
    ('3df20f1b-f3af-40f5-9b69-d879cd1a6896', '550e8400-e29b-41d4-a716-446655440000', '2024-08-03 00:00:00', '2024-08-03 00:00:00'),
    ('3aef1def-af0c-48dc-9428-0777a5523f9a', '550e8400-e29b-41d4-a716-446655440000', '2024-08-05 00:00:00', '2024-08-05 00:00:00'),
    ('32b1209e-aa60-493c-b7d2-ccfbca1ff065', '550e8400-e29b-41d4-a716-446655440000', '2024-08-07 00:00:00', '2024-08-07 00:00:00'),
    ('47284e2a-23aa-4c1e-955f-eeeb5353bbb7', '550e8400-e29b-41d4-a716-446655440000', '2024-08-09 00:00:00', '2024-08-09 00:00:00'),
    ('1f6ac00e-80e9-4108-b707-d62259b9f07f', '550e8400-e29b-41d4-a716-446655440000', '2024-08-11 00:00:00', '2024-08-11 00:00:00'),
    ('9c184a1c-0287-4fec-a5cf-9d13d6215a29', '550e8400-e29b-41d4-a716-446655440000', '2024-08-13 00:00:00', '2024-08-13 00:00:00'),
    ('0c592a97-998b-48cb-a693-592373ac70de', '550e8400-e29b-41d4-a716-446655440000', '2024-08-15 00:00:00', '2024-08-15 00:00:00'),

    ('1c4b7914-a249-4397-82e6-5099d0ff6454', 'd6d46085-8ce6-4df1-8463-3e469c240076', '2024-08-16 00:00:00', '2024-08-16 00:00:00'),

    ('e48a661a-b5ce-4117-b70a-9cdd5a840fc5', '9230479a-a481-4f83-b770-138ef4f3139c', '2024-08-11 00:00:00', '2024-08-11 00:00:00'),
    ('7d563ccb-15fc-4d5a-b0cb-27ec86e052ab', '9230479a-a481-4f83-b770-138ef4f3139c', '2024-08-14 00:00:00', '2024-08-14 00:00:00');

INSERT INTO "job_tags" ("uuid", "name", "description", "color", "way_uuid")
VALUES
    ('d569aa06-452c-4602-a788-2ffca4c959a8', 'super tag', 'this is my testing tag','black', '32cb5e1b-44df-48d3-b7a1-34f3d7a5b7e2'),
    ('bf63a158-c3d9-40aa-bc0f-e6686e96de2c', 'super puper tag', 'this is not my testing tag', 'orange', '32cb5e1b-44df-48d3-b7a1-34f3d7a5b7e2'),

    ('e593e6ed-c078-4a36-a1fa-721d8a0c7829', 'sql', 'this is not my tag', 'green', '54910bd4-ad28-44f4-a669-f233861cf816'),
    ('04fc3f3d-b6ce-40e6-8d94-d6f2bf275eff', 'coding time', 'this is not my tag', 'blue', '54910bd4-ad28-44f4-a669-f233861cf816'),
    ('a541719a-153e-44cf-88ff-f21a4e8d081b', 'meeting', 'this is not my tag', 'red', '54910bd4-ad28-44f4-a669-f233861cf816'),
    ('5f7b8084-e8b3-4963-bfa2-491d5ee07f5a', 'group meeting', 'this is not my tag', 'yellow', '54910bd4-ad28-44f4-a669-f233861cf816'),

    ('5ebb8d43-b685-4090-8453-ceaa7aad2095', 'database', 'this is not my tag', 'green', '550e8400-e29b-41d4-a716-446655440000'),
    ('c73ff20b-e64e-4e5f-b270-1a40ba1bd81b', 'coding', 'this is not my tag', 'blue', '550e8400-e29b-41d4-a716-446655440000'),
    ('60e7860d-58d9-4035-93d0-9bb825fe734c', 'meeting 1:1', 'this is not my tag', 'red', '550e8400-e29b-41d4-a716-446655440000'),
    ('2461357d-f2f0-43a7-9f1d-79fd1eaa64f5', 'general meeting', 'this is not my tag', 'yellow', '550e8400-e29b-41d4-a716-446655440000'),

    ('b65b5720-4011-49ab-bf1f-ca8e2b87d88c', 'test label 1', 'this is not my tag', 'red', 'd6d46085-8ce6-4df1-8463-3e469c240076'),

    ('60c1d2ff-37ea-4a30-978b-c3d633317370', 'test label 2', 'this is not my tag', 'green', '1d922e8a-5d58-4b82-9a3d-83e2e73b3f91');

INSERT INTO "plans" ("uuid", "description", "time", "owner_uuid", "is_done", "day_report_uuid", "created_at", "updated_at")
VALUES
    ('18cbbee6-5071-4608-b349-ffad514711cb', 'i want to eat', 400, '1b3d5e7f-5a1e-4d3a-b1a5-d1a1d5b7a7e1', false, '25ceb64e-7a57-4ce0-a4fd-45982d9fce38', '2024-08-01 00:00:00', '2024-08-01 00:00:00');

INSERT INTO "plans_job_tags" ("plan_uuid", "job_tag_uuid")
VALUES
    ('18cbbee6-5071-4608-b349-ffad514711cb', '60c1d2ff-37ea-4a30-978b-c3d633317370');

INSERT INTO "job_dones" ("uuid", "description", "time", "owner_uuid", "day_report_uuid", "created_at", "updated_at")
VALUES
    ('8563a330-eedb-4e71-9abc-4db6fbabd13b', 'this is finished job description', 1000, '1b3d5e7f-5a1e-4d3a-b1a5-d1a1d5b7a7e1', '25ceb64e-7a57-4ce0-a4fd-45982d9fce38', '2024-08-01 12:40:00','2024-08-01 12:40:00'),

    ('2ccc9ae0-c765-4d5a-9cea-697edbb515d6', 'job description', 75, '7cdb041b-4574-4f7b-a500-c53e74c72e94', 'f69235e1-41bc-41cc-b856-6dd21092c708', '2024-07-18 09:25:00', '2024-07-18 09:25:00'),
    ('a03250c7-7525-4f82-a747-32f981f678f2', 'job description', 10, '7cdb041b-4574-4f7b-a500-c53e74c72e94', '8079ab4b-23eb-4af6-9be5-d8565b9403b1', '2024-07-19 10:15:00', '2024-07-19 10:15:00'),
    ('83d9fddb-c52f-4144-9f14-15d699554423', 'job description', 160, '7cdb041b-4574-4f7b-a500-c53e74c72e94', 'bad7eb6a-74ee-4362-b9f3-98ea85088879', '2024-07-20 18:55:00', '2024-07-20 18:55:00'),
    ('127bcdce-8c4e-496e-af6c-7329857af687', 'job description', 30, '7cdb041b-4574-4f7b-a500-c53e74c72e94', '87df94c2-a6f3-483d-9170-61eee19d4bfa', '2024-07-21 19:10:00', '2024-07-21 19:10:00'),

    ('425888ef-074b-4635-adba-371a63e28da8', 'job description', 10, '7cdb041b-4574-4f7b-a500-c53e74c72e94', '8a3c9946-0933-4444-a456-0972adc2a25b', '2024-08-01 14:20:00', '2024-08-01 14:20:00'),
    ('ad4401ff-e1a6-45de-9b64-a4ce29fb7da9', 'job description', 60, '7cdb041b-4574-4f7b-a500-c53e74c72e94', '3df20f1b-f3af-40f5-9b69-d879cd1a6896', '2024-08-03 08:10:00', '2024-08-03 08:10:00'),
    ('08b968fd-c11c-4b6b-bd23-b45b67ee4c39', 'job description', 60, '7cdb041b-4574-4f7b-a500-c53e74c72e94', '3df20f1b-f3af-40f5-9b69-d879cd1a6896', '2024-08-03 08:50:00', '2024-08-03 08:50:00'),
    ('a16427ef-5630-48c4-b27c-5306e36bc2a0', 'job description', 60, '7cdb041b-4574-4f7b-a500-c53e74c72e94', '3aef1def-af0c-48dc-9428-0777a5523f9a', '2024-08-05 09:00:00', '2024-08-05 09:00:00'),
    ('c2cf2c6d-679a-4894-8225-b173947120bc', 'job description', 60, '7cdb041b-4574-4f7b-a500-c53e74c72e94', '32b1209e-aa60-493c-b7d2-ccfbca1ff065', '2024-08-07 03:15:00', '2024-08-07 03:15:00'),
    ('783b3458-e1a7-4e8d-8ae6-5af345c6d3b2', 'job description', 60, '7cdb041b-4574-4f7b-a500-c53e74c72e94', '47284e2a-23aa-4c1e-955f-eeeb5353bbb7', '2024-08-09 20:30:00', '2024-08-09 20:30:00'),
    ('500d82ca-6982-4aab-b5da-1d80784dbb77', 'job description', 60, '7cdb041b-4574-4f7b-a500-c53e74c72e94', '1f6ac00e-80e9-4108-b707-d62259b9f07f', '2024-08-11 08:40:00', '2024-08-11 08:40:00'),
    ('bf21446f-9f1f-4544-a9f0-155b67b89228', 'job description', 60, '7cdb041b-4574-4f7b-a500-c53e74c72e94', '9c184a1c-0287-4fec-a5cf-9d13d6215a29', '2024-08-13 23:10:00', '2024-08-13 23:10:00'),

    ('9d1b8491-e9d2-4815-9927-afea88c6d3e7', 'job description', 20, '7cdb041b-4574-4f7b-a500-c53e74c72e94', '9b8ef40c-6907-43de-84eb-789ee87789a7', '2024-08-01 00:55:00', '2024-08-01 04:15:00'),
    ('42c8cc00-8de9-45bb-854e-598c88697cd6', 'job description', 30, '7cdb041b-4574-4f7b-a500-c53e74c72e94', 'aaeb7ef1-5a23-4be3-8df7-0f1357329879', '2024-08-03 03:10:00', '2024-08-03 21:30:00'),
    ('284b8c55-0048-44f6-9d06-4db078df25a3', 'job description', 40, '7cdb041b-4574-4f7b-a500-c53e74c72e94', 'a3a4f61b-2f96-403e-8f66-bfa83e66aad6', '2024-08-05 17:02:00', '2024-08-05 18:40:00'),

    ('b83a7146-5692-4c67-a5ce-9499ce47b4af', 'job description', 50, '7cdb041b-4574-4f7b-a500-c53e74c72e94', '1c4b7914-a249-4397-82e6-5099d0ff6454', '2024-08-16 03:10:00', '2024-08-16 21:30:00'),
    ('e9a84956-27c4-4ca3-9c58-805b8b564238', 'job description', 50, '7cdb041b-4574-4f7b-a500-c53e74c72e94', '5fe76d7d-5954-4f2d-bce8-4b3839c26832', '2024-08-16 17:02:00', '2024-08-16 18:40:00'),

    ('18631c62-7bd6-41e7-b965-27371e052922', 'job description 1', 10, '1b3d5e7f-5a1e-4d3a-b1a5-d1a1d5b7a7e1', 'e48a661a-b5ce-4117-b70a-9cdd5a840fc5', '2024-08-11 00:00:02', '2024-08-11 00:00:02'),
    ('40a1d6c8-2932-46bd-8e29-f6886ec171f4', 'job description 2', 50, '1b3d5e7f-5a1e-4d3a-b1a5-d1a1d5b7a7e1', '7d563ccb-15fc-4d5a-b0cb-27ec86e052ab', '2024-08-14 00:00:01', '2024-08-14 00:00:01');

INSERT INTO "job_dones_job_tags" ("job_done_uuid", "job_tag_uuid")
VALUES
    ('425888ef-074b-4635-adba-371a63e28da8', '5ebb8d43-b685-4090-8453-ceaa7aad2095'),
    ('ad4401ff-e1a6-45de-9b64-a4ce29fb7da9', '5ebb8d43-b685-4090-8453-ceaa7aad2095'),
    ('08b968fd-c11c-4b6b-bd23-b45b67ee4c39', 'c73ff20b-e64e-4e5f-b270-1a40ba1bd81b'),
    ('a16427ef-5630-48c4-b27c-5306e36bc2a0', '60e7860d-58d9-4035-93d0-9bb825fe734c'),
    ('c2cf2c6d-679a-4894-8225-b173947120bc', '2461357d-f2f0-43a7-9f1d-79fd1eaa64f5'),
    ('783b3458-e1a7-4e8d-8ae6-5af345c6d3b2', '5ebb8d43-b685-4090-8453-ceaa7aad2095'),
    ('500d82ca-6982-4aab-b5da-1d80784dbb77', 'c73ff20b-e64e-4e5f-b270-1a40ba1bd81b'),
    ('bf21446f-9f1f-4544-a9f0-155b67b89228', '60e7860d-58d9-4035-93d0-9bb825fe734c'),
    ('9d1b8491-e9d2-4815-9927-afea88c6d3e7', 'a541719a-153e-44cf-88ff-f21a4e8d081b'),
    ('42c8cc00-8de9-45bb-854e-598c88697cd6', '04fc3f3d-b6ce-40e6-8d94-d6f2bf275eff'),
    ('284b8c55-0048-44f6-9d06-4db078df25a3', '04fc3f3d-b6ce-40e6-8d94-d6f2bf275eff'),
    ('b83a7146-5692-4c67-a5ce-9499ce47b4af', 'b65b5720-4011-49ab-bf1f-ca8e2b87d88c'),
    ('e9a84956-27c4-4ca3-9c58-805b8b564238', '5f7b8084-e8b3-4963-bfa2-491d5ee07f5a'),
    ('2ccc9ae0-c765-4d5a-9cea-697edbb515d6', 'e593e6ed-c078-4a36-a1fa-721d8a0c7829'),
    ('a03250c7-7525-4f82-a747-32f981f678f2', '04fc3f3d-b6ce-40e6-8d94-d6f2bf275eff'),
    ('83d9fddb-c52f-4144-9f14-15d699554423', 'a541719a-153e-44cf-88ff-f21a4e8d081b'),
    ('127bcdce-8c4e-496e-af6c-7329857af687', 'e593e6ed-c078-4a36-a1fa-721d8a0c7829');

INSERT INTO "problems" ("uuid", "description", "is_done", "owner_uuid", "day_report_uuid", "created_at", "updated_at")
VALUES
    ('47ff13e9-aedc-47aa-9dad-d219fb92b694', 'this is the biggest problem we have faced so far', false, '1b3d5e7f-5a1e-4d3a-b1a5-d1a1d5b7a7e1', '25ceb64e-7a57-4ce0-a4fd-45982d9fce38', '2024-08-01 00:00:00', '2024-08-01 00:00:00');

INSERT INTO "comments" ("uuid", "description", "owner_uuid", "day_report_uuid", "created_at", "updated_at")
VALUES
    ('f6334156-b08b-434b-b983-f8b11e422804', 'this is amazing!!', '1b3d5e7f-5a1e-4d3a-b1a5-d1a1d5b7a7e1', '25ceb64e-7a57-4ce0-a4fd-45982d9fce38', '2024-08-01 00:00:00', '2024-08-01 00:00:00');

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

INSERT INTO "projects" ("uuid", "name", "owner_uuid")
VALUES
    ('afb02990-7e8c-4353-a724-ea8de5fb6cfc', 'Project 1', '1b3d5e7f-5a1e-4d3a-b1a5-d1a1d5b7a7e1');

INSERT INTO "users_projects" ("user_uuid", "project_uuid")
VALUES
    ('1b3d5e7f-5a1e-4d3a-b1a5-d1a1d5b7a7e1', 'afb02990-7e8c-4353-a724-ea8de5fb6cfc'),
    ('7cdb041b-4574-4f7b-a500-c53e74c72e94', 'afb02990-7e8c-4353-a724-ea8de5fb6cfc'),
    ('c31384a6-b811-4a1f-befa-95dd53e3f4b9', 'afb02990-7e8c-4353-a724-ea8de5fb6cfc');

END $$;
