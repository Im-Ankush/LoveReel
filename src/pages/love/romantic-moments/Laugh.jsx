import React from 'react'
import ReelPlayer from '../../../components/ReelPlayer.jsx'

const Laugh = () => {
  const backgroundConfig = {
    type: 'image',
    url: 'https://images.unsplash.com/photo-1741217531183-73f9f986f5c8?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  }
  
  const slides = [
    "Laughing together over small things",
    "Your laugh is my favorite sound 😂❤️",
    "Even the smallest jokes",
    "Become funnier with you",
    "This is pure happiness",
    "If this felt personal… you know why 😉"
  ]

  return <ReelPlayer slides={slides} backgroundConfig={backgroundConfig} />
}

export default Laugh
