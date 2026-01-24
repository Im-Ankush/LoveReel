import React from 'react'
import LoveStoryPlayer from '../components/LoveStoryPlayer.jsx'

const UsFeeling = () => {
  const emojiBackground = {
    emojis: ['🤍', '💕', '💖', '✨', '🤍', '💕'],
    count: 18,
    opacity: 0.25,
    backgroundGradient: 'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 25%, #fbc2eb 50%, #a6c1ee 75%, #fbc2eb 100%)'
  }
  
  const steps = [
    {
      question: "Do you feel this is special?",
      emoji: "🤍",
      options: ["Yes 🤍", "Very special ❤️", "The most 💕"]
    },
    {
      question: "Do you feel safe in my arms?",
      emoji: "💕",
      options: ["Yes 🤍", "Always ❤️", "Completely 💞"]
    },
    {
      question: "Do you think we're meant to be?",
      emoji: "💖",
      options: ["Yes 🤍", "I believe so ❤️", "Absolutely 💕"]
    },
    {
      question: "Do you feel my love for you?",
      emoji: "✨",
      options: ["Yes 🤍", "I feel it ❤️", "Every day 💞"]
    },
    {
      question: "I already know your answer...\n\nIf this feels like us... send this to me 🤍",
      emoji: "🤍"
    }
  ]

  return <LoveStoryPlayer steps={steps} emojiBackground={emojiBackground} autoStart={true} />
}

export default UsFeeling
