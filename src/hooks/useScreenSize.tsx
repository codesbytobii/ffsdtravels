import { useState, useEffect } from "react";

function useScreenSize() {
  const [width, setWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    const resizeHandler = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", resizeHandler);

    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  return {
    width,
  };
}

export default useScreenSize;
