FROM mcr.microsoft.com/devcontainers/typescript-node:1-18-bullseye

# Set the working directory
WORKDIR /workspace/backend
# Install global dependencies
RUN npm install -g npm@9 nodemon
# Use the non-root user from base image
USER node

# Expose the backend port
EXPOSE 3001
