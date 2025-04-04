# Stage 1: Build the React App
FROM node:22-alpine AS build
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of your application code and build the app
COPY . .
RUN npm run build

# Stage 2: Serve the App with Nginx
FROM nginx:alpine

# (Optional) Install openssl to generate a self-signed certificate for HTTPS (for prototype/demo use)
RUN apk add --no-cache openssl && \
    mkdir -p /etc/ssl/private /etc/ssl/certs && \
    openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -subj "/CN=localhost" \
    -keyout /etc/ssl/private/selfsigned.key \
    -out /etc/ssl/certs/selfsigned.crt

# Remove the default Nginx configuration
RUN rm /etc/nginx/conf.d/default.conf

# Copy your custom Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/

# Copy the build output from the first stage into Nginx's html folder
COPY --from=build /app/build /usr/share/nginx/html

# Expose ports for HTTP and HTTPS
EXPOSE 80
EXPOSE 443

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]

