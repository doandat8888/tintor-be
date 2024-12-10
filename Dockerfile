FROM node:alpine AS development

WORKDIR /tintor-be

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8080

CMD [ "npm", "start" ]