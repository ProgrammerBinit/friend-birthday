import { motion, useScroll, useTransform } from "framer-motion";
import { memories } from "../data/memories";
import ParticlesBG from "./ParticlesBG";
import { useRef } from "react";

export default function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const glowY = useTransform(scrollYProgress, [0, 1], [0, 300]);

  return (
    <section id="timeline" className="relative py-20 sm:py-28 px-4 sm:px-6 max-w-4xl mx-auto overflow-hidden">
      <ParticlesBG className="absolute inset-0 w-full h-full z-[1]" count={100} rise />
      <motion.div
        style={{ y: glowY }}
        className="absolute w-[70vw] h-[70vw] max-w-[900px] max-h-[900px] rounded-full -top-[15%] left-1/2 -translate-x-1/2 blur-[50px] z-0"
        animate={{
          background: [
            "radial-gradient(circle, rgba(124,58,237,0.35), transparent 65%)",
            "radial-gradient(circle, rgba(6,182,212,0.3), transparent 65%)",
            "radial-gradient(circle, rgba(124,58,237,0.35), transparent 65%)",
          ],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12 sm:mb-16"
      >
        <div className="text-[11px] sm:text-xs tracking-[0.25em] sm:tracking-[0.35em] uppercase text-cyan-light mb-3.5 font-semibold">
          The Story So Far
        </div>
        <h2 className="font-display font-extrabold text-2xl xs:text-3xl sm:text-5xl tracking-tight px-2">
          Our Friendship <span className="gradient-text">Timeline</span>
        </h2>
      </motion.div>

      <div className="absolute left-5 sm:left-6 md:left-1/2 top-[180px] sm:top-[220px] bottom-20 w-0.5 bg-gradient-to-b from-purple to-cyan md:-translate-x-1/2 opacity-30" />

      <div>
        {memories.map((m, i) => {
          const left = i % 2 === 0;
          return (
            <div
              key={m.title}
              className={`relative flex mb-14 sm:mb-16 md:mb-20 pl-11 sm:pl-14 md:pl-0 ${
                left ? "md:justify-start" : "md:justify-end"
              }`}
            >
              <div className="absolute top-8 left-5 sm:left-6 md:left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-bg border-[3px] border-cyan shadow-[0_0_14px_rgba(6,182,212,0.8)] z-10" />
              <motion.div
                initial={{ opacity: 0, x: left ? -70 : 70 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: [0.2, 0.7, 0.2, 1] }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="glass gradient-border rounded-3xl p-5 sm:p-6 w-full max-w-md md:w-[44%] cursor-hover"
              >
                <div className="text-[12px] sm:text-[13px] tracking-[0.2em] text-purple-light font-bold mb-2">
                  {m.year}
                </div>
                <div className="text-lg sm:text-xl font-semibold mb-2.5 break-words">{m.title}</div>
                <div className="text-sm text-zinc-400 leading-relaxed mb-4 font-light">
                  {m.description}
                </div>
                <div className="overflow-hidden rounded-xl">
                  <motion.img
                    src={`${import.meta.env.BASE_URL}${m.image}`}
                    alt={m.title}
                    loading="lazy"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.5 }}
                    className="w-full h-56 sm:h-72 md:h-80 object-cover"
                  />
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </section>
  );
}