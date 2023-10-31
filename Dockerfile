FROM oven/bun:1.0

WORKDIR /home/bun/app

COPY ./package.json .

RUN bun install

RUN touch database.sqlite

COPY . .

RUN bun run ./source/database/database.create-databases.ts

EXPOSE 3000

CMD [ "bun", "start"]