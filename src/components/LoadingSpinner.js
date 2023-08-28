import { Spinner } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";

const loadingPhrases = [
  "Loading Brilliance...",
  "Empowering Minds...",
  "Fueling Curiosity...",
  "Crafting Futures...",
  "Syncing Wisdom...",
  "Building Intelligence...",
  "Igniting Learning...",
  "Loading Insight...",
  "Empowering Discoveries...",
  "Fueling Ambitions...",
  "Unleashing Potential...",
  "Assembling Knowledge...",
  "Charging Education...",
  "Generating Genius...",
  "Sculpting Minds...",
  "Elevating Intellects...",
  "Loading Dreams...",
  "Igniting Innovation...",
  "Powering Up Learning...",
  "Crafting Excellence...",
];

function LoadingSpinner() {
  const [msg, setMsg] = useState(loadingPhrases[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMsg(loadingPhrases[Math.floor(Math.random() * loadingPhrases.length)]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center">
      <Spinner color="deep-orange" className="text-transparent mr-1" />
      {msg}
    </div>
  );
}

export default LoadingSpinner;
