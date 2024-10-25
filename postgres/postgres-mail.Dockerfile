FROM postgres:16.2
COPY postgres-mail.init.sql /docker-entrypoint-initdb.d/