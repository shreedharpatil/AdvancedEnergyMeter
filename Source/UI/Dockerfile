FROM node:14.18.1 as build
WORKDIR /app
LABEL Author="Shreedhar Patil"

COPY package.json ./
RUN npm install
COPY . .

RUN npm run build

FROM nginx:latest
COPY --from=build /app/dist/UI /usr/share/nginx/html