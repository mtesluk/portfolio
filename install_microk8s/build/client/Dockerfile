FROM node:12.13.1 as build

WORKDIR /app

COPY ./app/package.json /app/package.json
COPY ./app/package-lock.json /app/package-lock.json

RUN npm install
COPY ./app .

RUN npm run build

FROM nginx
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build ./app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]