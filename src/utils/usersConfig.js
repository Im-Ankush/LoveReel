/**
 * User credentials and route permission (in code only).
 * role = route permission: 'full' (admin), 'education', 'love'.
 */

function normalizeRole(role) {
  return role === 'full' || role === 'education' ? role : 'love'
}

/** Users: username, password, role, displayName, email. Edit here to add/change users. */
export const USERS = [
  { username: 'admin', password: 'Admin@123', role: 'full', displayName: 'Administrator', email: '' },
  { username: 'student', password: 'education123', role: 'education', displayName: 'Student', email: '' },
  { username: 'love', password: 'love123', role: 'love', displayName: 'Love', email: '' },
]

export function getUsers() {
  return USERS.map((u) => ({
    username: u.username,
    password: u.password,
    role: normalizeRole(u.role),
    displayName: u.displayName != null ? u.displayName : u.username,
    email: u.email != null ? u.email : '',
  }))
}
