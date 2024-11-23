FROM postgres:16.2-alpine
COPY postgres/postgres-chat.init.sql /docker-entrypoint-initdb.d/