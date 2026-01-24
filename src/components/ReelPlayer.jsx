import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import EmojiBackground from './EmojiBackground'

// Emoji animation variants
const emojiAnimations = {
  float: {
    y: [0, -15, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  },
  pulse: {
    scale: [1, 1.15, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  },
  drift: {
    x: [0, 10, -10, 0],
    y: [0, -10, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
}

// Animated Emoji Component
const AnimatedEmoji = ({ emoji, animationType }) => {
  const animation = emojiAnimations[animationType] || emojiAnimations.float

  return (
    <motion.div
      style={styles.emojiContainer}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        ...animation
      }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.6 }}
    >
      <span style={styles.emoji}>{emoji}</span>
    </motion.div>
  )
}

// Normalize slides - handle both string and object formats
const normalizeSlides = (slides) => {
  if (!slides || !Array.isArray(slides) || slides.length === 0) return []
  
  try {
    return slides.map((slide, index) => {
      // If it's already an object with text property
      if (typeof slide === 'object' && slide !== null && slide !== undefined) {
        if ('text' in slide) {
          return {
            text: slide.text || '',
            emoji: slide.emoji || null
          }
        }
      }
      
      // If it's a string, try to extract emoji
      if (typeof slide === 'string') {
        try {
          const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u
          const match = slide.match(emojiRegex)
          const emoji = (match && match.length > 0 && match[0]) ? match[0] : null
          const text = slide.replace(emojiRegex, '').trim()
          
          return { text: text || slide, emoji }
        } catch (err) {
          console.warn('Error processing string slide:', err, slide)
          return { text: slide, emoji: null }
        }
      }
      
      // Fallback
      return { text: String(slide || ''), emoji: null }
    })
  } catch (error) {
    console.error('Error normalizing slides:', error, slides)
    return []
  }
}

// Get random animation type
const getRandomAnimation = () => {
  const types = ['float', 'pulse', 'drift']
  return types[Math.floor(Math.random() * types.length)]
}

const ReelPlayer = ({ slides = [], slideDuration, onComplete, backgroundConfig, emojiBackground, autoStart = true, totalDuration = 20000 }) => {
  const location = useLocation()
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [normalizedSlides, setNormalizedSlides] = useState([])
  const [showReady, setShowReady] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [pendingResume, setPendingResume] = useState(false)
  const autoStartTriggered = useRef(false)
  const slideTimerRef = useRef(null)
  const resumeTimerRef = useRef(null)

  // Calculate slide duration to total 20 seconds
  const calculatedSlideDuration = useMemo(() => {
    if (slideDuration) return slideDuration
    if (slides.length === 0) return 2000
    
    const durationForSlides = totalDuration - 1000
    return Math.max(1500, Math.floor(durationForSlides / slides.length))
  }, [slides.length, slideDuration, totalDuration])

  const handleStart = () => {
    setNormalizedSlides(normalizeSlides(slides))
    setIsComplete(false)
    setCurrentIndex(0)
    setShowReady(false)
    // Start playing after state is set
    setTimeout(() => {
      setIsPlaying(true)
    }, 0)
  }

  // Reset state when route changes
  useEffect(() => {
    autoStartTriggered.current = false
    setPendingResume(false)
    setIsPlaying(false)
    setCurrentIndex(0)
    setNormalizedSlides([])
    setShowReady(false)
    setIsComplete(false)
  }, [location.pathname])

  // Auto-start on mount - runs when route changes
  useEffect(() => {
    // Reset trigger on route change to allow auto-start again
    autoStartTriggered.current = false
  }, [location.pathname])

  // Auto-start on mount - separate effect
  useEffect(() => {
    if (autoStart && !autoStartTriggered.current && slides && slides.length > 0) {
      autoStartTriggered.current = true
      
      const readyTimer = setTimeout(() => {
        setShowReady(true)
      }, 500)

      const autoStartTimer = setTimeout(() => {
        setShowReady(false)
        try {
          const normalized = normalizeSlides(slides)
          if (normalized && normalized.length > 0) {
            setNormalizedSlides(normalized)
            setIsPlaying(true)
            setCurrentIndex(0)
            setIsComplete(false)
          }
        } catch (error) {
          console.error('Error in auto-start:', error, slides)
        }
      }, 1800)

      return () => {
        clearTimeout(readyTimer)
        clearTimeout(autoStartTimer)
      }
    }
  }, [autoStart, location.pathname, slides])

  // Handle spacebar to resume/pause playback
  useEffect(() => {
    const handleKeyPress = (e) => {
      // Only handle spacebar when not in input/textarea
      if (e.code === 'Space' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
        e.preventDefault()
        
        if (isPlaying) {
          // Pause - keep current slide visible
          setIsPlaying(false)
        } else {
          // Resume: ensure slides are normalized first
          if (normalizedSlides.length === 0 && slides.length > 0) {
            const normalized = normalizeSlides(slides)
            setNormalizedSlides(normalized)
            // Wait for next tick to ensure state is set
            requestAnimationFrame(() => {
              setIsComplete(false)
              setCurrentIndex(0)
              setIsPlaying(true)
            })
          } else if (normalizedSlides.length > 0) {
            // Slides already normalized, just resume
            if (isComplete) {
              // If complete, restart from beginning
              // Set a flag to trigger resume after state updates
              setPendingResume(true)
              setIsComplete(false)
              setCurrentIndex(0)
            } else {
              // Paused in middle - resume from current position
              // Ensure currentIndex is within bounds
              const validIndex = Math.max(0, Math.min(currentIndex, normalizedSlides.length - 1))
              if (validIndex !== currentIndex) {
                setCurrentIndex(validIndex)
              }
              // Resume playback immediately - the effect will handle the timer
              setIsPlaying(true)
            }
          }
        }
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [isPlaying, isComplete, normalizedSlides.length, currentIndex, slides])

  // Handle resume after completion
  useEffect(() => {
    if (pendingResume && !isComplete && currentIndex === 0 && normalizedSlides.length > 0) {
      setPendingResume(false)
      setIsPlaying(true)
    }
  }, [pendingResume, isComplete, currentIndex, normalizedSlides.length])

  // Auto-advance slides
  useEffect(() => {
    // Clear any existing timer first
    if (slideTimerRef.current) {
      clearTimeout(slideTimerRef.current)
      slideTimerRef.current = null
    }

    if (!isPlaying || normalizedSlides.length === 0 || isComplete) {
      return
    }

    const slidesLength = normalizedSlides.length

    if (currentIndex < slidesLength - 1) {
      slideTimerRef.current = setTimeout(() => {
        setCurrentIndex(prev => prev + 1)
        slideTimerRef.current = null
      }, calculatedSlideDuration)
    } else if (currentIndex === slidesLength - 1) {
      // Last slide - wait for slide duration then stop (don't restart)
      slideTimerRef.current = setTimeout(() => {
        setIsComplete(true)
        setIsPlaying(false)
        slideTimerRef.current = null
        if (onComplete) {
          onComplete()
        }
      }, calculatedSlideDuration)
    }

    return () => {
      if (slideTimerRef.current) {
        clearTimeout(slideTimerRef.current)
        slideTimerRef.current = null
      }
    }
  }, [isPlaying, currentIndex, calculatedSlideDuration, normalizedSlides.length, isComplete, onComplete])

  // Build container style
  const containerStyle = useMemo(() => {
    const baseStyle = { ...styles.container }

    if (emojiBackground) {
      // Use custom background gradient if provided, otherwise use default
      if (emojiBackground.backgroundGradient) {
        baseStyle.background = emojiBackground.backgroundGradient
        baseStyle.backgroundSize = '400% 400%'
        baseStyle.animation = 'gradientShift 25s ease infinite'
      } else {
        // Default romantic gradient
        baseStyle.background = 'linear-gradient(135deg, #3d2a4d 0%, #4d3a5d 20%, #5d4a6d 40%, #6d5a7d 50%, #5d4a6d 60%, #4d3a5d 80%, #3d2a4d 100%)'
        baseStyle.backgroundSize = '400% 400%'
        baseStyle.animation = 'gradientShift 25s ease infinite'
      }
    } else if (backgroundConfig) {
      if (backgroundConfig.type === 'animated-gradient') {
        baseStyle.background = backgroundConfig.gradient
        baseStyle.backgroundSize = '400% 400%'
        baseStyle.animation = 'gradientShift 20s ease infinite'
      } else if (backgroundConfig.type === 'image') {
        baseStyle.backgroundImage = `url(${backgroundConfig.url})`
        baseStyle.backgroundSize = 'cover'
        baseStyle.backgroundPosition = 'center'
        baseStyle.backgroundRepeat = 'no-repeat'
      }
    }

    return baseStyle
  }, [backgroundConfig, emojiBackground])

  // Calculate display index and current slide (must be before any returns)
  const displayIndex = isComplete && normalizedSlides.length > 0 
    ? normalizedSlides.length - 1 
    : currentIndex

  const currentSlide = normalizedSlides.length > 0 && displayIndex >= 0 && displayIndex < normalizedSlides.length 
    ? normalizedSlides[displayIndex] 
    : null
  
  // Get random animation for current slide (must be before any returns)
  const animationType = useMemo(() => getRandomAnimation(), [displayIndex])

  // Ensure we have valid slides to display
  const hasValidSlide = isPlaying && normalizedSlides.length > 0 && currentSlide && currentSlide.text

  // Show "Get ready..." or START button ONLY when we haven't started playing yet
  // If we have slides loaded, we should show them even when paused
  if (!isPlaying && !isComplete && normalizedSlides.length === 0) {
    return (
      <div style={containerStyle}>
        {backgroundConfig && <div style={styles.overlay} />}
        <Watermark />
        {showReady ? (
          <motion.div
            style={styles.readyText}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            Get ready...
          </motion.div>
        ) : (
          !autoStart && (
            <motion.button
              onClick={handleStart}
              style={styles.startButton}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              START ❤️
            </motion.button>
          )
        )}
      </div>
    )
  }

  // Show slide when we have valid slides and content (playing, paused, or complete)
  // This ensures content is visible even when paused
  const shouldShowSlide = normalizedSlides.length > 0 && 
    currentSlide && 
    currentSlide.text && 
    displayIndex >= 0 && 
    displayIndex < normalizedSlides.length

  return (
    <div style={containerStyle}>
      {emojiBackground && (
        <>
          <EmojiBackground 
            emojis={emojiBackground.emojis} 
            count={emojiBackground.count || 15}
            opacity={emojiBackground.opacity || 0.2}
          />
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.05) 50%, rgba(0,0,0,0.2) 100%)',
            zIndex: 1,
            pointerEvents: 'none'
          }} />
        </>
      )}
      {backgroundConfig && <div style={styles.overlay} />}
      <Watermark />
      {shouldShowSlide ? (
        <AnimatePresence mode="wait">
          <motion.div
            key={displayIndex}
            style={styles.slideContainer}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          >
            {currentSlide.emoji && (
              <AnimatedEmoji emoji={currentSlide.emoji} animationType={animationType} />
            )}
            <div style={styles.textContainer}>
              <motion.div
                style={styles.slideText}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                {currentSlide.text}
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      ) : isPlaying && normalizedSlides.length === 0 ? (
        <div style={styles.slideText}>Loading...</div>
      ) : null}
    </div>
  )
}

