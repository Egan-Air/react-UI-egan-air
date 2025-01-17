# Stage 1: Build the React app
FROM node:16 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve the app using Nginx
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

# Expose the port on which Nginx runs
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]