# Stage 1: Asset Preparation
FROM alpine:latest AS builder
WORKDIR /app
COPY index.html style.css script.js ./

# Stage 2: Web Server Delivery
FROM nginx:alpine

# Clean default Nginx assets
RUN rm -rf /usr/share/nginx/html/*

# Copy app files from builder stage
COPY --from=builder /app /usr/share/nginx/html/

# Expose port 80
EXPOSE 80

# Run Nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
