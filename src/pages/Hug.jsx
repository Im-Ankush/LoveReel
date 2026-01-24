import React from 'react'
import ReelPlayer from '../components/ReelPlayer.jsx'

const Hug = () => {
  const backgroundConfig = {
    type: 'image',
    url: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=1080&q=80',
  }
  
  const slides = [
    { text: "After a long day...", emoji: null },
    { text: "Your hug makes everything okay", emoji: "🤗" },
    { text: "All the stress just disappears", emoji: null },
    { text: "When you hold me close", emoji: null },
    { text: "I feel like I'm home", emoji: "❤️" },
    { text: "If this felt personal… you know why", emoji: "😉" }
  ]

  return <ReelPlayer key="hug" slides={slides} backgroundConfig={backgroundConfig} />
}

export default Hug
