#Step 1

FROM node:12-alpine as build-step

WORKDIR /frontend

COPY package.json /frontend

RUN npm install

COPY . /frontend

RUN npm run build

# Step 2

FROM nginx:1.17.1-alpine

COPY --from=build-step /frontend /usr/share/nginx/html 