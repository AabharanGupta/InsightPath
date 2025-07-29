import { createBrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Layout from './components/Layout.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import { AuthProvider } from '../context/AuthContext.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import App from './App.jsx'
import TodoPage from './pages/ToDoPage.jsx';
import ContentDetailPage from './pages/Content DetailPage.jsx';
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'register',
        element: <RegisterPage />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: 'dashboard',
            element: <DashboardPage />,
          },
          {
            path:'todos',
            element:<TodoPage />
          },
          {
            path:'content/:id',
            element:<ContentDetailPage />
          }
        ],
      },
    ],
  },
]);

export default router;