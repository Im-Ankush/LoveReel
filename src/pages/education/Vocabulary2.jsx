import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const SLIDE_DURATION_MS = 3500

const VOCAB_ITEMS = [
  {
    word: 'SURGED',
    meaning: 'Increased suddenly and strongly.',
    sentence: 'Petrol prices surged last month.',
    hint: '(They rose quickly.)',
  },
  {
    word: 'COMPLACENCY',
    meaning: 'Being too satisfied and ignoring danger.',
    sentence: 'Overconfidence and complacency caused the team to lose.',
    hint: '(They stopped being careful.)',
  },
  {
    word: 'REASSURING',
    meaning: 'Making someone feel relaxed or confident.',
    sentence: 'The teacher’s words were reassuring before the exam.',
    hint: '(They reduced fear.)',
  },
  {
    word: 'ADJUDICATING',
    meaning: 'Officially making a judgment or decision.',
    sentence: 'The court is adjudicating the property dispute.',
    hint: '(Formally deciding the case.)',
  },
  {
    word: 'INTERVENE',
    meaning: 'To step in and change a situation.',
    sentence: 'Police had to intervene to stop the fight.',
    hint: '(They entered to control it.)',
  },
]

const Vocabulary2Page = () => {
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
        <h1 style={styles.title}>Advanced Vocabulary</h1>
        <p style={styles.subtitle}>
          Powerful Words for Competitive Exams
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
      'url(https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=1740&auto=format&fit=crop)',
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

export default Vocabulary2Page