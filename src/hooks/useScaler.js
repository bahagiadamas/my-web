import { useEffect, useRef, useCallback } from "react";

export default function useScaler() {
  const scaleRef = useRef(null);

  const BASE_SCALE = 1;
  const MAX_SCALE = 1.5;
  const SCALE_FACTOR_MULTIPLIER = 2000;
  const MAX_BLUR = 8;
  const BLUR_SPEED = 40;
  const INITIAL_BLUR_THRESHOLD = 1;

  const updateScaleAndBlur = useCallback(() => {
    if (!scaleRef.current || scaleRef.current.clientWidth === 0) {
      return;
    }

    requestAnimationFrame(() => {
      const scrollY = window.scrollY;

      const calculatedScale = BASE_SCALE + scrollY / SCALE_FACTOR_MULTIPLIER;
      const currentScale = Math.min(calculatedScale, MAX_SCALE);

      const calculatedBlur = Math.max(
        INITIAL_BLUR_THRESHOLD,
        Math.min(scrollY / BLUR_SPEED, MAX_BLUR),
      );

      if (scaleRef.current) {
        scaleRef.current.style.transform = `scale(${currentScale})`;
        scaleRef.current.style.transformOrigin = "center center";
        scaleRef.current.style.setProperty(
          "--blur-scale",
          `${calculatedBlur}px`,
        );
      }
    });
  }, []);

  useEffect(() => {
    let animationFrameId;

    const setupListeners = () => {
      if (scaleRef.current && scaleRef.current.clientWidth > 0) {
        updateScaleAndBlur();
        window.addEventListener("scroll", updateScaleAndBlur);
      } else {
        animationFrameId = requestAnimationFrame(setupListeners);
      }
    };

    setupListeners();

    return () => {
      window.removeEventListener("scroll", updateScaleAndBlur);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [updateScaleAndBlur]);
  return { scaleRef };
}
