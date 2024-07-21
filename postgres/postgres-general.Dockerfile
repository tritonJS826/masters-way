FROM postgres:16.2
COPY postgres-general.init.sql /docker-entrypoint-initdb.d/