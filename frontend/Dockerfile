FROM mcr.microsoft.com/devcontainers/typescript-node:1-18-bullseye

# Set the working directory
WORKDIR /workspace/frontend

# Install global dependencies
RUN npm install -g npm@9

# Use the non-root user from base image
USER node

# Expose the frontend port
EXPOSE 3000
