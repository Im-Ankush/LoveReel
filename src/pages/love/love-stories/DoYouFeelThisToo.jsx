import React from 'react'
import ReelPlayer from '../../../components/ReelPlayer.jsx'

const DoYouFeelThisToo = () => {
  const emojiBackground = {
    emojis: ['💖', '🥺', '💞', '✨', '💖', '🥺'],
    count: 30,
    opacity: 0.3,
    backgroundGradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 25%, #667eea 50%, #764ba2 75%, #4facfe 100%)'
  }
  
  const slides = [
    { text: "Do you feel this too?", emoji: "💖" },
    { text: "This quiet love between us", emoji: "🥺" },
    { text: "Do you miss me when I'm gone?", emoji: "💞" },
    { text: "Do you feel safe in my arms?", emoji: "✨" },
    { text: "Because I feel safe in yours", emoji: "💖" },
    { text: "Send this if you feel the same way 🤍", emoji: "🥺" }
  ]

  return <ReelPlayer slides={slides} emojiBackground={emojiBackground} autoStart={true} />
}

export default DoYouFeelThisToo
