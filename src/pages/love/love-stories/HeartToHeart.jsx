import React from 'react'
import ReelPlayer from '../../../components/ReelPlayer.jsx'

const HeartToHeart = () => {
  const emojiBackground = {
    emojis: ['💖', '🤍', '💞', '✨', '💖', '🤍'],
    count: 30,
    opacity: 0.3,
    backgroundGradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 25%, #a8edea 50%, #fed6e3 75%, #a8edea 100%)'
  }
  
  const slides = [
    { text: "Heart to heart...", emoji: "💖" },
    { text: "With the one I love", emoji: "🤍" },
    { text: "Do you feel my love for you?", emoji: "💞" },
    { text: "Do you trust what we have?", emoji: "✨" },
    { text: "I trust us... with everything", emoji: "💖" },
    { text: "If you trust us too... send this 🤍", emoji: "🤍" }
  ]

  return <ReelPlayer slides={slides} emojiBackground={emojiBackground} autoStart={true} />
}

export default HeartToHeart
