FROM postgres:16.2
COPY postgres/postgres-notification.init.sql /docker-entrypoint-initdb.d/