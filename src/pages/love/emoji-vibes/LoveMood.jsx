import React from 'react'
import ReelPlayer from '../../../components/ReelPlayer.jsx'

const LoveMood = () => {
  const emojiBackground = {
    emojis: ['💕', '💖', '💗', '💝', '💕', '💖'],
    count: 30,
    opacity: 0.3,
    backgroundGradient: 'linear-gradient(135deg, #ff6b9d 0%, #ffc1cc 25%, #ffb3d9 50%, #ff9ec7 75%, #ff6b9d 100%)'
  }
  
  const slides = [
    { text: "That love mood hits different", emoji: "💕" },
    { text: "When you're thinking about them", emoji: "💖" },
    { text: "And everything feels right", emoji: "💗" },
    { text: "This is the feeling", emoji: "💝" },
    { text: "I want to keep forever", emoji: "💕" },
    { text: "If this felt personal… you know why 😉", emoji: "💖" }
  ]

  return <ReelPlayer slides={slides} emojiBackground={emojiBackground} autoStart={true} />
}

export default LoveMood
