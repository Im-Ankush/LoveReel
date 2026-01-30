import React from 'react'
import ReelPlayer from '../../../components/ReelPlayer.jsx'

const Flirty = () => {
  // Sultry, moody, midnight atmosphere
  const backgroundConfig = {
    type: 'image',
    url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1080&q=80',
  }
  
  const slides = [
    "I'm not thinking bad thoughts…",
    "You're just very attractive 😏",
    "Love in 2026 starts with talking…",
    "Ends with saving messages 😂",
    "I don't need fancy words...",
    "I just need you to meet me at 8 😉",
    "Your messages make my heart happy",
    "If this felt personal… you know why 😉"
  ]

  return <ReelPlayer slides={slides} backgroundConfig={backgroundConfig} />
}

export default Flirty
