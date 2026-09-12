import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ParticlesBG from "./ParticlesBG";

export default function Loader({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((p) => {
        const next = Math.min(100, p + Math.random() * 18 + 6);
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setVisible(false);
            setTimeout(onDone, 700);
          }, 350);
        }
        return next;
      });
    }, 180);
    return () => clearInterval(timer);
  }, [onDone]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="fixed inset-0 z-[10000] bg-bg flex flex-col items-center justify-center overflow-hidden"
        >
          <ParticlesBG className="absolute inset-0 w-full h-full" count={60} />
          <motion.div
            className="text-4xl mb-5 relative z-10"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
          >
            💜
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative z-10 text-sm tracking-[0.35em] uppercase text-zinc-400 mb-7 font-medium"
          >
            Loading Memories...
          </motion.div>
          <div className="relative z-10 w-56 h-0.5 bg-zinc-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-purple to-cyan rounded-full"
              animate={{ width: `${progress}%` }}
              transition={{ ease: "easeOut" }}
            />
          </div>
          <div className="relative z-10 mt-3.5 text-xs text-zinc-500 tracking-wider">
            {Math.floor(progress)}%
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
