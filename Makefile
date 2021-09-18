DB_CONTAINER:="mongodb"

db:
	docker-compose up ${DB_CONTAINER}

db-down:
	docker stop ${DB_CONTAINER} || true
	docker-compose rm -f ${DB_CONTAINER} || true
	docker volume rm ${DB_CONTAINER}-vol || true
