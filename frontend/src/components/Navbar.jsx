import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  return (
    <motion.header
      className="landing-nav"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      <div className="page-wrap landing-nav__inner">
        <Link to="/dashboard" className="brand-block">
          <div className="brand-mark" />
          <div className="brand-copy">
            <strong>TaskFlow Pro</strong>
            <span>{user?.role === 'admin' ? 'Admin workspace' : 'Task workspace'}</span>
          </div>
        </Link>

        <div className="nav-actions">
          <div className="brand-copy" style={{ textAlign: 'right' }}>
            <strong style={{ fontSize: '0.98rem' }}>{user?.name || 'User'}</strong>
            <span>{user?.email}</span>
          </div>

          {user?.role === 'admin' && (
            <Link to="/admin" className="btn btn-secondary">
              Admin Panel
            </Link>
          )}

          <button className="btn btn-danger" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </motion.header>
  );
}
