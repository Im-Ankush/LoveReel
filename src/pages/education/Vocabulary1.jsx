import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const SLIDE_DURATION_MS = 3500

const VOCAB_ITEMS = [
  {
    word: 'THRESHOLD',
    meaning: 'The minimum level where something starts.',
    sentence: 'There is a threshold of 40 marks to pass the exam.',
    hint: '(40 is the starting limit to succeed.)',
  },
  {
    word: 'PROSPECTIVE',
    meaning: 'Likely to happen in the future / expected.',
    sentence: 'The company is meeting prospective buyers next week.',
    hint: '(People who may buy in future.)',
  },
  {
    word: 'RELINQUISHED',
    meaning: 'Given up willingly.',
    sentence: 'She relinquished her position to focus on studies.',
    hint: '(She left it by choice.)',
  },
  {
    word: 'VIGIL',
    meaning: 'Careful watching for a long time.',
    sentence: 'Doctors kept a night-long vigil over the patient.',
    hint: '(They watched continuously.)',
  },
  {
    word: 'LULL',
    meaning: 'A temporary pause or calm period.',
    sentence: 'There was a lull in the discussion before the debate restarted.',
    hint: '(Short break in activity.)',
  },
]

const Vocabulary1Page = () => {
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
        <h1 style={styles.title}>Power Vocabulary</h1>
        <p style={styles.subtitle}>
          5 High-Impact Words for Competitive Exams
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
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
      'url(https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1740&auto=format&fit=crop)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    zIndex: 0,
  },
  overlay: {
    position: 'fixed',
    inset: 0,
    background:
      'linear-gradient(160deg, rgba(15,23,42,0.95), rgba(30,41,59,0.92))',
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
    fontSize: '32px',
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
    background: 'rgba(59,130,246,0.08)',
    padding: '16px',
    borderRadius: '10px',
    borderLeft: '4px solid #38bdf8',
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

export default Vocabulary1Page