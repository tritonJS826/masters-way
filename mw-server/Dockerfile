FROM golang:1.22-alpine
WORKDIR /mw-server
COPY . .
RUN go mod download
RUN go build -o main .
EXPOSE 8000
RUN chmod +x ./entrypoint.sh
ENTRYPOINT ["./entrypoint.sh"]