import React from 'react'
import ReelPlayer from '../components/ReelPlayer.jsx'

const MissYouVibes = () => {
  const emojiBackground = {
    emojis: ['🥺', '💔', '🌙', '✨', '💫', '🌙'],
    count: 30,
    opacity: 0.28,
    backgroundGradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #a8a8d8 50%, #9b9bd8 75%, #8b7fb8 100%)'
  }
  
  const slides = [
    { text: "Missing someone at 2 AM", emoji: "🌙" },
    { text: "When the world is quiet", emoji: "🥺" },
    { text: "And all you want is them", emoji: "💔" },
    { text: "Distance makes the heart grow fonder", emoji: "✨" },
    { text: "But I still miss you every day", emoji: "💫" },
    { text: "If this felt personal… you know why 😉", emoji: "🌙" }
  ]

  return <ReelPlayer slides={slides} emojiBackground={emojiBackground} autoStart={true} />
}

export default MissYouVibes
