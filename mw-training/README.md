# mw-training

- check endpoints
```
grpcurl -plaintext localhost:8008 list
```

- check methods
```
grpcurl -plaintext localhost:8008 list my.package.MyService.MyMethod

```

- execute get all trainings (hust)
```
grpcurl -plaintext -d '{"page": 1, "limit": 10, "training_name": ""}' localhost:8008 training.TrainingService/GetTrainingList
```

- reset db
```
grpcurl -plaintext localhost:8008 training.Dev/ResetDB
```
