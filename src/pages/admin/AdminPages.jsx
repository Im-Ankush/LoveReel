import React, { useState, useEffect } from 'react'
import { getDashboardConfig, setDashboardConfig } from '../../utils/dashboardConfig.js'
import { ALL_CATEGORIES } from '../../utils/siteConfig.js'

const PER_PAGE = 10

const AdminPages = () => {
  const [config, setConfig] = useState(getDashboardConfig)
  const [saved, setSaved] = useState(false)
  const [page, setPage] = useState(1)

  useEffect(() => {
    setConfig(getDashboardConfig())
  }, [])

  const hiddenSet = new Set(config.hiddenPages || [])

  const togglePage = (path) => {
    const next = hiddenSet.has(path) ? [...(config.hiddenPages || []).filter((p) => p !== path)] : [...(config.hiddenPages || []), path]
    setConfig({ ...config, hiddenPages: next })
    setSaved(false)
  }

  const handleSave = () => {
    setDashboardConfig(config)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const allPages = ALL_CATEGORIES.flatMap((cat) =>
    cat.pages.map((p) => ({ ...p, category: cat.title }))
  )
  const totalPages = Math.max(1, Math.ceil(allPages.length / PER_PAGE))
  const currentPage = Math.min(Math.max(1, page), totalPages)
  const start = (currentPage - 1) * PER_PAGE
  const paginatedPages = allPages.slice(start, start + PER_PAGE)

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Pages Manager</h1>
      <p style={styles.subtitle}>Show or hide pages. Delete = hide from site (saved in browser; no DB). Save to apply.</p>

      <div style={styles.toolbar}>
        <button type="button" onClick={handleSave} style={styles.saveBtn}>
          {saved ? 'Saved ✓' : 'Save changes'}
        </button>
      </div>

      <div style={styles.tableWrap} className="table-scroll-mobile">
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Category</th>
              <th style={styles.th}>Page</th>
              <th style={styles.th}>Path</th>
              <th style={styles.th}>Visible</th>
              <th style={styles.th}>Delete</th>
            </tr>
          </thead>
          <tbody>
            {paginatedPages.map((pageItem) => (
              <tr key={pageItem.path} style={styles.tr}>
                <td style={styles.td}>{pageItem.category}</td>
                <td style={styles.td}>
                  <span style={styles.emoji}>{pageItem.emoji}</span> {pageItem.label}
                </td>
                <td style={styles.tdPath}>{pageItem.path}</td>
                <td style={styles.td}>
                  <label style={styles.checkLabel}>
                    <input
                      type="checkbox"
                      checked={!hiddenSet.has(pageItem.path)}
                      onChange={() => togglePage(pageItem.path)}
                      style={styles.checkbox}
                    />
                    <span>{hiddenSet.has(pageItem.path) ? 'Hidden' : 'Visible'}</span>
                  </label>
                </td>
                <td style={styles.td}>
                  <button
                    type="button"
                    onClick={() => {
                      if (!hiddenSet.has(pageItem.path)) {
                        togglePage(pageItem.path)
                      }
                    }}
                    disabled={hiddenSet.has(pageItem.path)}
                    style={{
                      ...styles.deleteBtn,
                      ...(hiddenSet.has(pageItem.path) ? styles.deleteBtnDisabled : {}),
                    }}
                    title={hiddenSet.has(pageItem.path) ? 'Already hidden' : 'Hide page from site'}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div style={styles.pagination}>
          <span style={styles.paginationInfo}>
            Showing {start + 1}–{Math.min(start + PER_PAGE, allPages.length)} of {allPages.length}
          </span>
          <div style={styles.paginationBtns}>
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={currentPage <= 1}
              style={{ ...styles.pageBtn, ...(currentPage <= 1 ? styles.pageBtnDisabled : {}) }}
            >
              ← Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPage(p)}
                style={{ ...styles.pageBtn, ...(p === currentPage ? styles.pageBtnActive : {}) }}
              >
                {p}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage >= totalPages}
              style={{ ...styles.pageBtn, ...(currentPage >= totalPages ? styles.pageBtnDisabled : {}) }}
            >
              Next →
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

const styles = {
  container: { maxWidth: '900px', width: '100%', boxSizing: 'border-box' },
  title: {
    fontSize: '28px',
    fontWeight: 700,
    color: '#ff758f',
    margin: '0 0 8px 0',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  subtitle: {
    fontSize: '15px',
    color: '#94a3b8',
    margin: '0 0 20px 0',
  },
  toolbar: { marginBottom: '20px' },
  saveBtn: {
    padding: '10px 20px',
    fontSize: '14px',
    fontWeight: 600,
    color: '#fff',
    background: 'linear-gradient(135deg, #ff4d6d 0%, #ff758f 100%)',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  tableWrap: {
    overflowX: 'auto',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '12px',
    background: 'rgba(0,0,0,0.2)',
  },
  table: { width: '100%', borderCollapse: 'collapse' },
  th: {
    textAlign: 'left',
    padding: '12px 16px',
    fontSize: '12px',
    fontWeight: 700,
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    borderBottom: '1px solid rgba(255,255,255,0.1)',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  tr: { borderBottom: '1px solid rgba(255,255,255,0.06)' },
  td: {
    padding: '12px 16px',
    fontSize: '14px',
    color: '#e2e8f0',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  tdPath: {
    padding: '12px 16px',
    fontSize: '13px',
    color: '#94a3b8',
    fontFamily: 'monospace',
  },
  emoji: { marginRight: '6px' },
  checkLabel: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer',
  },
  checkbox: { width: '18px', height: '18px', accentColor: '#ff4d6d' },
  deleteBtn: {
    padding: '6px 12px',
    fontSize: '12px',
    fontWeight: 600,
    color: '#fff',
    background: 'rgba(239, 68, 68, 0.7)',
    border: '1px solid rgba(239, 68, 68, 0.9)',
    borderRadius: '6px',
    cursor: 'pointer',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  deleteBtnDisabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
    background: 'rgba(100, 100, 100, 0.5)',
    borderColor: 'rgba(255,255,255,0.2)',
  },
  pagination: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '12px',
    marginTop: '16px',
    padding: '12px 0',
  },
  paginationInfo: {
    fontSize: '14px',
    color: '#94a3b8',
  },
  paginationBtns: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  pageBtn: {
    minWidth: '36px',
    padding: '8px 12px',
    fontSize: '14px',
    fontWeight: 500,
    color: '#e2e8f0',
    background: 'rgba(255,255,255,0.08)',
    border: '1px solid rgba(255,255,255,0.15)',
    borderRadius: '8px',
    cursor: 'pointer',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  pageBtnActive: {
    background: 'rgba(255, 77, 109, 0.4)',
    borderColor: 'rgba(255, 77, 109, 0.6)',
    color: '#fff',
    fontWeight: 600,
  },
  pageBtnDisabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
}

export default AdminPages
