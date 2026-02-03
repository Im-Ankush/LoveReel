import React from 'react'
import ReelPlayer from '../../../components/ReelPlayer.jsx'

const Goodbye = () => {
  const backgroundConfig = {
    type: 'image',
    url: 'https://images.unsplash.com/photo-1473625247510-8ceb1760943f?q=80&w=1411&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  }
  
  const slides = [
    "Saying goodbye but not wanting to leave...",
    "Every goodbye feels too soon 😢",
    "I wish time would stop",
    "Just a few more minutes with you",
    "Until we meet again ❤️",
    "If this felt personal… you know why 😉"
  ]

  return <ReelPlayer slides={slides} backgroundConfig={backgroundConfig} />
}

export default Goodbye
