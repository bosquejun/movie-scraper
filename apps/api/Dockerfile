# Use the official Node.js image
FROM node:18-alpine

# Set the working directory
WORKDIR /usr/src/app/apps/api

# Copy package.json and yarn.lock from the root directory
COPY ./package.json ../../yarn.lock ./


# Install dependencies
RUN yarn install --frozen-lockfile --ignore-platform

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Build the app
# CMD ["yarn", "build"]


# Start app
CMD ["yarn", "dev"]
