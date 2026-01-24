import React from 'react'
import ReelPlayer from '../components/ReelPlayer.jsx'

const Goodbye = () => {
  const backgroundConfig = {
    type: 'image',
    url: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1080&q=80',
  }
  
  const slides = [
    "Saying goodbye but not wanting to leave...",
    "Every goodbye feels too soon 😢",
    "I wish time would stop",
    "Just a few more minutes with you",
    "Until we meet again ❤️",
    "If this felt personal… you know why 😉"
  ]

  return <ReelPlayer slides={slides} backgroundConfig={backgroundConfig} />
}

export default Goodbye
