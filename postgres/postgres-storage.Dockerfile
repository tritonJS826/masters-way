FROM postgres:16.2-alpine
COPY postgres/postgres-storage.init.sql /docker-entrypoint-initdb.d/