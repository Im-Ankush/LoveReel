import React from 'react'
import LoveStoryPlayer from '../components/LoveStoryPlayer.jsx'

const IfYouLoveMe = () => {
  const emojiBackground = {
    emojis: ['❤️', '🤍', '🥺', '💞', '✨', '❤️'],
    count: 18,
    opacity: 0.25,
    backgroundGradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 25%, #fad0c4 50%, #ffd1ff 75%, #ff9a9e 100%)'
  }
  
  const steps = [
    {
      question: "Do you feel safe when you're with me?",
      emoji: "🥺",
      options: ["Yes 🤍", "Always ❤️", "More than anything 💞"]
    },
    {
      question: "Would you still choose me on my worst days?",
      emoji: "💞",
      options: ["Yes 🤍", "Of course ❤️", "Every time 💕"]
    },
    {
      question: "Do you see forever when you look at me?",
      emoji: "✨",
      options: ["Yes 🤍", "I do ❤️", "Always 💖"]
    },
    {
      question: "Would you stay even when it's hard?",
      emoji: "❤️",
      options: ["Yes 🤍", "Always ❤️", "Without doubt 💞"]
    },
    {
      question: "I already know your answer...\n\nIf this feels like us... send this to me 🤍",
      emoji: "🤍"
    }
  ]

  return <LoveStoryPlayer steps={steps} emojiBackground={emojiBackground} autoStart={true} />
}

export default IfYouLoveMe
