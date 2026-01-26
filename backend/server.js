import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import {connectDB} from './config/db.js';
import authRouter from './routes/authRoute.js';
import quizRouter from './routes/quizRoute.js';

dotenv.config();
connectDB()

const app = express();

app.use(express.json());


const PORT = process.env.PORT || 5000;

app.use(cors());

app.get('/',(req,res)=>{
    res.send("API is working ....")
})

app.use('/api/auth',authRouter)
app.use('/api/quiz',quizRouter)


app.listen(PORT ,'0.0.0.0',()=>{
    console.log(`Server connected to http://localhost:${PORT}`);
})