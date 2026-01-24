import React from 'react'
import LoveStoryPlayer from '../components/LoveStoryPlayer.jsx'

const AnswerHonestly = () => {
  const emojiBackground = {
    emojis: ['💞', '🥺', '❤️', '✨', '💞', '🥺'],
    count: 18,
    opacity: 0.25,
    backgroundGradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #a8a8d8 50%, #9b9bd8 75%, #667eea 100%)'
  }
  
  const steps = [
    {
      question: "Do I make you feel at home?",
      emoji: "💞",
      options: ["Yes 🤍", "You do ❤️", "Completely 💕"]
    },
    {
      question: "Do you miss me when I'm gone?",
      emoji: "🥺",
      options: ["Always 🤍", "Yes ❤️", "Every moment 💞"]
    },
    {
      question: "Do you want this to last forever?",
      emoji: "❤️",
      options: ["Yes 🤍", "I do ❤️", "More than anything 💖"]
    },
    {
      question: "Do you trust what we have?",
      emoji: "✨",
      options: ["Yes 🤍", "I trust us ❤️", "Completely 💞"]
    },
    {
      question: "I already know your answer...\n\nIf this feels like us... send this to me 🤍",
      emoji: "🤍"
    }
  ]

  return <LoveStoryPlayer steps={steps} emojiBackground={emojiBackground} autoStart={true} />
}

export default AnswerHonestly
