import React from 'react'
import ReelPlayer from '../../../components/ReelPlayer.jsx'

const Safe = () => {
  const backgroundConfig = {
    type: 'image',
    url: 'https://images.unsplash.com/photo-1627964464837-6328f5931576?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
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
