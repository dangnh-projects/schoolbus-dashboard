FROM mhart/alpine-node:11 AS builder
WORKDIR /app
COPY . .
RUN yarn && yarn build

FROM nginx
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/build /usr/share/nginx/html