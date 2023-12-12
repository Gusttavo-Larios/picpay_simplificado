FROM oven/bun:1.0

WORKDIR /home/bun/app

COPY . .

RUN bun install

EXPOSE 3000

CMD [ "bun", "start"]