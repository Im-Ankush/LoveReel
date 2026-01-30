import React from 'react'
import ReelPlayer from '../../../components/ReelPlayer.jsx'

const LateNightLove = () => {
  const emojiBackground = {
    emojis: ['🌙', '✨', '🥱', '💫', '🌙', '✨'],
    count: 30,
    opacity: 0.28,
    backgroundGradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 25%, #667eea 50%, #764ba2 75%, #4facfe 100%)'
  }
  
  const slides = [
    { text: "Late night 'are you still awake?' texts", emoji: "🌙" },
    { text: "When you can't sleep", emoji: "✨" },
    { text: "And you just want to talk to them", emoji: "🥱" },
    { text: "Those midnight conversations", emoji: "💫" },
    { text: "Are the best part of my day", emoji: "🌙" },
    { text: "If this felt personal… you know why 😉", emoji: "✨" }
  ]

  return <ReelPlayer slides={slides} emojiBackground={emojiBackground} autoStart={true} />
}

export default LateNightLove
