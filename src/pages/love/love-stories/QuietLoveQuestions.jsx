import React from 'react'
import ReelPlayer from '../../../components/ReelPlayer.jsx'

const QuietLoveQuestions = () => {
  const emojiBackground = {
    emojis: ['✨', '🤍', '💕', '❤️', '✨', '🤍'],
    count: 30,
    opacity: 0.3,
    backgroundGradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 25%, #ffecd2 50%, #fcb69f 75%, #ffecd2 100%)'
  }
  
  const slides = [
    { text: "Quiet love questions...", emoji: "✨" },
    { text: "For the one who knows my heart", emoji: "🤍" },
    { text: "Do you think we're meant to be?", emoji: "💕" },
    { text: "Do you see forever when you look at me?", emoji: "❤️" },
    { text: "I see it... when I look at you", emoji: "✨" },
    { text: "If you see it too... send this back 🤍", emoji: "🤍" }
  ]

  return <ReelPlayer slides={slides} emojiBackground={emojiBackground} autoStart={true} />
}

export default QuietLoveQuestions
