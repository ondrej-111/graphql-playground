DB_CONTAINER:="mongodb"

db:
	docker-compose up ${DB_CONTAINER}

db-down:
	docker stop ${DB_CONTAINER} || true
	docker-compose rm -f ${DB_CONTAINER} || true
	docker volume rm ${DB_CONTAINER}-vol || true

performance-test:
	ab -c 100 -n 10000 -T 'application/json' -p ab.data http://localhost:4000/graphql
