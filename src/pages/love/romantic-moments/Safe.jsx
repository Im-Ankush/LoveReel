import React from 'react'
import ReelPlayer from '../../../components/ReelPlayer.jsx'

const Safe = () => {
  const backgroundConfig = {
    type: 'image',
    url: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=1080&q=80',
  }
  
  const slides = [
    "Feeling safe in your arms...",
    "All my worries disappear 🛌",
    "The world can be scary",
    "But with you, I'm protected",
    "This is where I belong ❤️",
    "If this felt personal… you know why 😉"
  ]

  return <ReelPlayer slides={slides} backgroundConfig={backgroundConfig} />
}

export default Safe
