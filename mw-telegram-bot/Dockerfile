FROM golang:1.23-alpine AS build
WORKDIR /app
RUN apk add --no-cache make git ca-certificates

COPY go-common ./go-common
COPY mw-telegram-bot/go.mod mw-telegram-bot/go.sum src/
RUN cd src && go mod download

# cache trick - probably I should remove it later
ARG BUILD_DATE
RUN echo "Build trigger: $BUILD_DATE"

COPY mw-telegram-bot src/
RUN cd src && CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o main cmd/telegram-bot/main.go

FROM scratch
WORKDIR /app
COPY --from=build /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/
COPY --from=build /app/src/main ./
COPY --from=build /app/src/.env ./
EXPOSE 7997
CMD ["./main"]