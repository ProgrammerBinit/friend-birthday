import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ChevronDown } from "lucide-react";
import ParticlesBG from "./ParticlesBG";

export default function Hero({ start }: { start: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const glowY = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative h-[100svh] min-h-[600px] flex items-center justify-center overflow-hidden mt-20"
    >
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
        style={{ y, opacity }}
        className="relative z-10 text-center px-6 flex flex-col items-center"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 30 }}
          animate={start ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ duration: 0.9, type: "spring", stiffness: 90, damping: 12 }}
          className="relative w-40 h-40 sm:w-44 sm:h-44 rounded-full overflow-hidden mb-6 mx-auto shadow-[0_0_0_3px_rgba(255,255,255,0.06),0_0_60px_rgba(124,58,237,0.55)]"
        >
          <div className="absolute -inset-3.5 rounded-full border-[1.5px] border-dashed border-cyan/40 animate-spin-slow" />
          <img
            src={`${import.meta.env.BASE_URL}photos/19.jpg`}
            alt="Rakshit"
            className="w-full h-fit object-cover"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={start ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="text-[13px] tracking-[0.3em] uppercase text-cyan-light mb-5 font-medium"
        >
          24th September &middot; A day worth celebrating
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={start ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.1, ease: [0.2, 0.7, 0.2, 1] }}
          className="font-display font-extrabold leading-[0.98] tracking-tight text-[42px] sm:text-[72px] md:text-[96px] mb-5"
        >
          <span className="gradient-text">Happy Birthday</span>
          <br />
           <span className="inline-block bg-gradient-to-r from-[#963131] via-[#42b856] to-[#d7b44c] 
           bg-clip-text text-transparent mt-3">
            Rakshit
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={start ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="text-base sm:text-xl text-zinc-400 max-w-xl mx-auto mb-11 font-light leading-relaxed"
        >
          Every memory with you became one of my favorite stories. Here's to
          the friendship, the chaos, and the trips we'll never forget.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={start ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="absolute -bottom-24 sm:bottom-[-96px] left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-400 text-[11px] tracking-[0.2em] uppercase"
        >
          <div className="w-5.5 h-9 border-[1.5px] border-zinc-400 rounded-full relative">
            <motion.div
              className="absolute top-1.5 left-1/2 -translate-x-1/2 w-[3px] h-[7px] bg-cyan-light rounded-full"
              animate={{ opacity: [1, 0], y: [0, 12] }}
              transition={{ duration: 1.6, repeat: Infinity }}
            />
          </div>
          Scroll
          <ChevronDown size={14} className="animate-bounce" />
        </motion.div>
      </motion.div>
    </section>
  );
}
