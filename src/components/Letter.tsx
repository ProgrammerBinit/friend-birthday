import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { letterText } from "../data/memories";

export default function Letter() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const [typed, setTyped] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!inView) return;
    let i = 0;
    const timer = setInterval(() => {
      i++;
      setTyped(letterText.slice(0, i));
      if (i >= letterText.length) {
        clearInterval(timer);
        setDone(true);
      }
    }, 14);
    return () => clearInterval(timer);
  }, [inView]);

  return (
    <section id="letter" className="py-28 px-6 flex justify-center">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="gradient-border rounded-md max-w-2xl w-full p-9 sm:p-14 relative"
        style={{
          background:
            "linear-gradient(#1c1a17 1px, transparent 1px) 0 0/100% 34px, linear-gradient(135deg,#211f1a,#17150f)",
          boxShadow:
            "0 30px 70px rgba(0,0,0,0.6), inset 0 0 90px rgba(245,196,81,0.05)",
        }}
      >
        <div className="absolute top-0 left-11 bottom-0 w-px bg-red-800/25" />
        <div className="font-script text-3xl sm:text-4xl text-gold mb-4">
          Dear Rakshit,
        </div>
        <div className="font-script text-xl sm:text-2xl leading-relaxed text-[#e8e2d4] whitespace-pre-wrap">
          {typed}
          {!done && (
            <span className="inline-block w-0.5 h-6 bg-gold align-middle animate-blink" />
          )}
        </div>
        {done && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="mt-6 font-script text-2xl sm:text-3xl text-cyan-light"
          >
            — Your Best Friend
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
