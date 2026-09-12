import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Music2, Volume2 } from "lucide-react";

export default function MusicPlayer() {
  const [show, setShow] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    function onScroll() {
      if (window.scrollY > window.innerHeight * 0.6) setShow(true);
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Try to autoplay as soon as the site loads. Most browsers block audio
  // with sound until the user has interacted with the page at least once,
  // so we attempt it, and if it's blocked we show a subtle "tap to play" nudge.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.7;

    const tryPlay = () => {
      audio
        .play()
        .then(() => {
          setPlaying(true);
          setBlocked(false);
        })
        .catch(() => {
          setBlocked(true);
        });
    };

    // First attempt right away (works if browser allows it, e.g. muted or
    // after a prior interaction on the same site).
    const t = setTimeout(tryPlay, 1200);

    // Fallback: the moment the user interacts anywhere on the page
    // (click, key, touch, scroll), start playback — this always works.
    const onFirstInteract = () => {
      tryPlay();
      window.removeEventListener("click", onFirstInteract);
      window.removeEventListener("keydown", onFirstInteract);
      window.removeEventListener("touchstart", onFirstInteract);
      window.removeEventListener("scroll", onFirstInteract);
    };
    window.addEventListener("click", onFirstInteract);
    window.addEventListener("keydown", onFirstInteract);
    window.addEventListener("touchstart", onFirstInteract);
    window.addEventListener("scroll", onFirstInteract);

    return () => {
      clearTimeout(t);
      window.removeEventListener("click", onFirstInteract);
      window.removeEventListener("keydown", onFirstInteract);
      window.removeEventListener("touchstart", onFirstInteract);
      window.removeEventListener("scroll", onFirstInteract);
    };
  }, []);

  function toggle() {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play().then(() => {
        setPlaying(true);
        setBlocked(false);
      });
    } else {
      audio.pause();
      setPlaying(false);
    }
  }

  return (
    <>
      <section
        id="music"
        className="text-center max-w-lg mx-auto"
      >
        <div className="text-xs tracking-[0.35em] uppercase text-cyan-light mb-3.5 font-semibold">
          Play Something
        </div>
        <h2 className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight">
          Our Favorite <span className="gradient-text">Song</span>
        </h2>
        <p className="text-zinc-400 font-light flex items-center justify-center gap-2">
          <Music2 size={16} className="text-purple-light" />
          Tap the floating player to spin the album art. 🎶
        </p>
      </section>

      <audio ref={audioRef} src={`${import.meta.env.BASE_URL}music/song.mp3`} loop preload="auto" />

      <motion.div
        initial={{ y: 140 }}
        animate={{ y: show ? 0 : 140 }}
        transition={{ type: "spring", stiffness: 120, damping: 18 }}
        className="glass fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-[600] flex items-center gap-3.5 pl-2.5 pr-4 py-2.5 rounded-full"
      >
        <AnimatePresence>
          {blocked && !playing && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="absolute -top-10 right-0 glass px-3 py-1.5 rounded-full text-[11px] text-zinc-300 whitespace-nowrap flex items-center gap-1.5"
            >
              <Volume2 size={12} className="text-cyan-light" /> Tap to play sound
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          animate={playing ? { rotate: 360 } : {}}
          transition={playing ? { duration: 6, repeat: Infinity, ease: "linear" } : {}}
          className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/15 flex-none"
        >
          <img src={`${import.meta.env.BASE_URL}photos/6.jpg`} alt="album art" className="w-full h-full object-cover" />
        </motion.div>
        <button
          onClick={toggle}
          className="cursor-hover w-8.5 h-8.5 rounded-full bg-gradient-to-br from-purple to-cyan text-white flex items-center justify-center flex-none"
        >
          {playing ? <Pause size={13} /> : <Play size={13} className="ml-0.5" />}
        </button>
        <input
          type="range"
          min={0}
          max={100}
          defaultValue={70}
          onChange={(e) => {
            if (audioRef.current) audioRef.current.volume = Number(e.target.value) / 100;
          }}
          className="w-16 sm:w-20 accent-cyan hidden xs:block"
        />
        <div className="hidden sm:block text-[11px] text-zinc-400 leading-tight">
          <b className="text-white text-xs block">Meri Yaar Meri Daulat</b>
          {playing ? "now playing" : "tap to play"}
        </div>
      </motion.div>
    </>
  );
}
