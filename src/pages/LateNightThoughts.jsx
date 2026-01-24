import React from 'react'
import ReelPlayer from '../components/ReelPlayer.jsx'

const LateNightThoughts = () => {
  const emojiBackground = {
    emojis: ['🌙', '✨', '💫', '🤍', '🌙', '✨'],
    count: 30,
    opacity: 0.28,
    backgroundGradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 25%, #667eea 50%, #764ba2 75%, #4facfe 100%)'
  }
  
  const slides = [
    { text: "Late night thoughts...", emoji: "🌙" },
    { text: "About you and me", emoji: "✨" },
    { text: "Do you think about us at night?", emoji: "💫" },
    { text: "Do you feel this love is real?", emoji: "🤍" },
    { text: "I do... every single night", emoji: "🌙" },
    { text: "Send this if you think about us too ✨", emoji: "✨" }
  ]

  return <ReelPlayer slides={slides} emojiBackground={emojiBackground} autoStart={true} />
}

export default LateNightThoughts
