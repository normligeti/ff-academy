FROM node:20.12-bullseye

# package.json is now next to Dockerfile in local-dev
COPY package*.json ./

# Install Linux node_modules
RUN npm install