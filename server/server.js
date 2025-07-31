import express from 'express';
import cors from 'cors';
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
import { Server } from 'socket.io';
import http from 'http';
import Question from './models/question.model.js'; 

connectDB();

const app=express();
const httpServer=http.createServer(app);
const io=new Server(httpServer,{
    cors: {
      origin: process.env.CLIENT_URL,
      methods: ['GET', 'POST'],
      credentials: true,
    }
});

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
    session({
        secret:process.env.SESSION_SECRET,
        resave:false,
        saveUninitialized:false,
    })
);

io.on('connection',async(socket)=>{
    console.log('A user connected:',socket.id);
    try {
    const questions = await Question.find({}).populate('author', 'name').sort({ createdAt: -1 });
    socket.emit('load_questions', questions);
  } catch (error) {
    console.error('Error fetching questions:', error);
  }
  socket.on('new_question', async (data) => {
    try {
      // Save the new question to the database
      const question = new Question({
        text: data.text,
        author: data.authorId,
      });
      const savedQuestion = await question.save();
      const populatedQuestion = await Question.findById(savedQuestion._id).populate('author', 'name');

      // Broadcast the new question to all connected clients
      io.emit('question_created', populatedQuestion);
    } catch (error) {
      console.error('Error saving question:', error);
    }
  });
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

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
httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));