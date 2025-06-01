import { useEffect, useRef } from "react";

/**
 * @param {string[]} texts
 * @param {object} options
 * @param {number} [options.typingSpeed=100]
 * @param {number} [options.eraseSpeed=50]
 * @param {number} [options.delayBeforeErase=3000]
 * @returns {React.MutableRefObject<HTMLElement | null>}
 */
export default function useTypewriter(
  texts = [],
  { typingSpeed = 100, eraseSpeed = 50, delayBeforeErase = 3000 } = {},
) {
  const textRef = useRef(null);

  useEffect(() => {
    let textIndex = 0;
    let charIndex = 0;
    let timeoutId;

    const typeWriter = () => {
      if (!textRef.current) {
        clearTimeout(timeoutId);
        return;
      }

      if (charIndex < texts[textIndex].length) {
        textRef.current.innerHTML = texts[textIndex].substring(
          0,
          charIndex + 1,
        );
        charIndex++;
        timeoutId = setTimeout(typeWriter, typingSpeed);
      } else {
        timeoutId = setTimeout(eraseText, delayBeforeErase);
      }
    };

    const eraseText = () => {
      if (!textRef.current) {
        clearTimeout(timeoutId);
        return;
      }

      if (charIndex > 0) {
        textRef.current.innerHTML = texts[textIndex].substring(
          0,
          charIndex - 1,
        );
        charIndex--;
        timeoutId = setTimeout(eraseText, eraseSpeed);
      } else {
        textIndex = (textIndex + 1) % texts.length;
        timeoutId = setTimeout(typeWriter, typingSpeed);
      }
    };

    if (texts.length > 0) {
      typeWriter();
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [texts, typingSpeed, eraseSpeed, delayBeforeErase]);

  return textRef;
}
