FROM node:18

WORKDIR /user/src/app

COPY package*.json ./

RUN npm install && npm install -g nodemon
RUN apt update && apt install -y default-mysql-client

COPY . .

EXPOSE 8800
CMD ["npm", "start"]