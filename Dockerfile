# create a file named Dockerfile
FROM node:7
RUN mkdir /app
WORKDIR /app
RUN npm install
COPY . /app
WORKDIR /app/server
RUN npm install
EXPOSE 3000
CMD ["npm", "start"]
