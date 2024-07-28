-- name: RemoveEverything :exec
TRUNCATE TABLE message_status, messages, users_rooms, rooms RESTART IDENTITY CASCADE;

-- name: RegenerateDbData :exec
DO $$
BEGIN
INSERT INTO "rooms" ("uuid", "name", "type")
VALUES
    ('78bdf878-3b83-4f97-8d2e-928c132a10cd', NULL, 'private'),
    ('b7a3664c-f5ed-4cb0-aa2e-b2c758d22b55', NULL, 'private'),
    ('4f85694e-ff29-478f-90e9-1581577dfa84', NULL, 'private'),
    ('e57fc491-69f7-4b30-9979-78879c8873bf', NULL, 'private');

INSERT INTO "users_rooms" ("user_uuid", "room_uuid", "user_role", "is_room_blocked")
VALUES
    ('3596eb24-799d-48bb-9126-92e6a87a0186', '78bdf878-3b83-4f97-8d2e-928c132a10cd', 'regular', false),
    ('f4c8b72c-1518-4b94-8da4-3db9d2ef6ba9', '78bdf878-3b83-4f97-8d2e-928c132a10cd', 'regular', false),

    ('110f00b8-19e4-4cf4-a5f1-77b298bf0876', 'b7a3664c-f5ed-4cb0-aa2e-b2c758d22b55', 'regular', false),
    ('e93f8494-0c5c-420d-a68e-5d43903a80f2', 'b7a3664c-f5ed-4cb0-aa2e-b2c758d22b55', 'regular', false),

    ('b6eb9dd1-944c-4d1d-bc09-7c9933c53bab', '4f85694e-ff29-478f-90e9-1581577dfa84', 'regular', false),
    ('b51f6b20-9404-403b-8d48-1c0ab7d51340', '4f85694e-ff29-478f-90e9-1581577dfa84', 'regular', false),

    ('1ba87acf-5dfc-46e0-9032-478e3b8770a9', 'e57fc491-69f7-4b30-9979-78879c8873bf', 'regular', false),
    ('a1923a8b-a67b-432a-9f42-6b5632210c1c', 'e57fc491-69f7-4b30-9979-78879c8873bf', 'regular', false);

INSERT INTO "messages" ("uuid", "owner_uuid", "room_uuid", "text")
VALUES
    ('7939af01-e785-445d-b79d-70a433979c7b', '3596eb24-799d-48bb-9126-92e6a87a0186', '78bdf878-3b83-4f97-8d2e-928c132a10cd', 'Test message'),
    ('91be5d99-eddf-4949-bf15-b4cee3989fa6', 'f4c8b72c-1518-4b94-8da4-3db9d2ef6ba9', '78bdf878-3b83-4f97-8d2e-928c132a10cd', 'Test message'),

    ('3b5503c0-1ffa-4df7-8a3c-56535ce67422', '110f00b8-19e4-4cf4-a5f1-77b298bf0876', 'b7a3664c-f5ed-4cb0-aa2e-b2c758d22b55', 'Test message'),
    ('f6713833-4bc9-4a7a-b9e1-0bb797a52ef0', 'e93f8494-0c5c-420d-a68e-5d43903a80f2', 'b7a3664c-f5ed-4cb0-aa2e-b2c758d22b55', 'Test message'),

    ('8f7d6113-527f-44d9-a1db-53721653ba89', 'b6eb9dd1-944c-4d1d-bc09-7c9933c53bab', '4f85694e-ff29-478f-90e9-1581577dfa84', 'Test message'),
    ('b0532e85-84dc-4ab8-ae4d-b2c418c9f849', 'b51f6b20-9404-403b-8d48-1c0ab7d51340', '4f85694e-ff29-478f-90e9-1581577dfa84', 'Test message'),

    ('667f090a-0095-4884-bddc-c99c3fcc628d', '1ba87acf-5dfc-46e0-9032-478e3b8770a9', 'e57fc491-69f7-4b30-9979-78879c8873bf', 'Test message'),
    ('4f5d0404-d6bf-47a6-9f56-b7e3bb88a605', 'a1923a8b-a67b-432a-9f42-6b5632210c1c', 'e57fc491-69f7-4b30-9979-78879c8873bf', 'Test message');

INSERT INTO "message_status" ("message_uuid", "receiver_uuid", "is_read")
VALUES
    ('7939af01-e785-445d-b79d-70a433979c7b', '3596eb24-799d-48bb-9126-92e6a87a0186', false),
    ('91be5d99-eddf-4949-bf15-b4cee3989fa6', 'f4c8b72c-1518-4b94-8da4-3db9d2ef6ba9', false),

    ('3b5503c0-1ffa-4df7-8a3c-56535ce67422', '110f00b8-19e4-4cf4-a5f1-77b298bf0876', false),
    ('f6713833-4bc9-4a7a-b9e1-0bb797a52ef0', 'e93f8494-0c5c-420d-a68e-5d43903a80f2', false),

    ('8f7d6113-527f-44d9-a1db-53721653ba89', 'b6eb9dd1-944c-4d1d-bc09-7c9933c53bab', false),
    ('b0532e85-84dc-4ab8-ae4d-b2c418c9f849', 'b51f6b20-9404-403b-8d48-1c0ab7d51340', false),

    ('667f090a-0095-4884-bddc-c99c3fcc628d', '1ba87acf-5dfc-46e0-9032-478e3b8770a9', false),
    ('4f5d0404-d6bf-47a6-9f56-b7e3bb88a605', 'a1923a8b-a67b-432a-9f42-6b5632210c1c', false);

END $$;
