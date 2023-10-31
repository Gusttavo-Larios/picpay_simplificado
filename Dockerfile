FROM oven/bun:1.0

WORKDIR /home/bun/app

COPY ./package.json .

RUN bun install

COPY . .

EXPOSE 3000

CMD [ "bun", "start"]