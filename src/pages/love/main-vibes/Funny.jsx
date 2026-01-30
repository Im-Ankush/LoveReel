import React from 'react'
import ReelPlayer from '../../../components/ReelPlayer.jsx'

const Funny = () => {
  // Playful, relatable dating/relationship vibe
  const backgroundConfig = {
    type: 'image',
    url: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=1080&q=80',
  }
  
  const slides = [
    "When they say 'we need to talk'...",
    "You already know it's over 😂",
    "Dating in 2026:",
    "People just disappear without saying goodbye",
    "I don't need expensive gifts...",
    "I just need someone who replies to my messages",
    "My biggest fear:",
    "If this felt personal… you know why 😉"
  ]

  return <ReelPlayer slides={slides} backgroundConfig={backgroundConfig} />
}

export default Funny
