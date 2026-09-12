import { useRef, useState, type ReactNode } from "react";
import { motion } from "framer-motion";

interface Props {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function MagneticButton({ children, className = "", onClick }: Props) {
  const ref = useRef<HTMLButtonElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  function handleMouseMove(e: React.MouseEvent<HTMLButtonElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPos({ x: x * 0.35, y: y * 0.35 });
  }

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      onClick={onClick}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 150, damping: 12, mass: 0.4 }}
      whileTap={{ scale: 0.92 }}
      className={className}
    >
      {children}
    </motion.button>
  );
}
