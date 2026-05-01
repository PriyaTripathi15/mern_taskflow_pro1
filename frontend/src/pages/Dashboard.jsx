import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import API from '../services/api';
import TaskCard from '../components/TaskCard';

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const r = await API.get('/tasks');
      setTasks(r.data);
    } catch (err) {
      setError('Failed to load tasks');
    }
  };

  const addTask = async () => {
    if (!title.trim()) {
      setError('Task title cannot be empty');
      return;
    }

    try {
      await API.post('/tasks', { title });
      setTitle('');
      setError('');
      loadTasks();
    } catch (err) {
      setError('Failed to add task');
    }
  };

  const deleteTask = async (id) => {
    if (window.confirm('Delete this task?')) {
      await API.delete(`/tasks/${id}`);
      loadTasks();
    }
  };

  const toggleTask = async (id) => {
    await API.put(`/tasks/${id}`, {});
    loadTasks();
  };

  const startEdit = (id, currentTitle) => {
    setEditingId(id);
    setEditTitle(currentTitle);
  };

  const updateTask = async (id) => {
    if (!editTitle.trim()) {
      setError('Task title cannot be empty');
      return;
    }

    await API.put(`/tasks/${id}`, { title: editTitle });
    setEditingId(null);
    setEditTitle('');
    loadTasks();
  };

  const filteredTasks = tasks.filter((t) => {
    if (filter === 'active') return !t.completed;
    if (filter === 'completed') return t.completed;
    return true;
  });

  const stats = {
    total: tasks.length,
    active: tasks.filter((t) => !t.completed).length,
    completed: tasks.filter((t) => t.completed).length,
  };

  return (
    <motion.main className="app-shell" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="page-wrap section-block">
        <div className="section-header">
          <span className="eyebrow">Your workspace</span>
          <h1 className="page-title" style={{ marginTop: 12 }}>
            Task dashboard
          </h1>
          <p className="section-subtitle">
            Boxed, clean, and easy to read. Add, edit, complete, or delete tasks from a polished dashboard.
          </p>
        </div>

        <div className="stats-grid">
          <div className="stats-card">
            <strong>{stats.total}</strong>
            <p>Total tasks</p>
          </div>
          <div className="stats-card">
            <strong>{stats.active}</strong>
            <p>Active tasks</p>
          </div>
          <div className="stats-card">
            <strong>{stats.completed}</strong>
            <p>Completed tasks</p>
          </div>
        </div>

        <motion.section className="panel-card" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <div className="dashboard-toolbar">
            <div>
              <h2 className="panel-title">Add a new task</h2>
              <p className="muted">Keep your to-do list moving with quick task entry.</p>
            </div>
            <div className="filter-bar">
              {['all', 'active', 'completed'].map((item) => (
                <button
                  key={item}
                  onClick={() => setFilter(item)}
                  className={`filter-pill ${filter === item ? 'active' : ''}`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {error && <div className="btn-danger" style={{ marginTop: 16 }}>{error}</div>}

          <div className="table-actions" style={{ marginTop: 18 }}>
            <input
              className="field-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addTask()}
              placeholder="Type a task title"
              style={{ flex: 1 }}
            />
            <button className="btn btn-primary" onClick={addTask}>
              Add Task
            </button>
          </div>
        </motion.section>

        <section style={{ marginTop: 22 }} className="task-list">
          {filteredTasks.length === 0 ? (
            <div className="panel-card">
              <p>
                {filter === 'all' && 'No tasks yet. Add one to start.'}
                {filter === 'active' && 'No active tasks right now.'}
                {filter === 'completed' && 'No completed tasks yet.'}
              </p>
            </div>
          ) : (
            filteredTasks.map((t) => (
              <TaskCard
                key={t._id}
                t={t}
                del={deleteTask}
                toggle={toggleTask}
                onEdit={() => startEdit(t._id, t.title)}
              />
            ))
          )}
        </section>

        <AnimatePresence>
          {editingId && (
            <motion.div
              className="modal-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setEditingId(null)}
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(2, 6, 23, 0.66)',
                display: 'grid',
                placeItems: 'center',
                padding: 20,
                zIndex: 40,
              }}
            >
              <motion.div
                className="auth-card"
                onClick={(e) => e.stopPropagation()}
                initial={{ scale: 0.96, y: 12 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.96, y: 12 }}
              >
                <h2 className="panel-title">Update task</h2>
                <p className="auth-note" style={{ marginBottom: 18 }}>
                  Edit the task title and save the update.
                </p>
                <input
                  className="field-input"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
                <div className="cta-row" style={{ marginTop: 18 }}>
                  <button className="btn btn-primary" onClick={() => updateTask(editingId)}>
                    Save
                  </button>
                  <button className="btn btn-secondary" onClick={() => setEditingId(null)}>
                    Cancel
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.main>
  );
}
