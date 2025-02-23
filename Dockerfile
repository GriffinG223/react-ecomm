# Use Node.js base image
FROM node:22-alpine

# Set working directory inside the container
WORKDIR /app

# Copy only package.json and package-lock.json first for efficient caching
COPY package*.json .

# Install dependencies
RUN npm install

# Copy the rest of your application files
COPY . .

# Expose the port React runs on (3000)
EXPOSE 3000

# Start the development server (if you are using npm start locally)
CMD ["npm", "start"]

