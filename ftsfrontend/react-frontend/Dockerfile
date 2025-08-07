# Stage 1: Build React app
FROM node:14.17.3 AS build

WORKDIR /frontend

COPY . .

RUN npm install
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

COPY --from=build /frontend/dist  /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
# docker-compose -f ../docker-compose.prod.yml up --build react-web