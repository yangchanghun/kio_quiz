# 1단계: build
FROM node:18-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# 2단계: nginx에 넘길 준비
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
