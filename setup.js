const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Create project directory
execSync('mkdir backend');
console.log('Created project directory: backend');

// Change to project directory
process.chdir('backend');
console.log('Changed to project directory');

// Initialize npm project
execSync('npm init -y');
console.log('Initialized npm project');

// Install dependencies
execSync('npm install express @prisma/client pg dotenv cors helmet');
execSync('npm install typescript ts-node @types/node @types/express @types/cors prisma nodemon @types/body-parser --save-dev');
console.log('Installed dependencies');

// Initialize TypeScript configuration
execSync('npx tsc --init');
console.log('Initialized TypeScript configuration');

// Initialize Prisma
execSync('npx prisma init');
console.log('Initialized Prisma');

// Create folder structure
const folders = ['src/models', 'src/controllers', 'src/config', 'src/routes', 'src/middlewares'];
folders.forEach(folder => {
  fs.mkdirSync(folder, { recursive: true });
  console.log(`Created folder: ${folder}`);
});

// Create server.ts file
const serverContent = `
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import { connectDB } from './config/db';

dotenv.config();

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await connectDB();
    
    app.listen(PORT, () => {
      console.log(\`Server is running on port \${PORT}\`);
    });
  } catch (error) {
    console.error('Failed to start the server:', error);
    process.exit(1);
  }
}

startServer();
`;
fs.writeFileSync('src/server.ts', serverContent);
console.log('Created src/server.ts file');

// Create db.ts file
const dbContent = `
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

export async function connectDB() {
  try {
    await prisma.$connect();
    console.log('Successfully connected to the database');
  } catch (error) {
    console.error('Failed to connect to the database:', error);
    process.exit(1);
  }
}

export { prisma };
`;
fs.writeFileSync('src/config/db.ts', dbContent);
console.log('Created src/config/db.ts file');

// Create nodemon.json
const nodemonConfig = {
  "watch": ["src"],
  "ext": "ts",
  "ignore": ["src/**/*.spec.ts"],
  "exec": "ts-node ./src/server.ts"
};
fs.writeFileSync('nodemon.json', JSON.stringify(nodemonConfig, null, 2));
console.log('Created nodemon.json file');

// Update package.json
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
packageJson.name = "backend";
packageJson.scripts = {
  ...packageJson.scripts,
  "start": "node dist/server.js",
  "dev": "nodemon",
  "build": "tsc",
  "prisma:generate": "prisma generate",
  "prisma:migrate": "prisma migrate dev",
  "prisma:studio": "prisma studio"
};
fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));
console.log('Updated package.json with project name and scripts');

// Create Dockerfile
const dockerfileContent = `
FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
`;
fs.writeFileSync('Dockerfile', dockerfileContent);
console.log('Created Dockerfile');

// Create .dockerignore
const dockerignoreContent = `
node_modules
npm-debug.log
dist
.env
`;
fs.writeFileSync('.dockerignore', dockerignoreContent);
console.log('Created .dockerignore file');

// Update .env file
const envContent = `
DATABASE_URL="postgresql://YOUR_USERNAME:YOUR_PASSWORD@localhost:5432/YOUR_DATABASE_NAME?schema=public"
PORT=3000
NODE_ENV=development
`;
fs.writeFileSync('.env', envContent);
console.log('Updated .env file');

// Update prisma/schema.prisma
const prismaSchemaContent = `
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  password  String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
`;
fs.writeFileSync('prisma/schema.prisma', prismaSchemaContent);
console.log('Updated Prisma schema');

// Create a script to generate Prisma client and run migrations
const setupPrismaContent = `
const { execSync } = require('child_process');

try {
  console.log('Generating Prisma client...');
  execSync('npx prisma generate', { stdio: 'inherit' });
  
  console.log('Applying database migrations...');
  execSync('npx prisma migrate dev --name init', { stdio: 'inherit' });
  
  console.log('Prisma setup completed successfully!');
} catch (error) {
  console.error('An error occurred during Prisma setup:', error.message);
}
`;
fs.writeFileSync('setup-prisma.js', setupPrismaContent);
console.log('Created setup-prisma.js file');

console.log('Project setup complete!');
console.log('To finish setup, run:');
console.log('1. Update the DATABASE_URL in .env with your database credentials');
console.log('2. Run "node setup-prisma.js" to generate Prisma client and run migrations');
console.log('3. Start the development server with "npm run dev"');



// npm install express @prisma/client pg dotenv cors helmet
// npm install --save-dev typescript ts-node @types/node @types/express @types/cors prisma nodemon @types/body-parser
// npx prisma generate
// npx prisma migrate dev --name init
// npm run dev