import express from 'express';
import dotenv from "dotenv";
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js'
import Cors from "cors"


dotenv.config();

connectDB();

const app = express();

// middlewere
app.use(express.json());
app.use(morgan('dev'));
app.use(Cors());

//  routes

app.use('/api/v1/auth', authRoutes);

// Rest Api

app.get("/", (req, res) => {
    res.send("<h1> This is rendered on PORT 8080 </h1>")
})

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})