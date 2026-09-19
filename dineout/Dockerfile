# Stage 1: Build & static asset verification
FROM alpine:latest AS builder
WORKDIR /app
COPY index.html style.css script.js ./

# Stage 2: Production Nginx Server
FROM nginx:alpine

# Remove default assets
RUN rm -rf /usr/share/nginx/html/*

# Copy built static files from builder stage
COPY --from=builder /app /usr/share/nginx/html/

# Expose port 80
EXPOSE 80

# Run Nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
