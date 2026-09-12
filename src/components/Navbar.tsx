import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const LINKS = [
  { id: "hero", label: "Home" },
  { id: "timeline", label: "Timeline" },
  { id: "gallery", label: "Gallery" },
  { id: "letter", label: "Letter" },
  { id: "music", label: "Music" },
];

export default function Navbar({ show }: { show: boolean }) {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    function onScroll() {
      let current = "hero";
      for (const l of LINKS) {
        const el = document.getElementById(l.id);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.4) {
          current = l.id;
        }
      }
      setActive(current);
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -30 }}
      animate={show ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.15 }}
      className="glass fixed top-4 left-1/2 -translate-x-1/2 z-[500] flex items-center gap-1 px-2.5 py-2 rounded-full scale-[0.82] sm:scale-100"
    >
      <span className="px-2 text-cyan-light">
        <Sparkles size={16} />
      </span>
      {LINKS.map((l) => (
        <a
          key={l.id}
          href={`#${l.id}`}
          className={`cursor-hover px-4 py-2 rounded-full text-[13px] font-medium transition-all whitespace-nowrap ${
            active === l.id ? "text-white bg-purple/25" : "text-zinc-400 hover:text-white hover:bg-purple/15"
          }`}
        >
          {l.label}
        </a>
      ))}
    </motion.nav>
  );
}
