import React, { useState, useEffect } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useMediaQuery } from '../../hooks/useMediaQuery.js'

const NAV = [
  { path: '/admin', label: 'Dashboard', emoji: '📊' },
  { path: '/admin/pages', label: 'Pages', emoji: '📄' },
  { path: '/admin/routes', label: 'Routes', emoji: '🔗' },
  { path: '/admin/settings', label: 'Settings', emoji: '⚙️' },
]

const AdminLayout = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const isMobile = useMediaQuery()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    if (!isMobile) setSidebarOpen(false)
  }, [isMobile])

  const closeSidebar = () => setSidebarOpen(false)

  return (
    <div style={styles.wrapper}>
      {isMobile && (
        <button
          type="button"
          onClick={() => setSidebarOpen(true)}
          style={styles.menuButton}
          aria-label="Open menu"
        >
          ☰
        </button>
      )}
      {isMobile && sidebarOpen && (
        <div
          style={styles.overlay}
          onClick={closeSidebar}
          onKeyDown={(e) => e.key === 'Escape' && closeSidebar()}
          role="button"
          tabIndex={0}
          aria-label="Close menu"
        />
      )}
      <aside style={{
        ...styles.sidebar,
        ...(isMobile ? styles.sidebarMobile : {}),
        ...(isMobile && sidebarOpen ? styles.sidebarMobileOpen : {}),
      }}>
        {isMobile && (
          <button type="button" onClick={closeSidebar} style={styles.sidebarClose} aria-label="Close menu">✕</button>
        )}
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
                onClick={closeSidebar}
              >
                <span style={styles.navEmoji}>{item.emoji}</span>
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>
        <div style={styles.sidebarFooter}>
          <button type="button" onClick={() => { navigate('/'); closeSidebar() }} style={styles.backBtn}>
            ← Back to site
          </button>
        </div>
      </aside>
      <main style={{ ...styles.main, ...(isMobile ? styles.mainMobile : {}) }} className={isMobile ? 'admin-main-mobile' : ''}>
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
    position: 'relative',
  },
  menuButton: {
    position: 'fixed',
    top: '12px',
    left: '12px',
    zIndex: 1001,
    width: '44px',
    height: '44px',
    borderRadius: '10px',
    border: '2px solid rgba(255, 77, 109, 0.4)',
    background: 'rgba(255, 77, 109, 0.2)',
    color: '#fff',
    fontSize: '20px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0,0,0,0.5)',
    zIndex: 998,
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
  sidebarMobile: {
    position: 'fixed',
    top: 0,
    left: 0,
    height: '100vh',
    width: '280px',
    maxWidth: '85vw',
    zIndex: 999,
    transform: 'translateX(-100%)',
    transition: 'transform 0.25s ease',
    boxShadow: 'none',
  },
  sidebarMobileOpen: {
    transform: 'translateX(0)',
    boxShadow: '4px 0 24px rgba(0,0,0,0.4)',
  },
  sidebarClose: {
    position: 'absolute',
    top: '16px',
    right: '16px',
    width: '40px',
    height: '40px',
    borderRadius: '8px',
    border: 'none',
    background: 'rgba(255,255,255,0.1)',
    color: '#fff',
    fontSize: '18px',
    cursor: 'pointer',
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
  mainMobile: {
    padding: '16px',
    width: '100%',
  },
}

export default AdminLayout