// Watermark component
const Watermark = () => {
  return (
    <div style={styles.watermark}>
      LoveReel
    </div>
  )
}

const styles = {
  container: {
    height: '100vh',
    width: '100vw',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: '24px',
    position: 'relative',
    overflow: 'hidden',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    zIndex: 1,
  },
  watermark: {
    position: 'absolute',
    bottom: '20px',
    right: '20px',
    fontSize: '14px',
    color: '#ffffff',
    opacity: 0.25,
    fontWeight: 300,
    letterSpacing: '2px',
    zIndex: 3,
    pointerEvents: 'none',
  },
  readyText: {
    fontSize: 'clamp(22px, 5.5vw, 30px)',
    color: '#ffffff',
    fontWeight: 500,
    letterSpacing: '0.8px',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    textShadow: '0 2px 10px rgba(0, 0, 0, 0.6)',
    position: 'relative',
    zIndex: 2,
  },
  startButton: {
    fontSize: 'clamp(18px, 4.5vw, 26px)',
    padding: '16px 36px',
    borderRadius: '50px',
    border: 'none',
    background: 'linear-gradient(135deg, rgba(255, 77, 109, 0.95) 0%, rgba(255, 117, 143, 0.95) 100%)',
    color: '#ffffff',
    cursor: 'pointer',
    fontWeight: 600,
    letterSpacing: '0.6px',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    boxShadow: '0 6px 20px rgba(255, 77, 109, 0.3)',
    textShadow: '0 1px 4px rgba(0, 0, 0, 0.3)',
    transition: 'all 0.3s ease',
    position: 'relative',
    zIndex: 2,
  },
  slideContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '32px',
    maxWidth: '90%',
    width: '100%',
    position: 'relative',
    zIndex: 2,
    padding: '40px 20px',
  },
  emojiContainer: {
    fontSize: 'clamp(64px, 15vw, 96px)',
    lineHeight: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    filter: 'drop-shadow(0 6px 12px rgba(0, 0, 0, 0.4))',
    width: '100%',
    height: 'auto',
    minHeight: '80px',
  },
  emoji: {
    display: 'block',
    userSelect: 'none',
    pointerEvents: 'none',
  },
  textContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    maxWidth: '85%',
  },
  slideText: {
    fontSize: 'clamp(24px, 6vw, 36px)',
    lineHeight: 1.6,
    fontWeight: 500,
    letterSpacing: '0.5px',
    color: '#ffffff',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    textShadow: '0 2px 12px rgba(0, 0, 0, 0.7), 0 1px 4px rgba(0, 0, 0, 0.5)',
    textAlign: 'center',
    width: '100%',
    padding: '0 20px',
    wordWrap: 'break-word',
    overflowWrap: 'break-word',
    hyphens: 'none',
    textRendering: 'optimizeLegibility',
    maxWidth: '90%',
  },
}

export default ReelPlayer
