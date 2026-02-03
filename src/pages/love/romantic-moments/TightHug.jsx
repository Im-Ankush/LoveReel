import React from 'react'
import ReelPlayer from '../../../components/ReelPlayer.jsx'

const TightHug = () => {
  const backgroundConfig = {
    type: 'image',
    url: 'https://images.unsplash.com/photo-1641617254442-30e517accac0?w=1080&q=80',
  }
  
  const slides = [
    "A warm tight hug that fixes everything...",
    "All my problems melt away 🤍",
    "Your arms around me",
    "This is all I need",
    "You make everything better ❤️",
    "If this felt personal… you know why 😉"
  ]

  return <ReelPlayer slides={slides} backgroundConfig={backgroundConfig} />
}

export default TightHug
