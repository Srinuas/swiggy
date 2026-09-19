#!/usr/bin/env bash

# Stop execution immediately if any command fails
set -e

# Docker Hub Username / Repository Base
DOCKER_USER="srinuas"
REPO_NAME="swiggy"

# Define service folder names and their corresponding tags
declare -A SERVICES=(
  ["food"]="food"
  ["dineout"]="dineout"
  ["genie"]="genie"
  ["instamart"]="instamart"
)

echo "========================================="
echo " Starting Docker Build & Push Pipeline"
echo " Target Repository: ${DOCKER_USER}/${REPO_NAME}"
echo "========================================="

# Loop through each service directory and execute build/push
for SERVICE in "${!SERVICES[@]}"; do
  TAG="${SERVICES[$SERVICE]}"
  FULL_IMAGE_NAME="${DOCKER_USER}/${REPO_NAME}:${TAG}"

  if [ -d "$SERVICE" ]; then
    echo ""
    echo "-----------------------------------------"
    echo "▶ Processing Service: ${SERVICE}"
    echo "  Image Tag: ${FULL_IMAGE_NAME}"
    echo "-----------------------------------------"

    # 1. Build the Docker Image
    echo "🔨 Building image..."
    docker build -t "${FULL_IMAGE_NAME}" "./${SERVICE}"

    # 2. Push to Docker Hub
    echo "🚀 Pushing image to Docker Hub..."
    docker push "${FULL_IMAGE_NAME}"

    echo "✅ Successfully built and pushed ${FULL_IMAGE_NAME}"
  else
    echo "⚠️ Warning: Directory './${SERVICE}' not found. Skipping."
  fi
done

echo ""
echo "========================================="
echo "🎉 All images built and pushed successfully!"
echo "========================================="
