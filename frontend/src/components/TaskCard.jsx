import { motion } from 'framer-motion';

export default function TaskCard({ t, del, toggle, onEdit }) {
  return (
    <motion.article
      className="task-card"
      whileHover={{ y: -4 }}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
    >
      <div className="task-main">
        <button onClick={() => toggle(t._id)} className="task-toggle" aria-label="Toggle task completion">
          ✓
        </button>
        <div style={{ minWidth: 0 }}>
          <h3 className={`task-title ${t.completed ? 'done' : ''}`}>{t.title}</h3>
          <p>{t.completed ? 'Completed' : 'In progress'}</p>
        </div>
      </div>

      <div className="task-actions">
        <button onClick={onEdit} className="btn btn-warning">
          Edit
        </button>
        <button onClick={() => del(t._id)} className="btn btn-danger">
          Delete
        </button>
      </div>
    </motion.article>
  );
}
