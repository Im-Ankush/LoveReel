/**
 * Shared site config: categories and pages for Home, Navigation, and Admin.
 * Single source of truth for page list and route labels.
 */

export const ALL_CATEGORIES = [
  { title: 'Main Vibes', pages: [{ path: '/funny', label: 'Funny', emoji: '😂' }, { path: '/romantic', label: 'Romantic', emoji: '❤️' }, { path: '/flirty', label: 'Flirty', emoji: '😏' }, { path: '/mixed', label: 'Mixed', emoji: '✨' }] },
  { title: 'Romantic Moments', pages: [{ path: '/hug', label: 'Hug', emoji: '🤗' }, { path: '/kiss', label: 'Forehead Kiss', emoji: '😘' }, { path: '/miss-you', label: 'Miss You', emoji: '🥺' }, { path: '/reunion', label: 'Reunion', emoji: '❤️' }, { path: '/hands', label: 'Holding Hands', emoji: '🤝' }, { path: '/cuddle', label: 'Cuddle', emoji: '💞' }, { path: '/late-night', label: 'Late Night', emoji: '🌙' }, { path: '/sleep-call', label: 'Sleep Call', emoji: '📱' }, { path: '/laugh', label: 'Laugh Together', emoji: '😂' }, { path: '/safe', label: 'Safe in Arms', emoji: '🛌' }, { path: '/goodbye', label: 'Goodbye', emoji: '😢' }, { path: '/surprise', label: 'Surprise', emoji: '😍' }, { path: '/tight-hug', label: 'Tight Hug', emoji: '🤍' }, { path: '/understanding', label: 'Understanding', emoji: '✨' }, { path: '/home', label: 'Home is You', emoji: '🏠' }] },
  { title: 'Emoji Vibes', pages: [{ path: '/hug-vibes', label: 'Hug Vibes', emoji: '🤗' }, { path: '/kiss-energy', label: 'Kiss Energy', emoji: '😘' }, { path: '/miss-you-vibes', label: 'Miss You Vibes', emoji: '🥺' }, { path: '/cuddle-mode', label: 'Cuddle Mode', emoji: '🫶' }, { path: '/late-night-love', label: 'Late Night Love', emoji: '🌙' }, { path: '/soft-romance', label: 'Soft Romance', emoji: '💫' }, { path: '/heartbeats', label: 'Heartbeats', emoji: '💓' }, { path: '/love-mood', label: 'Love Mood', emoji: '💕' }, { path: '/together-feel', label: 'Together Feel', emoji: '🤝' }, { path: '/warmth', label: 'Warmth', emoji: '🔥' }] },
  { title: 'Love Stories', pages: [{ path: '/send-this-to-your-person', label: 'Send This To Your Person', emoji: '💕' }, { path: '/answer-me-honestly', label: 'Answer Me Honestly', emoji: '💞' }, { path: '/only-for-my-love', label: 'Only For My Love', emoji: '🤍' }, { path: '/do-you-feel-this-too', label: 'Do You Feel This Too', emoji: '💖' }, { path: '/quiet-love-questions', label: 'Quiet Love Questions', emoji: '✨' }, { path: '/late-night-thoughts', label: 'Late Night Thoughts', emoji: '🌙' }, { path: '/real-love-check', label: 'Real Love Check', emoji: '❤️' }, { path: '/soft-confession', label: 'Soft Confession', emoji: '🤍' }, { path: '/heart-to-heart', label: 'Heart To Heart', emoji: '💖' }] },
  { title: 'Interactive Stories', pages: [{ path: '/if-you-love-me', label: 'If You Love Me', emoji: '🤍' }, { path: '/love-check', label: 'Love Check', emoji: '💖' }, { path: '/answer-honestly', label: 'Answer Honestly', emoji: '💞' }, { path: '/us-feeling', label: 'Us Feeling', emoji: '🤍' }, { path: '/send-this-to-me', label: 'Send This To Me', emoji: '💕' }] },
  { title: 'Education', pages: [{ path: '/education/vocabulary-story', label: 'Vocabulary Story (Exam Words)', emoji: '📚' }] },
]

/** Flat list of all page paths with label and category for admin routes list */
export function getAllPagesForAdmin() {
  return ALL_CATEGORIES.flatMap((cat) =>
    cat.pages.map((p) => ({ path: p.path, label: p.label, category: cat.title }))
  )
}
