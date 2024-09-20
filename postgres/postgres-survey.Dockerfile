FROM postgres:16.2
COPY postgres-survey.init.sql /docker-entrypoint-initdb.d/