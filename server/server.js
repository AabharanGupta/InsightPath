import express from 'express';
import 'dotenv/config'
import connectDB from './config/connectDB.js';
import authRoutes from './routes/auth.routes.js'

connectDB();

const app=express();

app.use(express.json());

app.use('/api/auth', authRoutes);


app.get('/',(req,res)=>{
    res.send('API is running');
});

const PORT=process.env.PORT||5001;
app.listen(PORT,()=>console.log(`Server is running on ${PORT}`));