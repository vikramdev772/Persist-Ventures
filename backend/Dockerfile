# Use Node.js 20
FROM node:20-alpine

# Update npm to the latest version
RUN npm install -g npm@latest

# Set working directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy prisma schema
COPY prisma ./prisma/

# Generate Prisma client
RUN npx prisma generate

# Copy the rest of the application code
COPY . .

# Build TypeScript
RUN npm run build

# Expose port
EXPOSE 3000

# Start the application in dev mode as requested
CMD ["npm", "run", "dev"]

