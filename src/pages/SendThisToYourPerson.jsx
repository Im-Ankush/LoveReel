import React from 'react'
import ReelPlayer from '../components/ReelPlayer.jsx'

const SendThisToYourPerson = () => {
  const emojiBackground = {
    emojis: ['💕', '🤍', '💖', '✨', '💕', '🤍'],
    count: 30,
    opacity: 0.3,
    backgroundGradient: 'linear-gradient(135deg, #ff6b9d 0%, #ffc1cc 25%, #ffb3d9 50%, #ff9ec7 75%, #ff6b9d 100%)'
  }
  
  const slides = [
    { text: "Send this to your person...", emoji: "💕" },
    { text: "The one who makes you feel whole", emoji: "🤍" },
    { text: "Do you know how much you mean to me?", emoji: "💖" },
    { text: "Would you stay even when it's hard?", emoji: "✨" },
    { text: "I would... for you", emoji: "💕" },
    { text: "If this is us... send it back to me 🤍", emoji: "🤍" }
  ]

  return <ReelPlayer slides={slides} emojiBackground={emojiBackground} autoStart={true} />
}

export default SendThisToYourPerson
