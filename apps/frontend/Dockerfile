# Use the official Node.js image as the base image
FROM node:18 AS base


# Set the working directory
WORKDIR /usr/src/app

# Install dependencies using Yarn
COPY ./package.json ./yarn.lock ./
RUN yarn install --frozen-lockfile --ignore-platform

# Copy the rest of the application code
COPY . .

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["yarn", "dev"]
