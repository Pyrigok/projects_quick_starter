FROM node

WORKDIR /app/client
COPY package.json /app/client

RUN npm install

EXPOSE 3000
CMD ["npm", "start"]