FROM postgres:16.2
COPY postgres-storage.init.sql /docker-entrypoint-initdb.d/