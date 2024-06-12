-- favorite_users.donor_user_uuid
-- максимальное число лайков которое пользователь может раздать другим пользователям
CREATE FUNCTION check_max_likes_to_user() RETURNS TRIGGER AS $$
BEGIN
    IF (SELECT COUNT(*) FROM favorite_users WHERE donor_user_uuid = NEW.donor_user_uuid) >= 1000 THEN
        RAISE EXCEPTION 'Exceeded the limit of 1000 likes which a user can give other users;'
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER max_likes_to_user_trigger
BEFORE INSERT ON favorite_users
FOR EACH ROW
EXECUTE FUNCTION check_max_likes_to_user();


-- favorite_users, acceptor_user_uuid
-- максимальное число лайков которое пользователь может получить от других пользователей
CREATE FUNCTION check_max_likes_from_user() RETURNS TRIGGER AS $$
BEGIN
    IF (SELECT COUNT(*) FROM favorite_users WHERE acceptor_user_uuid = NEW.acceptor_user_uuid) >= 20000 THEN
        RAISE EXCEPTION 'Exceeded the limit of 20000 like a user can receive from other users';
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER check_max_likes_from_user_trigger
BEFORE INSERT ON favorite_users
FOR EACH ROW
EXECUTE FUNCTION check_max_likes_from_user();