import express from 'express';
import cors from 'cors';
import dotenv , { configDotenv } from 'dotenv';
import { healthcheck } from './controllers/healthcheck.controllers.js';
import connectDB from './config/db.js';
import foodRouter from './routes/foodRoute.js';

dotenv.config({
    path:"./.env" 
})

// app config
const app = express();
const PORT = process.env.PORT || 4000;

//middleware
app.use(express.json())
app.use(cors())

//routes
app.use('/api/v1/healthcheck', healthcheck); // ✅ Use router
app.use('/api/food', foodRouter); // API endpoint for food
app.use('/images',express.static('uploads'))

//db connection
connectDB();

app.listen(PORT , ()=> {
    console.log(`Server started on http://localhost:${PORT}`);
})
