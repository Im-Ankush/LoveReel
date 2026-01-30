# Pages – Section-wise structure

Pages are grouped under a parent **love** folder and **education** folder so the codebase is easy to navigate.

## Folder structure

```
src/pages/
├── Home.jsx                 # Dashboard (all sections or filtered by role)
├── love/                    # Parent folder – all love/romantic content
│   ├── main-vibes/          # Main Vibes – Funny, Romantic, Flirty, Mixed
│   ├── romantic-moments/    # Romantic Moments – Hug, Kiss, Miss You, etc.
│   ├── emoji-vibes/         # Emoji Vibes – Hug Vibes, Kiss Energy, etc.
│   ├── love-stories/        # Love Stories – Send This To Your Person, etc.
│   └── interactive-stories/ # Interactive Stories – If You Love Me, Love Check, etc.
└── education/               # Education – Vocabulary Story (exam words)
```

## Sections

| Folder                     | Description                    | Example routes              |
|----------------------------|--------------------------------|-----------------------------|
| `love/main-vibes/`        | Main vibe reels                | `/funny`, `/romantic`, `/flirty`, `/mixed` |
| `love/romantic-moments/`  | Romantic moment reels         | `/hug`, `/kiss`, `/miss-you`, `/cuddle`, … |
| `love/emoji-vibes/`       | Emoji-style reels              | `/hug-vibes`, `/kiss-energy`, `/warmth`, … |
| `love/love-stories/`      | Love story reels               | `/send-this-to-your-person`, `/heart-to-heart`, … |
| `love/interactive-stories/` | Interactive love stories     | `/if-you-love-me`, `/love-check`, `/send-this-to-me`, … |
| `education/`              | Education content              | `/education/vocabulary-story` |

Routes and role-based access are defined in `App.jsx`.
