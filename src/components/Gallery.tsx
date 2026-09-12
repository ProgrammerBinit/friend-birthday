import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import { galleryImages } from "../data/memories";

const rotations = ["-rotate-2.5", "rotate-2", "-rotate-1"];

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
    <section id="gallery" className="py-28 px-6 max-w-6xl mx-auto">
      <PhotoProvider>
        <div className="masonry">
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
              className={`bg-[#f4f4f2] p-2.5 pb-8 rounded-sm shadow-lg ${
                rotations[i % rotations.length]
              }`}
            >
              <PhotoView src={g.src}>
                <img
                  src={g.src}
                  alt={g.caption}
                  className="w-full rounded"
                />
              </PhotoView>

              <div className="text-center mt-2">
                {g.caption}
              </div>
            </motion.div>
          ))}
        </div>
      </PhotoProvider>
    </section>
  );
}