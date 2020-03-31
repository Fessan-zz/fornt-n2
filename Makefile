install:
	npm install

lint:
	npx eslint .

test:
	npm run test

watch:
	npm test -- --watch

test-coverage:
	npm test -- --coverage