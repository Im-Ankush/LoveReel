import React, { useState, useEffect } from 'react'
import { getDashboardConfig, setDashboardConfig } from '../../utils/dashboardConfig.js'
import { getAllPagesForAdmin } from '../../utils/siteConfig.js'

const ROUTES_PER_PAGE = 15

const AdminRoutes = () => {
  const [config, setConfig] = useState(getDashboardConfig)
  const [newAlias, setNewAlias] = useState({ slug: '', target: '' })
  const [saved, setSaved] = useState(false)
  const [routesPage, setRoutesPage] = useState(1)

  useEffect(() => {
    setConfig(getDashboardConfig())
  }, [])

  const aliases = config.routeAliases || {}
  const pages = getAllPagesForAdmin()
  const routesTotalPages = Math.max(1, Math.ceil(pages.length / ROUTES_PER_PAGE))
  const routesCurrentPage = Math.min(Math.max(1, routesPage), routesTotalPages)
  const routesStart = (routesCurrentPage - 1) * ROUTES_PER_PAGE
  const paginatedPages = pages.slice(routesStart, routesStart + ROUTES_PER_PAGE)

  const addAlias = () => {
    const slug = (newAlias.slug || '').trim().replace(/^\/*/, '/')
    const target = (newAlias.target || '').trim()
    if (!slug || !target) return
    if (aliases[slug]) return
    setConfig({
      ...config,
      routeAliases: { ...aliases, [slug]: target },
    })
    setNewAlias({ slug: '', target: '' })
    setSaved(false)
  }

  const removeAlias = (slug) => {
    const next = { ...aliases }
    delete next[slug]
    setConfig({ ...config, routeAliases: next })
    setSaved(false)
  }

  const handleSave = () => {
    setDashboardConfig(config)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Routes Manager</h1>
      <p style={styles.subtitle}>
        Add custom URLs (aliases) that redirect to existing pages. Example: /kiss-alt → /kiss
      </p>

      <div style={styles.toolbar}>
        <button type="button" onClick={handleSave} style={styles.saveBtn}>
          {saved ? 'Saved ✓' : 'Save changes'}
        </button>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Add alias</h2>
        <div style={styles.formRow}>
          <input
            type="text"
            placeholder="/my-custom-slug"
            value={newAlias.slug}
            onChange={(e) => setNewAlias((a) => ({ ...a, slug: e.target.value }))}
            style={styles.input}
          />
          <span style={styles.arrow}>→</span>
          <select
            value={newAlias.target}
            onChange={(e) => setNewAlias((a) => ({ ...a, target: e.target.value }))}
            style={styles.select}
          >
            <option value="">Select page</option>
            {pages.map((p) => (
              <option key={p.path} value={p.path}>{p.path} — {p.label}</option>
            ))}
          </select>
          <button type="button" onClick={addAlias} style={styles.addBtn} disabled={!newAlias.slug || !newAlias.target}>
            Add
          </button>
        </div>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Current aliases</h2>
        {Object.keys(aliases).length === 0 ? (
          <p style={styles.empty}>No aliases. Add one above.</p>
        ) : (
          <div style={styles.tableWrap} className="table-scroll-mobile">
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Alias (URL)</th>
                  <th style={styles.th}>Redirects to</th>
                  <th style={styles.th}></th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(aliases).map(([slug, target]) => (
                  <tr key={slug} style={styles.tr}>
                    <td style={styles.tdPath}>{slug}</td>
                    <td style={styles.td}>{target}</td>
                    <td style={styles.td}>
                      <button type="button" onClick={() => removeAlias(slug)} style={styles.removeBtn}>
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>All routes (read-only)</h2>
        <p style={styles.hint}>These are the built-in paths. Use aliases above to add custom URLs.</p>
        <div style={styles.routeList}>
          {paginatedPages.map((p) => (
            <div key={p.path} style={styles.routeRow}>
              <code style={styles.code}>{p.path}</code>
              <span style={styles.routeLabel}>{p.label}</span>
              <span style={styles.routeCat}>{p.category}</span>
            </div>
          ))}
        </div>
        {routesTotalPages > 1 && (
          <div style={styles.pagination}>
            <span style={styles.paginationInfo}>
              Showing {routesStart + 1}–{Math.min(routesStart + ROUTES_PER_PAGE, pages.length)} of {pages.length}
            </span>
            <div style={styles.paginationBtns}>
              <button
                type="button"
                onClick={() => setRoutesPage((p) => Math.max(1, p - 1))}
                disabled={routesCurrentPage <= 1}
                style={{ ...styles.pageBtn, ...(routesCurrentPage <= 1 ? styles.pageBtnDisabled : {}) }}
              >
                ← Prev
              </button>
              {Array.from({ length: routesTotalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setRoutesPage(p)}
                  style={{ ...styles.pageBtn, ...(p === routesCurrentPage ? styles.pageBtnActive : {}) }}
                >
                  {p}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setRoutesPage((p) => Math.min(routesTotalPages, p + 1))}
                disabled={routesCurrentPage >= routesTotalPages}
                style={{ ...styles.pageBtn, ...(routesCurrentPage >= routesTotalPages ? styles.pageBtnDisabled : {}) }}
              >
                Next →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

const styles = {
  container: { maxWidth: '900px' },
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
  toolbar: { marginBottom: '24px' },
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
  section: { marginBottom: '32px' },
  sectionTitle: {
    fontSize: '16px',
    fontWeight: 600,
    color: '#c4b5d0',
    margin: '0 0 12px 0',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  formRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    flexWrap: 'wrap',
  },
  input: {
    flex: '1 1 180px',
    minWidth: '140px',
    padding: '10px 14px',
    fontSize: '14px',
    background: 'rgba(255,255,255,0.08)',
    border: '1px solid rgba(255,255,255,0.15)',
    borderRadius: '8px',
    color: '#fff',
    fontFamily: 'monospace',
  },
  arrow: { color: '#94a3b8', fontSize: '14px' },
  select: {
    flex: '1 1 220px',
    minWidth: '160px',
    padding: '10px 14px',
    fontSize: '14px',
    background: 'rgba(255,255,255,0.08)',
    border: '1px solid rgba(255,255,255,0.15)',
    borderRadius: '8px',
    color: '#fff',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  addBtn: {
    padding: '10px 18px',
    fontSize: '14px',
    fontWeight: 600,
    color: '#fff',
    background: 'rgba(255, 77, 109, 0.6)',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
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
  },
  tr: { borderBottom: '1px solid rgba(255,255,255,0.06)' },
  td: { padding: '12px 16px', fontSize: '14px', color: '#e2e8f0' },
  tdPath: { padding: '12px 16px', fontSize: '13px', color: '#94a3b8', fontFamily: 'monospace' },
  removeBtn: {
    padding: '6px 12px',
    fontSize: '12px',
    color: '#f87171',
    background: 'transparent',
    border: '1px solid rgba(248,113,113,0.5)',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  empty: { color: '#94a3b8', fontSize: '14px', margin: 0 },
  hint: { color: '#94a3b8', fontSize: '13px', margin: '0 0 12px 0' },
  routeList: { display: 'flex', flexDirection: 'column', gap: '6px' },
  routeRow: { display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px' },
  code: {
    minWidth: '220px',
    padding: '6px 10px',
    background: 'rgba(0,0,0,0.3)',
    borderRadius: '6px',
    fontSize: '13px',
    color: '#94a3b8',
    fontFamily: 'monospace',
  },
  routeLabel: { color: '#e2e8f0', flex: 1 },
  routeCat: { color: '#64748b', fontSize: '12px' },
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

export default AdminRoutes
