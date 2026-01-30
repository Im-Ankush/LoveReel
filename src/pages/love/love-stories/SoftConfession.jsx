import React from 'react'
import ReelPlayer from '../../../components/ReelPlayer.jsx'

const SoftConfession = () => {
  const emojiBackground = {
    emojis: ['🤍', '💕', '🥺', '✨', '🤍', '💕'],
    count: 30,
    opacity: 0.3,
    backgroundGradient: 'linear-gradient(135deg, #ff6b9d 0%, #ffc1cc 25%, #ffb3d9 50%, #ff9ec7 75%, #ff6b9d 100%)'
  }
  
  const slides = [
    { text: "Soft confession...", emoji: "🤍" },
    { text: "Just between you and me", emoji: "💕" },
    { text: "Do you feel this is special?", emoji: "🥺" },
    { text: "Do you want this to last forever?", emoji: "✨" },
    { text: "I do... I want forever with you", emoji: "🤍" },
    { text: "Send this if you want forever too ❤️", emoji: "💕" }
  ]

  return <ReelPlayer slides={slides} emojiBackground={emojiBackground} autoStart={true} />
}

export default SoftConfession
