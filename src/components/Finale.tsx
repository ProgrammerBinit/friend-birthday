import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";
import { PartyPopper } from "lucide-react";
import MagneticButton from "./MagneticButton";

const COLORS = ["#7C3AED", "#06B6D4", "#f5c451", "#ffffff"];
const BALLOON_COLORS = ["#7C3AED", "#06B6D4", "#f5c451", "#ef4444", "#a78bfa"];

function launchFireworks() {
  const end = Date.now() + 3500;
  (function frame() {
    confetti({ particleCount: 4, angle: 60, spread: 60, origin: { x: 0 }, colors: COLORS });
    confetti({ particleCount: 4, angle: 120, spread: 60, origin: { x: 1 }, colors: COLORS });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
  setTimeout(
    () => confetti({ particleCount: 150, spread: 100, origin: { y: 0.5 }, colors: COLORS }),
    400
  );
}

interface Balloon {
  id: number;
  left: number;
  color: string;
  duration: number;
}

export default function Finale() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [balloons, setBalloons] = useState<Balloon[]>([]);
  const triggered = useRef(false);

  function celebrate() {
    launchFireworks();
    const newBalloons: Balloon[] = Array.from({ length: 14 }, (_, i) => ({
      id: Date.now() + i,
      left: Math.random() * 90,
      color: BALLOON_COLORS[Math.floor(Math.random() * BALLOON_COLORS.length)],
      duration: 6 + Math.random() * 4,
    }));
    setBalloons((b) => [...b, ...newBalloons]);
    setTimeout(() => {
      setBalloons((b) => b.filter((x) => !newBalloons.includes(x)));
    }, 11000);
  }

  useEffect(() => {
    if (inView && !triggered.current) {
      triggered.current = true;
      celebrate();
    }
  }, [inView]);

  return (
    <section
      id="finale"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden text-center px-6"
    >
      {balloons.map((b) => (
        <motion.div
          key={b.id}
          initial={{ bottom: "-140px", opacity: 0.9 }}
          animate={{ bottom: "135vh", opacity: 0 }}
          transition={{ duration: b.duration, ease: "linear" }}
          className="absolute w-14 h-[70px] rounded-[50%_50%_50%_50%/58%_58%_42%_42%]"
          style={{ left: `${b.left}%`, background: b.color }}
        />
      ))}

      <div className="relative z-10">
        <motion.h2
          initial={{ opacity: 0, scale: 0.7 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 100, damping: 12 }}
          className="gradient-text font-display font-extrabold text-4xl sm:text-6xl md:text-8xl mb-5"
        >
          Happy Birthday!
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-zinc-400 max-w-lg mx-auto mb-10 font-light text-base sm:text-lg"
        >
          Thank you for being an amazing friend. Here's to many more years of
          memories, laughter, and everything in between.
        </motion.p>
        <MagneticButton
          onClick={celebrate}
          className="cursor-hover px-9 py-4 rounded-full font-semibold text-sm bg-gradient-to-br from-purple to-cyan text-white shadow-[0_10px_40px_rgba(124,58,237,0.4)] flex items-center gap-2 mx-auto"
        >
          <PartyPopper size={16} /> Replay the Magic
        </MagneticButton>
      </div>
    </section>
  );
}
