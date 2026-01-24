import React from 'react'
import ReelPlayer from '../components/ReelPlayer.jsx'

const SleepCall = () => {
  const backgroundConfig = {
    type: 'image',
    url: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1080&q=80',
  }
  
  const slides = [
    "Falling asleep together on call",
    "Hearing your breathing 📱",
    "Even when you're sleeping",
    "I don't want to hang up",
    "Your presence comforts me ❤️",
    "If this felt personal… you know why 😉"
  ]

  return <ReelPlayer slides={slides} backgroundConfig={backgroundConfig} />
}

export default SleepCall
