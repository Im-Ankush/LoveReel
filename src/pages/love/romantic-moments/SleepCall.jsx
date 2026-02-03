import React from 'react'
import ReelPlayer from '../../../components/ReelPlayer.jsx'

const SleepCall = () => {
  const backgroundConfig = {
    type: 'image',
    url: 'https://images.unsplash.com/photo-1721990469247-c9cbad91e8ef?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
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
