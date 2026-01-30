import React from 'react'
import ReelPlayer from '../../../components/ReelPlayer.jsx'

const Understanding = () => {
  const backgroundConfig = {
    type: 'image',
    url: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1080&q=80',
  }
  
  const slides = [
    "Silent understanding between lovers...",
    "We don't need words ✨",
    "A look, a touch",
    "And we know what the other feels",
    "This connection is everything ❤️",
    "If this felt personal… you know why 😉"
  ]

  return <ReelPlayer slides={slides} backgroundConfig={backgroundConfig} />
}

export default Understanding
