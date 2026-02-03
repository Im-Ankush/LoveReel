/**
 * Dashboard config: parent sections (Love, Education) and their child sections.
 * Stored in localStorage; applies when userRole === 'full' (admin).
 */

const STORAGE_KEY = 'dashboardConfig'

export const PARENT_IDS = Object.freeze({ LOVE: 'love', EDUCATION: 'education' })

export const PARENT_LABELS = {
  [PARENT_IDS.LOVE]: 'Love',
  [PARENT_IDS.EDUCATION]: 'Education',
}

export const LOVE_CHILD_IDS = [
  'Valentine Week',
  'Main Vibes',
  'Romantic Moments',
  'Emoji Vibes',
  'Love Stories',
  'Interactive Stories',
]

export const EDUCATION_CHILD_IDS = ['Education']

export const DEFAULT_CONFIG = {
  parentOrder: [PARENT_IDS.LOVE, PARENT_IDS.EDUCATION],
  loveChildOrder: [...LOVE_CHILD_IDS],
  educationChildOrder: [...EDUCATION_CHILD_IDS],
  hiddenPages: [],
  routeAliases: {},
}

// Legacy: flat section order for backward compatibility
export const DEFAULT_SECTION_ORDER = [...LOVE_CHILD_IDS, ...EDUCATION_CHILD_IDS]

export function getDashboardConfig() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { ...DEFAULT_CONFIG, parentOrder: [...DEFAULT_CONFIG.parentOrder], loveChildOrder: [...DEFAULT_CONFIG.loveChildOrder], educationChildOrder: [...DEFAULT_CONFIG.educationChildOrder], hiddenPages: [], routeAliases: {} }
    const parsed = JSON.parse(raw)
    if (parsed && typeof parsed.parentOrder !== 'undefined') {
      const hiddenPages = Array.isArray(parsed.hiddenPages) ? [...parsed.hiddenPages] : []
      const routeAliases = parsed.routeAliases && typeof parsed.routeAliases === 'object' ? { ...parsed.routeAliases } : {}
      return {
        parentOrder: Array.isArray(parsed.parentOrder) && parsed.parentOrder.length > 0 ? [...parsed.parentOrder] : [...DEFAULT_CONFIG.parentOrder],
        loveChildOrder: Array.isArray(parsed.loveChildOrder) && parsed.loveChildOrder.length > 0 ? [...parsed.loveChildOrder] : [...LOVE_CHILD_IDS],
        educationChildOrder: Array.isArray(parsed.educationChildOrder) && parsed.educationChildOrder.length > 0 ? [...parsed.educationChildOrder] : [...EDUCATION_CHILD_IDS],
        hiddenPages,
        routeAliases,
      }
    }
    // Migrate old flat config (array of section titles)
    if (Array.isArray(parsed) && parsed.length > 0) {
      const love = parsed.filter((t) => LOVE_CHILD_IDS.includes(t))
      const education = parsed.filter((t) => EDUCATION_CHILD_IDS.includes(t))
      return {
        parentOrder: [...DEFAULT_CONFIG.parentOrder],
        loveChildOrder: love.length > 0 ? love : [...LOVE_CHILD_IDS],
        educationChildOrder: education.length > 0 ? education : [...EDUCATION_CHILD_IDS],
        hiddenPages: [],
        routeAliases: {},
      }
    }
  } catch (_) {}
  return { ...DEFAULT_CONFIG, parentOrder: [...DEFAULT_CONFIG.parentOrder], loveChildOrder: [...DEFAULT_CONFIG.loveChildOrder], educationChildOrder: [...DEFAULT_CONFIG.educationChildOrder], hiddenPages: [], routeAliases: {} }
}

export function setDashboardConfig(config) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(config))
}

/**
 * Apply config to categories: group by parent, filter/order children.
 * Returns { love: categories[], education: categories[] } for visible parents in order.
 * Any category in LOVE_CHILD_IDS / EDUCATION_CHILD_IDS that exists in allCategories
 * but is missing from saved order is appended so new sections (e.g. Valentine Week) show.
 */
export function applyDashboardConfig(allCategories, config) {
  const byTitle = Object.fromEntries(allCategories.map((c) => [c.title, c]))
  const result = { love: [], education: [] }

  const loveOrder = config.loveChildOrder || LOVE_CHILD_IDS
  const educationOrder = config.educationChildOrder || EDUCATION_CHILD_IDS

  for (const id of loveOrder) {
    if (byTitle[id]) result.love.push(byTitle[id])
  }
  for (const id of LOVE_CHILD_IDS) {
    if (byTitle[id] && !result.love.some((c) => c.title === id)) result.love.push(byTitle[id])
  }

  for (const id of educationOrder) {
    if (byTitle[id]) result.education.push(byTitle[id])
  }
  for (const id of EDUCATION_CHILD_IDS) {
    if (byTitle[id] && !result.education.some((c) => c.title === id)) result.education.push(byTitle[id])
  }

  return result
}

/**
 * Get ordered list of parent IDs for display (respects config.parentOrder and visibility).
 */
export function getOrderedParents(config) {
  return (config.parentOrder || [...DEFAULT_CONFIG.parentOrder]).filter((id) =>
    [PARENT_IDS.LOVE, PARENT_IDS.EDUCATION].includes(id)
  )
}

/**
 * Get flat ordered categories for nav menu (admin view): parents in order, then children per parent.
 */
export function getOrderedCategoriesForNav(allCategories, config) {
  const grouped = applyDashboardConfig(allCategories, config)
  const parents = getOrderedParents(config)
  return parents.flatMap((id) => (id === PARENT_IDS.LOVE ? grouped.love : grouped.education))
}

/**
 * Filter categories so pages in config.hiddenPages are removed from each category.
 */
export function filterHiddenPages(allCategories, config) {
  const hidden = new Set(config.hiddenPages || [])
  return allCategories.map((cat) => ({
    ...cat,
    pages: cat.pages.filter((p) => !hidden.has(p.path)),
  })).filter((cat) => cat.pages.length > 0)
}

/**
 * Get route aliases (slug -> target path) for redirects. Only admin-controlled.
 */
export function getRouteAliases(config) {
  return config.routeAliases && typeof config.routeAliases === 'object' ? { ...config.routeAliases } : {}
}
