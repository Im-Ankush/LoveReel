/**
 * App settings: site name, watermark, theme.
 * Stored in localStorage; used for public site and admin.
 */

const STORAGE_KEY = 'appSettings'

const DEFAULTS = {
  siteName: 'LoveInFrames',
  watermarkText: '',
  theme: 'light',
}

export function getAppSettings() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { ...DEFAULTS }
    const parsed = JSON.parse(raw)
    return {
      siteName: parsed.siteName ?? DEFAULTS.siteName,
      watermarkText: parsed.watermarkText ?? DEFAULTS.watermarkText,
      theme: parsed.theme === 'dark' ? 'dark' : 'light',
    }
  } catch (_) {
    return { ...DEFAULTS }
  }
}

export function setAppSettings(update) {
  const current = getAppSettings()
  const next = { ...current, ...update }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  return next
}
