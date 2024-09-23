FROM postgres:16.2
COPY postgres-notification.init.sql /docker-entrypoint-initdb.d/