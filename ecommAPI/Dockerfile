# Use a lightweight Node.js image
FROM node:22-alpine

# Set the working directory inside the container
WORKDIR /app

ADD . /app

# Copy package.json and package-lock.json first (to cache dependencies)
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy all backend files
COPY . .

# Create a group and user with proper IDs (Alpine-specific)
#RUN addgroup -S appgroup && adduser -S -G appgroup appuser

# Change ownership of the working directory
#RUN chown -R appuser:appgroup /app || true

# Expose backend port
EXPOSE 4000

# Switch to non-root user for security
#USER appuser

# Start the backend using server.js
CMD ["node", "server.js"]

