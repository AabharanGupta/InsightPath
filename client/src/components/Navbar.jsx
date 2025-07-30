import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext.jsx'
import styles from './Navbar.module.css';

const Navbar = () => {
  const { userInfo, logout } = useContext(AuthContext);

  return (
    <nav className={styles.navbar}>
      <div className={styles.navLinks}>
        <Link to="/">Home</Link> 
        <Link to="/qna">Q&A</Link>
        {userInfo && 
        <>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/todos">To-Do List</Link>
          <Link to="/create-content">Create Post</Link>
        </>
        }
      </div>
      <div className={styles.userActions}>
        {userInfo ? (
          <>
            <span className={styles.userName}>Hello, {userInfo.name}</span>
            <button onClick={logout} className={styles.logoutButton}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;