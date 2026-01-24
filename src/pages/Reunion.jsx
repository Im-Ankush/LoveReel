import React from 'react'
import ReelPlayer from '../components/ReelPlayer.jsx'

const Reunion = () => {
  const backgroundConfig = {
    type: 'image',
    url: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=1080&q=80',
  }
  
  const slides = [
    "Meeting you after so long...",
    "My heart skips a beat ❤️",
    "All the waiting was worth it",
    "Just to see your smile again",
    "This is what I've been missing",
    "If this felt personal… you know why 😉"
  ]

  return <ReelPlayer slides={slides} backgroundConfig={backgroundConfig} />
}

export default Reunion
