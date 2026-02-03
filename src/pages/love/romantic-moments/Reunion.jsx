import React from 'react'
import ReelPlayer from '../../../components/ReelPlayer.jsx'

const Reunion = () => {
  const backgroundConfig = {
    type: 'image',
    url: 'https://plus.unsplash.com/premium_photo-1683147623922-33dc7bf10ad7?q=80&w=1742&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  }
  
  const slides = [
    "Meeting you after so long...",
    "My heart skips a beat ❤️",
    "All the waiting was worth it",
    "Just to see your smile again",
    "This is what I've been missing",
    "If this felt personal… you know why 😉"
  ]

  return <ReelPlayer slides={slides} backgroundConfig={backgroundConfig} />
}

export default Reunion
