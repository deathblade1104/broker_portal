##### build application #####
FROM node:20-alpine

WORKDIR /app

COPY . .

RUN yarn install

CMD ["yarn", "start", "--host", "0.0.0.0"]
