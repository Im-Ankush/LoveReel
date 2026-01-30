import React from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'

const NAV = [
  { path: '/admin', label: 'Dashboard', emoji: '📊' },
  { path: '/admin/pages', label: 'Pages', emoji: '📄' },
  { path: '/admin/routes', label: 'Routes', emoji: '🔗' },
  { path: '/admin/settings', label: 'Settings', emoji: '⚙️' },
]

const AdminLayout = () => {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <div style={styles.wrapper}>
      <aside style={styles.sidebar}>
        <div style={styles.sidebarHeader}>
          <span style={styles.sidebarLogo}>⚙️</span>
          <span style={styles.sidebarTitle}>Admin</span>
        </div>
        <nav style={styles.nav}>
          {NAV.map((item) => {
            const isActive = location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path))
            return (
              <Link
                key={item.path}
                to={item.path}
                style={{ ...styles.navLink, ...(isActive ? styles.navLinkActive : {}) }}
              >
                <span style={styles.navEmoji}>{item.emoji}</span>
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>
        <div style={styles.sidebarFooter}>
          <button type="button" onClick={() => navigate('/')} style={styles.backBtn}>
            ← Back to site
          </button>
        </div>
      </aside>
      <main style={styles.main}>
        <Outlet />
      </main>
    </div>
  )
}

const styles = {
  wrapper: {
    display: 'flex',
    height: 'calc(100vh - 60px)',
    minHeight: 0,
    paddingTop: '60px',
    cursor: 'auto',
    overflow: 'hidden',
  },
  sidebar: {
    width: '240px',
    minWidth: '240px',
    flexShrink: 0,
    background: 'linear-gradient(180deg, #1a1120 0%, #0f0a14 100%)',
    borderRight: '1px solid rgba(255, 77, 109, 0.2)',
    display: 'flex',
    flexDirection: 'column',
    padding: '20px 0',
    overflowY: 'auto',
  },
  sidebarHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '0 20px 20px',
    borderBottom: '1px solid rgba(255,255,255,0.08)',
    marginBottom: '16px',
  },
  sidebarLogo: { fontSize: '24px' },
  sidebarTitle: {
    fontSize: '18px',
    fontWeight: 700,
    color: '#ff758f',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  nav: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    padding: '0 12px',
    flex: 1,
  },
  navLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 14px',
    borderRadius: '10px',
    textDecoration: 'none',
    color: '#c4b5d0',
    fontSize: '15px',
    fontWeight: 500,
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    transition: 'background 0.2s, color 0.2s',
  },
  navLinkActive: {
    background: 'rgba(255, 77, 109, 0.2)',
    color: '#ff758f',
    fontWeight: 600,
  },
  navEmoji: { fontSize: '18px' },
  sidebarFooter: {
    padding: '16px 20px 0',
    borderTop: '1px solid rgba(255,255,255,0.08)',
  },
  backBtn: {
    width: '100%',
    padding: '10px 14px',
    fontSize: '14px',
    fontWeight: 600,
    color: '#c4b5d0',
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '10px',
    cursor: 'pointer',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  main: {
    flex: 1,
    minHeight: 0,
    padding: '24px 32px',
    overflowY: 'auto',
    overflowX: 'hidden',
    background: 'rgba(0,0,0,0.2)',
  },
}

export default AdminLayout
