import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import React, { useState, useEffect } from 'react'
import {
  getDashboardConfig,
  setDashboardConfig,
  applyDashboardConfig,
  getOrderedParents,
  filterHiddenPages,
  PARENT_IDS,
  PARENT_LABELS,
  LOVE_CHILD_IDS,
  EDUCATION_CHILD_IDS,
  DEFAULT_CONFIG,
} from '../utils/dashboardConfig.js'
import { ALL_CATEGORIES } from '../utils/siteConfig.js'
import LoveLayout from '../layouts/LoveLayout.jsx'
import EducationLayout from '../layouts/EducationLayout.jsx'
import DashboardLayout from '../layouts/DashboardLayout.jsx'
import { useMediaQuery } from '../hooks/useMediaQuery.js'

const PARENT_EMOJI = { [PARENT_IDS.LOVE]: '💕', [PARENT_IDS.EDUCATION]: '📚' }

const Home = () => {
  const userRole = typeof window !== 'undefined' ? localStorage.getItem('userRole') : 'full'
  const isMobile = useMediaQuery()
  const [config, setConfig] = useState(getDashboardConfig)
  const [showAdminPanel, setShowAdminPanel] = useState(false)
  const [expandedParents, setExpandedParents] = useState({ [PARENT_IDS.LOVE]: true, [PARENT_IDS.EDUCATION]: true })
  const [expandedCategories, setExpandedCategories] = useState({})

  const isParentExpanded = (parentId) => expandedParents[parentId] !== false
  const isCategoryExpanded = (parentId, categoryTitle) => expandedCategories[`${parentId}-${categoryTitle}`] !== false
  const toggleParent = (parentId) => setExpandedParents((prev) => ({ ...prev, [parentId]: !isParentExpanded(parentId) }))
  const toggleCategory = (parentId, categoryTitle) => {
    const key = `${parentId}-${categoryTitle}`
    setExpandedCategories((prev) => ({ ...prev, [key]: !isCategoryExpanded(parentId, categoryTitle) }))
  }

  const visibleCategories = filterHiddenPages(ALL_CATEGORIES, config)
  const grouped = applyDashboardConfig(visibleCategories, config)
  const orderedParents = getOrderedParents(config)

  // Which parents to show for current role
  const visibleParents = (() => {
    if (userRole === 'education') return [PARENT_IDS.EDUCATION]
    if (userRole === 'love') return [PARENT_IDS.LOVE]
    return orderedParents
  })()

  useEffect(() => {
    if (userRole !== 'full') return
    setConfig(getDashboardConfig())
  }, [userRole])

  const isAdmin = userRole === 'full'

  const moveParent = (index, dir) => {
    const next = [...config.parentOrder]
    const j = dir === 'up' ? index - 1 : index + 1
    if (j < 0 || j >= next.length) return
    ;[next[index], next[j]] = [next[j], next[index]]
    setConfig({ ...config, parentOrder: next })
  }

  const moveChild = (parentId, index, dir) => {
    const key = parentId === PARENT_IDS.LOVE ? 'loveChildOrder' : 'educationChildOrder'
    const arr = [...config[key]]
    const j = dir === 'up' ? index - 1 : index + 1
    if (j < 0 || j >= arr.length) return
    ;[arr[index], arr[j]] = [arr[j], arr[index]]
    setConfig({ ...config, [key]: arr })
  }

  const toggleChild = (parentId, childTitle) => {
    const key = parentId === PARENT_IDS.LOVE ? 'loveChildOrder' : 'educationChildOrder'
    const arr = config[key]
    const next = arr.includes(childTitle) ? arr.filter((t) => t !== childTitle) : [...arr, childTitle]
    setConfig({ ...config, [key]: next })
  }

  const handleSave = () => {
    setDashboardConfig(config)
    setShowAdminPanel(false)
  }

  const handleReset = () => {
    const def = { ...DEFAULT_CONFIG, parentOrder: [...DEFAULT_CONFIG.parentOrder], loveChildOrder: [...DEFAULT_CONFIG.loveChildOrder], educationChildOrder: [...DEFAULT_CONFIG.educationChildOrder] }
    setConfig(def)
    setDashboardConfig(def)
  }

  const dashboardBody = (
    <motion.div style={{ ...styles.content, ...(isMobile ? styles.contentMobile : {}) }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <div style={{ ...styles.titleRow, ...(isMobile ? styles.titleRowMobile : {}) }}>
        <h1 style={styles.title}>
          <span style={{ color: '#ff4d6d' }}>
            {userRole === 'education' ? 'Education' : userRole === 'love' ? 'Love' : 'Dashboard'}
          </span>
        </h1>
        {isAdmin && (
          <div style={styles.adminActions}>
            <Link to="/admin" style={styles.adminLink}>Admin panel</Link>
            <button type="button" onClick={() => setShowAdminPanel(true)} style={styles.customizeBtn} aria-label="Customize dashboard">
              Customize dashboard
            </button>
          </div>
        )}
      </div>

      <div style={styles.parentList}>
        {visibleParents.map((parentId) => {
          const children = parentId === PARENT_IDS.LOVE ? grouped.love : grouped.education
          const label = PARENT_LABELS[parentId]
          const emoji = PARENT_EMOJI[parentId]
          const parentOpen = isParentExpanded(parentId)
          return (
            <motion.section key={parentId} style={styles.parentCard} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <button type="button" onClick={() => toggleParent(parentId)} style={styles.parentHeaderBtn} aria-expanded={parentOpen}>
                <span style={styles.dropdownChevron} aria-hidden>{parentOpen ? '▼' : '▶'}</span>
                <span style={styles.parentEmoji}>{emoji}</span>
                <h2 style={styles.parentTitle}>{label}</h2>
              </button>
              {parentOpen && (
                <div style={styles.childList}>
                  {children.map((category) => {
                    const catOpen = isCategoryExpanded(parentId, category.title)
                    return (
                      <div key={category.title} style={styles.childBlock}>
                        <button type="button" onClick={() => toggleCategory(parentId, category.title)} style={styles.childTitleBtn} aria-expanded={catOpen}>
                          <span style={styles.dropdownChevronSmall}>{catOpen ? '▼' : '▶'}</span>
                          <h3 style={styles.childTitle}>{category.title}</h3>
                        </button>
                        {catOpen && (
                          <div style={styles.buttonGrid}>
                            {category.pages.map((button) => (
                              <Link key={button.path} to={button.path} style={styles.link}>
                                <div style={styles.button}>
                                  <span style={styles.emoji}>{button.emoji}</span>
                                  <span>{button.label}</span>
                                </div>
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              )}
            </motion.section>
          )
        })}
      </div>
    </motion.div>
  )

  const adminDashboardBody = isAdmin && (
    <motion.div style={styles.adminContent} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <header style={styles.adminHeader}>
        <h1 style={styles.adminTitle}>Dashboard</h1>
        <div style={styles.adminToolbar}>
          <Link to="/admin" style={styles.adminPrimaryLink}>
            <span style={styles.adminPrimaryIcon}>⚙️</span>
            Admin panel
          </Link>
          <button type="button" onClick={() => setShowAdminPanel(true)} style={styles.adminSecondaryBtn} aria-label="Customize dashboard">
            <span style={styles.adminSecondaryIcon}>📋</span>
            Customize sections
          </button>
        </div>
      </header>

      <div style={styles.adminStats}>
        <div style={styles.statCard}>
          <span style={styles.statEmoji}>💕</span>
          <div>
            <span style={styles.statValue}>{grouped.love?.length ?? 0}</span>
            <span style={styles.statLabel}>Love sections</span>
          </div>
        </div>
        <div style={styles.statCard}>
          <span style={styles.statEmoji}>📚</span>
          <div>
            <span style={styles.statValue}>{grouped.education?.length ?? 0}</span>
            <span style={styles.statLabel}>Education sections</span>
          </div>
        </div>
        <div style={styles.statCard}>
          <span style={styles.statEmoji}>📄</span>
          <div>
            <span style={styles.statValue}>{visibleCategories.reduce((acc, c) => acc + c.pages.length, 0)}</span>
            <span style={styles.statLabel}>Pages visible</span>
          </div>
        </div>
      </div>

      <div style={styles.adminSections}>
        {orderedParents.map((parentId) => {
          const children = parentId === PARENT_IDS.LOVE ? grouped.love : grouped.education
          const label = PARENT_LABELS[parentId]
          const emoji = PARENT_EMOJI[parentId]
          if (!children?.length) return null
          const parentOpen = isParentExpanded(parentId)
          return (
            <section key={parentId} style={styles.adminSectionCard}>
              <button type="button" onClick={() => toggleParent(parentId)} style={styles.adminSectionHeaderBtn} aria-expanded={parentOpen}>
                <span style={styles.dropdownChevron}>{parentOpen ? '▼' : '▶'}</span>
                <span style={styles.adminSectionEmoji}>{emoji}</span>
                <h2 style={styles.adminSectionTitle}>{label}</h2>
                <span style={styles.adminSectionBadge}>{children.length} section{children.length !== 1 ? 's' : ''}</span>
              </button>
              {parentOpen && (
                <div style={styles.adminSectionBody}>
                  {children.map((category) => {
                    const catOpen = isCategoryExpanded(parentId, category.title)
                    return (
                      <div key={category.title} style={styles.adminCategoryBlock}>
                        <button type="button" onClick={() => toggleCategory(parentId, category.title)} style={styles.adminCategoryTitleBtn} aria-expanded={catOpen}>
                          <span style={styles.dropdownChevronSmall}>{catOpen ? '▼' : '▶'}</span>
                          <span style={styles.adminCategoryTitle}>{category.title}</span>
                        </button>
                        {catOpen && (
                          <div style={styles.adminPageGrid}>
                            {category.pages.map((button) => (
                              <Link key={button.path} to={button.path} style={styles.adminPageLink}>
                                <span style={styles.adminPageEmoji}>{button.emoji}</span>
                                <span style={styles.adminPageLabel}>{button.label}</span>
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              )}
            </section>
          )
        })}
      </div>
    </motion.div>
  )

  return (
    <>
      {userRole === 'love' && <LoveLayout>{dashboardBody}</LoveLayout>}
      {userRole === 'education' && <EducationLayout>{dashboardBody}</EducationLayout>}
      {userRole === 'full' && (
        <div style={styles.containerAdmin}>
          <DashboardLayout>
            {adminDashboardBody}
          </DashboardLayout>
          <AnimatePresence>
        {showAdminPanel && isAdmin && (
          <motion.div style={styles.panelOverlay} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowAdminPanel(false)}>
            <motion.div style={styles.panel} initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} onClick={(e) => e.stopPropagation()}>
              <div style={styles.panelHeader}>
                <h2 style={styles.panelTitle}>Dashboard control</h2>
                <button type="button" onClick={() => setShowAdminPanel(false)} style={styles.panelClose} aria-label="Close">✕</button>
              </div>
              <p style={styles.panelHint}>Reorder parent sections (Love, Education) and their child sections. Save to apply.</p>

              <div style={styles.panelSection}>
                <h3 style={styles.panelSubtitle}>Parent sections</h3>
                {config.parentOrder.map((id, i) => (
                  <div key={id} style={styles.sectionRow}>
                    <span style={styles.sectionLabel}>{PARENT_EMOJI[id]} {PARENT_LABELS[id]}</span>
                    <div style={styles.moveBtns}>
                      <button type="button" onClick={() => moveParent(i, 'up')} disabled={i === 0} style={styles.moveBtn} aria-label="Move up">↑</button>
                      <button type="button" onClick={() => moveParent(i, 'down')} disabled={i === config.parentOrder.length - 1} style={styles.moveBtn} aria-label="Move down">↓</button>
                    </div>
                  </div>
                ))}
              </div>

              <div style={styles.panelSection}>
                <h3 style={styles.panelSubtitle}>Love → child sections</h3>
                {LOVE_CHILD_IDS.map((title) => {
                  const arr = config.loveChildOrder
                  const visible = arr.includes(title)
                  const idx = arr.indexOf(title)
                  return (
                    <div key={title} style={styles.sectionRow}>
                      <label style={styles.checkLabel}>
                        <input type="checkbox" checked={visible} onChange={() => toggleChild(PARENT_IDS.LOVE, title)} style={styles.checkbox} />
                        <span>{title}</span>
                      </label>
                      {visible && (
                        <div style={styles.moveBtns}>
                          <button type="button" onClick={() => moveChild(PARENT_IDS.LOVE, idx, 'up')} disabled={idx === 0} style={styles.moveBtn}>↑</button>
                          <button type="button" onClick={() => moveChild(PARENT_IDS.LOVE, idx, 'down')} disabled={idx === arr.length - 1} style={styles.moveBtn}>↓</button>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>

              <div style={styles.panelSection}>
                <h3 style={styles.panelSubtitle}>Education → child sections</h3>
                {EDUCATION_CHILD_IDS.map((title) => {
                  const arr = config.educationChildOrder
                  const visible = arr.includes(title)
                  const idx = arr.indexOf(title)
                  return (
                    <div key={title} style={styles.sectionRow}>
                      <label style={styles.checkLabel}>
                        <input type="checkbox" checked={visible} onChange={() => toggleChild(PARENT_IDS.EDUCATION, title)} style={styles.checkbox} />
                        <span>{title}</span>
                      </label>
                      {visible && (
                        <div style={styles.moveBtns}>
                          <button type="button" onClick={() => moveChild(PARENT_IDS.EDUCATION, idx, 'up')} disabled={idx === 0} style={styles.moveBtn}>↑</button>
                          <button type="button" onClick={() => moveChild(PARENT_IDS.EDUCATION, idx, 'down')} disabled={idx === arr.length - 1} style={styles.moveBtn}>↓</button>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>

              <div style={styles.panelActions}>
                <button type="button" onClick={handleReset} style={styles.resetBtn}>Reset to default</button>
                <button type="button" onClick={handleSave} style={styles.saveBtn}>Save</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
        </div>
      )}
    </>
  )
}

const styles = {
  container: {
    height: 'calc(100vh - 56px)',
    minHeight: 0,
    width: '100%',
    overflowY: 'auto',
    overflowX: 'hidden',
    padding: '24px',
    paddingTop: '88px',
    paddingBottom: '48px',
    cursor: 'auto',
  },
  containerMobile: {
    padding: '16px',
    paddingTop: '72px',
    paddingBottom: '32px',
  },
  content: {
    maxWidth: '720px',
    margin: '0 auto',
  },
  contentMobile: {
    maxWidth: '100%',
  },
  containerAdmin: {
    height: 'calc(100vh - 56px)',
    minHeight: 0,
    width: '100%',
    overflow: 'hidden',
    cursor: 'auto',
  },
  // Admin-only dashboard styles
  adminContent: {
    maxWidth: '900px',
    margin: '0 auto',
    paddingBottom: '32px',
  },
  adminHeader: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '16px',
    marginBottom: '24px',
    paddingBottom: '20px',
    borderBottom: '2px solid rgba(255, 77, 109, 0.25)',
  },
  adminTitle: {
    fontSize: '28px',
    fontWeight: 700,
    margin: 0,
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    color: '#ff758f',
    letterSpacing: '0.5px',
  },
  adminToolbar: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: '12px',
  },
  adminPrimaryLink: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 20px',
    fontSize: '15px',
    fontWeight: 600,
    color: '#fff',
    background: 'linear-gradient(135deg, #ff4d6d 0%, #ff758f 100%)',
    border: 'none',
    borderRadius: '12px',
    textDecoration: 'none',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    boxShadow: '0 4px 14px rgba(255, 77, 109, 0.35)',
  },
  adminPrimaryIcon: { fontSize: '18px' },
  adminSecondaryBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 20px',
    fontSize: '15px',
    fontWeight: 600,
    color: '#fff',
    background: 'rgba(255, 77, 109, 0.35)',
    border: '2px solid rgba(255, 77, 109, 0.6)',
    borderRadius: '12px',
    cursor: 'pointer',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  adminSecondaryIcon: { fontSize: '18px' },
  adminStats: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
    gap: '16px',
    marginBottom: '28px',
  },
  statCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    padding: '16px 20px',
    background: 'rgba(255, 255, 255, 0.06)',
    border: '1px solid rgba(255, 77, 109, 0.2)',
    borderRadius: '14px',
  },
  statEmoji: { fontSize: '28px', lineHeight: 1 },
  statValue: {
    display: 'block',
    fontSize: '22px',
    fontWeight: 700,
    color: '#ff758f',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  statLabel: {
    display: 'block',
    fontSize: '12px',
    color: '#94a3b8',
    marginTop: '2px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  adminSections: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  adminSectionCard: {
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 77, 109, 0.22)',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
  },
  adminSectionHeaderBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    width: '100%',
    padding: '18px 24px',
    background: 'rgba(255, 77, 109, 0.12)',
    border: 'none',
    borderBottom: '1px solid rgba(255, 77, 109, 0.2)',
    color: 'inherit',
    cursor: 'pointer',
    textAlign: 'left',
    fontFamily: 'inherit',
  },
  adminSectionEmoji: { fontSize: '26px', lineHeight: 1 },
  adminSectionTitle: {
    flex: 1,
    fontSize: '20px',
    fontWeight: 700,
    margin: 0,
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    color: '#ff758f',
    letterSpacing: '0.5px',
  },
  adminSectionBadge: {
    fontSize: '12px',
    fontWeight: 600,
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    padding: '6px 12px',
    background: 'rgba(255,255,255,0.08)',
    borderRadius: '8px',
  },
  adminSectionBody: {
    padding: '20px 24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  adminCategoryBlock: { marginBottom: '16px' },
  adminCategoryTitleBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    width: '100%',
    padding: '0 0 10px 0',
    marginBottom: '8px',
    border: 'none',
    background: 'transparent',
    color: 'inherit',
    cursor: 'pointer',
    textAlign: 'left',
    fontFamily: 'inherit',
  },
  adminCategoryTitle: {
    fontSize: '13px',
    fontWeight: 700,
    color: '#94a3b8',
    margin: 0,
    textTransform: 'uppercase',
    letterSpacing: '0.8px',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  adminPageGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
    gap: '10px',
  },
  adminPageLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '12px 14px',
    borderRadius: '10px',
    background: 'rgba(255, 255, 255, 0.06)',
    border: '1px solid rgba(255, 77, 109, 0.2)',
    textDecoration: 'none',
    color: '#e2e8f0',
    fontSize: '14px',
    fontWeight: 500,
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    transition: 'background 0.2s, border-color 0.2s',
  },
  adminPageEmoji: { fontSize: '20px', lineHeight: 1 },
  adminPageLabel: { flex: 1, minWidth: 0 },
  titleRow: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '16px',
    marginBottom: '32px',
  },
  titleRowMobile: {
    gap: '12px',
    marginBottom: '24px',
  },
  title: {
    fontSize: 'clamp(26px, 6vw, 36px)',
    fontWeight: 700,
    margin: 0,
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    color: '#ff4d6d',
    textShadow: '0 2px 12px rgba(255, 77, 109, 0.4)',
  },
  adminActions: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: '12px',
  },
  adminLink: {
    padding: '10px 18px',
    fontSize: '14px',
    fontWeight: 600,
    color: '#fff',
    background: 'rgba(255, 77, 109, 0.45)',
    border: '2px solid rgba(255, 77, 109, 0.7)',
    borderRadius: '10px',
    textDecoration: 'none',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  customizeBtn: {
    padding: '10px 18px',
    fontSize: '14px',
    fontWeight: 600,
    color: '#fff',
    background: 'rgba(255, 77, 109, 0.45)',
    border: '2px solid rgba(255, 77, 109, 0.7)',
    borderRadius: '10px',
    cursor: 'pointer',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  parentList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '28px',
  },
  parentCard: {
    background: 'rgba(255, 255, 255, 0.06)',
    border: '1px solid rgba(255, 77, 109, 0.25)',
    borderRadius: '16px',
    padding: '24px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
  },
  parentHeaderBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    width: '100%',
    padding: '0 0 14px 0',
    marginBottom: '0',
    border: 'none',
    borderBottom: '2px solid rgba(255, 77, 109, 0.3)',
    background: 'transparent',
    color: 'inherit',
    cursor: 'pointer',
    textAlign: 'left',
    fontFamily: 'inherit',
  },
  dropdownChevron: {
    fontSize: '14px',
    color: '#ff758f',
    lineHeight: 1,
    minWidth: '18px',
  },
  dropdownChevronSmall: {
    fontSize: '12px',
    color: '#94a3b8',
    lineHeight: 1,
    minWidth: '14px',
  },
  parentEmoji: {
    fontSize: '32px',
    lineHeight: 1,
  },
  parentTitle: {
    fontSize: '22px',
    fontWeight: 700,
    margin: 0,
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    color: '#ff758f',
    letterSpacing: '0.5px',
  },
  childList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    marginTop: '20px',
  },
  childBlock: {
    paddingLeft: '8px',
    marginBottom: '16px',
  },
  childTitleBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    width: '100%',
    padding: '0 0 10px 0',
    marginBottom: '8px',
    border: 'none',
    background: 'transparent',
    color: 'inherit',
    cursor: 'pointer',
    textAlign: 'left',
    fontFamily: 'inherit',
  },
  childTitle: {
    fontSize: '16px',
    fontWeight: 600,
    margin: 0,
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    color: '#c4b5d0',
    letterSpacing: '0.3px',
  },
  buttonGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
    gap: '12px',
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
  button: {
    fontSize: 'clamp(14px, 3.2vw, 18px)',
    padding: '14px 16px',
    borderRadius: '12px',
    background: 'linear-gradient(135deg, rgba(255, 77, 109, 0.2) 0%, rgba(255, 117, 143, 0.15) 100%)',
    border: '1px solid rgba(255, 77, 109, 0.35)',
    color: '#fff',
    fontWeight: 500,
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    minHeight: '72px',
    transition: 'all 0.2s ease',
  },
  emoji: {
    fontSize: '24px',
  },
  panelOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0,0,0,0.65)',
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
  },
  panel: {
    background: 'linear-gradient(180deg, #2d1a3d 0%, #1a1120 100%)',
    border: '2px solid rgba(255, 77, 109, 0.4)',
    borderRadius: '16px',
    padding: '24px',
    maxWidth: '440px',
    width: '100%',
    maxHeight: '88vh',
    overflowY: 'auto',
  },
  panelHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '10px',
  },
  panelTitle: {
    fontSize: '20px',
    fontWeight: 700,
    color: '#ff758f',
    margin: 0,
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  panelClose: {
    background: 'transparent',
    border: 'none',
    color: '#fff',
    fontSize: '22px',
    cursor: 'pointer',
    padding: '0 6px',
    lineHeight: 1,
  },
  panelHint: {
    fontSize: '13px',
    color: '#c4b5d0',
    marginBottom: '20px',
    lineHeight: 1.4,
  },
  panelSection: {
    marginBottom: '20px',
  },
  panelSubtitle: {
    fontSize: '12px',
    fontWeight: 700,
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: '0.8px',
    marginBottom: '10px',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  sectionRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '12px',
    padding: '10px 12px',
    background: 'rgba(255,255,255,0.05)',
    borderRadius: '10px',
    marginBottom: '8px',
    border: '1px solid rgba(255,255,255,0.08)',
  },
  sectionLabel: {
    fontSize: '15px',
    fontWeight: 500,
    color: '#fff',
  },
  checkLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '14px',
    fontWeight: 500,
    color: '#fff',
    cursor: 'pointer',
    flex: 1,
  },
  checkbox: {
    width: '18px',
    height: '18px',
    accentColor: '#ff4d6d',
  },
  moveBtns: {
    display: 'flex',
    gap: '4px',
  },
  moveBtn: {
    width: '34px',
    height: '34px',
    padding: 0,
    fontSize: '14px',
    fontWeight: 600,
    color: '#fff',
    background: 'rgba(255, 77, 109, 0.35)',
    border: '1px solid rgba(255, 77, 109, 0.5)',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  panelActions: {
    display: 'flex',
    gap: '12px',
    justifyContent: 'flex-end',
    marginTop: '8px',
  },
  resetBtn: {
    padding: '10px 18px',
    fontSize: '14px',
    fontWeight: 600,
    color: '#c4b5d0',
    background: 'transparent',
    border: '2px solid rgba(255,255,255,0.2)',
    borderRadius: '10px',
    cursor: 'pointer',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  saveBtn: {
    padding: '10px 24px',
    fontSize: '14px',
    fontWeight: 600,
    color: '#fff',
    background: 'linear-gradient(135deg, #ff4d6d 0%, #ff758f 100%)',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
}

export default Home
