FROM postgres:16.2-alpine
COPY postgres/postgres-notification.init.sql /docker-entrypoint-initdb.d/