# Project

This repository contains a small fullstack proof-of-concept with a frontend (React) and backend (Node/Express).

## Required Node version

This project is tested with Node 18. To ensure the correct Node version when developing locally, use `nvm` and the provided `.nvmrc`:

```bash
# install and use Node 18
nvm install
nvm use
```

The `.nvmrc` in the repository pins Node 18.

## Devcontainer / Docker

The development container images are based on Node 18. If you're using VS Code Dev Containers, rebuild the container after pulling changes:

- Command Palette -> Dev Containers: Rebuild Container

Or from a machine with the `devcontainer` CLI, rebuild/open the container using the VS Code action.

## Start frontend

```bash
cd frontend
npm install
npm run dev:frontend
```

If you run into issues with the browser opening on Windows paths inside WSL/devcontainer, the container sets `BROWSER=none` to prevent attempts to spawn a browser.

## Start backend

```bash
cd backend
npm install
npm run dev
```

