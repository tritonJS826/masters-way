FROM golang:1.22-alpine
WORKDIR /mw-chat
COPY . .
RUN apk add --no-cache make
RUN go mod download
RUN make build
EXPOSE 8001
RUN chmod +x ./entrypoint.sh
ENTRYPOINT ["./entrypoint.sh"]