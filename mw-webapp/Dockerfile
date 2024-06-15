FROM node:20.11.0-alpine
WORKDIR /mw-webapp
COPY . .
RUN npm i -g pnpm@8.15.2
RUN pnpm install --frozen-lockfile
RUN pnpm run build
CMD pnpm run serve --port 5173
EXPOSE 5173
