#1 Stage 1: build
FROM node:22.5.1-alpine AS build
WORKDIR /mw-webapp
COPY . .
RUN npm i -g pnpm@8.15.2
RUN pnpm install --frozen-lockfile
RUN pnpm run build

# Stage 2: production
FROM node:22.5.1-alpine AS production
WORKDIR /mw-webapp

COPY --from=build /mw-webapp/build ./build
COPY --from=build /mw-webapp/package.json ./
COPY --from=build /mw-webapp/pnpm-lock.yaml ./

EXPOSE 5173
CMD ["npx", "serve", "-s", "build", "-l", "5174"]