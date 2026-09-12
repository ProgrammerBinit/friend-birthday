import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, MoreVertical, X } from "lucide-react";

const LINKS = [
  { id: "hero", label: "Home" },
  { id: "timeline", label: "Timeline" },
  { id: "gallery", label: "Gallery" },
  { id: "letter", label: "Letter" },
  { id: "music", label: "Music" },
];

const BREAKPOINT = 800;

export default function Navbar({ show }: { show: boolean }) {
  const [active, setActive] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < BREAKPOINT : false
  );

  // Decide mobile vs desktop purely in JS — no reliance on Tailwind breakpoint classes
  useEffect(() => {
    const checkSize = () => {
      const mobile = window.innerWidth < BREAKPOINT;
      setIsMobile(mobile);
      if (!mobile) setMenuOpen(false);
    };
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      let current = "hero";
      for (const link of LINKS) {
        const el = document.getElementById(link.id);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.4) {
          current = link.id;
        }
      }
      setActive(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handleLinkClick = () => setMenuOpen(false);

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <motion.nav
        initial={{ opacity: 0, y: -30 }}
        animate={show ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.15 }}
        style={{ maxWidth: "calc(100vw - 24px)" }}
        className="glass fixed top-4 right-4 -translate-x-1/2 z-[500] flex items-center px-2.5 py-2 rounded-full"
      >
        <span className="flex items-center justify-center px-2 text-cyan-light shrink-0">
          <Sparkles size={16} />
        </span>

        {isMobile ? (
          // ================= MOBILE: 3-dot button =================
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((prev) => !prev)}
            className="flex items-center justify-center w-10 h-10 rounded-full text-zinc-300
             hover:text-white hover:bg-purple/20 active:scale-90 transition-all"
          >
            <AnimatePresence mode="wait" initial={false}>
              {menuOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                >
                  <X size={21} />
                </motion.span>
              ) : (
                <motion.span
                  key="dots"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                >
                  <MoreVertical size={21} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        ) : (
          // ================= DESKTOP: full pill nav =================
          <div className="flex items-center gap-1">
            {LINKS.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={handleLinkClick}
                className={
                  active === link.id
                    ? "cursor-hover px-3 lg:px-4 py-2 rounded-full text-[13px] font-medium transition-all whitespace-nowrap text-white bg-purple/25"
                    : "cursor-hover px-3 lg:px-4 py-2 rounded-full text-[13px] font-medium transition-all whitespace-nowrap text-zinc-400 hover:text-white hover:bg-purple/15"
                }
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </motion.nav>

      {/* ================= MOBILE DROPDOWN ================= */}
      <AnimatePresence>
        {isMobile && menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-[490] bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, y: -15, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              className="glass fixed top-[72px] left-3 right-3 z-[495] rounded-2xl p-2"
            >
              {LINKS.map((link, index) => (
                <motion.a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={handleLinkClick}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.04 }}
                  className={
                    active === link.id
                      ? "flex items-center w-full px-4 py-3.5 rounded-xl text-sm font-medium transition-all text-white bg-purple/25"
                      : "flex items-center w-full px-4 py-3.5 rounded-xl text-sm font-medium transition-all text-zinc-400 hover:text-white hover:bg-purple/15"
                  }
                >
                  <span>{link.label}</span>
                  {active === link.id && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-cyan-light" />
                  )}
                </motion.a>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}