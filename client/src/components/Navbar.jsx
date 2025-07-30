import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext.jsx';
import styles from './Navbar.module.css';

const Navbar = () => {
  const { userInfo, logout } = useContext(AuthContext);

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.leftSection}>
          <Link to="/" className={styles.brand}>
            INSIGHT PATH
          </Link>
          <div className={styles.navLinks}>
            <Link to="/qna">Q&A</Link>
          </div>
        </div>

        <div className={styles.userActions}>
          {userInfo ? (
            <>
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/create-content">Create Post</Link>
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
      </div>
    </nav>
  );
};

export default Navbar;