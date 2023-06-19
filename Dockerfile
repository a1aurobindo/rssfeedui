## Stage 1: Compile and Build angular codebase
## Use official node image as the base image
#FROM node:12 as build
#
## Set the working directory
#WORKDIR /usr/local/app
#
## Add the source code to app
#COPY ./ /usr/local/app/
#
#ENV NODE_OPTIONS=--openssl-legacy-provider
#
## Install all the dependencies
#RUN npm install
#
## Generate the build of the application
#RUN npm run build


# Stage 2: Serve app with nginx server

# Use official nginx image as the base image
FROM nginx:mainline-alpine3.17

# Copy the build output to replace the default nginx contents.
COPY dist/rssfeedui /usr/share/nginx/html

# Expose port 80
EXPOSE 80
