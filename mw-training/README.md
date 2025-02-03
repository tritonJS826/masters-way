# mw-training

- check endpoints
```
grpcurl -plaintext localhost:8008 list
```

- check methods
```
grpcurl -plaintext localhost:8008 list my.package.MyService.MyMethod

```

- reset db
```
grpcurl -plaintext localhost:8008 training.Dev/ResetDB
```
