import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  getDashboardConfig,
  applyDashboardConfig,
  getOrderedParents,
  filterHiddenPages,
  PARENT_IDS,
  PARENT_LABELS,
} from '../utils/dashboardConfig.js'
import { ALL_CATEGORIES } from '../utils/siteConfig.js'

const PARENT_EMOJI = { [PARENT_IDS.LOVE]: '💕', [PARENT_IDS.EDUCATION]: '📚' }

const DashboardLayout = ({ children }) => {
  const location = useLocation()
  const [expandedParents, setExpandedParents] = useState({ [PARENT_IDS.LOVE]: false, [PARENT_IDS.EDUCATION]: false })
  const [expandedCategories, setExpandedCategories] = useState({})
  const config = getDashboardConfig()
  const visibleCategories = filterHiddenPages(ALL_CATEGORIES, config)
  const grouped = applyDashboardConfig(visibleCategories, config)
  const orderedParents = getOrderedParents(config)

  const isParentOpen = (id) => expandedParents[id] === true
  const isCategoryOpen = (parentId, title) => expandedCategories[`${parentId}-${title}`] === true
  const toggleParent = (id) => setExpandedParents((prev) => ({ ...prev, [id]: !isParentOpen(id) }))
  const toggleCategory = (parentId, title) => {
    const key = `${parentId}-${title}`
    setExpandedCategories((prev) => ({ ...prev, [key]: !isCategoryOpen(parentId, title) }))
  }

  return (
    <div style={styles.wrapper}>
      <aside style={styles.sidebar}>
        <div style={styles.sidebarHeader}>
          <span style={styles.sidebarLogo}>📊</span>
          <span style={styles.sidebarTitle}>Dashboard</span>
        </div>
        <nav style={styles.nav}>
          <Link
            to="/"
            style={{
              ...styles.navLink,
              ...(location.pathname === '/' ? styles.navLinkActive : {}),
            }}
          >
            <span style={styles.navEmoji}>🏠</span>
            <span>Home</span>
          </Link>
          <Link
            to="/admin"
            style={{
              ...styles.navLink,
              ...(location.pathname.startsWith('/admin') ? styles.navLinkActive : {}),
            }}
          >
            <span style={styles.navEmoji}>⚙️</span>
            <span>Admin panel</span>
          </Link>
          {orderedParents.map((parentId) => {
            const categories = parentId === PARENT_IDS.LOVE ? grouped.love : grouped.education
            const label = PARENT_LABELS[parentId]
            const emoji = PARENT_EMOJI[parentId]
            const parentOpen = isParentOpen(parentId)
            if (!categories?.length) return null
            return (
              <div key={parentId} style={styles.parentBlock}>
                <button
                  type="button"
                  onClick={() => toggleParent(parentId)}
                  style={styles.parentTitleBtn}
                  aria-expanded={parentOpen}
                >
                  <span style={styles.sidebarChevron}>{parentOpen ? '▼' : '▶'}</span>
                  <span style={styles.parentEmoji}>{emoji}</span>
                  <span style={styles.parentTitleText}>{label}</span>
                </button>
                {parentOpen &&
                  categories.map((category) => {
                    const catOpen = isCategoryOpen(parentId, category.title)
                    return (
                      <div key={category.title} style={styles.section}>
                        <button
                          type="button"
                          onClick={() => toggleCategory(parentId, category.title)}
                          style={styles.sectionTitleBtn}
                          aria-expanded={catOpen}
                        >
                          <span style={styles.sidebarChevronSmall}>{catOpen ? '▼' : '▶'}</span>
                          <span style={styles.sectionTitleText}>{category.title}</span>
                        </button>
                        {catOpen && (
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
              </div>
            )
          })}
        </nav>
      </aside>
      <main style={styles.main}>{children}</main>
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
  parentBlock: {
    marginTop: '12px',
  },
  parentTitleBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    width: '100%',
    padding: '10px 14px 8px',
    border: 'none',
    background: 'transparent',
    color: '#ff758f',
    cursor: 'pointer',
    textAlign: 'left',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    fontSize: '13px',
    fontWeight: 700,
  },
  parentEmoji: { fontSize: '18px', lineHeight: 1 },
  parentTitleText: { flex: 1 },
  sidebarChevron: {
    fontSize: '10px',
    color: '#ff758f',
    lineHeight: 1,
    minWidth: '14px',
  },
  sidebarChevronSmall: {
    fontSize: '10px',
    color: '#94a3b8',
    lineHeight: 1,
    minWidth: '14px',
  },
  section: {
    marginTop: '4px',
    marginLeft: '12px',
  },
  sectionTitleBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    width: '100%',
    padding: '6px 14px 4px',
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
}

export default DashboardLayout
