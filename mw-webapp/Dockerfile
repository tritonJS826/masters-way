FROM node:20.11.0-alpine
WORKDIR /masters-way
COPY ./package.json .
COPY ./pnpm-workspace.yaml .
COPY ./pnpm-lock.yaml .
COPY ./.eslintrc .
RUN npm i -g pnpm@8.15.2
RUN pnpm install --frozen-lockfile
COPY ./mw-webapp ./mw-webapp
WORKDIR /masters-way/mw-webapp
RUN pnpm run build
CMD pnpm dlx serve ./build -p 5173 -s
EXPOSE 5173

