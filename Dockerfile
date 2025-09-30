# ---- Stage 1: Build ----
    FROM node:20-bullseye-slim AS builder
    WORKDIR /app
    COPY package*.json ./
    RUN npm ci
    COPY . .
    RUN npm run build
    
    # ---- Stage 2: Production ----
    FROM node:20-bullseye-slim AS production    
    WORKDIR /app
    
    # Install only prod deps
    COPY package*.json ./
    RUN npm ci --omit=dev
    
    # Copy compiled app
    COPY --from=builder /app/dist ./dist
    
    # Expose API port
    EXPOSE 3000
    
    # Default to server; worker will override via compose `command`
    CMD ["npm", "run", "start:server"]
    