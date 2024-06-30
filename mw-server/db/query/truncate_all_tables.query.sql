-- name: TruncateAllTables :exec
DO $$ DECLARE
    table_name text;
BEGIN
    FOR table_name IN (SELECT tablename FROM pg_tables WHERE schemaname='public') LOOP
            IF table_name != 'schema_migrations' THEN
            EXECUTE 'TRUNCATE TABLE ' || table_name || ' CASCADE;';
            END IF;
        END LOOP;
END $$;


