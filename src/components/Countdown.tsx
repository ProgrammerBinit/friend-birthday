import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

function nextBirthday() {
  const now = new Date();
  let target = new Date(now.getFullYear(), 8, 24, 0, 0, 0);
  if (target < now) target = new Date(now.getFullYear() + 1, 8, 24, 0, 0, 0);
  return target;
}

function FlipDigit({ value, label }: { value: string; label: string }) {
  return (
    <div className="w-20 sm:w-24">
      <div className="glass rounded-2xl h-20 sm:h-24 flex items-center justify-center overflow-hidden relative">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={value}
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="font-display font-extrabold text-3xl sm:text-4xl absolute"
          >
            {value}
          </motion.span>
        </AnimatePresence>
      </div>
      <div className="mt-2.5 text-[11px] tracking-[0.2em] uppercase text-zinc-400 text-center">
        {label}
      </div>
    </div>
  );
}

export default function Countdown() {
  const [t, setT] = useState({ d: "00", h: "00", m: "00", s: "00" });

  useEffect(() => {
    function update() {
      const diff = nextBirthday().getTime() - Date.now();
      const d = Math.floor(diff / 86400000);
      const h = Math.floor(diff / 3600000) % 24;
      const m = Math.floor(diff / 60000) % 60;
      const s = Math.floor(diff / 1000) % 60;
      setT({
        d: String(d).padStart(2, "0"),
        h: String(h).padStart(2, "0"),
        m: String(m).padStart(2, "0"),
        s: String(s).padStart(2, "0"),
      });
    }
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="countdown" className="py-28 px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <div className="text-xs tracking-[0.35em] uppercase text-cyan-light mb-3.5 font-semibold">
          Mark the Date
        </div>
        <h2 className="font-display font-extrabold text-3xl sm:text-5xl tracking-tight">
          Countdown to Your <span className="gradient-text">Next Birthday</span>
        </h2>
      </motion.div>
      <div className="flex justify-center gap-4 sm:gap-5 flex-wrap max-w-xl mx-auto">
        <FlipDigit value={t.d} label="Days" />
        <FlipDigit value={t.h} label="Hours" />
        <FlipDigit value={t.m} label="Minutes" />
        <FlipDigit value={t.s} label="Seconds" />
      </div>
    </section>
  );
}
