import React from 'react'
import ReelPlayer from '../components/ReelPlayer.jsx'

const Hands = () => {
  const backgroundConfig = {
    type: 'image',
    url: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1080&q=80',
  }
  
  const slides = [
    "Holding hands in silence...",
    "No words needed 🤝",
    "Your hand in mine",
    "Says more than words ever could",
    "This is our language of love ❤️",
    "If this felt personal… you know why 😉"
  ]

  return <ReelPlayer slides={slides} backgroundConfig={backgroundConfig} />
}

export default Hands
