import { useEffect, useState } from "react";

// CUSTOM HOOK USED TO CHECK IF THE USER IS USING A MOBILE DEVICE OR A DESKTOP
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.matchMedia("(max-width: 980px)").matches);
      setIsDesktop(window.matchMedia("(min-width: 981px)").matches);
    };

    // INITIAL CHECK
    handleResize();

    // ADD EVENT LISTENER SO THAT WHEN SCREEN CHANGES IN SIZEP; THE STATE IS UPDATED
    window.addEventListener("resize", handleResize);

    // CLEARN UP
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return { isMobile, isDesktop }; 
};

export default useIsMobile;

