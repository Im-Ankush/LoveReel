import React from 'react'
import ReelPlayer from '../components/ReelPlayer.jsx'

const Kiss = () => {
  const backgroundConfig = {
    type: 'image',
    url: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1080&q=80',
  }
  
  const slides = [
    "Before we sleep...",
    "Your forehead kiss says everything 😘",
    "It's your way of saying",
    "'I love you' without words",
    "And it's the best part of my day ❤️",
    "If this felt personal… you know why 😉"
  ]

  return <ReelPlayer slides={slides} backgroundConfig={backgroundConfig} />
}

export default Kiss
