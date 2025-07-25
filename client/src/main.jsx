import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import Navbar from './components/Navbar.jsx';
import Layout from './components/Layout.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import HomePage from './pages/homepage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import App from './App.jsx'

const router=createBrowserRouter([
  {
    path:'/',
    element:<Layout/>,
    children:[
      {
        index:true,
        element:<HomePage/>
      },{
        path:'login',
        element:<LoginPage/>
      },{
        path:'register',
        element:<RegisterPage/>
      },{
        path:'dashboard',
        element:<DashboardPage/>
      }
    ]
  }
])




ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);