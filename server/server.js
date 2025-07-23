import express from 'express';
import 'dotenv/config'
import connectDB from './config/connectDB.js';

connectDB();

const app=express();

app.get('/',(req,res)=>{
    res.send('API is running');
});

const PORT=process.env.PORT||5001;
app.listen(PORT,()=>console.log(`Server is running on ${PORT}`));