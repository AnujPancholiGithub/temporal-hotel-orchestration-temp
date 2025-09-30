# ---- Stage 1: Build ----
    FROM node:20-bullseye-slim AS builder
    WORKDIR /app
    COPY package*.json ./
    RUN npm ci
    COPY . .
    RUN npm run build
    
    # ---- Stage 2: Production ----
    FROM node:20-bullseye-slim AS production
    # Install system CA roots required by Temporal SDK over TLS
    RUN apt-get update \
     && apt-get install -y ca-certificates \
     && rm -rf /var/lib/apt/lists/*
    WORKDIR /app
    
    # Install only production deps (smaller image, recommended)
    COPY package*.json ./
    RUN npm ci --omit=dev
    
    # Copy compiled app
    COPY --from=builder /app/dist ./dist
    
    # Expose API port only for the server image
    EXPOSE 3000
    
    # Default to server; worker will override via compose `command`
    CMD ["npm", "run", "start:server"]
    