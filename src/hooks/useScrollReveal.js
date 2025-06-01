import { useEffect } from "react";
import ScrollReveal from "scrollreveal";

export default function useScrollReveal(trigger) {
  useEffect(() => {
    const sr = ScrollReveal();

    sr.clean();

    const baseRevealConfig = {
      scale: 0.8,
      opacity: 0,
      duration: 1200,
      interval: 100,
      easing: "ease-in-out",
      reset: false,
    };

    sr.reveal(".popup", {
      ...baseRevealConfig,
      interval: 0,
    });

    sr.reveal(".popup-int", {
      ...baseRevealConfig,
    });

    sr.reveal(".popup-left", {
      ...baseRevealConfig,
      origin: "left",
      distance: "100%",
    });

    sr.reveal(".popup-right", {
      ...baseRevealConfig,
      origin: "right",
      distance: "100%",
    });

    sr.reveal(".popup-up", {
      ...baseRevealConfig,
      origin: "bottom",
      distance: "100%",
      scale: 1,
    });

    sr.reveal(".popup-down", {
      ...baseRevealConfig,
      origin: "top",
      distance: "100%",
    });

    sr.reveal(".popup-fade", {
      opacity: 0,
      duration: 1200,
      reset: false,
      delay: 500,
    });
  }, [trigger]);
}
