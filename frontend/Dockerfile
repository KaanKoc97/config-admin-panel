#Step 1

FROM node:12-alpine as build

WORKDIR /frontend

COPY ./ /frontend

RUN npm install

#RUN npm run build

CMD ["npm", "run", "start"]

# Step 2

#FROM nginx:latest

#COPY --from=build /frontend/dist/Angular12Crud /usr/share/nginx/html 

#EXPOSE 4200

