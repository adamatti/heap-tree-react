lint:
	@-yarn --silent lint --fix

build-only:
	@yarn --silent run build

.PHONY: build
build: lint build-only
	