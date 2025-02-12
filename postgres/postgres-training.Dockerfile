FROM postgres:16.2-alpine
COPY postgres/postgres-training.init.sql /docker-entrypoint-initdb.d/