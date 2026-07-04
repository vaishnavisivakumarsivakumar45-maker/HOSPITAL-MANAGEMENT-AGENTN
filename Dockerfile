# Stage 1: Build Frontend Assets and Backend Bundle
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependency catalogs
COPY package*.json ./

# Install packages
RUN npm ci

# Copy full workspace files
COPY . .

# Run production compilation
RUN npm run build

# Stage 2: Production Container Execution
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Copy output bundle and dependencies from build stage
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/server.ts ./
COPY --from=builder /app/node_modules ./node_modules

# Install tsx globally or locally to safely launch server.ts
RUN npm install -g tsx esbuild

EXPOSE 3000

# Launch full-stack Express production server
CMD ["node", "dist/server.cjs"]
