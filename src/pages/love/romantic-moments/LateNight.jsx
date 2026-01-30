import React from 'react'
import ReelPlayer from '../../../components/ReelPlayer.jsx'

const LateNight = () => {
  const backgroundConfig = {
    type: 'image',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1080&q=80',
  }
  
  const slides = [
    "Late night text:",
    "'Are you still awake?' 🌙",
    "Even when I'm tired",
    "I want to talk to you",
    "You're worth losing sleep for ❤️",
    "If this felt personal… you know why 😉"
  ]

  return <ReelPlayer slides={slides} backgroundConfig={backgroundConfig} />
}

export default LateNight
