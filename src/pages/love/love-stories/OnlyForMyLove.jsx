import React from 'react'
import ReelPlayer from '../../../components/ReelPlayer.jsx'

const OnlyForMyLove = () => {
  const emojiBackground = {
    emojis: ['🤍', '❤️', '💕', '✨', '🤍', '❤️'],
    count: 30,
    opacity: 0.3,
    backgroundGradient: 'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 25%, #fbc2eb 50%, #a6c1ee 75%, #fbc2eb 100%)'
  }
  
  const slides = [
    { text: "Only for my love...", emoji: "🤍" },
    { text: "The one who sees my soul", emoji: "❤️" },
    { text: "Do you feel this connection too?", emoji: "💕" },
    { text: "Would you hold me when I'm scared?", emoji: "✨" },
    { text: "I would hold you... always", emoji: "🤍" },
    { text: "If this is you... let me know ❤️", emoji: "❤️" }
  ]

  return <ReelPlayer slides={slides} emojiBackground={emojiBackground} autoStart={true} />
}

export default OnlyForMyLove
