import React from 'react'
import ReelPlayer from '../../../components/ReelPlayer.jsx'

const TogetherFeel = () => {
  const emojiBackground = {
    emojis: ['🤝', '💞', '🤗', '💕', '🤝', '💞'],
    count: 30,
    opacity: 0.3,
    backgroundGradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 25%, #a8edea 50%, #fed6e3 75%, #a8edea 100%)'
  }
  
  const slides = [
    { text: "Holding hands in silence", emoji: "🤝" },
    { text: "No words needed", emoji: "💞" },
    { text: "Just being together", emoji: "🤗" },
    { text: "Is enough", emoji: "💕" },
    { text: "If this felt personal… you know why 😉", emoji: "🤝" }
  ]

  return <ReelPlayer slides={slides} emojiBackground={emojiBackground} autoStart={true} />
}

export default TogetherFeel
