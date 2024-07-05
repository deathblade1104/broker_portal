##### build application #####
FROM node:20-alpine as builder
RUN mkdir -p /app/mnt/data
WORKDIR /app
COPY . .
RUN yarn install
EXPOSE 3001
CMD ["yarn", "start", "--host", "0.0.0.0"]
