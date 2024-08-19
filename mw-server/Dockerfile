FROM golang:1.23-alpine
WORKDIR /mw-server
COPY . .
RUN apk add --no-cache make
RUN go mod download
RUN make build
EXPOSE 8000
RUN chmod +x ./entrypoint.sh
ENTRYPOINT ["./entrypoint.sh"]