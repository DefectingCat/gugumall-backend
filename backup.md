```
docker run --name mongo -itd --network backend -v /mnt/user/RUA/xfy/docker/mongo:/data/db -p 27017:27017 mongo
```

```
docker run -itd --name guguback -p 4000:80 --network backend gugubackend
```