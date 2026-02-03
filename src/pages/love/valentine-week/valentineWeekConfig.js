/**
 * Valentine Week – config for each day.
 * Used by ValentinePage for text, emojis, and theming.
 */

export const VALENTINE_GRADIENT =
  'linear-gradient(135deg, #7f2d4a 0%, #a63d5c 20%, #c94b6a 35%, #e8a0b5 50%, #f5d0d9 65%, #c94b6a 80%, #7f2d4a 100%)'

export const valentineDays = {
  'rose-day': {
    id: 'rose-day',
    name: 'Rose Day',
    emoji: '🌹',
    emojis: ['🌹', '🌸', '❤️', '✨'],
    storySlides: [
      'One rose for every reason I love you.',
      'For your smile, your heart, your soul.',
      'For the way you make my world beautiful.',
      'This rose is my love, speaking when words aren’t enough. 🌹',
    ],
  },
  'propose-day': {
    id: 'propose-day',
    name: 'Propose Day',
    emoji: '💍',
    emojis: ['💍', '❤️', '💘', '✨'],
    storySlides: [
      'You’re not just my love. You’re my home.',
      'With you I found peace, joy, and forever.',
      'I don’t want a life without you in it.',
      'Will you stay by my side, today and always? 💍',
    ],
  },
  'chocolate-day': {
    id: 'chocolate-day',
    name: 'Chocolate Day',
    emoji: '🍫',
    emojis: ['🍫', '🤎', '❤️', '😋'],
    storySlides: [
      'Like chocolate, you melt my heart.',
      'You add sweetness to my ordinary days.',
      'Every moment with you feels indulgent and right.',
      'You’re the treat I never want to share. 🍫',
    ],
  },
  'teddy-day': {
    id: 'teddy-day',
    name: 'Teddy Day',
    emoji: '🧸',
    emojis: ['🧸', '🤍', '❤️', '✨'],
    storySlides: [
      'You’re my comfort when the world gets heavy.',
      'The one I want to hold when I’m scared or tired.',
      'You make me feel safe, seen, and never alone.',
      'My teddy, my peace, my person. 🧸',
    ],
  },
  'promise-day': {
    id: 'promise-day',
    name: 'Promise Day',
    emoji: '🤞',
    emojis: ['🤞', '❤️', '🫶', '✨'],
    storySlides: [
      'I promise to choose you, every single day.',
      'To stand with you in storms and in sunshine.',
      'To love you not just when it’s easy, but always.',
      'This is my promise—from my heart to yours. 🤞',
    ],
  },
  'hug-day': {
    id: 'hug-day',
    name: 'Hug Day',
    emoji: '🤗',
    emojis: ['🤗', '🤍', '❤️', '✨'],
    storySlides: [
      'Your hug is where I feel most loved.',
      'It says “I’ve got you” without a single word.',
      'When I’m in your arms, everything else fades.',
      'Sending you the warmest hug until we meet again. 🤗',
    ],
  },
  'kiss-day': {
    id: 'kiss-day',
    name: 'Kiss Day',
    emoji: '💋',
    emojis: ['💋', '❤️', '💖', '✨'],
    storySlides: [
      'Every kiss with you feels like a promise.',
      'A “I’m yours” and “you’re mine” in one touch.',
      'You still make my heart race like the first time.',
      'Here’s to a lifetime of kisses with you. 💋',
    ],
  },
}

export const CTA_LINES = {
  line1: 'If this feels like us…',
  line2: 'Send this to me ❤️',
}

export const INTRO_DURATION_MS = 2500
export const STORY_SLIDE_DURATION_MS = 3500
export const CTA_DURATION_MS = 2000
