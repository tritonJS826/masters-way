FROM golang:1.23-alpine
WORKDIR /mw-chat-bff
COPY . .
RUN apk add --no-cache make
RUN go mod download
RUN make build
EXPOSE 7999
RUN chmod +x ./entrypoint.sh
ENTRYPOINT ["./entrypoint.sh"]
