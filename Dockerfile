FROM node:10

WORKDIR /usr/app/

ENV CON_STRING="postgresql://postgres:password@127.0.0.1:5432/airjld" 

COPY . .

RUN npm install

EXPOSE 7777 

CMD ["npm", "start"]
