import express from 'express';
import session from 'express-session';
import passport from 'passport';
import 'dotenv/config'
import connectDB from './config/connectDB.js';
import './config/passport.config.js';
import authRoutes from './routes/auth.routes.js';
import contentRoutes from './routes/content.routes.js';
import userRoutes from './routes/user.routes.js';
import todoRoutes from './routes/todo.routes.js';
import uploadRoutes from './routes/upload.routes.js';

connectDB();

const app=express();

app.use(express.json());

app.use(
    session({
        secret:process.env.SESSION_SECRET,
        resave:false,
        saveUninitialized:false,
    })
);

app.use(passport.initialize());
app.use(passport.session());

//Routes
app.use('/api/auth', authRoutes);
app.use('/api/content',contentRoutes);
app.use('/api/users',userRoutes);
app.use('/api/todos', todoRoutes);
app.use('/api/uploads',uploadRoutes);

app.get('/',(req,res)=>{
    res.send('API is running');
});

const PORT=process.env.PORT||5001;
app.listen(PORT,()=>console.log(`Server is running on ${PORT}`));