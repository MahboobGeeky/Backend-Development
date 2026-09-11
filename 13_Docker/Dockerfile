# Creating an docker image:-

# Base Image
FROM node:20.20.0-alpine3.23

WORKDIR /home/app

RUN apk add --no-cache curl

COPY package*.json .
RUN npm install

# Copying the source code to docker image
# COPY SRC DEST
COPY index.js index.js

COPY Dockerfile Dockerfile

# automatically PORT mapping 
ENV PORT=8000
EXPOSE 8000

# anyone run this docker image, this command automatically run
CMD [ "npm", "start" ]
