# ---- Base Stage ----
# Use LTS version of Node.js (18-alpine is lightweight and recommended)
FROM node:18-alpine AS base

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (for better caching)
COPY package*.json ./

# Use npm ci for CI/CD (if package-lock.json is available)
RUN npm ci --only=production

# ---- Build Stage ----
FROM node:18-alpine AS builder

WORKDIR /app

# Copy dependencies from base image to avoid re-installing
COPY --from=base /app/node_modules ./node_modules

# Copy the rest of the source code
COPY . .

# Build the application
RUN npm run build

# ---- Final Stage ----
FROM node:18-alpine AS final

WORKDIR /app

# Copy built application from builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY package.json ./

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start:prod"]
