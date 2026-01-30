import React from 'react'
import ReelPlayer from '../../../components/ReelPlayer.jsx'

const Warmth = () => {
  const emojiBackground = {
    emojis: ['🔥', '💛', '🧡', '❤️', '🔥', '💛'],
    count: 30,
    opacity: 0.3,
    backgroundGradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 25%, #ff9a9e 50%, #fad0c4 75%, #ffecd2 100%)'
  }
  
  const slides = [
    { text: "That warm feeling", emoji: "🔥" },
    { text: "When they make you feel safe", emoji: "💛" },
    { text: "And loved", emoji: "🧡" },
    { text: "This is home", emoji: "❤️" },
    { text: "If this felt personal… you know why 😉", emoji: "🔥" }
  ]

  return <ReelPlayer slides={slides} emojiBackground={emojiBackground} autoStart={true} />
}

export default Warmth
