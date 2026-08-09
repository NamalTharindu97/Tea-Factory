FROM node:18-slim

WORKDIR /app/backend

COPY package.json package-lock.json ./

RUN npm ci

COPY . ./

EXPOSE 5000

CMD ["npm", "start"]
