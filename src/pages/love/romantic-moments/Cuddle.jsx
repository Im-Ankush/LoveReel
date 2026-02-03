import React from 'react'
import ReelPlayer from '../../../components/ReelPlayer.jsx'

const Cuddle = () => {
  const backgroundConfig = {
    type: 'image',
    url: 'https://images.unsplash.com/photo-1504194569341-48a2e831a3a7?w=1080&q=80',
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
