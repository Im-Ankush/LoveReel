import React from 'react'
import ReelPlayer from '../components/ReelPlayer.jsx'

const HugVibes = () => {
  const emojiBackground = {
    emojis: ['🤗', '🫂', '❤️', '💕', '🤗', '🫂'],
    count: 35,
    opacity: 0.35,
    backgroundGradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 25%, #fecfef 50%, #fad0c4 75%, #ffd1ff 100%)'
  }
  
  const slides = [
    { text: "After a long day...", emoji: "🤗" },
    { text: "Their hug feels like home", emoji: "❤️" },
    { text: "All the stress just melts away", emoji: "💕" },
    { text: "In their arms, I'm safe", emoji: "🫂" },
    { text: "This is where I belong", emoji: "🤗" },
    { text: "If this felt personal… you know why 😉", emoji: "❤️" }
  ]

  return <ReelPlayer slides={slides} emojiBackground={emojiBackground} autoStart={true} />
}

export default HugVibes
