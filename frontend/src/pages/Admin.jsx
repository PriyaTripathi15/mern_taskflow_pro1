import { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import API from '../services/api';
import { AuthContext } from '../context/AuthContext';

export default function Admin() {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  if (user && user.role !== 'admin') {
    return <Navigate to="/dashboard" />;
  }

  const fetchUsers = async () => {
    try {
      const r = await API.get('/admin/users');
      setUsers(r.data);
    } catch (err) {
      setError('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    if (window.confirm('Delete this user?')) {
      await API.delete(`/admin/users/${id}`);
      fetchUsers();
    }
  };

  const toggleAdmin = async (id, isAdmin) => {
    await API.put(`/admin/users/${id}`, { role: isAdmin ? 'user' : 'admin' });
    fetchUsers();
  };

  return (
    <motion.main className="app-shell" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="page-wrap section-block">
        <div className="section-header">
          <span className="eyebrow">Admin tools</span>
          <h1 className="page-title" style={{ marginTop: 12 }}>
            User management
          </h1>
          <p className="section-subtitle">
            Keep the workspace clean by promoting, demoting, or removing users.
          </p>
        </div>

        {error && <div className="btn-danger" style={{ marginBottom: 16 }}>{error}</div>}

        <motion.section className="table-card" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          {loading ? (
            <p>Loading users...</p>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Tasks</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u._id}>
                    <td>{u.name || 'N/A'}</td>
                    <td>{u.email}</td>
                    <td>
                      <span className={`status-pill ${u.role === 'admin' ? 'admin' : 'user'}`}>
                        {u.role}
                      </span>
                    </td>
                    <td>{u.taskCount || 0}</td>
                    <td>
                      <div className="table-actions">
                        <button className="btn btn-warning" onClick={() => toggleAdmin(u._id, u.role === 'admin')}>
                          {u.role === 'admin' ? 'Revoke' : 'Make admin'}
                        </button>
                        <button className="btn btn-danger" onClick={() => deleteUser(u._id)}>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </motion.section>
      </div>
    </motion.main>
  );
}
