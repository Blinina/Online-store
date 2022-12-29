start-client:
	npm start --prefix ./my-app
start-server:
	npm run dev --prefix ./server
start:
	make start-client && make start-server
