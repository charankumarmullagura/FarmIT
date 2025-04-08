import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import Routes from './routes/FarmRoutes.js';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/Main', Routes);

const PORT = process.env.PORT || 5005;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));