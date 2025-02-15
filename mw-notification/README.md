# mw-notification

- check endpoints
```
grpcurl -plaintext localhost:8002 list
```

- check methods
```
grpcurl -plaintext localhost:8002 list my.package.MyService.MyMethod

```

- reset db
```
grpcurl -plaintext localhost:8002 notification.Dev/ResetDB
```
