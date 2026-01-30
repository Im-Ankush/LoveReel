import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  getDashboardConfig,
  applyDashboardConfig,
  filterHiddenPages,
} from '../utils/dashboardConfig.js'
import { ALL_CATEGORIES } from '../utils/siteConfig.js'
import { useMediaQuery } from '../hooks/useMediaQuery.js'

const EducationLayout = ({ children }) => {
  const location = useLocation()
  const isMobile = useMediaQuery()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [expandedSections, setExpandedSections] = useState({})
  const config = getDashboardConfig()
  const visibleCategories = filterHiddenPages(ALL_CATEGORIES, config)
  const grouped = applyDashboardConfig(visibleCategories, config)
  const educationCategories = grouped.education || []

  useEffect(() => {
    if (!isMobile) setSidebarOpen(false)
  }, [isMobile])

  const isExpanded = (title) => expandedSections[title] === true
  const toggleSection = (title) => setExpandedSections((prev) => ({ ...prev, [title]: !isExpanded(title) }))
  const closeSidebar = () => setSidebarOpen(false)

  return (
    <div style={styles.wrapper}>
      {isMobile && (
        <button type="button" onClick={() => setSidebarOpen(true)} style={styles.menuButton} aria-label="Open menu">
          ☰
        </button>
      )}
      {isMobile && sidebarOpen && (
        <div style={styles.overlay} onClick={closeSidebar} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Escape' && closeSidebar()} aria-label="Close menu" />
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
          <span style={styles.sidebarLogo}>📚</span>
          <span style={styles.sidebarTitle}>Education</span>
        </div>
        <nav style={styles.nav}>
          <Link
            to="/"
            style={{
              ...styles.navLink,
              ...(location.pathname === '/' ? styles.navLinkActive : {}),
            }}
            onClick={closeSidebar}
          >
            <span style={styles.navEmoji}>🏠</span>
            <span>Home</span>
          </Link>
          {educationCategories.map((category) => {
            const open = isExpanded(category.title)
            return (
              <div key={category.title} style={styles.section}>
                <button
                  type="button"
                  onClick={() => toggleSection(category.title)}
                  style={styles.sectionTitleBtn}
                  aria-expanded={open}
                >
                  <span style={styles.sidebarChevron}>{open ? '▼' : '▶'}</span>
                  <span style={styles.sectionTitleText}>{category.title}</span>
                </button>
                {open && (
                  <div style={styles.sectionLinks}>
                    {category.pages.map((p) => {
                      const isActive = location.pathname === p.path
                      return (
                        <Link
                          key={p.path}
                          to={p.path}
                          style={{
                            ...styles.pageLink,
                            ...(isActive ? styles.pageLinkActive : {}),
                          }}
                          onClick={closeSidebar}
                        >
                          <span style={styles.linkEmoji}>{p.emoji}</span>
                          <span>{p.label}</span>
                        </Link>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </nav>
      </aside>
      <main style={{ ...styles.main, ...(isMobile ? styles.mainMobile : {}) }} className={isMobile ? 'admin-main-mobile' : ''}>{children}</main>
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
    width: '260px',
    minWidth: '260px',
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
    overflowY: 'auto',
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
  section: {
    marginTop: '12px',
  },
  sectionTitleBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    width: '100%',
    padding: '8px 14px 6px',
    border: 'none',
    background: 'transparent',
    color: '#94a3b8',
    cursor: 'pointer',
    textAlign: 'left',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    fontSize: '11px',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.8px',
  },
  sidebarChevron: {
    fontSize: '10px',
    color: '#ff758f',
    lineHeight: 1,
    minWidth: '14px',
  },
  sectionTitleText: {
    flex: 1,
  },
  sectionLinks: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  },
  pageLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '10px 14px',
    borderRadius: '8px',
    textDecoration: 'none',
    color: '#c4b5d0',
    fontSize: '14px',
    fontWeight: 500,
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    transition: 'background 0.2s, color 0.2s',
  },
  pageLinkActive: {
    background: 'rgba(255, 77, 109, 0.25)',
    color: '#ff758f',
    fontWeight: 600,
  },
  linkEmoji: { fontSize: '16px' },
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

export default EducationLayout
