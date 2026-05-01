import { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';
import heroImg from '../assets/hero.png';

export default function Home() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard', { replace: true });
    }
  }, [navigate, user]);

  const stats = [
    { value: '12k+', label: 'Tasks managed' },
    { value: '98%', label: 'Daily completion' },
    { value: '24/7', label: 'Access anywhere' },
  ];

  const features = [
    {
      icon: '🛍️',
      title: 'Clean workflow',
      text: 'A polished dashboard that feels like a modern storefront, with everything boxed and easy to scan.',
    },
    {
      icon: '⚡',
      title: 'Fast task control',
      text: 'Create, update, complete, and remove tasks without the clutter of a generic admin screen.',
    },
    {
      icon: '👑',
      title: 'Admin management',
      text: 'Switch to admin view and manage users with structured controls and clear status chips.',
    },
  ];

  return (
    <div className="landing-shell app-shell">
      <header className="landing-nav">
        <div className="page-wrap landing-nav__inner">
          <Link to="/" className="brand-block">
            <div className="brand-mark" />
            <div className="brand-copy">
              <strong>TaskFlow Pro</strong>
              <span>Elegant workboard for teams</span>
            </div>
          </Link>

          <div className="nav-actions">
            <Link to="/login" className="btn btn-secondary">
              Login
            </Link>
            <Link to="/register" className="btn btn-primary">
              Register
            </Link>
          </div>
        </div>
      </header>

      <main className="page-wrap">
        <section className="hero-grid">
          <motion.div
            className="hero-copy"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="eyebrow">Structured. Beautiful. Product-like.</span>
            <h1 className="hero-title">
              A task dashboard that feels like a <span className="gradient">premium product</span>.
            </h1>
            <p className="hero-text">
              Get a storefront-style experience with boxed sections, strong visual hierarchy,
              a hero image, and clean admin tooling for real task tracking.
            </p>

            <div className="hero-metrics">
              {stats.map((item) => (
                <div key={item.label} className="metric-card">
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>

            <div className="cta-row">
              <Link to="/register" className="btn btn-primary">
                Start Free
              </Link>
              <Link to="/login" className="btn btn-ghost">
                Login to Dashboard
              </Link>
            </div>
          </motion.div>

          <motion.div
            className="hero-panel"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="floating-chip top">
              <strong>Today</strong>
              18 tasks ready to ship
            </div>
            <div className="floating-chip bottom">
              <strong>Admin</strong>
              Manage users & permissions
            </div>
            <img className="hero-image" src={heroImg} alt="TaskFlow Pro dashboard preview" />
          </motion.div>
        </section>

        <section className="section-block">
          <div className="section-header">
            <h2 className="section-title">Everything boxed. Nothing noisy.</h2>
            <p className="section-subtitle">
              The app is laid out like a modern e-commerce homepage: bold hero, highlighted cards,
              and clear calls to action. After login, your task area and admin tools stay organized.
            </p>
          </div>

          <div className="feature-grid">
            {features.map((feature) => (
              <motion.article
                key={feature.title}
                className="feature-card"
                whileHover={{ y: -6 }}
                transition={{ duration: 0.2 }}
              >
                <div className="icon-badge">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="footer-bar">
          <p>Register to start managing tasks. Login to continue where you left off.</p>
        </section>
      </main>
    </div>
  );
}
