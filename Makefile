.PHONY: test build lint npmjs token install peer clean publish publish-npmjs types

DOCKER_COMPOSE_RUN_OPTIONS=--rm
ifeq (${CI},true)
    DOCKER_COMPOSE_RUN_OPTIONS=--rm --user root -T
endif

PACKAGE_VERSION=$(shell cat package.json | grep -i version | sed -e "s/ //g" | cut -c 12- | sed -e "s/\",//g")

test:
	docker-compose run $(DOCKER_COMPOSE_RUN_OPTIONS) yarn test

build:
	docker-compose run $(DOCKER_COMPOSE_RUN_OPTIONS) yarn build

lint:
	docker-compose run $(DOCKER_COMPOSE_RUN_OPTIONS) yarn lint

npmjs:
	docker-compose run $(DOCKER_COMPOSE_RUN_OPTIONS) bash -c 'echo "//registry.npmjs.org/:_authToken=$$NPMJS_AUTH_TOKEN" >> .npmrc'
	docker-compose run $(DOCKER_COMPOSE_RUN_OPTIONS) bash -c 'echo "@benjaminnoufel:registry=https://registry.npmjs.org/" >> .npmrc'

token:
	docker-compose run $(DOCKER_COMPOSE_RUN_OPTIONS) bash -c 'echo "//npm.pkg.github.com/:_authToken=$$NPM_AUTH_TOKEN" >> .npmrc'
	docker-compose run $(DOCKER_COMPOSE_RUN_OPTIONS) bash -c 'echo "@benjaminnoufel:registry=https://npm.pkg.github.com/" >> .npmrc'

install:
	docker-compose run $(DOCKER_COMPOSE_RUN_OPTIONS) yarn install

peer:
	docker-compose run $(DOCKER_COMPOSE_RUN_OPTIONS) yarn add -P react react-dom

clean:
	docker-compose run $(DOCKER_COMPOSE_RUN_OPTIONS) bash -c 'for file in $(shell cat .gitignore); do if [ "/.env" != "$$file" ]; then rm -rf .$$file; fi; done'

publish:
	docker-compose run $(DOCKER_COMPOSE_RUN_OPTIONS) yarn publish --access public --registry https://npm.pkg.github.com/ --new-version $(PACKAGE_VERSION) --non-interactive

publish-npmjs:
	docker-compose run $(DOCKER_COMPOSE_RUN_OPTIONS) yarn publish --access public --registry https://registry.npmjs.org/ --new-version $(PACKAGE_VERSION) --non-interactive

types:
	docker-compose run $(DOCKER_COMPOSE_RUN_OPTIONS) yarn types
