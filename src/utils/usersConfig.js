/**
 * User credentials and route permission from .env.
 * Structure: VITE_USER_1_USERNAME, VITE_USER_1_PASSWORD, VITE_USER_1_ROLE, etc.
 * role = route permission: 'full' (admin), 'education', 'love'.
 * Fallback to DEFAULT_USERS if no env users are set.
 */

export const DEFAULT_USERS = [
  { username: 'admin', password: 'Admin@123', role: 'full', displayName: 'Administrator', email: '' },
  { username: 'student', password: 'education123', role: 'education', displayName: 'Student', email: '' },
  { username: 'love', password: 'love123', role: 'love', displayName: 'Love User', email: '' },
]

function normalizeRole(role) {
  return role === 'full' || role === 'education' ? role : 'love'
}

/**
 * Get users from .env (VITE_USER_1_USERNAME, VITE_USER_1_PASSWORD, VITE_USER_1_ROLE, ...).
 * Stops at first missing VITE_USER_N_USERNAME. Falls back to DEFAULT_USERS if none set.
 */
export function getUsers() {
  const env = typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env : {}
  const list = []
  for (let i = 1; i <= 100; i++) {
    const prefix = `VITE_USER_${i}_`
    const username = env[`${prefix}USERNAME`]
    if (username == null || String(username).trim() === '') break
    const password = env[`${prefix}PASSWORD`] != null ? String(env[`${prefix}PASSWORD`]) : ''
    const role = normalizeRole(env[`${prefix}ROLE`])
    const displayName = env[`${prefix}DISPLAY_NAME`] != null ? String(env[`${prefix}DISPLAY_NAME`]) : String(username).trim()
    const email = env[`${prefix}EMAIL`] != null ? String(env[`${prefix}EMAIL`]) : ''
    list.push({
      username: String(username).trim(),
      password,
      role,
      displayName,
      email,
    })
  }
  if (list.length > 0) return list
  return DEFAULT_USERS.map((u) => ({ ...u }))
}
