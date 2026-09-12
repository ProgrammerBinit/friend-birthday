import { useState } from "react";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Timeline from "./components/Timeline";
import Gallery from "./components/Gallery";
import Spotlight from "./components/Spotlight";
import Counter from "./components/Counter";
import Letter from "./components/Letter";
import MusicPlayer from "./components/MusicPlayer";
import Countdown from "./components/Countdown";
import Finale from "./components/Finale";
import Footer from "./components/Footer";
import CursorTrail from "./components/CursorTrail";

export default function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="bg-bg min-h-screen text-zinc-100 selection:bg-purple">
    <Loader onDone={() => setLoaded(true)} />
    <CursorTrail />
    <Navbar show={loaded} />
    <Hero start={loaded} />
 
      <Timeline />
      <Gallery />
      <Spotlight />
      <Counter />
      <Letter />
      <MusicPlayer />
      <Countdown />
      <Finale />
      <Footer />
    </div>
  );
}
