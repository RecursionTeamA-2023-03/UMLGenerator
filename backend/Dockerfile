# base image
FROM node:18.15-alpine

# Install necessary packages
RUN apk update && \
    apk upgrade && \
    apk add openjdk11 && \
    apk add graphviz && \
    apk add postgresql-client

# set working directory
WORKDIR /app

RUN chown -R node:node /app
USER node

# copy package files
COPY --chown=node:node package*.json ./

# install dependencies
RUN npm install

# set environment variables
ENV NODE_ENV=production
ENV JAVA_HOME=/usr/lib/jvm/java-11-openjdk
ENV PATH="$JAVA_HOME/bin:$PATH"

# copy app files
COPY --chown=node:node . .


# set trace shell command and build app
RUN set -x && npm run build

# run app
CMD [ "node", "dist/main.js" ]