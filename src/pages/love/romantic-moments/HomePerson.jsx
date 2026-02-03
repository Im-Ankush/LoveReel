import React from 'react'
import ReelPlayer from '../../../components/ReelPlayer.jsx'

const HomePerson = () => {
  const backgroundConfig = {
    type: 'image',
    url: 'https://images.unsplash.com/photo-1525353399991-49aaac5fe02d?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
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
