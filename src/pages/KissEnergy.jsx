import React from 'react'
import ReelPlayer from '../components/ReelPlayer.jsx'

const KissEnergy = () => {
  const emojiBackground = {
    emojis: ['😘', '💋', '❤️', '💖', '😘', '💋'],
    count: 30,
    opacity: 0.3,
    backgroundGradient: 'linear-gradient(135deg, #ff6b9d 0%, #ffc1cc 25%, #ffb3d9 50%, #ff9ec7 75%, #ff8cc8 100%)'
  }
  
  const slides = [
    { text: "That forehead kiss before sleep", emoji: "😘" },
    { text: "Says more than words ever could", emoji: "💋" },
    { text: "It's the little moments", emoji: "❤️" },
    { text: "That make love feel real", emoji: "💖" },
    { text: "If this felt personal… you know why 😉", emoji: "😘" }
  ]

  return <ReelPlayer slides={slides} emojiBackground={emojiBackground} autoStart={true} />
}

export default KissEnergy
