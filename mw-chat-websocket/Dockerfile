FROM golang:1.23-alpine
WORKDIR /mw-chat-websocket
COPY . .
RUN apk add --no-cache make
RUN go mod download
RUN make build
EXPOSE 7994
RUN chmod +x ./entrypoint.sh
ENTRYPOINT ["./entrypoint.sh"]