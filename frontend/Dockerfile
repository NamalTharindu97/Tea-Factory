FROM node:18-slim AS build

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci --legacy-peer-deps

COPY . ./

RUN npm run build

FROM nginx:1.25-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
