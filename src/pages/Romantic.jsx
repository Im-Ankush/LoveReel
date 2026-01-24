import React from 'react'
import ReelPlayer from '../components/ReelPlayer.jsx'

const Romantic = () => {
  // Soft, dreamy, emotional romantic scene
  const backgroundConfig = {
    type: 'image',
    url: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1080&q=80',
  }
  
  const slides = [
    "I don't need a perfect person...",
    "I need someone who accepts me as I am ❤️",
    "Love is not about finding someone to live with...",
    "It's finding someone you cannot live without",
    "In a world where everything changes...",
    "You are my constant",
    "Your smile makes my day better",
    "If this felt personal… you know why 😉"
  ]

  return <ReelPlayer slides={slides} backgroundConfig={backgroundConfig} />
}

export default Romantic
