
# Stage 1: Build React app
FROM node:14.17.3 AS build

WORKDIR /frontend

COPY ftsfrontend/react-frontend/ .

RUN npm install
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d

COPY --from=build /frontend/dist  /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]