FROM postgres:16.2
COPY postgres/postgres-survey.init.sql /docker-entrypoint-initdb.d/