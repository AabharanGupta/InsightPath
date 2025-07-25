import { Link } from 'react-router-dom';
import styles from './Navbar.module.css'
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext.jsx';

const Navbar = () => {
    const {userInfo,logout}=useContext(AuthContext);
    return (
      <nav className={styles.navbar}>
        <div className={styles.navLinks}>
          <Link to="/">Home</Link>
          {userInfo && <Link to="/dashboard">Dashboard</Link>}     
        </div>
        
        <div className={styles.userActions}>
          {userInfo?(
            <>
              <span className={styles.userName}>Hello, {userInfo.name}</span>
              <button onClick={logout} className={styles.logoutButton}>
                Logout
              </button>
            </>
          ):(
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )
          }
        </div>
        
      </nav>
    );
};
export default Navbar;