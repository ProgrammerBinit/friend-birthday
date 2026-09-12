import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import { galleryImages } from "../data/memories";

const rotations = ["sm:-rotate-2.5", "sm:rotate-2", "sm:-rotate-1"];

export default function Gallery() {
  const [images, setImages] = useState(galleryImages);

  useEffect(() => {
    const interval = setInterval(() => {
      setImages((prev) => {
        const arr = [...prev];

        // Random 2 images swap
        const a = Math.floor(Math.random() * arr.length);
        let b = Math.floor(Math.random() * arr.length);

        while (a === b) {
          b = Math.floor(Math.random() * arr.length);
        }

        [arr[a], arr[b]] = [arr[b], arr[a]];
        return arr;
      });
    }, 3000); // every 3 sec

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="gallery" className="py-16 sm:py-28 px-4 sm:px-6 max-w-6xl mx-auto">
      <PhotoProvider>
        <div className="columns-2 sm:columns-3 gap-3 sm:gap-5 [column-fill:_balance]">
          {images.map((g, i) => (
            <motion.div
              key={g.src}
              layout
              transition={{
                layout: {
                  duration: 1,
                  type: "spring",
                },
              }}
              whileHover={{
                scale: 1.07,
                rotate: 0,
              }}
              className={`break-inside-avoid mb-3 sm:mb-5 bg-[#f4f4f2] p-1.5 sm:p-2.5 pb-5 sm:pb-8 rounded-sm shadow-lg ${
                rotations[i % rotations.length]
              }`}
            >
              <PhotoView src={`${import.meta.env.BASE_URL}${g.src}`}>
                <img
                  src={`${import.meta.env.BASE_URL}${g.src}`}
                  alt={g.caption}
                  className="w-full rounded cursor-hover"
                />
              </PhotoView>

              <div className="text-center mt-2 text-[11px] sm:text-sm text-zinc-800 px-1 leading-snug break-words">
                {g.caption}
              </div>
            </motion.div>
          ))}
        </div>
      </PhotoProvider>
    </section>
  );
}