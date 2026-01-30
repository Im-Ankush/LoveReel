import React from 'react'
import LoveStoryPlayer from '../../../components/LoveStoryPlayer.jsx'

const LoveCheck = () => {
  const emojiBackground = {
    emojis: ['💖', '🤍', '💕', '✨', '💖', '🤍'],
    count: 18,
    opacity: 0.25,
    backgroundGradient: 'linear-gradient(135deg, #ff6b9d 0%, #ffc1cc 25%, #ffb3d9 50%, #ff9ec7 75%, #ff6b9d 100%)'
  }
  
  const steps = [
    {
      question: "Do you think about us when I'm not there?",
      emoji: "💖",
      options: ["All the time 🤍", "Yes ❤️", "Constantly 💕"]
    },
    {
      question: "Do you believe in us?",
      emoji: "🤍",
      options: ["Yes 🤍", "I do ❤️", "Completely 💞"]
    },
    {
      question: "Would you choose me again?",
      emoji: "💕",
      options: ["Yes 🤍", "Every time ❤️", "Always 💖"]
    },
    {
      question: "Do you feel this connection too?",
      emoji: "✨",
      options: ["Yes 🤍", "I feel it ❤️", "Deeply 💞"]
    },
    {
      question: "I already know your answer...\n\nIf this feels like us... send this to me 🤍",
      emoji: "🤍"
    }
  ]

  return <LoveStoryPlayer steps={steps} emojiBackground={emojiBackground} autoStart={true} />
}

export default LoveCheck
