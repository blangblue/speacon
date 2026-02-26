# Base image: Node 18+ (Alpine for small size)
FROM node:18-alpine AS builder

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
COPY prisma ./prisma/

# Install app dependencies
RUN npm ci

# Bundle app source
COPY . .

# Generate Prisma Client & Build NextJS app
RUN npx prisma generate
RUN npm run build

# Production image
FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

# Cloud Run expects the app to listen on the port specified by the PORT environment variable.
ENV PORT 8080
EXPOSE 8080

# Prisma push / migrations can be handled via init scripts or externally for production.
# Start the server using the production build
CMD [ "npm", "run", "start:prod" ]
