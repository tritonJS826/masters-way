FROM node:22.5.1-alpine
WORKDIR /mw-webapp
COPY . .
RUN npm i -g pnpm@9.6.0
RUN pnpm install --frozen-lockfile
RUN pnpm run build
CMD pnpm run serve
EXPOSE 5173
