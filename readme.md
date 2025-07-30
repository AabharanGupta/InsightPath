# InsightPath 
InsightPath is a full-stack MERN educational portal designed to facilitate learning through content sharing, real-time discussions, and personalized task management.

## Live Demo
Frontend (Vercel): https://insight-path-vert.vercel.app/

Backend (Railway): https://insightpath-production.up.railway.app

## Project Overview
This platform allows users to register, log in, and engage with a community of learners. Users can post educational resources (articles, videos, documents), comment on them, and save them for later. The application also features a real-time Q&A forum powered by WebSockets and a personal to-do list to help users stay organized. The project is built with a modern MERN stack and deployed using a robust, scalable infrastructure.

### Key Features
1. Authentication: Secure local (email/password) login and social login with Google OAuth 2.0. Routes are protected using JSON Web Tokens (JWT).

2. Content Management (CRUD): Users can create, read, update, and delete educational posts.

3. Content Interaction:

->Like/Unlike posts.

->Comment on posts to foster discussion.

->Save content to a personal list for later viewing.

4. File Uploads: Robust file upload system supporting images and PDFs (up to 5MB) using Cloudinary for cloud storage.

5. Personalized Dashboard: A user-specific dashboard displaying lists of their saved, liked, and commented-on content.

6. Real-time Q&A Forum: A live Q&A page built with Socket.IO where new questions and answers appear instantly without a page refresh.

7. To-Do List: A private, full CRUD to-do list for each user to manage their tasks.

8. Responsive Design: A mobile-first design that ensures a seamless experience on all devices.
