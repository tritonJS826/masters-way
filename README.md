# Masters-way app

Application to track any process that helps people develop.

Deploy demo masters way status:
[![Demo storybook](https://api.netlify.com/api/v1/badges/fba15c04-f28a-4a13-9430-087d9a76ab84/deploy-status)](https://app.netlify.com/sites/mastersway/deploys)

Deploy demo storybook status:
[![Netlify Status](https://api.netlify.com/api/v1/badges/004b24b2-f693-4ee8-8321-7a9c1a086261/deploy-status)](https://app.netlify.com/sites/mastersways-storybook/deploys)

DNS status:
[![DNS Status](https://mastersway.duckdns.org/api/healthcheck)](https://mastersway.duckdns.org/api/healthcheck)

Server direct status:
[![Server status](http://34.82.43.122/api/healthcheck)](http://34.82.43.122/api/healthcheck)

[Demo Master's Way](https://mastersway.netlify.app/)

[Demo Storybook](https://mastersways-storybook.netlify.app/)

This work is licensed under a Creative Commons Attribution 4.0 International License

![CC BY-NC-ND 4.0 image](https://mirrors.creativecommons.org/presskit/buttons/88x31/svg/by-nc-nd.svg)

[CC BY-NC-ND 4.0 Legal Code](https://creativecommons.org/licenses/by-nc-nd/4.0/legalcode.en)

[CC BY-NC-ND 4.0 Deed](https://creativecommons.org/licenses/by-nc-nd/4.0/)

### Requirements

- golang 1.23.0 (we recommendd to use [gvm](https://github.com/moovweb/gvm), exist in snap) 
- node 22.5.1 (we recommend to use "nvm" or "n" package for installation)
- pnpm 8.15.2 (https://pnpm.io)
- sqlc v1.27.0 ([golang package](https://docs.sqlc.dev/en/latest/overview/install.html), exist in snap)
- swag v1.16.3 ([golang package](https://github.com/swaggo/swag))
- docker 24.0.7
- docker-compose 1.29.2

### Modules

- docs - project documentation
- mw-webapp - front end

---

### Run in dev mode locally

1. Download repository

2. Install all dependencies in the root directory

`pnpm i`

3. Create .env file inside all modules with variables from .env.local.example (ask Kate for values)

4. Run databases and nginx in containers (check local.nginx.conf for right addresses):

`docker-compose -f local.docker.docker-compose.yml up`

5. You can run all modules locally (don't forget about database, you should up them manually)  

* `pnpm run start` - if you want to have live reloading for all modules

* `pnpm run serve` - if you don't want to have live reloading modules (could speed up tests)

### Run all modules locally with docker

1. Create .env file inside all modules with variables from .env.local.docker.example (ask Kate for values)


2. `docker-compose -f local.docker.docker-compose.yml up --build`


### Clean up all docker images and volumes

`docker system prune -a && docker system prune --volumes`
