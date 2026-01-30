import React from 'react'
import ReelPlayer from '../../../components/ReelPlayer.jsx'

const AnswerMeHonestly = () => {
  const emojiBackground = {
    emojis: ['💞', '🥺', '❤️', '✨', '💞', '🥺'],
    count: 30,
    opacity: 0.3,
    backgroundGradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #a8a8d8 50%, #9b9bd8 75%, #667eea 100%)'
  }
  
  const slides = [
    { text: "Answer me honestly...", emoji: "💞" },
    { text: "Just between you and me", emoji: "🥺" },
    { text: "Do I make you feel at home?", emoji: "❤️" },
    { text: "Do you think about us when I'm not there?", emoji: "✨" },
    { text: "Because I do... all the time", emoji: "💞" },
    { text: "Send this if you feel the same 🤍", emoji: "🥺" }
  ]

  return <ReelPlayer slides={slides} emojiBackground={emojiBackground} autoStart={true} />
}

export default AnswerMeHonestly
