import React, { useMemo } from 'react'
import { motion } from 'framer-motion'

/**
 * Animated floating emojis for Valentine reels.
 * Slow drift, gentle scale breath, soft rotation — no bounce/shake.
 */
const COUNT_MIN = 12
const COUNT_MAX = 20
const OPACITY_MIN = 0.15
const OPACITY_MAX = 0.3
const SIZE_MIN = 48
const SIZE_MAX = 88
const FLOAT_DURATION_MIN = 10
const FLOAT_DURATION_MAX = 18
const FLOAT_DISTANCE = 28
const ROTATE_DEG = 8
const SCALE_BREATH = [0.97, 1.03]

export default function ValentineFloatingEmojis({ emojis }) {
  const list = useMemo(() => {
    if (!emojis?.length) return []
    const count = COUNT_MIN + Math.floor(Math.random() * (COUNT_MAX - COUNT_MIN + 1))
    return Array.from({ length: count }, (_, i) => {
      const emoji = emojis[Math.floor(Math.random() * emojis.length)]
      const floatDur = FLOAT_DURATION_MIN + Math.random() * (FLOAT_DURATION_MAX - FLOAT_DURATION_MIN)
      const dx = (Math.random() - 0.5) * 2 * FLOAT_DISTANCE
      const dy = (Math.random() - 0.5) * 2 * FLOAT_DISTANCE
      return {
        key: `v-${i}-${emoji}-${Math.random().toString(36).slice(2)}`,
        emoji,
        left: 5 + Math.random() * 90,
        top: 5 + Math.random() * 90,
        size: SIZE_MIN + Math.random() * (SIZE_MAX - SIZE_MIN),
        opacity: OPACITY_MIN + Math.random() * (OPACITY_MAX - OPACITY_MIN),
        floatDur,
        delay: Math.random() * 3,
        // Drift path: start → right/down → left/up → back (smooth loop)
        x: [0, dx, dx * 0.3, -dx * 0.4, 0],
        y: [0, dy * 0.6, dy, dy * 0.2, 0],
        rotate: Math.random() > 0.5 ? [0, ROTATE_DEG, -ROTATE_DEG * 0.5, 0] : [0, -ROTATE_DEG, ROTATE_DEG * 0.5, 0],
        scaleDur: 4 + Math.random() * 3,
        scaleDelay: Math.random() * 2,
      }
    })
  }, [emojis])

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      {list.map((item) => (
        <motion.div
          key={item.key}
          style={{
            position: 'absolute',
            left: `${item.left}%`,
            top: `${item.top}%`,
            fontSize: item.size,
            transform: 'translate(-50%, -50%)',
            opacity: item.opacity,
            willChange: 'transform',
          }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{
            opacity: item.opacity,
            x: item.x,
            y: item.y,
            rotate: item.rotate,
            scale: SCALE_BREATH,
          }}
          transition={{
            opacity: { duration: 1.2, delay: item.delay * 0.3, ease: 'easeOut' },
            x: { duration: item.floatDur, repeat: Infinity, ease: 'easeInOut', delay: item.delay },
            y: { duration: item.floatDur, repeat: Infinity, ease: 'easeInOut', delay: item.delay },
            rotate: { duration: item.floatDur * 0.7, repeat: Infinity, ease: 'easeInOut', delay: item.delay * 0.5 },
            scale: { duration: item.scaleDur, repeat: Infinity, ease: 'easeInOut', delay: item.scaleDelay },
          }}
        >
          {item.emoji}
        </motion.div>
      ))}
    </div>
  )
}
