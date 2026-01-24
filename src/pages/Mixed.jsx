import React from 'react'
import ReelPlayer from '../components/ReelPlayer.jsx'

const Mixed = () => {
  // Balanced modern love scene - relatable
  const backgroundConfig = {
    type: 'image',
    url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1080&q=80',
  }
  
  const slides = [
    "Modern love is:",
    "Sending funny videos at night instead of saying 'I miss you' 😂",
    "But also:",
    "Saving their voice messages to hear when you feel sad ❤️",
    "It's the way they make you laugh so much",
    "And comfort you when you cry",
    "Love in 2026 is not perfect...",
    "If this felt personal… you know why 😉"
  ]

  return <ReelPlayer slides={slides} backgroundConfig={backgroundConfig} />
}

export default Mixed
