FROM postgres:16.2-alpine
COPY postgres/postgres-survey.init.sql /docker-entrypoint-initdb.d/