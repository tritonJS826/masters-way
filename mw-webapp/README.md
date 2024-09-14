# mw-webapp 



## Testing

- Run unit tests:
  ```sh
  pnpm test
  ```

- Run component tests:
  ```sh
  pnpm cypress:component:run
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