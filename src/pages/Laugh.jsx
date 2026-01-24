import React from 'react'
import ReelPlayer from '../components/ReelPlayer.jsx'

const Laugh = () => {
  const backgroundConfig = {
    type: 'image',
    url: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=1080&q=80',
  }
  
  const slides = [
    "Laughing together over small things",
    "Your laugh is my favorite sound 😂❤️",
    "Even the smallest jokes",
    "Become funnier with you",
    "This is pure happiness",
    "If this felt personal… you know why 😉"
  ]

  return <ReelPlayer slides={slides} backgroundConfig={backgroundConfig} />
}

export default Laugh
