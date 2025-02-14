# Stage 1: Build the React app
FROM node:16 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve the app using Nginx
#FROM nginx:alpine
FROM registry.access.redhat.com/ubi8/nginx-120
#COPY --from=build /app/build /usr/share/nginx/html
COPY --from=build /app/build /opt/app-root/src
#RUN chmod -R 775 /opt/app-root/src


# Expose the port on which Nginx runs
EXPOSE 8080

ENV REACT_APP_GOOGLE_MAPS_API_KEY=${REACT_APP_GOOGLE_MAPS_API_KEY}
# Start Nginx
CMD ["nginx", "-g", "daemon off;"]