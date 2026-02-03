import React from 'react'
import ReelPlayer from '../../../components/ReelPlayer.jsx'

const Understanding = () => {
  const backgroundConfig = {
    type: 'image',
    url: 'https://images.unsplash.com/photo-1609240127475-0b0fe270fe77?q=80&w=1682&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  }
  
  const slides = [
    "Silent understanding between lovers...",
    "We don't need words ✨",
    "A look, a touch",
    "And we know what the other feels",
    "This connection is everything ❤️",
    "If this felt personal… you know why 😉"
  ]

  return <ReelPlayer slides={slides} backgroundConfig={backgroundConfig} />
}

export default Understanding
