lint:
	@yarn --silent lint --fix

build: lint
	yarn run build