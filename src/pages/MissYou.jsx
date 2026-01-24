import React from 'react'
import ReelPlayer from '../components/ReelPlayer.jsx'

const MissYou = () => {
  const backgroundConfig = {
    type: 'image',
    url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1080&q=80',
  }
  
  const slides = [
    "Late at night...",
    "I miss you the most 🥺",
    "The bed feels empty",
    "Without you next to me",
    "Come back soon, I need you ❤️",
    "If this felt personal… you know why 😉"
  ]

  return <ReelPlayer slides={slides} backgroundConfig={backgroundConfig} />
}

export default MissYou
