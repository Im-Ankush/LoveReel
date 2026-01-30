import React from 'react'
import { Link } from 'react-router-dom'
import { getDashboardConfig } from '../../utils/dashboardConfig.js'
import { getAppSettings } from '../../utils/appSettings.js'
import { ALL_CATEGORIES } from '../../utils/siteConfig.js'

const AdminDashboard = () => {
  const config = getDashboardConfig()
  const settings = getAppSettings()
  const totalPages = ALL_CATEGORIES.reduce((acc, cat) => acc + cat.pages.length, 0)
  const hiddenCount = (config.hiddenPages || []).length
  const aliasCount = config.routeAliases ? Object.keys(config.routeAliases).length : 0

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Admin Dashboard</h1>
      <p style={styles.subtitle}>Overview and quick links</p>

      <div style={styles.grid}>
        <Link to="/admin/pages" style={styles.card}>
          <span style={styles.cardEmoji}>📄</span>
          <h2 style={styles.cardTitle}>Pages</h2>
          <p style={styles.cardStat}>{totalPages} total · {hiddenCount} hidden</p>
          <span style={styles.cardLink}>Manage →</span>
        </Link>
        <Link to="/admin/routes" style={styles.card}>
          <span style={styles.cardEmoji}>🔗</span>
          <h2 style={styles.cardTitle}>Routes</h2>
          <p style={styles.cardStat}>{aliasCount} alias{aliasCount !== 1 ? 'es' : ''}</p>
          <span style={styles.cardLink}>Manage →</span>
        </Link>
        <Link to="/admin/settings" style={styles.card}>
          <span style={styles.cardEmoji}>⚙️</span>
          <h2 style={styles.cardTitle}>Settings</h2>
          <p style={styles.cardStat}>{settings.siteName} · {settings.theme}</p>
          <span style={styles.cardLink}>Edit →</span>
        </Link>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Quick info</h2>
        <ul style={styles.list}>
          <li>Site name: <strong>{settings.siteName}</strong></li>
          <li>Parent sections: {config.parentOrder?.join(', ') || '—'}</li>
          <li>Love sections: {(config.loveChildOrder || []).length} visible</li>
          <li>Education sections: {(config.educationChildOrder || []).length} visible</li>
        </ul>
      </div>
    </div>
  )
}

const styles = {
  container: { maxWidth: '800px' },
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
    margin: '0 0 24px 0',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '16px',
    marginBottom: '32px',
  },
  card: {
    display: 'block',
    padding: '20px',
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255, 77, 109, 0.25)',
    borderRadius: '12px',
    textDecoration: 'none',
    color: '#fff',
    transition: 'border-color 0.2s, background 0.2s',
  },
  cardEmoji: { fontSize: '28px', display: 'block', marginBottom: '8px' },
  cardTitle: {
    fontSize: '18px',
    fontWeight: 600,
    margin: '0 0 8px 0',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    color: '#ff758f',
  },
  cardStat: { fontSize: '13px', color: '#94a3b8', margin: '0 0 12px 0' },
  cardLink: { fontSize: '13px', color: '#ff758f', fontWeight: 600 },
  section: { marginTop: '24px' },
  sectionTitle: {
    fontSize: '16px',
    fontWeight: 600,
    color: '#c4b5d0',
    margin: '0 0 12px 0',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  list: {
    margin: 0,
    paddingLeft: '20px',
    color: '#c4b5d0',
    fontSize: '14px',
    lineHeight: 1.8,
  },
}

export default AdminDashboard
