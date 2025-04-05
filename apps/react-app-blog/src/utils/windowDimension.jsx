import { useEffect } from "react";
import { useState } from "react";

function getWindowDimensions() {
  const { innerWidth, innerHeight } = window;
  return { 
    width: innerWidth,
    height: innerHeight,
  }
}

function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    const handleResize = () => setWindowDimensions(getWindowDimensions());

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}

export default useWindowDimensions;