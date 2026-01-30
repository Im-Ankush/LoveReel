import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  getDashboardConfig,
  applyDashboardConfig,
  getOrderedParents,
  filterHiddenPages,
  PARENT_IDS,
  PARENT_LABELS,
} from '../utils/dashboardConfig.js'
import { ALL_CATEGORIES } from '../utils/siteConfig.js'
import { useMediaQuery } from '../hooks/useMediaQuery.js'

const Navigation = ({ onLogout }) => {
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const isMobile = useMediaQuery()
  const userRole = typeof window !== 'undefined' ? localStorage.getItem('userRole') : 'full'

  const config = getDashboardConfig()
  const visibleCategories = filterHiddenPages(ALL_CATEGORIES, config)
  const grouped =
    userRole === 'full'
      ? applyDashboardConfig(visibleCategories, config)
      : null
  const orderedParents = userRole === 'full' ? getOrderedParents(config) : []
  const categories =
    userRole === 'education'
      ? visibleCategories.filter((c) => c.title === 'Education')
      : userRole === 'love'
        ? visibleCategories.filter((c) => c.title !== 'Education')
        : []
  const showGroupedNav = userRole === 'full' && grouped && orderedParents.length > 0

  // Show nav only on Home and Admin — not on content/reel pages or education pages
  const isHomePage = location.pathname === '/'
  const isAdminPage = location.pathname.startsWith('/admin')
  const showNav = isHomePage || (userRole === 'full' && isAdminPage)

  if (!showNav) {
    return null
  }

  return (
    <nav style={styles.nav}>
      <div style={{ ...styles.navContent, ...(isMobile ? styles.navContentMobile : {}) }}>
        <Link to="/" style={{ ...styles.logo, ...(isMobile ? styles.logoMobile : {}) }}>
          <span style={styles.logoEmoji}>💕</span>
          <span style={styles.logoText}>LoveInFrames</span>
        </Link>

        <div style={styles.navRight}>
          {userRole === 'full' && !isAdminPage && (
            <Link to="/admin" style={styles.adminLink}>Admin</Link>
          )}
          {!isHomePage && !isAdminPage && (
            <motion.button
              style={styles.menuButton}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <span style={styles.menuIcon}>{isMenuOpen ? '✕' : '☰'}</span>
            </motion.button>
          )}
          {onLogout && (
            <button
              type="button"
              onClick={onLogout}
              style={styles.logoutButton}
              aria-label="Logout"
            >
              Logout
            </button>
          )}
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && !isHomePage && !isAdminPage && (
          <motion.div
            style={styles.menu}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div style={styles.menuContent}>
              <Link 
                to="/" 
                style={styles.homeLink}
                onClick={() => setIsMenuOpen(false)}
              >
                <span style={styles.homeEmoji}>🏠</span>
                <span>Back to Home</span>
              </Link>
              
              <div style={styles.categoriesContainer}>
                {showGroupedNav ? (
                  orderedParents.map((parentId) => {
                    const childCategories = parentId === PARENT_IDS.LOVE ? grouped.love : grouped.education
                    const parentLabel = PARENT_LABELS[parentId]
                    return (
                      <div key={parentId} style={styles.parentNavSection}>
                        <h3 style={styles.parentNavTitle}>{parentLabel}</h3>
                        {childCategories.map((category) => (
                          <div key={category.title} style={styles.categorySection}>
                            <h4 style={styles.categoryTitle}>{category.title}</h4>
                            <div style={{ ...styles.categoryLinks, ...(isMobile ? styles.categoryLinksMobile : {}) }}>
                              {category.pages.map((page) => {
                                const isActive = location.pathname === page.path
                                return (
                                  <Link
                                    key={page.path}
                                    to={page.path}
                                    style={{
                                      ...styles.categoryLink,
                                      ...(isActive ? styles.activeLink : {}),
                                    }}
                                    onClick={() => setIsMenuOpen(false)}
                                  >
                                    <span style={styles.linkEmoji}>{page.emoji}</span>
                                    <span>{page.label}</span>
                                    {isActive && <span style={styles.activeIndicator}>●</span>}
                                  </Link>
                                )
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                    )
                  })
                ) : (
                  categories.map((category) => (
                    <div key={category.title} style={styles.categorySection}>
                      <h3 style={styles.categoryTitle}>{category.title}</h3>
                      <div style={{ ...styles.categoryLinks, ...(isMobile ? styles.categoryLinksMobile : {}) }}>
                        {category.pages.map((page) => {
                          const isActive = location.pathname === page.path
                          return (
                            <Link
                              key={page.path}
                              to={page.path}
                              style={{
                                ...styles.categoryLink,
                                ...(isActive ? styles.activeLink : {}),
                              }}
                              onClick={() => setIsMenuOpen(false)}
                            >
                              <span style={styles.linkEmoji}>{page.emoji}</span>
                              <span>{page.label}</span>
                              {isActive && <span style={styles.activeIndicator}>●</span>}
                            </Link>
                          )
                        })}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

const styles = {
  nav: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    overflow: 'visible',
    background: 'linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.7) 100%)',
    backdropFilter: 'blur(10px)',
    borderBottom: '1px solid rgba(255, 77, 109, 0.2)',
    cursor: 'auto', // Cursor visible on dashboard / when nav is shown
  },
  navContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '12px',
    padding: '12px 20px',
    maxWidth: '100%',
    minWidth: 0,
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    minWidth: 0,
    textDecoration: 'none',
    color: '#ffffff',
    fontSize: '20px',
    fontWeight: 800,
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    letterSpacing: '1.5px',
    textShadow: '0 2px 8px rgba(255, 77, 109, 0.4)',
  },
  logoEmoji: {
    fontSize: '24px',
  },
  logoText: {
    background: 'linear-gradient(135deg, #ff4d6d 0%, #ff758f 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  navRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    flexShrink: 0,
  },
  menuButton: {
    background: 'rgba(255, 77, 109, 0.2)',
    border: '2px solid rgba(255, 77, 109, 0.4)',
    borderRadius: '8px',
    padding: '8px 12px',
    color: '#ffffff',
    fontSize: '20px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease',
  },
  adminLink: {
    padding: '8px 14px',
    borderRadius: '8px',
    color: '#ffffff',
    fontSize: '14px',
    fontWeight: 600,
    textDecoration: 'none',
    background: 'rgba(255, 77, 109, 0.3)',
    border: '2px solid rgba(255, 77, 109, 0.5)',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  logoutButton: {
    background: 'rgba(255, 255, 255, 0.15)',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '8px',
    padding: '8px 16px',
    color: '#ffffff',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  menuIcon: {
    lineHeight: 1,
  },
  menu: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    background: 'linear-gradient(to bottom, rgba(10, 10, 10, 0.98) 0%, rgba(20, 10, 20, 0.98) 100%)',
    backdropFilter: 'blur(20px)',
    borderTop: '1px solid rgba(255, 77, 109, 0.2)',
    maxHeight: '80vh',
    overflowY: 'auto',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
  },
  menuContent: {
    padding: '20px',
  },
  homeLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '12px 16px',
    background: 'linear-gradient(135deg, rgba(255, 77, 109, 0.2) 0%, rgba(255, 117, 143, 0.2) 100%)',
    border: '2px solid rgba(255, 77, 109, 0.4)',
    borderRadius: '12px',
    textDecoration: 'none',
    color: '#ffffff',
    fontSize: '17px',
    fontWeight: 600,
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    letterSpacing: '0.8px',
    marginBottom: '24px',
    transition: 'all 0.3s ease',
    textShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
  },
  homeEmoji: {
    fontSize: '20px',
  },
  categoriesContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  parentNavSection: {
    marginBottom: '20px',
  },
  parentNavTitle: {
    fontSize: '13px',
    fontWeight: 700,
    color: '#ff758f',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginBottom: '12px',
    paddingBottom: '6px',
    borderBottom: '1px solid rgba(255, 117, 143, 0.3)',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  categorySection: {
    marginBottom: '12px',
  },
  categoryTitle: {
    fontSize: '15px',
    fontWeight: 700,
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    color: '#ff758f',
    marginBottom: '12px',
    textTransform: 'uppercase',
    letterSpacing: '1.2px',
    textShadow: '0 2px 6px rgba(255, 117, 143, 0.3)',
  },
  categoryLinks: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
    gap: '8px',
  },
  categoryLinksMobile: {
    gridTemplateColumns: '1fr',
    minWidth: 0,
  },
  navContentMobile: {
    padding: '10px 16px 10px 56px',
  },
  logoMobile: {
    fontSize: '16px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  categoryLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 14px',
    background: 'rgba(255, 77, 109, 0.1)',
    border: '1px solid rgba(255, 77, 109, 0.2)',
    borderRadius: '8px',
    textDecoration: 'none',
    color: '#ffffff',
    fontSize: '14px',
    fontWeight: 500,
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    letterSpacing: '0.5px',
    transition: 'all 0.2s ease',
    position: 'relative',
  },
  activeLink: {
    background: 'rgba(255, 77, 109, 0.3)',
    borderColor: 'rgba(255, 77, 109, 0.5)',
    fontWeight: 600,
  },
  linkEmoji: {
    fontSize: '18px',
  },
  activeIndicator: {
    position: 'absolute',
    right: '10px',
    color: '#ff4d6d',
    fontSize: '12px',
  },
}

export default Navigation
