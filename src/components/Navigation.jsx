import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const Navigation = () => {
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Hide navigation on reel pages (not home page)
  const isHomePage = location.pathname === '/'

  // Hide navigation when on reel pages
  if (!isHomePage) {
    return null
  }

  const categories = [
    {
      title: 'Main Vibes',
      pages: [
        { path: '/funny', label: 'Funny', emoji: '😂' },
        { path: '/romantic', label: 'Romantic', emoji: '❤️' },
        { path: '/flirty', label: 'Flirty', emoji: '😏' },
        { path: '/mixed', label: 'Mixed', emoji: '✨' },
      ]
    },
    {
      title: 'Romantic Moments',
      pages: [
        { path: '/hug', label: 'Hug', emoji: '🤗' },
        { path: '/kiss', label: 'Forehead Kiss', emoji: '😘' },
        { path: '/miss-you', label: 'Miss You', emoji: '🥺' },
        { path: '/reunion', label: 'Reunion', emoji: '❤️' },
        { path: '/hands', label: 'Holding Hands', emoji: '🤝' },
        { path: '/cuddle', label: 'Cuddle', emoji: '💞' },
        { path: '/late-night', label: 'Late Night', emoji: '🌙' },
        { path: '/sleep-call', label: 'Sleep Call', emoji: '📱' },
        { path: '/laugh', label: 'Laugh Together', emoji: '😂' },
        { path: '/safe', label: 'Safe in Arms', emoji: '🛌' },
        { path: '/goodbye', label: 'Goodbye', emoji: '😢' },
        { path: '/surprise', label: 'Surprise', emoji: '😍' },
        { path: '/tight-hug', label: 'Tight Hug', emoji: '🤍' },
        { path: '/understanding', label: 'Understanding', emoji: '✨' },
        { path: '/home', label: 'Home is You', emoji: '🏠' },
      ]
    },
    {
      title: 'Emoji Vibes',
      pages: [
        { path: '/hug-vibes', label: 'Hug Vibes', emoji: '🤗' },
        { path: '/kiss-energy', label: 'Kiss Energy', emoji: '😘' },
        { path: '/miss-you-vibes', label: 'Miss You Vibes', emoji: '🥺' },
        { path: '/cuddle-mode', label: 'Cuddle Mode', emoji: '🫶' },
        { path: '/late-night-love', label: 'Late Night Love', emoji: '🌙' },
        { path: '/soft-romance', label: 'Soft Romance', emoji: '💫' },
        { path: '/heartbeats', label: 'Heartbeats', emoji: '💓' },
        { path: '/love-mood', label: 'Love Mood', emoji: '💕' },
        { path: '/together-feel', label: 'Together Feel', emoji: '🤝' },
        { path: '/warmth', label: 'Warmth', emoji: '🔥' },
      ]
    },
    {
      title: 'Love Stories',
      pages: [
        { path: '/send-this-to-your-person', label: 'Send This To Your Person', emoji: '💕' },
        { path: '/answer-me-honestly', label: 'Answer Me Honestly', emoji: '💞' },
        { path: '/only-for-my-love', label: 'Only For My Love', emoji: '🤍' },
        { path: '/do-you-feel-this-too', label: 'Do You Feel This Too', emoji: '💖' },
        { path: '/quiet-love-questions', label: 'Quiet Love Questions', emoji: '✨' },
        { path: '/late-night-thoughts', label: 'Late Night Thoughts', emoji: '🌙' },
        { path: '/real-love-check', label: 'Real Love Check', emoji: '❤️' },
        { path: '/soft-confession', label: 'Soft Confession', emoji: '🤍' },
        { path: '/heart-to-heart', label: 'Heart To Heart', emoji: '💖' },
      ]
    },
    {
      title: 'Interactive Stories',
      pages: [
        { path: '/if-you-love-me', label: 'If You Love Me', emoji: '🤍' },
        { path: '/love-check', label: 'Love Check', emoji: '💖' },
        { path: '/answer-honestly', label: 'Answer Honestly', emoji: '💞' },
        { path: '/us-feeling', label: 'Us Feeling', emoji: '🤍' },
        { path: '/send-this-to-me', label: 'Send This To Me', emoji: '💕' },
      ]
    }
  ]

  return (
    <nav style={styles.nav}>
      <div style={styles.navContent}>
        <Link to="/" style={styles.logo}>
          <span style={styles.logoEmoji}>💕</span>
          <span style={styles.logoText}>LoveReel</span>
        </Link>

        {!isHomePage && (
          <motion.button
            style={styles.menuButton}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle menu"
          >
            <span style={styles.menuIcon}>{isMenuOpen ? '✕' : '☰'}</span>
          </motion.button>
        )}
      </div>

      <AnimatePresence>
        {isMenuOpen && !isHomePage && (
          <motion.div
            style={styles.menu}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div style={styles.menuContent}>
              <Link 
                to="/" 
                style={styles.homeLink}
                onClick={() => setIsMenuOpen(false)}
              >
                <span style={styles.homeEmoji}>🏠</span>
                <span>Back to Home</span>
              </Link>
              
              <div style={styles.categoriesContainer}>
                {categories.map((category, catIndex) => (
                  <div key={category.title} style={styles.categorySection}>
                    <h3 style={styles.categoryTitle}>{category.title}</h3>
                    <div style={styles.categoryLinks}>
                      {category.pages.map((page) => {
                        const isActive = location.pathname === page.path
                        return (
                          <Link
                            key={page.path}
                            to={page.path}
                            style={{
                              ...styles.categoryLink,
                              ...(isActive ? styles.activeLink : {})
                            }}
                            onClick={() => setIsMenuOpen(false)}
                          >
                            <span style={styles.linkEmoji}>{page.emoji}</span>
                            <span>{page.label}</span>
                            {isActive && <span style={styles.activeIndicator}>●</span>}
                          </Link>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

const styles = {
  nav: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    background: 'linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.7) 100%)',
    backdropFilter: 'blur(10px)',
    borderBottom: '1px solid rgba(255, 77, 109, 0.2)',
  },
  navContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 20px',
    maxWidth: '100%',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    textDecoration: 'none',
    color: '#ffffff',
    fontSize: '20px',
    fontWeight: 800,
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    letterSpacing: '1.5px',
    textShadow: '0 2px 8px rgba(255, 77, 109, 0.4)',
  },
  logoEmoji: {
    fontSize: '24px',
  },
  logoText: {
    background: 'linear-gradient(135deg, #ff4d6d 0%, #ff758f 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  menuButton: {
    background: 'rgba(255, 77, 109, 0.2)',
    border: '2px solid rgba(255, 77, 109, 0.4)',
    borderRadius: '8px',
    padding: '8px 12px',
    color: '#ffffff',
    fontSize: '20px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease',
  },
  menuIcon: {
    lineHeight: 1,
  },
  menu: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    background: 'linear-gradient(to bottom, rgba(10, 10, 10, 0.98) 0%, rgba(20, 10, 20, 0.98) 100%)',
    backdropFilter: 'blur(20px)',
    borderTop: '1px solid rgba(255, 77, 109, 0.2)',
    maxHeight: '80vh',
    overflowY: 'auto',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
  },
  menuContent: {
    padding: '20px',
  },
  homeLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '12px 16px',
    background: 'linear-gradient(135deg, rgba(255, 77, 109, 0.2) 0%, rgba(255, 117, 143, 0.2) 100%)',
    border: '2px solid rgba(255, 77, 109, 0.4)',
    borderRadius: '12px',
    textDecoration: 'none',
    color: '#ffffff',
    fontSize: '17px',
    fontWeight: 600,
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    letterSpacing: '0.8px',
    marginBottom: '24px',
    transition: 'all 0.3s ease',
    textShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
  },
  homeEmoji: {
    fontSize: '20px',
  },
  categoriesContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  categorySection: {
    marginBottom: '8px',
  },
  categoryTitle: {
    fontSize: '15px',
    fontWeight: 700,
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    color: '#ff758f',
    marginBottom: '12px',
    textTransform: 'uppercase',
    letterSpacing: '1.2px',
    textShadow: '0 2px 6px rgba(255, 117, 143, 0.3)',
  },
  categoryLinks: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
    gap: '8px',
  },
  categoryLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 14px',
    background: 'rgba(255, 77, 109, 0.1)',
    border: '1px solid rgba(255, 77, 109, 0.2)',
    borderRadius: '8px',
    textDecoration: 'none',
    color: '#ffffff',
    fontSize: '14px',
    fontWeight: 500,
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    letterSpacing: '0.5px',
    transition: 'all 0.2s ease',
    position: 'relative',
  },
  activeLink: {
    background: 'rgba(255, 77, 109, 0.3)',
    borderColor: 'rgba(255, 77, 109, 0.5)',
    fontWeight: 600,
  },
  linkEmoji: {
    fontSize: '18px',
  },
  activeIndicator: {
    position: 'absolute',
    right: '10px',
    color: '#ff4d6d',
    fontSize: '12px',
  },
}

export default Navigation
