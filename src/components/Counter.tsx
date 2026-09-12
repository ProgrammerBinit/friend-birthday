import { motion, useInView, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const STATS = [
  { target: 1000, label: "Laughs Shared" },
  { target: 12, label: "Trips Together" },
  { target: 200, label: "Photos Clicked" },
  { target: 8, label: "Years of Friendship" },
];

function StatCard({ target, label, delay }: { target: number; label: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, target, {
      duration: 1.8,
      delay,
      ease: "easeOut",
      onUpdate: (v) => setValue(Math.floor(v)),
    });
    return () => controls.stop();
  }, [inView, target, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      whileHover={{ y: -8 }}
      className="glass rounded-2xl sm:rounded-3xl text-center py-6 sm:py-9 px-2 sm:px-3 cursor-hover"
    >
      <div className="gradient-text font-display font-extrabold text-3xl xs:text-4xl sm:text-5xl mb-1.5">
        {value}+
      </div>
      <div className="text-[10px] xs:text-[11px] text-zinc-400 uppercase tracking-[0.1em] sm:tracking-[0.15em] leading-snug px-1 break-words">
        {label}
      </div>
    </motion.div>
  );
}

export default function Counter() {
  return (
    <section
      id="counter"
      className="py-2 sm:py-0 px-4 sm:px-8"
      style={{
        background:
          "radial-gradient(ellipse at center, rgba(124,58,237,0.08), transparent 70%)",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-10 sm:mb-8"
      >
        <div className="text-[11px] sm:text-xs tracking-[0.25em] sm:tracking-[0.35em] uppercase text-cyan-light font-semibold">
          In Numbers
        </div>
        <h2 className="font-display font-extrabold text-2xl xs:text-3xl sm:text-5xl tracking-tight">
          Shared <span className="gradient-text">Memories</span>
        </h2>
      </motion.div>
      <div className="max-w-3xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3 xs:gap-4 sm:gap-6">
        {STATS.map((s, i) => (
          <StatCard key={s.label} target={s.target} label={s.label} delay={i * 0.12} />
        ))}
      </div>
    </section>
  );
}