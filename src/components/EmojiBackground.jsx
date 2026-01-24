import React, { useMemo } from 'react'
import { motion } from 'framer-motion'

const EmojiBackground = ({ emojis = [], count = 15, opacity = 0.2 }) => {
  // Generate random positions and animations for emojis
  const emojiElements = useMemo(() => {
    // Increase count for better coverage
    const emojiCount = Math.max(count, 30)
    
    return Array.from({ length: emojiCount }, (_, i) => {
      const emoji = emojis[Math.floor(Math.random() * emojis.length)] || '❤️'
      // Larger size range for better visibility
      const size = 100 + Math.random() * 150 // 100-250px
      
      // Better distribution - ensure coverage across entire screen
      // Use grid-like distribution with some randomness
      const gridCols = Math.ceil(Math.sqrt(emojiCount))
      const gridRow = Math.floor(i / gridCols)
      const gridCol = i % gridCols
      const baseX = (gridCol / gridCols) * 100
      const baseY = (gridRow / gridCols) * 100
      const x = Math.max(5, Math.min(95, baseX + (Math.random() - 0.5) * (100 / gridCols))) // Add randomness within grid cell, clamp to screen
      const y = Math.max(5, Math.min(95, baseY + (Math.random() - 0.5) * (100 / gridCols)))
      
      const duration = 6 + Math.random() * 10 // 6-16 seconds
      const delay = Math.random() * 3 // 0-3 seconds
      
      // Random animation type with 3D effects
      const animationType = Math.floor(Math.random() * 5)
      
      const transitionConfig = {
        duration: duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay
      }
      
      let animation = {}
      if (animationType === 0) {
        // Float and rotate
        animation = {
          y: [0, -40, 20, 0],
          x: [0, 30, -20, 0],
          rotate: [0, 360],
          scale: [1, 1.3, 0.8, 1],
          transition: transitionConfig
        }
      } else if (animationType === 1) {
        // Drift with rotation
        animation = {
          x: [0, 50, -30, 0],
          y: [0, -40, 30, 0],
          rotate: [0, 360],
          scale: [1, 1.2, 0.9, 1],
          transition: transitionConfig
        }
      } else if (animationType === 2) {
        // Pulse with rotation
        animation = {
          scale: [1, 1.4, 0.7, 1],
          rotate: [0, 360],
          y: [0, -30, 0],
          transition: transitionConfig
        }
      } else if (animationType === 3) {
        // Floating spiral
        animation = {
          x: [0, 40, -40, 0],
          y: [0, -50, 20, 0],
          rotate: [0, 360],
          scale: [0.8, 1.3, 1, 0.8],
          transition: transitionConfig
        }
      } else {
        // Smooth wave motion
        animation = {
          y: [0, -35, 15, 0],
          x: [0, 25, -15, 0],
          rotate: [0, 360],
          scale: [1, 1.25, 0.9, 1],
          transition: transitionConfig
        }
      }
      
      return {
        emoji,
        size,
        x,
        y,
        animation,
        key: `emoji-${i}-${Date.now()}-${Math.random()}`
      }
    })
  }, [emojis, count])

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
        perspective: '1000px', // Enable 3D perspective
      }}
    >
      {emojiElements.map(({ emoji, size, x, y, animation, key }) => {
        const fadeDelay = Math.random() * 0.5
        return (
          <motion.div
            key={key}
            style={{
              position: 'absolute',
              left: `${x}%`,
              top: `${y}%`,
              fontSize: `${size}px`,
              transform: 'translate(-50%, -50%)',
              transformStyle: 'preserve-3d',
              userSelect: 'none',
              pointerEvents: 'none',
              willChange: 'transform, opacity',
              backfaceVisibility: 'hidden',
            }}
            animate={{
              ...animation,
              opacity: opacity
            }}
            initial={{ opacity: 0 }}
            transition={{ 
              opacity: { duration: 1, delay: fadeDelay },
              ...animation.transition
            }}
          >
            {emoji}
          </motion.div>
        )
      })}
    </div>
  )
}

export default EmojiBackground
