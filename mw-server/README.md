[Good instruction to start](https://dev.to/geoff89/deploying-a-golang-restful-api-with-gin-sqlc-and-postgresql-1lbl)


[Deploy service "qovery"](https://www.qovery.com/pricing/)


Requrements
* Docker, docker-compose
* golang 1.21.6

make golang packages visible in cli (or add this line to .bashrc in the home directory): 
```
    export PATH=$PATH:$(go env GOPATH)/bin
```

### Start database

1. run postgres container
```
    docker-compose -f postgres.docker-compose.yaml up
```
2. adjust database
```
    docker exec -it postgres bash
    psql -U root mastersway_db
    CREATE EXTENSION IF NOT EXISTS  "uuid-ossp";
```
3. add golang-migrate
```
    go install -tags 'postgres' github.com/golang-migrate/migrate/v4/cmd/migrate@latest
```
3. init schema
```
    migrate create -ext sql -dir db/migration -seq init_schema
```
4. migrate up
```
    migrate -path db/migration -database  "postgresql://root:secret@localhost:5432/mastersway_db?sslmode=disable" -verbose up
```


### Adjust server (after running database)
1. install dependencies
```go mod tidy```

2. install sqlc
```go install github.com/sqlc-dev/sqlc/cmd/sqlc@latest```

3. sqlc init
```sqlc init```

4. sqlc generate
```sqlc generate && go mod tidy```

5. install swaggo
```
    go get -u github.com/swaggo/swag/cmd/swag
    go install github.com/swaggo/swag/cmd/swag@latest
```
6. generate swagger docs
```swag init```
7. run server
```go run main.go```







* migrate down
```migrate -path db/migration -database "postgresql://root:secret@localhost:5432/mastersway_db?sslmode=disable" -verbose down```

* to remove all dangling (not associated with containers) and all volumes
```docker system prune -a && docker system prune --volumes```

* to stop and remove all containers
```docker stop $(docker ps -a -q) && docker rm $(docker ps -a -q)```

* install pg_dump
```
    add-apt-repository "deb http://apt.postgresql.org/pub/repos/apt/ $(lsb_release -cs)-pgdg main"
    apt update
    apt install postgresql-client-16
```

* make postgres dump locally (pgdump required)
```pg_dump -h localhost -Fc -U root mastersway_db > mastersway_db_backup.dump```

* restore postgres dump locally (pgdump required)
```dropdb mastersway_db && createdb development_db_name&& pg_restore -h localhost -p 5432 -d mastersway_db -U root mastersway_db_backup.dump```