# mw-webapp 

## Requirements

Ensure you have the following tools installed before proceeding:

- [Node.js](https://nodejs.org/) v22.5.1 (we recommend using [nvm](https://github.com/nvm-sh/nvm) or [n](https://github.com/tj/n) for installation)
- [pnpm](https://pnpm.io/) v8.15.2
- [Vite](https://vitejs.dev/) v5.4.1
- [TypeScript](https://www.typescriptlang.org/) v5.3.3
- [React](https://reactjs.org/) v18.2.0

Additional tools:
- [Docker](https://www.docker.com/) v24.0.7
- [Docker Compose](https://docs.docker.com/compose/) v1.29.2

### Run in dev mode locally

1. Download repository

2. Install all dependencies in the root directory
  Run:
   ```sh
   pnpm run install:all
   ```
3. Create .env file inside all modules with variables from .env.local.example (run "useEnvs.sh" script for such purpose)

`./useEnvs.sh local`

## Docker

To run the application using Docker:

1. Ensure you have Docker and Docker Compose installed.
2. Navigate to the project root directory.
3. Run:
   ```sh
   docker-compose -f local.docker-compose.yml up
   ```


## Start project 
  - Run:
   ```sh
  pnpm run start
   ```

## Testing

- Run unit tests:
  ```sh
  pnpm test
  ```

- Run component tests:
  ```sh
  pnpm cypress:component:run
  ```

- Run end-to-end tests:
  ```sh
  pnpm cypress:e2e:run
  ```

- Run all tests:
  ```sh
  pnpm test:module
  ```

## Linting and Formatting

- Check linting:
  ```sh
  pnpm lint-check
  ```

- Fix linting issues:
  ```sh
  pnpm lint-fix
  ```

- Check styling:
  ```sh
  pnpm stylelint-check
  ```

- Fix styling issues:
  ```sh
  pnpm stylelint-fix
  ```

- Format code:
  ```sh
  pnpm format
  ```

## API Generation

To generate API clients:

```sh
pnpm api:generate
```

This command will generate TypeScript clients for both the general API and the chat BFF API.

## Storybook

To run Storybook for component development and testing:

```sh
pnpm storybook
```

To build Storybook:

```sh
pnpm build-storybook
```


login as test user on dev environment
```
http://localhost:8000/api/auth/login/local/chuchuk@gmail.com
http://localhost:8000/api/auth/login/local/alice.johnson@example.com
```