# Base Image
FROM node:20.20.0-alpine3.23

WORKDIR /home/app

COPY package*.json .
RUN npm install

# Copying the source code to docker image
# COPY SRC DEST
COPY index.js index.js

COPY Dockerfile Dockerfile

# automatically PORT mapping 
EXPOSE 8000 3000 4000

# anyone run this docker image, this command automatically run
CMD [ "npm", "start" ]
