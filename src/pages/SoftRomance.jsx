import React from 'react'
import ReelPlayer from '../components/ReelPlayer.jsx'

const SoftRomance = () => {
  const emojiBackground = {
    emojis: ['❤️', '💫', '🥰', '💕', '💖', '❤️'],
    count: 30,
    opacity: 0.3,
    backgroundGradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 25%, #ffecd2 50%, #fcb69f 75%, #ffecd2 100%)'
  }
  
  const slides = [
    { text: "Soft romantic moments", emoji: "❤️" },
    { text: "When love feels gentle", emoji: "💫" },
    { text: "And everything is peaceful", emoji: "🥰" },
    { text: "This is what real love looks like", emoji: "💕" },
    { text: "If this felt personal… you know why 😉", emoji: "💖" }
  ]

  return <ReelPlayer slides={slides} emojiBackground={emojiBackground} autoStart={true} />
}

export default SoftRomance
