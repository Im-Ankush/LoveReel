import React from 'react'
import LoveStoryPlayer from '../components/LoveStoryPlayer.jsx'

const SendThisToMe = () => {
  const emojiBackground = {
    emojis: ['💖', '🤍', '💞', '✨', '💖', '🤍'],
    count: 18,
    opacity: 0.25,
    backgroundGradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 25%, #667eea 50%, #764ba2 75%, #4facfe 100%)'
  }
  
  const steps = [
    {
      question: "Do you think about us at night?",
      emoji: "💖",
      options: ["Every night 🤍", "Yes ❤️", "Always 💕"]
    },
    {
      question: "Do you feel this love is real?",
      emoji: "🤍",
      options: ["Yes 🤍", "I feel it ❤️", "The realest 💞"]
    },
    {
      question: "Would you hold me when I'm scared?",
      emoji: "💞",
      options: ["Always 🤍", "Yes ❤️", "Every time 💕"]
    },
    {
      question: "Do you want forever with me?",
      emoji: "✨",
      options: ["Yes 🤍", "I do ❤️", "More than anything 💖"]
    },
    {
      question: "I already know your answer...\n\nIf this feels like us... send this to me 🤍",
      emoji: "🤍"
    }
  ]

  return <LoveStoryPlayer steps={steps} emojiBackground={emojiBackground} autoStart={true} />
}

export default SendThisToMe
