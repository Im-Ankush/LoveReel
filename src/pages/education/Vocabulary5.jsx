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

const Vocabulary5Page = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const total = VOCAB_ITEMS.length

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % total)
    }, SLIDE_DURATION_MS)

    return () => clearInterval(timer)
  }, [total])

  const item = VOCAB_ITEMS[currentIndex]

  return (
    <div style={styles.page}>
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
      </div>
    </div>
  )
}

const styles = {
  page: {
    minHeight: '100vh',
    position: 'relative',
    padding: '60px 20px',
    fontFamily: "'Inter', sans-serif",
  },
  bg: {
    position: 'fixed',
    inset: 0,
    backgroundImage:
    'url(https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=1740&auto=format&fit=crop)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
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
    maxWidth: '600px',
    margin: '0 auto',
    textAlign: 'center',
  },
  title: {
    fontSize: '28px',
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
    borderRadius: '18px',
    padding: '28px',
  },
  word: {
    fontSize: '22px',
    fontWeight: 800,
    color: '#facc15',
    marginBottom: '12px',
  },
  meaning: {
    fontSize: '16px',
    color: '#e2e8f0',
    marginBottom: '18px',
  },
  exampleBox: {
    textAlign: 'left',
    background: 'rgba(59,130,246,0.08)',
    padding: '16px',
    borderRadius: '10px',
  },
  label: {
    fontSize: '12px',
    color: '#94a3b8',
    textTransform: 'uppercase',
    marginBottom: '6px',
  },
  sentence: {
    color: '#f1f5f9',
    marginBottom: '6px',
  },
  hint: {
    color: '#cbd5e1',
    fontSize: '14px',
  },
  counter: {
    marginTop: '14px',
    color: '#94a3b8',
  },
}

export default Vocabulary5Page