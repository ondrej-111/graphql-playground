# graphql-playground

## Already implemented

- Apollo-GraphQL
- DI
- Entities decorators - @ignore{on: {source: [], destination: []}}, @id
- Connection to MongoDB
- service layer
- HMR using webpack

## Performance tests:

#### A

- with DATALOADER:
```shell
Concurrency Level:      100
Time taken for tests:   7.427 seconds
Complete requests:      10000
Failed requests:        0
Total transferred:      6800000 bytes
Total body sent:        3450000
HTML transferred:       5380000 bytes
Requests per second:    1346.39 [#/sec] (mean)
Time per request:       74.273 [ms] (mean)
Time per request:       0.743 [ms] (mean, across all concurrent requests)
Transfer rate:          894.09 [Kbytes/sec] received
                        453.62 kb/s sent
                        1347.70 kb/s total
```

- without DATALOADER:
```shell
Concurrency Level:      100
Time taken for tests:   13.441 seconds
Complete requests:      10000
Failed requests:        0
Total transferred:      6800000 bytes
Total body sent:        3450000
HTML transferred:       5380000 bytes
Requests per second:    743.98 [#/sec] (mean)
Time per request:       134.412 [ms] (mean)
Time per request:       1.344 [ms] (mean, across all concurrent requests)
Transfer rate:          494.05 [Kbytes/sec] received
                        250.66 kb/s sent
                        744.71 kb/s total
```
