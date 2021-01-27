FROM node:12.18.2-alpine as build

WORKDIR /app

# Install and cache dependencies
COPY package.json /app/package.json
RUN npm install -g @angular/cli@7.3.10
RUN npm install --loglevel=error

COPY . /app/

# Run production build
RUN ng build --prod --aot

FROM nginx:latest

COPY --from=build /app/dist/MapAng /usr/share/nginx/html
COPY --from=build /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf
