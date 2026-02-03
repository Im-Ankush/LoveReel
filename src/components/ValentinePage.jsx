import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ValentineFloatingEmojis from './ValentineFloatingEmojis'
import {
  VALENTINE_GRADIENT,
  CTA_LINES,
  INTRO_DURATION_MS,
  STORY_SLIDE_DURATION_MS,
  CTA_DURATION_MS,
} from '../pages/love/valentine-week/valentineWeekConfig'

const fadeScaleIn = {
  initial: { opacity: 0, scale: 0.96 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.98 },
  transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
}

function Watermark() {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 16,
        right: 16,
        fontSize: 12,
        fontWeight: 300,
        letterSpacing: '1.5px',
        color: '#fff',
        opacity: 0.2,
        zIndex: 10,
        pointerEvents: 'none',
      }}
    >
      LoveInFrames
    </div>
  )
}

const AUTO_START_DELAY_MS = 1200

export default function ValentinePage({ config }) {
  const [phase, setPhase] = useState('start')
  const [storyIndex, setStoryIndex] = useState(0)
  const timersRef = useRef([])

  const clearTimers = () => {
    timersRef.current.forEach(clearTimeout)
    timersRef.current = []
  }

  useEffect(() => clearTimers, [])

  // Auto-start: begin intro after a short delay, then flow runs automatically
  useEffect(() => {
    if (phase !== 'start' || !config) return
    const t0 = setTimeout(() => {
      setPhase('intro')
    }, AUTO_START_DELAY_MS)
    timersRef.current.push(t0)
    return () => clearTimeout(t0)
  }, [phase, config])

  // After intro, move to first story slide
  useEffect(() => {
    if (phase !== 'intro') return
    const t1 = setTimeout(() => {
      setPhase('story')
      setStoryIndex(0)
    }, INTRO_DURATION_MS)
    timersRef.current.push(t1)
    return () => clearTimeout(t1)
  }, [phase])

  useEffect(() => {
    if (phase !== 'story') return
    const slides = config?.storySlides ?? []
    if (storyIndex >= slides.length) {
      setPhase('cta')
      const t = setTimeout(() => setPhase('end'), CTA_DURATION_MS)
      timersRef.current.push(t)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => {
      const next = storyIndex + 1
      if (next >= slides.length) {
        setPhase('cta')
        const t2 = setTimeout(() => setPhase('end'), CTA_DURATION_MS)
        timersRef.current.push(t2)
      } else {
        setStoryIndex(next)
      }
    }, STORY_SLIDE_DURATION_MS)
    timersRef.current.push(t)
    return () => clearTimeout(t)
  }, [phase, storyIndex, config?.storySlides])

  if (!config) return null

  const { name, emoji, emojis, storySlides } = config
  const slides = Array.isArray(storySlides) ? storySlides : []

  const containerStyle = {
    position: 'relative',
    width: '100%',
    maxWidth: '100vw',
    margin: '0 auto',
    height: '100vh',
    maxHeight: '100dvh',
    minHeight: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: '24px 20px',
    overflow: 'hidden',
    background: VALENTINE_GRADIENT,
    backgroundSize: '400% 400%',
    animation: 'valentineGradientShift 22s ease infinite',
  }

  const contentLayer = {
    position: 'relative',
    zIndex: 2,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    width: '100%',
    maxWidth: 'min(90vw, 400px)',
  }

  const titleStyle = {
    fontFamily: "'Dancing Script', cursive",
    fontSize: 'clamp(36px, 10vw, 52px)',
    fontWeight: 600,
    color: '#fff',
    textShadow: '0 2px 16px rgba(0,0,0,0.25)',
    marginBottom: 8,
  }

  const emojiStyle = {
    fontSize: 'clamp(56px, 14vw, 80px)',
    lineHeight: 1,
    filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.2))',
  }

  const slideTextStyle = {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    fontSize: 'clamp(22px, 5.8vw, 32px)',
    lineHeight: 1.5,
    fontWeight: 500,
    color: '#fff',
    textShadow: '0 2px 12px rgba(0,0,0,0.35)',
  }

  const ctaLine1Style = {
    ...slideTextStyle,
    marginBottom: 12,
  }
  const ctaLine2Style = {
    ...slideTextStyle,
    fontSize: 'clamp(20px, 5.2vw, 28px)',
  }

  return (
    <div style={containerStyle} className="valentine-reel-container">
      <ValentineFloatingEmojis emojis={emojis} />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, transparent 50%, rgba(0,0,0,0.06) 100%)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />
      <Watermark />

      <div style={contentLayer}>
        <AnimatePresence mode="wait">
          {phase === 'start' && (
            <motion.div
              key="start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              style={{ width: '100%' }}
            />
          )}

          {phase === 'intro' && (
            <motion.div
              key="intro"
              {...fadeScaleIn}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            >
              <div style={titleStyle}>{name}</div>
              <div style={emojiStyle}>{emoji}</div>
            </motion.div>
          )}

          {phase === 'story' && storyIndex < slides.length && (
            <motion.div key={`story-${storyIndex}`} {...fadeScaleIn} style={{ width: '100%' }}>
              <p style={slideTextStyle}>{slides[storyIndex]}</p>
            </motion.div>
          )}

          {(phase === 'cta' || phase === 'end') && (
            <motion.div key="cta" {...fadeScaleIn} style={{ width: '100%' }}>
              <p style={ctaLine1Style}>{CTA_LINES.line1}</p>
              <p style={ctaLine2Style}>{CTA_LINES.line2}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
