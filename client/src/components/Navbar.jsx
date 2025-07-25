import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={{ display: 'flex', gap: '1rem', padding: '1rem', background: '#f0f0f0' }}>
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
      <Link to="/dashboard">Dashboard</Link>
    </nav>
  );
};
export default Navbar;