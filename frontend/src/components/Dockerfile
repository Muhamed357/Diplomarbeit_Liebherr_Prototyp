# Start with a Node.js base image
FROM node:20-alpine as build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app for production
RUN npm run build

# Use a lightweight web server to serve the built files
FROM nginx:stable-alpine

# Copy the build output to the Nginx HTML directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose the port on which Nginx serves
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
