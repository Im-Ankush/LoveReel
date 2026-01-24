import React from 'react'
import ReelPlayer from '../components/ReelPlayer.jsx'

const HomePerson = () => {
  const backgroundConfig = {
    type: 'image',
    url: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=1080&q=80',
  }
  
  const slides = [
    "Home is not a place...",
    "Home is a person 🏠❤️",
    "Wherever you are",
    "That's where I belong",
    "You are my home",
    "If this felt personal… you know why 😉"
  ]

  return <ReelPlayer slides={slides} backgroundConfig={backgroundConfig} />
}

export default HomePerson
