import React from 'react'
import ReelPlayer from '../components/ReelPlayer.jsx'

const RealLoveCheck = () => {
  const emojiBackground = {
    emojis: ['❤️', '💞', '🤍', '✨', '❤️', '💞'],
    count: 30,
    opacity: 0.3,
    backgroundGradient: 'linear-gradient(135deg, #ff9a9e 0%, #fad0c4 25%, #ff9a9e 50%, #fad0c4 75%, #ff9a9e 100%)'
  }
  
  const slides = [
    { text: "Real love check...", emoji: "❤️" },
    { text: "For the one who matters most", emoji: "💞" },
    { text: "Would you choose me again?", emoji: "🤍" },
    { text: "Do you believe in us?", emoji: "✨" },
    { text: "I believe in us... completely", emoji: "❤️" },
    { text: "If you do too... send this to me 🤍", emoji: "💞" }
  ]

  return <ReelPlayer slides={slides} emojiBackground={emojiBackground} autoStart={true} />
}

export default RealLoveCheck
