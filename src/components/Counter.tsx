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
      className="glass rounded-3xl text-center py-9 px-3 cursor-hover"
    >
      <div className="gradient-text font-display font-extrabold text-4xl sm:text-5xl mb-1.5">
        {value}+
      </div>
      <div className="text-[11px] text-zinc-400 uppercase tracking-[0.15em]">{label}</div>
    </motion.div>
  );
}

export default function Counter() {
  return (
    <section
      id="counter"
      className="py-28 px-6"
      style={{
        background:
          "radial-gradient(ellipse at center, rgba(124,58,237,0.08), transparent 70%)",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <div className="text-xs tracking-[0.35em] uppercase text-cyan-light mb-3.5 font-semibold">
          In Numbers
        </div>
        <h2 className="font-display font-extrabold text-3xl sm:text-5xl tracking-tight">
          Shared <span className="gradient-text">Memories</span>
        </h2>
      </motion.div>
      <div className="max-w-3xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
        {STATS.map((s, i) => (
          <StatCard key={s.label} target={s.target} label={s.label} delay={i * 0.12} />
        ))}
      </div>
    </section>
  );
}
