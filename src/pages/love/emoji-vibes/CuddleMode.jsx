import React from 'react'
import ReelPlayer from '../../../components/ReelPlayer.jsx'

const CuddleMode = () => {
  const emojiBackground = {
    emojis: ['🫶', '💞', '🛌', '💤', '🫶', '💞'],
    count: 30,
    opacity: 0.3,
    backgroundGradient: 'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 25%, #fbc2eb 50%, #a6c1ee 75%, #fbc2eb 100%)'
  }
  
  const slides = [
    { text: "Cuddling while talking softly", emoji: "🫶" },
    { text: "Your voice is my favorite sound", emoji: "💞" },
    { text: "Time stops when we're together", emoji: "🛌" },
    { text: "This is pure happiness", emoji: "💤" },
    { text: "If this felt personal… you know why 😉", emoji: "🫶" }
  ]

  return <ReelPlayer slides={slides} emojiBackground={emojiBackground} autoStart={true} />
}

export default CuddleMode
