# create a file named Dockerfile
FROM node:7
RUN mkdir /app
COPY ./server /app
WORKDIR /app
RUN npm install
EXPOSE 3000
CMD ["npm", "start"]
