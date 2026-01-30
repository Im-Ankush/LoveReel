import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const SLIDE_DURATION_MS = 3000

const VOCAB_ITEMS = [
  {
    word: 'OVERSEE',
    meaning: 'To supervise or manage',
    sentence: 'When Priya was hired to oversee the factory, she wanted to improve safety for everyone.',
  },
  {
    word: 'SOUGHT',
    meaning: 'Looked for or tried to obtain',
    sentence: 'She sought support from the management before making big changes.',
  },
  {
    word: 'COMPREHENSIVE',
    meaning: 'Covering all or nearly all aspects',
    sentence: 'She prepared a comprehensive training plan that included every aspect of the job.',
  },
  {
    word: 'BLUE COLLAR WORKERS',
    meaning: 'Manual or physical labour workers',
    sentence: 'The blue collar workers at the factory did most of the physical work.',
  },
  {
    word: 'RELUCTANCE',
    meaning: 'Unwillingness or hesitation to do something',
    sentence: 'At first, there was reluctance among the workers to follow the new rules.',
  },
  {
    word: 'RESISTANCE',
    meaning: 'Opposition or unwillingness to accept something',
    sentence: 'She faced resistance from some people who did not want to change.',
  },
  {
    word: 'IMMIGRANTS',
    meaning: 'People who move to another country to live or work',
    sentence: 'Many immigrants on the team had to learn the local language and rules.',
  },
  {
    word: 'PICK UP',
    meaning: 'To learn or acquire (a skill or habit)',
    sentence: 'They had to pick up the new safety habits quickly.',
  },
  {
    word: 'ENDED IN LIMBO',
    meaning: 'Left undecided or stuck without progress',
    sentence: 'Some meetings ended in limbo when no one could agree on a solution.',
  },
  {
    word: 'SOURED OVER',
    meaning: 'Became negative or less favourable with time',
    sentence: 'Relations soured over the issue of unpaid overtime.',
  },
  {
    word: 'TANTRUMS',
    meaning: 'Sudden outbursts of anger or unreasonable behaviour',
    sentence: 'A few workers threw tantrums when they were asked to change their shifts.',
  },
  {
    word: 'ENCOUNTER',
    meaning: 'Face or come across (a problem or situation)',
    sentence: 'She had to encounter these problems every day and stay calm.',
  },
  {
    word: 'EASIER SAID THAN DONE',
    meaning: 'Something that sounds simple but is difficult to actually achieve',
    sentence: '"Staying calm is easier said than done," she said, but she kept trying.',
  },
]

const VocabularyStory = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const total = VOCAB_ITEMS.length

  // Auto-advance like a video (only when not paused)
  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(() => {
      setCurrentIndex((i) => (i + 1) % total)
    }, SLIDE_DURATION_MS)
    return () => clearInterval(timer)
  }, [total, isPaused])

  // Space bar toggles pause
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
        e.preventDefault()
        setIsPaused((p) => !p)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const togglePause = () => setIsPaused((p) => !p)

  const item = VOCAB_ITEMS[currentIndex]

  return (
    <div style={styles.page} onClick={togglePause} role="button" tabIndex={0} aria-label="Click or press Space to pause or resume">
      {/* Educational background */}
      <div style={styles.bgImage} />
      <div style={styles.overlay} />

      <div style={styles.content}>
        <h1 style={styles.title}>Vocabulary for Exams</h1>
        <p style={styles.subtitle}>Learn 13 words in a story – useful for your exam</p>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            style={styles.card}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div style={styles.wordBadge}>{item.word}</div>
            <p style={styles.meaning}>{item.meaning}</p>
            <div style={styles.sentenceBox}>
              <p style={styles.sentenceLabel}>In the story:</p>
              <p style={styles.sentence}>{item.sentence}</p>
            </div>
          </motion.div>
        </AnimatePresence>

        <p style={styles.counter}>
          {currentIndex + 1} / {total}
        </p>
        <p style={styles.footer}>Good luck in your exam.</p>
      </div>
    </div>
  )
}

const styles = {
  page: {
    minHeight: '100vh',
    width: '100%',
    position: 'relative',
    padding: '24px',
    paddingTop: '80px',
    paddingBottom: '48px',
    cursor: 'none',
  },
  bgImage: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: 'url(https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1740&auto=format&fit=crop)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    zIndex: 0,
  },
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(160deg, rgba(15, 32, 39, 0.92) 0%, rgba(44, 83, 100, 0.88) 50%, rgba(15, 32, 39, 0.94) 100%)',
    zIndex: 1,
  },
  content: {
    position: 'relative',
    zIndex: 2,
    maxWidth: '560px',
    margin: '0 auto',
  },
  title: {
    fontSize: 'clamp(26px, 5vw, 34px)',
    fontWeight: 700,
    color: '#f8fafc',
    marginBottom: '8px',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  subtitle: {
    fontSize: '16px',
    color: '#cbd5e1',
    marginBottom: '28px',
    lineHeight: 1.5,
  },
  card: {
    background: 'rgba(255, 255, 255, 0.08)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    borderRadius: '16px',
    padding: '28px 24px',
    marginBottom: '24px',
  },
  wordBadge: {
    display: 'inline-block',
    fontSize: '14px',
    fontWeight: 700,
    color: '#0f2027',
    background: '#fcd34d',
    padding: '8px 14px',
    borderRadius: '8px',
    marginBottom: '14px',
    letterSpacing: '0.5px',
  },
  meaning: {
    fontSize: '17px',
    fontWeight: 600,
    color: '#e2e8f0',
    marginBottom: '18px',
    lineHeight: 1.4,
  },
  sentenceBox: {
    borderLeft: '4px solid #38bdf8',
    paddingLeft: '16px',
    background: 'rgba(56, 189, 248, 0.08)',
    borderRadius: '0 8px 8px 0',
    padding: '14px 16px 14px 16px',
  },
  sentenceLabel: {
    fontSize: '12px',
    fontWeight: 600,
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: '0.8px',
    marginBottom: '6px',
  },
  sentence: {
    fontSize: '16px',
    color: '#f1f5f9',
    lineHeight: 1.6,
    margin: 0,
  },
  counter: {
    textAlign: 'center',
    fontSize: '14px',
    color: '#94a3b8',
    fontWeight: 500,
    marginBottom: '12px',
  },
  footer: {
    textAlign: 'center',
    fontSize: '14px',
    color: '#64748b',
  },
}

export default VocabularyStory
