
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
      console.log(`\n\t✔️   Server is running on port ${PORT} \n`);
    });
  } catch (error) {
    console.error('\n\t ❌ Failed to start the server:', error);
    process.exit(1);
  }
}

startServer();
