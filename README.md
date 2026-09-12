# Happy Birthday Rakshit 🎂 — React + TypeScript

A premium, fully animated birthday website built with React, TypeScript, Vite, Tailwind CSS, and Framer Motion.

## Run it locally

```bash
npm install
npm run dev
```

Then open the printed local URL (usually http://localhost:5173).

## Build for production

```bash
npm run build
npm run preview
```

## Add the song ("Meri Yaar Meri Daulat")

Place your own legally-owned MP3 file at:

```
public/music/song.mp3
```

The floating music player is already wired to auto-play it as soon as the
site loads. Browsers block true autoplay-with-sound until the user
interacts with the page at least once (Chrome/Safari policy) — the site
tries to autoplay immediately, and if the browser blocks it, a small
"Tap to play sound" bubble appears next to the player; playback then
starts on the very next click, scroll, or key press anywhere on the page.

## Tech used
- React + TypeScript + Vite
- Tailwind CSS (dark premium theme: purple `#7C3AED` + cyan `#06B6D4`)
- Framer Motion (scroll reveals, parallax, magnetic buttons, flip countdown, spring physics)
- canvas-confetti (fireworks + celebration burst)
- react-photo-view (fullscreen gallery lightbox)
- lucide-react (icons)
- Custom canvas particle system (loading screen + hero background)

## Structure
- `src/data/memories.ts` — edit this file to change timeline entries, gallery captions, spotlight memories, and the letter text.
- `public/photos/` — all photos live here. Replace/add images and reference them as `/photos/filename.jpg`.
- `public/music/song.mp3` — your song file goes here (see above).
- `src/components/` — every section is its own component (Hero, Timeline, Gallery, Spotlight, Counter, Letter, MusicPlayer, Countdown, Finale, Navbar, Loader).

## Notes
- Birthday date is set to **September 24** in `Hero.tsx` and `Countdown.tsx` — update both if needed.
