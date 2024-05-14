FROM node:20.11.1
WORKDIR /app

COPY package*.json ./
COPY . .
RUN ["rm", "-rf", "node_modules"]
RUN npm install
RUN npm run build

CMD [ "node","dist/src/main" ]