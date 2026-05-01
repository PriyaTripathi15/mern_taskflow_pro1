import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import API from '../services/api';
import { AuthContext } from '../context/AuthContext';

export default function Register() {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '', name: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const register = async () => {
    if (!form.email || !form.password || !form.name) {
      setError('All fields are required');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const r = await API.post('/auth/register', form);
      localStorage.setItem('token', r.data.token);
      localStorage.setItem('user', JSON.stringify(r.data.user));
      setUser(r.data.user);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.msg || err.response?.data?.message || 'Registration failed');
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
        <span className="eyebrow">Create account</span>
        <h2 className="panel-title" style={{ marginTop: 12 }}>
          Register for a cleaner workflow
        </h2>
        <p className="auth-note" style={{ marginBottom: 20 }}>
          Sign up to manage your tasks, keep everything boxed, and open the admin panel later.
        </p>

        <div className="field-grid">
          {error && <div className="btn-danger" style={{ padding: '0.9rem 1rem' }}>{error}</div>}

          <div>
            <label className="field-label">Name</label>
            <input
              className="field-input"
              placeholder="Your name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

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
              placeholder="Choose a password"
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          <button className="btn btn-primary" onClick={register} disabled={loading}>
            {loading ? 'Creating account...' : 'Register'}
          </button>
        </div>

        <p className="auth-note" style={{ marginTop: 18 }}>
          Already have an account? <Link to="/login" className="btn-link">Login here</Link>
        </p>
      </motion.div>
    </div>
  );
}
