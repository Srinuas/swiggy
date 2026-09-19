# Stage 1: Build & Source Verification
FROM alpine:latest AS builder
WORKDIR /app
COPY index.html style.css script.js ./

# Stage 2: Production Nginx Server
FROM nginx:alpine

# Remove default assets
RUN rm -rf /usr/share/nginx/html/*

# Copy built app files from builder stage
COPY --from=builder /app /usr/share/nginx/html/

# Expose HTTP port
EXPOSE 80

# Launch Nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
