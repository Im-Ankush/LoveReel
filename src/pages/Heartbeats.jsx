import React from 'react'
import ReelPlayer from '../components/ReelPlayer.jsx'

const Heartbeats = () => {
  const emojiBackground = {
    emojis: ['💓', '💗', '💖', '💝', '💓', '💗'],
    count: 30,
    opacity: 0.3,
    backgroundGradient: 'linear-gradient(135deg, #ff9a9e 0%, #fad0c4 25%, #ff9a9e 50%, #fad0c4 75%, #ff9a9e 100%)'
  }
  
  const slides = [
    { text: "When your heart skips a beat", emoji: "💓" },
    { text: "Just from seeing their name", emoji: "💗" },
    { text: "That's when you know", emoji: "💖" },
    { text: "You're in deep", emoji: "💝" },
    { text: "If this felt personal… you know why 😉", emoji: "💓" }
  ]

  return <ReelPlayer slides={slides} emojiBackground={emojiBackground} autoStart={true} />
}

export default Heartbeats
