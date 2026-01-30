import React from 'react'
import ReelPlayer from '../../../components/ReelPlayer.jsx'

const Hug = () => {
  const backgroundConfig = {
    type: 'image',
    url: 'https://images.unsplash.com/photo-1559769732-3a943df124b0?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
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
