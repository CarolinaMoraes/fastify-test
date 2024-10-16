FROM node:18-alpine

WORKDIR /home/attempt

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . .

CMD npm run dev

