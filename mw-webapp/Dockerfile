#1 Stage 1: build
FROM node:22.5.1-alpine AS build
WORKDIR /app
COPY mw-webapp/package.json src/
COPY mw-webapp/pnpm-lock.yaml src/
RUN cd src && npm i -g pnpm@8.15.2
RUN cd src && pnpm install --frozen-lockfile
COPY mw-webapp src/
RUN cd src && pnpm run build

# Stage 2: production
FROM node:22.5.1-alpine AS production
WORKDIR /app

COPY --from=build /app/src/build ./build
COPY --from=build /app/src/package.json ./
COPY --from=build /app/src/pnpm-lock.yaml ./

EXPOSE 5173
CMD ["npx", "serve", "-s", "build", "-l", "5174"]