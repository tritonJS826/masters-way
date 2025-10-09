\c mastersway_db
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE EXTENSION IF NOT EXISTS pg_stat_statements;
-- usage example:
-- SELECT
--     queryid,
--     calls,
--     round(total_exec_time::numeric, 2) AS total_time_ms,
--     round(mean_exec_time::numeric, 2) AS avg_time_ms,
--     rows,
--     LEFT(query, 30) AS query_snippet  -- первые 200 символов
-- FROM pg_stat_statements
-- ORDER BY mean_exec_time DESC
