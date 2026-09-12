import { motion } from "framer-motion";
import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { spotlightMemories } from "../data/memories";
import MagneticButton from "./MagneticButton";

export default function Spotlight() {
  const trackRef = useRef<HTMLDivElement>(null);

  function scroll(dir: number) {
    trackRef.current?.scrollBy({ left: dir * 420, behavior: "smooth" });
  }

  return (
    <section id="spotlight" className="py-28">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16 px-6"
      >
        <div className="text-xs tracking-[0.35em] uppercase text-cyan-light mb-3.5 font-semibold">
          Rewind
        </div>
        <h2 className="font-display font-extrabold text-3xl sm:text-5xl tracking-tight">
          Memory <span className="gradient-text">Spotlight</span>
        </h2>
      </motion.div>

      <div
        ref={trackRef}
        className="flex gap-6 overflow-x-auto no-scrollbar px-6 pb-6"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {spotlightMemories.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
            className="relative flex-none w-[85vw] sm:w-[520px] h-[420px] rounded-3xl overflow-hidden cursor-hover"
            style={{ scrollSnapAlign: "center" }}
          >
            <motion.img
              src={`${import.meta.env.BASE_URL}${s.image}`}
              alt={s.title}
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.6 }}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-bg/95 to-transparent">
              <h3 className="text-xl font-semibold mb-1.5">{s.title}</h3>
              <p className="text-zinc-400 text-sm font-light">{s.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center gap-3.5 mt-3">
        <MagneticButton
          onClick={() => scroll(-1)}
          className="cursor-hover w-11 h-11 rounded-full border border-white/15 bg-white/5 flex items-center 
          justify-center hover:bg-purple hover:border-purple transition-colors"
        >
          <ArrowLeft size={16} />
        </MagneticButton>
        <MagneticButton
          onClick={() => scroll(1)}
          className="cursor-hover w-11 h-11 rounded-full border border-white/15 bg-white/5 flex items-center 
          justify-center hover:bg-purple hover:border-purple transition-colors"
        >
          <ArrowRight size={16} />
        </MagneticButton>
      </div>
    </section>
  );
}
