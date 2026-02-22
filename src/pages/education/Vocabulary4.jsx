import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const SLIDE_DURATION_MS = 3500

const VOCAB_ITEMS = [
  {
    word: 'RENEGE',
    meaning: 'To go back on a promise or commitment.',
    sentence: 'They reneged on the deal.',
    hint: '(They broke their promise.)',
  },
  {
    word: 'SCATHING',
    meaning: 'Harshly critical in a cutting or severe manner.',
    sentence: 'A scathing review of the policy was published.',
    hint: '(Very strongly critical.)',
  },
  {
    word: 'VITAL',
    meaning: 'Extremely important or essential.',
    sentence: 'Vital organs are necessary for survival.',
    hint: '(Absolutely necessary.)',
  },
  {
    word: 'FACILITATING',
    meaning: 'Making something easier or helping it happen.',
    sentence: 'The government is facilitating economic growth.',
    hint: '(Helping it happen.)',
  },
  {
    word: 'APPARENT',
    meaning: 'Clearly visible or obvious.',
    sentence: 'There was no apparent reason for the delay.',
    hint: '(Clearly visible or noticeable.)',
  },
]

const Vocabulary4Page = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const total = VOCAB_ITEMS.length

  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(() => {
      setCurrentIndex((i) => (i + 1) % total)
    }, SLIDE_DURATION_MS)
    return () => clearInterval(timer)
  }, [total, isPaused])

  const item = VOCAB_ITEMS[currentIndex]

  return (
    <div style={styles.page} onClick={() => setIsPaused((p) => !p)}>
      <div style={styles.bg} />
      <div style={styles.overlay} />

      <div style={styles.content}>
        <h1 style={styles.title}>Editorial Vocabulary</h1>
        <p style={styles.subtitle}>
          Important Words for UPSC • SSC • Banking • CAT
        </p>

        {/* Progress Bar */}
        <div style={styles.progressWrapper}>
          <motion.div
            key={currentIndex}
            style={styles.progress}
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{
              duration: SLIDE_DURATION_MS / 1000,
              ease: 'linear',
            }}
          />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            style={styles.card}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -25 }}
            transition={{ duration: 0.35 }}
          >
            <div style={styles.word}>{item.word}</div>
            <p style={styles.meaning}>{item.meaning}</p>

            <div style={styles.exampleBox}>
              <p style={styles.label}>Example:</p>
              <p style={styles.sentence}>{item.sentence}</p>
              <p style={styles.hint}>{item.hint}</p>
            </div>
          </motion.div>
        </AnimatePresence>

        <p style={styles.counter}>
          {currentIndex + 1} / {total}
        </p>

        <p style={styles.footer}>
          Click anywhere to {isPaused ? 'resume' : 'pause'}
        </p>
      </div>
    </div>
  )
}

const styles = {
  page: {
    minHeight: '100vh',
    position: 'relative',
    padding: '60px 20px',
    cursor: 'pointer',
    fontFamily: "'Inter', sans-serif",
  },
  bg: {
    position: 'fixed',
    inset: 0,
    backgroundImage:
      'url(https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1740&auto=format&fit=crop)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    zIndex: 0,
  },
  overlay: {
    position: 'fixed',
    inset: 0,
    background:
      'linear-gradient(160deg, rgba(17,24,39,0.95), rgba(30,41,59,0.92))',
    zIndex: 1,
  },
  content: {
    position: 'relative',
    zIndex: 2,
    maxWidth: '550px',
    margin: '0 auto',
    textAlign: 'center',
  },
  title: {
    fontSize: '30px',
    fontWeight: 700,
    color: '#f8fafc',
  },
  subtitle: {
    color: '#cbd5e1',
    marginBottom: '25px',
  },
  progressWrapper: {
    height: '4px',
    background: 'rgba(255,255,255,0.2)',
    borderRadius: '4px',
    overflow: 'hidden',
    marginBottom: '25px',
  },
  progress: {
    height: '100%',
    background: '#facc15',
  },
  card: {
    background: 'rgba(255,255,255,0.08)',
    border: '1px solid rgba(255,255,255,0.15)',
    borderRadius: '18px',
    padding: '28px',
    backdropFilter: 'blur(8px)',
  },
  word: {
    fontSize: '26px',
    fontWeight: 800,
    color: '#facc15',
    marginBottom: '12px',
    letterSpacing: '1px',
  },
  meaning: {
    fontSize: '17px',
    color: '#e2e8f0',
    marginBottom: '20px',
  },
  exampleBox: {
    textAlign: 'left',
    background: 'rgba(239,68,68,0.08)',
    padding: '16px',
    borderRadius: '10px',
    borderLeft: '4px solid #ef4444',
  },
  label: {
    fontSize: '12px',
    color: '#94a3b8',
    textTransform: 'uppercase',
    marginBottom: '6px',
  },
  sentence: {
    color: '#f1f5f9',
    marginBottom: '8px',
  },
  hint: {
    color: '#cbd5e1',
    fontSize: '14px',
  },
  counter: {
    marginTop: '18px',
    color: '#94a3b8',
  },
  footer: {
    marginTop: '8px',
    fontSize: '13px',
    color: '#64748b',
  },
}

export default Vocabulary4Page