import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { getUsers } from '../utils/usersConfig.js'

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    setTimeout(() => {
      const users = getUsers()
      const user = users.find(
        (u) => u.username === username.trim() && u.password === password
      )
      if (user) {
        const loginTimestamp = Date.now()
        localStorage.setItem('isAuthenticated', 'true')
        localStorage.setItem('loginTimestamp', loginTimestamp.toString())
        localStorage.setItem('userRole', user.role)
        localStorage.setItem('username', user.username || '')
        localStorage.setItem('userDisplayName', user.displayName != null ? user.displayName : user.username || '')
        onLogin()
      } else {
        setError('Invalid username or password')
        setIsLoading(false)
      }
    }, 300)
  }

  const styles = {
    container: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px',
    },
    loginBox: {
      background: 'rgba(255, 255, 255, 0.95)',
      borderRadius: '20px',
      padding: '40px',
      maxWidth: '400px',
      width: '100%',
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
    },
    title: {
      fontSize: '32px',
      fontWeight: 'bold',
      color: '#333',
      marginBottom: '10px',
      textAlign: 'center',
    },
    subtitle: {
      fontSize: '16px',
      color: '#666',
      marginBottom: '30px',
      textAlign: 'center',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
    },
    inputGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
    },
    label: {
      fontSize: '14px',
      fontWeight: '600',
      color: '#333',
    },
    input: {
      padding: '12px 16px',
      fontSize: '16px',
      border: '2px solid #e0e0e0',
      borderRadius: '10px',
      outline: 'none',
      transition: 'all 0.3s ease',
    },
    inputFocus: {
      borderColor: '#667eea',
    },
    error: {
      color: '#e74c3c',
      fontSize: '14px',
      textAlign: 'center',
      marginTop: '-10px',
    },
    button: {
      padding: '14px',
      fontSize: '16px',
      fontWeight: '600',
      color: 'white',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      border: 'none',
      borderRadius: '10px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      marginTop: '10px',
    },
    buttonHover: {
      transform: 'translateY(-2px)',
      boxShadow: '0 10px 20px rgba(102, 126, 234, 0.4)',
    },
    buttonDisabled: {
      opacity: 0.6,
      cursor: 'not-allowed',
    },
    logo: {
      textAlign: 'center',
      marginBottom: '20px',
    },
    logoEmoji: {
      fontSize: '48px',
      display: 'block',
      marginBottom: '10px',
    },
  }

  return (
    <div style={styles.container}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={styles.loginBox}
      >
        <div style={styles.logo}>
          <span style={styles.logoEmoji}>💕</span>
          <h1 style={styles.title}>LoveInFrames</h1>
          <p style={styles.subtitle}>Please login to continue</p>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              required
              style={styles.input}
              autoFocus
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
              style={styles.input}
            />
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={styles.error}
            >
              {error}
            </motion.p>
          )}

          <motion.button
            type="submit"
            disabled={isLoading}
            style={{
              ...styles.button,
              ...(isLoading ? styles.buttonDisabled : {}),
            }}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </motion.button>
        </form>
      </motion.div>
    </div>
  )
}

export default Login
