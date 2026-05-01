import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import API from '../services/api';
import { AuthContext } from '../context/AuthContext';

export default function Login() {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const login = async () => {
    if (!form.email || !form.password) {
      setError('Email and password are required');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const r = await API.post('/auth/login', form);
      localStorage.setItem('token', r.data.token);
      localStorage.setItem('user', JSON.stringify(r.data.user));
      setUser(r.data.user);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.msg || err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-shell app-shell">
      <motion.div
        className="auth-card"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <span className="eyebrow">Welcome back</span>
        <h2 className="panel-title" style={{ marginTop: 12 }}>
          Login to your workspace
        </h2>
        <p className="auth-note" style={{ marginBottom: 20 }}>
          Pick up your tasks, manage updates, and continue right where you left off.
        </p>

        <div className="field-grid">
          {error && <div className="btn-danger" style={{ padding: '0.9rem 1rem' }}>{error}</div>}

          <div>
            <label className="field-label">Email</label>
            <input
              className="field-input"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div>
            <label className="field-label">Password</label>
            <input
              className="field-input"
              placeholder="Your password"
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          <button className="btn btn-primary" onClick={login} disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </div>

        <p className="auth-note" style={{ marginTop: 18 }}>
          New here? <Link to="/register" className="btn-link">Create an account</Link>
        </p>
      </motion.div>
    </div>
  );
}
