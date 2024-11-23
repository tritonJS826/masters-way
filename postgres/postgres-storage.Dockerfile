FROM postgres:16.2
COPY postgres/postgres-storage.init.sql /docker-entrypoint-initdb.d/