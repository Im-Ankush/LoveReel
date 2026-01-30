import React, { useState, useEffect } from 'react'
import { getAppSettings, setAppSettings } from '../../utils/appSettings.js'

const AdminSettings = () => {
  const [settings, setSettings] = useState(getAppSettings)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    setSettings(getAppSettings())
  }, [])

  const handleChange = (key, value) => {
    setSettings((s) => ({ ...s, [key]: value }))
    setSaved(false)
  }

  const handleSave = () => {
    setAppSettings(settings)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Site Settings</h1>
      <p style={styles.subtitle}>Site name, watermark, and theme. Used across the app.</p>

      <div style={styles.form}>
        <div style={styles.field}>
          <label style={styles.label}>Site name</label>
          <input
            type="text"
            value={settings.siteName || ''}
            onChange={(e) => handleChange('siteName', e.target.value)}
            placeholder="LoveInFrames"
            style={styles.input}
          />
        </div>
        <div style={styles.field}>
          <label style={styles.label}>Watermark text</label>
          <input
            type="text"
            value={settings.watermarkText || ''}
            onChange={(e) => handleChange('watermarkText', e.target.value)}
            placeholder="Optional watermark"
            style={styles.input}
          />
        </div>
        <div style={styles.field}>
          <label style={styles.label}>Theme</label>
          <select
            value={settings.theme || 'light'}
            onChange={(e) => handleChange('theme', e.target.value)}
            style={styles.select}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
        <div style={styles.actions}>
          <button type="button" onClick={handleSave} style={styles.saveBtn}>
            {saved ? 'Saved ✓' : 'Save settings'}
          </button>
        </div>
      </div>
    </div>
  )
}

const styles = {
  container: { maxWidth: '520px', width: '100%', boxSizing: 'border-box' },
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
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  field: {},
  label: {
    display: 'block',
    fontSize: '13px',
    fontWeight: 600,
    color: '#94a3b8',
    marginBottom: '8px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  input: {
    width: '100%',
    maxWidth: '400px',
    padding: '12px 16px',
    fontSize: '15px',
    background: 'rgba(255,255,255,0.08)',
    border: '1px solid rgba(255,255,255,0.15)',
    borderRadius: '10px',
    color: '#fff',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    boxSizing: 'border-box',
  },
  select: {
    width: '100%',
    maxWidth: '200px',
    padding: '12px 16px',
    fontSize: '15px',
    background: 'rgba(255,255,255,0.08)',
    border: '1px solid rgba(255,255,255,0.15)',
    borderRadius: '10px',
    color: '#fff',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  actions: { marginTop: '8px' },
  saveBtn: {
    padding: '12px 24px',
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

export default AdminSettings
