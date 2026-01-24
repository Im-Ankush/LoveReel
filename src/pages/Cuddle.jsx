import React from 'react'
import ReelPlayer from '../components/ReelPlayer.jsx'

const Cuddle = () => {
  const backgroundConfig = {
    type: 'image',
    url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1080&q=80',
  }
  
  const slides = [
    "Cuddling while talking softly...",
    "This is my favorite place 💞",
    "Your voice is so calming",
    "I could listen to you forever",
    "In your arms, I'm at peace ❤️",
    "If this felt personal… you know why 😉"
  ]

  return <ReelPlayer key="cuddle" slides={slides} backgroundConfig={backgroundConfig} />
}

export default Cuddle
