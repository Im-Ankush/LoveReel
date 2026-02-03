import React from 'react'
import ReelPlayer from '../../../components/ReelPlayer.jsx'

const LateNight = () => {
  const backgroundConfig = {
    type: 'image',
    url: 'https://images.unsplash.com/photo-1758524941065-7d1182f5497f?q=80&w=2532&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
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
