import React from 'react'
import ReelPlayer from '../../../components/ReelPlayer.jsx'

const Kiss = () => {
  const backgroundConfig = {
    type: 'image',
    url: 'https://images.unsplash.com/photo-1681717002184-aa75cef11c94?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  }
  
  const slides = [
    "Before we sleep...",
    "Your forehead kiss says everything 😘",
    "It's your way of saying",
    "'I love you' without words",
    "And it's the best part of my day ❤️",
    "If this felt personal… you know why 😉"
  ]

  return <ReelPlayer slides={slides} backgroundConfig={backgroundConfig} />
}

export default Kiss
