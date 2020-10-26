install:
	npm install
lint:
	npx eslint .
start-local:
	npx nodemon src/bin/server.js
