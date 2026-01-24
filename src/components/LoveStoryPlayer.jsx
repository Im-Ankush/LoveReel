import React, { useState, useEffect, useMemo, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import EmojiBackground from './EmojiBackground'

const LoveStoryPlayer = ({ steps = [], emojiBackground, autoStart = true }) => {
  const location = useLocation()
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null)
  const autoStartTriggered = useRef(false)
  const stepTimerRef = useRef(null)

  // Reset on route change
  useEffect(() => {
    autoStartTriggered.current = false
    setCurrentStepIndex(0)
    setIsPlaying(false)
    setIsComplete(false)
    setSelectedOptionIndex(null)
    if (stepTimerRef.current) {
      clearTimeout(stepTimerRef.current)
      stepTimerRef.current = null
    }
  }, [location.pathname])

  // Auto-start
  useEffect(() => {
    if (autoStart && !autoStartTriggered.current && steps.length > 0) {
      autoStartTriggered.current = true
      const timer = setTimeout(() => {
        setIsPlaying(true)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [autoStart, steps])

  // Auto-select and advance through steps
  useEffect(() => {
    if (!isPlaying || steps.length === 0) return

    const currentStep = steps[currentStepIndex]
    if (!currentStep) return

    // Clear any existing timer
    if (stepTimerRef.current) {
      clearTimeout(stepTimerRef.current)
    }

    // If it's the final step and has no options, auto-advance after delay
    if (currentStepIndex === steps.length - 1 && (!currentStep.options || currentStep.options.length === 0)) {
      stepTimerRef.current = setTimeout(() => {
        setIsComplete(true)
        setIsPlaying(false)
      }, 3000)
      return () => {
        if (stepTimerRef.current) clearTimeout(stepTimerRef.current)
      }
    }

    // If step has options, auto-select random option after showing question
    if (currentStep.options && currentStep.options.length > 0) {
      // Show question for 2.5 seconds, then highlight random option
      stepTimerRef.current = setTimeout(() => {
        // Randomly select one of the available options
        const randomIndex = Math.floor(Math.random() * currentStep.options.length)
        setSelectedOptionIndex(randomIndex)
        
        // After highlighting for 1 second, advance to next step
        stepTimerRef.current = setTimeout(() => {
          setSelectedOptionIndex(null)
          if (currentStepIndex < steps.length - 1) {
            setCurrentStepIndex(prev => prev + 1)
          } else {
            setIsComplete(true)
            setIsPlaying(false)
          }
        }, 1000)
      }, 2500)
    }

    return () => {
      if (stepTimerRef.current) {
        clearTimeout(stepTimerRef.current)
        stepTimerRef.current = null
      }
    }
  }, [isPlaying, currentStepIndex, steps])

  // Build container style (must be called before any conditional returns)
  const containerStyle = useMemo(() => {
    const baseStyle = {
      height: '100vh',
      width: '100vw',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '24px',
      position: 'relative',
      overflow: 'hidden',
    }

    if (emojiBackground?.backgroundGradient) {
      baseStyle.background = emojiBackground.backgroundGradient
      baseStyle.backgroundSize = '400% 400%'
      baseStyle.animation = 'gradientShift 25s ease infinite'
    }

    return baseStyle
  }, [emojiBackground])

  // Show loading state if not started yet
  if (!isPlaying && !isComplete && steps.length > 0) {
    return (
      <div style={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: emojiBackground?.backgroundGradient || 'linear-gradient(135deg, #1a1120 0%, #2d1a3d 50%, #1a1120 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}>
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
      </div>
    )
  }

  if (steps.length === 0) {
    return null
  }

  const currentStep = steps[currentStepIndex]
  if (!currentStep) return null

  const isFinalStep = currentStepIndex === steps.length - 1
  const hasOptions = currentStep.options && currentStep.options.length > 0

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

      {/* Watermark */}
      <div style={{
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
      }}>
        LoveReel
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStepIndex}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '40px',
            maxWidth: '90%',
            width: '100%',
            position: 'relative',
            zIndex: 2,
            padding: '40px 20px',
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Question emoji */}
          {currentStep.emoji && (
            <motion.div
              style={{
                fontSize: 'clamp(48px, 12vw, 72px)',
                lineHeight: 1,
                filter: 'drop-shadow(0 4px 10px rgba(0, 0, 0, 0.4))',
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                y: [0, -10, 0]
              }}
              transition={{ 
                opacity: { duration: 0.5 },
                scale: { duration: 0.5 },
                y: { duration: 3, repeat: Infinity, ease: "easeInOut" }
              }}
            >
              {currentStep.emoji}
            </motion.div>
          )}

          {/* Question text */}
          <motion.div
            style={{
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
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {currentStep.question}
          </motion.div>

          {/* Options buttons */}
          {hasOptions && (
            <motion.div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                width: '100%',
                maxWidth: '400px',
                alignItems: 'center',
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              {currentStep.options.map((option, idx) => {
                const isSelected = selectedOptionIndex === idx
                return (
                  <motion.button
                    key={idx}
                    style={{
                      fontSize: 'clamp(18px, 4.5vw, 24px)',
                      padding: '16px 32px',
                      borderRadius: '50px',
                      border: isSelected 
                        ? '2px solid rgba(255, 77, 109, 0.9)' 
                        : '2px solid rgba(255, 77, 109, 0.5)',
                      background: isSelected
                        ? 'linear-gradient(135deg, rgba(255, 77, 109, 0.6) 0%, rgba(255, 117, 143, 0.6) 100%)'
                        : 'linear-gradient(135deg, rgba(255, 77, 109, 0.3) 0%, rgba(255, 117, 143, 0.3) 100%)',
                      color: '#ffffff',
                      cursor: 'default',
                      fontWeight: 500,
                      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                      letterSpacing: '0.5px',
                      width: '100%',
                      textShadow: '0 1px 4px rgba(0, 0, 0, 0.3)',
                      transition: 'all 0.4s ease',
                      boxShadow: isSelected 
                        ? '0 0 20px rgba(255, 77, 109, 0.5), 0 4px 12px rgba(0, 0, 0, 0.3)'
                        : '0 2px 8px rgba(0, 0, 0, 0.2)',
                      transform: isSelected ? 'scale(1.05)' : 'scale(1)',
                    }}
                    animate={{
                      scale: isSelected ? 1.05 : 1,
                      boxShadow: isSelected 
                        ? '0 0 25px rgba(255, 77, 109, 0.6), 0 4px 12px rgba(0, 0, 0, 0.3)'
                        : '0 2px 8px rgba(0, 0, 0, 0.2)',
                    }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                  >
                    {option}
                    {isSelected && (
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        style={{ marginLeft: '8px' }}
                      >
                        ✓
                      </motion.span>
                    )}
                  </motion.button>
                )
              })}
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default LoveStoryPlayer
