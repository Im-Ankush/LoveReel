import React from 'react'
import ReelPlayer from '../components/ReelPlayer.jsx'

const Surprise = () => {
  const backgroundConfig = {
    type: 'image',
    url: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=1080&q=80',
  }
  
  const slides = [
    "Surprise meet-up...",
    "I wasn't expecting to see you 😍",
    "But here you are",
    "Making my day perfect",
    "You always know how to surprise me ❤️",
    "If this felt personal… you know why 😉"
  ]

  return <ReelPlayer slides={slides} backgroundConfig={backgroundConfig} />
}

export default Surprise
