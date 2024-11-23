FROM postgres:16.2-alpine
COPY postgres/postgres-mail.init.sql /docker-entrypoint-initdb.d/