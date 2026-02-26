# Base image: Node 20 (Debian-based for better compatibility)
FROM node:20-slim AS builder

# Create app directory
WORKDIR /app

# Install OpenSSL (Debian/Ubuntu uses apt-get, but usually pre-installed. We ensure it.)
RUN apt-get update -y && apt-get install -y openssl

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
COPY prisma ./prisma/

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

# Generate Prisma Client & Build NextJS app
RUN npx prisma generate
RUN npm run build

# Production image
FROM node:20-slim

WORKDIR /app

# Install OpenSSL in production image too
RUN apt-get update -y && apt-get install -y openssl

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

# Cloud Run expects the app to listen on the port specified by the PORT environment variable.
ENV PORT 8080
EXPOSE 8080

# Prisma push / migrations can be handled via init scripts or externally for production.
# Start the server using the production build. Run DB push before starting.
CMD npx prisma db push --accept-data-loss && npm run start:prod
