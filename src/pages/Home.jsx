import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import React from 'react'

const Home = () => {
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
    <div style={styles.container}>
      <motion.div
        style={styles.content}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 style={styles.title}>
          <span style={{ color: '#ff4d6d' }}>Choose Your Vibe</span>
        </h1>
        <div style={styles.scrollContainer}>
          {categories.map((category, catIndex) => (
            <div key={category.title} style={styles.category}>
              <h2 style={styles.categoryTitle}>{category.title}</h2>
              <div style={styles.buttonGrid}>
                {category.pages.map((button, index) => (
                  <motion.div
                    key={button.path}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: (catIndex * 0.1) + (index * 0.05) }}
                  >
                    <Link to={button.path} style={styles.link}>
                      <motion.div
                        style={styles.button}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span style={styles.emoji}>{button.emoji}</span>
                        <span>{button.label}</span>
                      </motion.div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

const styles = {
  container: {
    height: '100vh',
    width: '100vw',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: '24px',
    overflow: 'auto',
    paddingTop: '80px', // Space for navigation bar (only visible on home page)
    paddingBottom: '40px',
  },
  content: {
    textAlign: 'center',
    width: '100%',
    maxWidth: '600px',
  },
  title: {
    fontSize: 'clamp(28px, 7vw, 40px)',
    fontWeight: 700,
    marginBottom: '32px',
    letterSpacing: '0.8px',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    color: '#ff4d6d',
    display: 'block',
    lineHeight: 1.4,
    textShadow: '0 2px 12px rgba(255, 77, 109, 0.4)',
  },
  scrollContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '32px',
  },
  category: {
    marginBottom: '8px',
  },
  categoryTitle: {
    fontSize: 'clamp(18px, 4vw, 24px)',
    fontWeight: 600,
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    color: '#ff758f',
    marginBottom: '16px',
    textAlign: 'left',
    paddingLeft: '8px',
    letterSpacing: '0.6px',
    textShadow: '0 1px 6px rgba(255, 117, 143, 0.3)',
  },
  buttonGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
    gap: '12px',
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
  button: {
    fontSize: 'clamp(15px, 3.5vw, 20px)',
    padding: '16px 20px',
    borderRadius: '40px',
    background: 'linear-gradient(135deg, rgba(255, 77, 109, 0.2) 0%, rgba(255, 117, 143, 0.2) 100%)',
    border: '2px solid rgba(255, 77, 109, 0.4)',
    color: '#ffffff',
    cursor: 'pointer',
    fontWeight: 500,
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    letterSpacing: '0.4px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    transition: 'all 0.3s ease',
    lineHeight: 1.5,
    minHeight: '80px',
    textShadow: '0 1px 4px rgba(0, 0, 0, 0.3)',
  },
  emoji: {
    fontSize: 'clamp(28px, 5vw, 36px)',
  },
}

export default Home
